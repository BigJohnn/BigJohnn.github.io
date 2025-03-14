---
layout:     post
title:      "智能浇铸定位系统"
subtitle:   "智慧工厂项目"
date:       2024-9-24
author:     "Peihong"
tags:
    - Realsense
    - ROS
    - PLC
    - 点云拼接
    - UNET
    - 椭圆极径搜索
---

**项目背景**

铝厂制备铝锭，使用氧化铝工艺，需要首先制备炭块，其次将炭块与钢叉粘合到一起，并使用铁水为粘合剂；最后通过传送带，将钢叉与炭块一道，送往电解池，发生还原反应，得到**铝Al**与**二氧化碳CO2**.

为了完成上述粘合装配，首先在炭块表面打4个洞，其直径相比钢叉的每个钢柱略大，从而将钢叉插入洞内。其中，每个洞称为炭碗，上述过程使用倒模方式完成。

在装配车间，通过大电流将铁融化，再由浇铸工人操作，将铁水精准浇到钢叉与炭碗的缝隙中，待铁凝结，便可以将钢叉与炭块牢牢固定。

**存在问题**

工作环境恶劣，工人需要穿防护服，并且存在噪声污染、高温等不利因素。此外，铁渣飞溅容易发生人员烫伤；

浇铸铁水的过程有点像茶壶🫖倒茶，培养一个工人需要长达半年之久，且比较考验操作技术，避免发生倒歪或者倒少、倒多的情况;
    
若溢出的高温铁水融化地面的厚钢板，还会破坏底部线缆，引发重大安全事故。

**一些失败的尝试**
<figure>
    <video width="560" height="315" controls title="高温点云丢失">
    <source src="/videos/bad_case.webm" type="video/webm">
    您的浏览器不支持 HTML5 视频。
    </video>
    <figcaption>高温会影响rgb & d</figcaption>
 </figure>

<figure>
<video width="560" height="315" controls>
  <source src="/videos/bad_align.webm" type="video/webm">
  您的浏览器不支持 HTML5 视频。
</video>
    <figcaption>由于各个炭块尺寸存在误差，且炭块点云边缘也存在误差，icp匹配确定目标点不靠谱</figcaption>
</figure>

**横向定位方案设计**

![img](/img/qingtongxia/qingtongxia_demo.jpg)

浇铸机走在平行于炭块板链的轨道上，带动浇包横向移动，从而确定浇点的横向位置。
    人眼看每个钢柱左右两侧缝隙时，需要垂直于轨道方向查看。

于是，

**1.**选取4个realsense相机，按4个炭碗的间距排列，安装在浇铸机面向炭块的一侧；

**2.**横向移动浇铸机，并调整相机角度使每个相机画面中心正对相应炭碗。由于每次浇铸时，钢叉会被固定位置的构件锁住，所以浇铸机相对于起始位置（横移电机0位）的移动量是恒定的，只需要确定一次。

![img](/img/qingtongxia/imgoriimage0.jpg)
![img](/img/qingtongxia/imgoriimage1.jpg)
![img](/img/qingtongxia/imgoriimage2.jpg)
![img](/img/qingtongxia/imgoriimage3.jpg)

**3.**利用ros同步机制采集一组数据，将目标roi区域提取出来做进一步处理。

**4.**对roi区域中的缝隙纹理做标注，并对unet模型做finetune；

**5.**利用unet提取缝隙mask；

**6.**对所得mask做进一步传统方法处理，以及椭圆极径搜索，得到较宽一侧的缝隙点p，此为图像空间中位置；

<table>
  <tr>
    <td><img src="/img/qingtongxia/imgroi0.jpg" width="200"></td>
    <td><img src="/img/qingtongxia/imgroi1.jpg" width="200"></td>
    <td><img src="/img/qingtongxia/imgroi2.jpg" width="200"></td>
    <td><img src="/img/qingtongxia/imgroi3.jpg" width="200"></td>
  </tr>
</table>

**7.**对3中数据做进一步处理，生成点云，并使用
[拼接工具](https://github.com/BigJohnn/RTSTool)
进行离线拼接，从而得到全局一致的点云。此时，通过pcl_viewer工具测量点云中炭块长度，并使用卷尺测量真实世界炭块的长度，二者求比值，得到点云缩放因子。从而将炭块点云缩放到真实尺度，得到变换矩阵T。

**8.**使用T对**6.**中图像空间缝隙点p做反投影，得到缝隙点空间位置P；由于有4个相机，所以实际得到P1～P4。

**9.**因相机与浇包安装的相对位置固定，所以可以用卷尺测量出浇口位置M，进而算出浇铸机需要移动的4个偏移量（单位：毫米）。

**10.**通过snap7协议与PLC通信，发送相关偏移量与运动控制指令给浇铸机，从而完成横向动作。

**结论**

基于已有技术方案，可以出色地完成浇铸机横向定位任务。其中，

    缝隙点检测准度：约95%，使用61张图片训练的结果，若增大数据集，可进一步提升到约99.9%;

    水平定位精度：计算值 && 实际位置差距<5mm，且可以继续提升；

    单次检测计算时间：15ms～30ms；
    

    