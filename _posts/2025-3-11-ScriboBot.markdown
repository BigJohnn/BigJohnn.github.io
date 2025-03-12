---
layout:     post
title:      "写字机器人"
subtitle:   "ApplePencil + Franka阻抗控制"
date:       2025-03-11
author:     "Peihong"
tags:
    - iPad
    - Apple Pencil
    - Franka Robot
---

**简介**

# Apple Pencil 轨迹提取系统设计文档

## 项目概述
通过Apple Pencil采集书写轨迹数据，使用proto3协议序列化数据，通过ZeroMQ实现Swift与Python间的跨平台通信，控制写字机器人复现书写轨迹。

---

## 技术架构
```mermaid
graph LR
A[Apple Pencil] --> B[Swift数据采集]
B --> C[Proto3序列化]
C --> D[ZeroMQ传输]
D --> E[Python机器人控制]
```

---

## 开发环境配置

### 1. 依赖安装
```bash
# Swift 环境
brew install protobuf swift-protobuf

# Python 环境
pip install pyzmq protobuf
```

### 2. Xcode包依赖
```
File > Add Package Dependencies > 添加protobuf && zeromq的swift-binding
```

### 代码生成命令
```bash
# Swift代码生成（需先安装swift-protobuf）
protoc --swift_out=. stroke.proto

# Python代码生成
protoc --python_out=. stroke.proto
```

---

## ZeroMQ 通信实现

### 通信模式
```mermaid
sequenceDiagram
Pad(Client)->>Robot(Server): REQ: StrokeArray数据
Note right of Robot(Server): 处理轨迹数据
Robot(Server)->>Pad(Client): REP: 执行结果
```
