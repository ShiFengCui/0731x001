# CouponCard 优惠券组件

## 功能描述

优惠券卡片组件，支持展示优惠券信息、领取功能和状态显示。

## 功能特点

- 展示券信息（面额、门槛、有效期、适用范围）
- 领取优惠券入口
- 状态显示（未使用、已使用、已过期）
- 响应式设计
- 支持自定义样式

## 使用方法

```vue
<template>
  <view>
    <coupon-card 
      :coupon-data="couponInfo" 
      @receive="handleReceiveCoupon"
    />
  </view>
</template>

<script>
import CouponCard from '@/components/coupon-card/coupon-card.vue'

export default {
  components: {
    CouponCard
  },
  data() {
    return {
      couponInfo: {
        id: '1',
        title: '满100减20优惠券',
        amount: 20,
        threshold: 100,
        description: '限时优惠券，快来领取',
        scope: '全场通用',
        startTime: '2024-01-01',
        endTime: '2024-12-31',
        status: 'available'
      }
    }
  },
  methods: {
    handleReceiveCoupon(couponData) {
      console.log('领取优惠券:', couponData)
    }
  }
}
</script>
```

## Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| couponData | Object | - | 优惠券数据 |

### couponData 对象结构

| 字段 | 类型 | 说明 |
|------|------|------|
| id | String | 优惠券ID |
| title | String | 优惠券标题 |
| amount | Number | 优惠金额 |
| threshold | Number | 使用门槛，0表示无门槛 |
| description | String | 优惠券描述 |
| scope | String | 适用范围 |
| startTime | String | 有效期开始时间 |
| endTime | String | 有效期结束时间 |
| status | String | 状态：available-可领取, unused-未使用, used-已使用, expired-已过期 |

## Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| receive | 领取优惠券时触发 | couponData |

## 状态说明

- **available**: 可领取状态，显示"立即领取"按钮
- **unused**: 未使用状态，显示绿色状态标签
- **used**: 已使用状态，显示灰色状态标签和遮罩
- **expired**: 已过期状态，显示红色状态标签和遮罩