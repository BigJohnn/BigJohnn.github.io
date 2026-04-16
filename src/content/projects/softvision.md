---
title: SoftVision
description: 面向 iOS 的 AliceVision 裁剪版，使用 Metal 重写部分 CUDA 计算流程。
publishedAt: 2024-03-11
featured: true
status: 停止维护
tech:
  - iOS
  - Metal
  - SfM
  - MVS
tags:
  - 3D Vision
  - Reconstruction
cover: /img/softvision/SoftVision.webp
coverAlt: SoftVision 界面示意
repo: https://github.com/BigJohnn/SoftVision
relatedPostSlug: 2024-3-11-SoftVision
order: 3
---

这个项目把 AliceVision 中与 iOS 环境强相关的部分进行了适配，并将部分 GPU 计算改写为 Metal 实现，用于探索移动端三维重建的可行路径。
