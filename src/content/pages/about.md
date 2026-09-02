---
title: 关于
description: 关于 Peihong 的工程背景与站点定位。
---

这个站点聚焦机器人、三维视觉、具身智能和真实工程项目。

我更关心的问题是：真实机器人学习系统如何从“能演示一次”走向“能持续迭代”。模型本身只是一部分，更难的是采集合同、传感器同步、训练数据 QC、动作空间设计、checkpoint 上机检查、场景恢复、rollout 评分和失败归因。

近期工作集中在三类能力：

- 机器人学习工作站：把 record、dataset processing、training view、checkpoint 管理、real-robot rollout 和 history 收进同一套 GUI / gateway。
- 实验效率工具：通过场景恢复、demo 分布对照、rollout 阶段评分、落点散点图和 append-only 实验日志，把失败快速转成下一轮训练决策。
- 现场工程闭环：从相机、触觉、六维力、夹爪、机器人控制、MuJoCo 验证到 Jetson / Docker 部署，尽量让每个环节都有可检查的合同。

内容主要分成两部分：

- `Projects`：更结构化地展示完整项目、系统设计、关键决策和结果。
- `Blog`：保留过程记录、笔记、开源项目观察和技术沉淀。

如果你想快速了解我的工作，建议先看首页的精选项目和 `/projects/`。
