---
layout:     post
title:      "SoftVision"
subtitle:   "AliceVision iOS版"
date:       2024-03-11
author:     "Peihong"
# header-img: "img/SoftVision.png"
tags:
    - SoftVision
    - iOS
---

[SoftVision](https://github.com/BigJohnn/SoftVision)对[AliceVision](https://github.com/alicevision/AliceVision)做了删减，为适配iOS，使用Metal重写了计算SGM（半高斯匹配）的CUDA部分。

![img](/img/softvision/SoftVision.png)

![](/img/softvision/CamInit.png)

![](/img/softvision/FeatureExtract.png)

![](/img/softvision/FeatureMatching.png)

![img](/img/softvision/SequentialSFM.png)

![](/img/softvision/Prepare DenseScene.png)

![](/img/softvision/DepthEstimation.png)

![](/img/softvision/Meshing.png)

![](/img/softvision/TextureMapping.png)

> Prepare Input Data: Essential SwiftUI for camera meta data aquirement, done.
> (SIFT)Feature Extracting, done.

> Image Matching, assumed to have done, todo.

> (SIFT)Feature Matching done.

> Structure From Motion done.

> PrepareDenseScene done.

ToDoList:

> DepthMap. # with gpu, metal acc (translation done, but need more test)

> DepthMapFilter.

> Meshing.

> MeshFiltering.

> Texture Mapping.

Note.
```
该项目不再更新， 后续拥抱3D-GS类新技术。
```