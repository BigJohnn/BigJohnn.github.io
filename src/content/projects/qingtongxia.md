---
title: 智能浇铸定位系统
description: 面向高温恶劣场景的横向浇铸定位系统，结合多相机视觉、分割模型和 PLC 控制。
publishedAt: 2024-09-24
featured: true
status: 方案验证完成
tech:
  - Realsense
  - ROS
  - UNet
  - PLC
  - Snap7
tags:
  - Vision
  - Industrial Robotics
cover: /img/qingtongxia/qingtongxia_demo.avif
coverFallback: /img/qingtongxia/qingtongxia_demo.jpg
coverAlt: 智能浇铸定位系统示意图
relatedPostSlug: 2024-10-30-Qingtongxia
order: 2
---

系统通过 4 路相机同步采集浇铸目标区域图像，使用 UNet 提取缝隙区域，再结合传统几何处理和离线点云拼接，计算浇铸机横向偏移量，并经 PLC 执行运动控制。

结果摘要：

- 缝隙点检测准确度约 95%。
- 水平定位误差控制在 5mm 内。
- 单次检测耗时约 15ms 到 30ms。
