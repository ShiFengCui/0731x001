<template>
  <view class="coupon-demo">
    <uni-nav-bar 
      title="优惠券演示" 
      :border="false" 
      background-color="#ff6b6b"
      color="#fff"
    />
    
    <scroll-view class="scroll-area" scroll-y>
      <view class="demo-section">
        <view class="section-title">可领取优惠券</view>
        <coupon-card 
          :coupon-data="availableCoupon" 
          @receive="handleReceiveCoupon"
        />
      </view>
      
      <view class="demo-section">
        <view class="section-title">未使用优惠券</view>
        <coupon-card :coupon-data="unusedCoupon" />
      </view>
      
      <view class="demo-section">
        <view class="section-title">已使用优惠券</view>
        <coupon-card :coupon-data="usedCoupon" />
      </view>
      
      <view class="demo-section">
        <view class="section-title">已过期优惠券</view>
        <coupon-card :coupon-data="expiredCoupon" />
      </view>
    </scroll-view>
  </view>
</template>

<script>
import CouponCard from '@/components/coupon-card/coupon-card.vue'

export default {
  name: 'CouponDemo',
  components: {
    CouponCard
  },
  data() {
    return {
      availableCoupon: {
        id: '1',
        title: '新用户专享券',
        amount: 50,
        threshold: 200,
        description: '限时优惠，首次下单可用',
        scope: '全场商品',
        startTime: '2024-01-01',
        endTime: '2024-12-31',
        status: 'available'
      },
      unusedCoupon: {
        id: '2',
        title: '满100减20',
        amount: 20,
        threshold: 100,
        description: '通用优惠券',
        scope: '全场通用',
        startTime: '2024-01-01',
        endTime: '2024-12-31',
        status: 'unused'
      },
      usedCoupon: {
        id: '3',
        title: '无门槛券',
        amount: 15,
        threshold: 0,
        description: '已使用的优惠券',
        scope: '指定商品',
        startTime: '2024-01-01',
        endTime: '2024-12-31',
        status: 'used'
      },
      expiredCoupon: {
        id: '4',
        title: '过期优惠券',
        amount: 30,
        threshold: 150,
        description: '已过期的优惠券',
        scope: '全场通用',
        startTime: '2024-01-01',
        endTime: '2024-06-30',
        status: 'expired'
      }
    }
  },
  methods: {
    handleReceiveCoupon(couponData) {
      console.log('领取优惠券:', couponData)
      uni.showModal({
        title: '提示',
        content: `成功领取优惠券：${couponData.title}`,
        showCancel: false
      })
    }
  }
}
</script>

<style scoped>
.coupon-demo {
  height: 100vh;
  background: #f5f5f5;
}

.scroll-area {
  height: calc(100vh - 44px);
}

.demo-section {
  margin-bottom: 40rpx;
}

.section-title {
  padding: 20rpx 30rpx;
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  background: #fff;
  border-left: 8rpx solid #ff6b6b;
  margin-bottom: 20rpx;
}
</style>