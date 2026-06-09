---
title: ACT / Pi0.5 Thor 推理部署
description: 面向机器人策略模型的部署工程实践，覆盖 ACT 打包、Pi0.5 OpenPI/Orbax 到 safetensors 转换、Thor 推理 smoke 与 CUDA Graph 热路径设计。
publishedAt: 2026-06-09
featured: true
status: 技术博客
tech:
  - ACT
  - Pi0.5
  - Safetensors
  - Jetson Thor
  - CUDA Graph
tags:
  - VLA
  - Robotics Deployment
  - Inference
relatedPostSlug: 2026-06-09-act-pi05-thor-deployment
order: 2
---

系统整理机器人策略模型从训练 checkpoint 到部署 artifact 的关键步骤：ACT 侧重点在 PyTorch 权重、配置和归一化统计的可审计打包；Pi0.5 侧重点在 OpenPI / Orbax checkpoint 完整性检查、官方转换脚本、safetensors key/shape 校验、Thor Docker runtime、CUDA Graph capture/replay，以及上线前 action sanity smoke。

文章强调部署契约而不是单点性能：先确认模型格式、输入视角、norm stats、动作维度和 smoke gate，再把输出接入机器人控制器。
