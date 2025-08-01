# 会员中心组件 (MemberCenter)

## 功能介绍

会员中心组件是一个完整的会员管理界面，包含会员等级展示、权益说明、积分管理和兑换功能。

## 主要功能

### 1. 会员等级展示
- 会员头像和昵称
- 会员等级徽章
- 等级描述信息

### 2. 积分余额管理
- 当前积分余额
- 累计获得积分总数
- 醒目的积分展示

### 3. 会员权益说明
- 权益列表展示
- 权益可用状态
- 权益描述和状态

### 4. 积分兑换功能
- 兑换商品列表
- 积分不足状态判断
- 兑换确认流程

### 5. 积分获取与消耗记录
- 积分变动记录
- 获得/消耗区分显示
- 时间和操作说明

## 使用方法

```vue
<template>
  <member-center
    :member-data="memberData"
    :member-benefits="memberBenefits"
    :exchange-list="exchangeList"
    :points-records="pointsRecords"
    @exchange="onExchange"
    @exchangeItemClick="onExchangeItemClick"
    @viewMoreExchange="onViewMoreExchange"
    @viewMoreRecord="onViewMoreRecord"
  />
</template>

<script>
import MemberCenter from '@/components/member-center/member-center.vue'

export default {
  components: {
    MemberCenter
  },
  data() {
    return {
      memberData: {
        nickname: '会员用户',
        avatar: '/static/logo.png',
        level: 1,
        levelName: '普通会员',
        levelDesc: '享受基础会员权益',
        points: 1580,
        totalPoints: 3200
      },
      memberBenefits: [
        {
          icon: 'gift',
          title: '生日礼包',
          desc: '生日当月可领取专属礼包',
          available: true,
          status: '可领取'
        }
      ],
      exchangeList: [
        {
          id: 1,
          title: '10元优惠券',
          desc: '全场通用，无门槛使用',
          points: 1000,
          image: '/static/logo.png'
        }
      ],
      pointsRecords: [
        {
          title: '每日签到',
          points: 10,
          type: 'earn', // 'earn' 获得, 'spend' 消耗
          time: '2024-12-12 09:00'
        }
      ]
    }
  },
  methods: {
    onExchange(item) {
      console.log('兑换商品:', item)
    },
    onExchangeItemClick(item) {
      console.log('点击兑换商品:', item)
    },
    onViewMoreExchange() {
      console.log('查看更多兑换商品')
    },
    onViewMoreRecord() {
      console.log('查看更多积分记录')
    }
  }
}
</script>
```

## Props 参数

### memberData
会员基本信息对象
- `nickname` (String): 会员昵称
- `avatar` (String): 会员头像
- `level` (Number): 会员等级
- `levelName` (String): 等级名称
- `levelDesc` (String): 等级描述
- `points` (Number): 当前积分
- `totalPoints` (Number): 累计积分

### memberBenefits
会员权益列表数组
- `icon` (String): 权益图标
- `title` (String): 权益标题
- `desc` (String): 权益描述
- `available` (Boolean): 是否可用
- `status` (String): 权益状态

### exchangeList
积分兑换商品列表数组
- `id` (Number): 商品ID
- `title` (String): 商品标题
- `desc` (String): 商品描述
- `points` (Number): 所需积分
- `image` (String): 商品图片

### pointsRecords
积分记录列表数组
- `title` (String): 操作标题
- `points` (Number): 积分数量
- `type` (String): 类型 ('earn' | 'spend')
- `time` (String): 操作时间

## Events 事件

### @exchange
兑换商品事件
- 参数: `item (Object)` - 兑换的商品信息

### @exchangeItemClick
点击兑换商品事件
- 参数: `item (Object)` - 点击的商品信息

### @viewMoreExchange
查看更多兑换商品事件

### @viewMoreRecord
查看更多积分记录事件

## 样式特性

- 渐变色会员头部设计
- 积分余额突出显示
- 权益状态可视化
- 兑换按钮状态管理
- 积分记录正负值区分显示

## 注意事项

1. 需要引入 uni-icons 组件
2. 兑换功能会自动判断积分是否足够
3. 会员等级样式根据 level 字段自动应用
4. 组件内部处理了积分不足的提示