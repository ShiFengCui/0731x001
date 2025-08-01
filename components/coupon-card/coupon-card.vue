<template>
  <view class="coupon-card" :class="statusClass">
    <view class="coupon-main">
      <!-- 左侧面额区域 -->
      <view class="coupon-left">
        <view class="coupon-price">
          <text class="price-symbol">¥</text>
          <text class="price-amount">{{ couponData.amount }}</text>
        </view>
        <view class="coupon-condition" v-if="couponData.threshold > 0">
          满{{ couponData.threshold }}可用
        </view>
        <view class="coupon-condition" v-else>
          无门槛
        </view>
      </view>
      
      <!-- 右侧信息区域 -->
      <view class="coupon-right">
        <view class="coupon-info">
          <view class="coupon-title">{{ couponData.title }}</view>
          <view class="coupon-desc" v-if="couponData.description">
            {{ couponData.description }}
          </view>
          <view class="coupon-scope">
            适用范围：{{ couponData.scope }}
          </view>
          <view class="coupon-time">
            有效期：{{ formatTime(couponData.startTime) }} - {{ formatTime(couponData.endTime) }}
          </view>
        </view>
        
        <!-- 状态或操作按钮 -->
        <view class="coupon-action">
          <button 
            v-if="couponData.status === 'available'" 
            class="action-btn receive-btn"
            @click="handleReceive"
            :disabled="loading"
          >
            {{ loading ? '领取中...' : '立即领取' }}
          </button>
          <view v-else class="status-tag" :class="'status-' + couponData.status">
            {{ statusText }}
          </view>
        </view>
      </view>
    </view>
    
    <!-- 状态遮罩 -->
    <view v-if="couponData.status !== 'available' && couponData.status !== 'unused'" class="status-mask">
      <text class="status-text">{{ statusText }}</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'CouponCard',
  props: {
    couponData: {
      type: Object,
      default: () => ({
        id: '',
        title: '优惠券',
        amount: 0,
        threshold: 0,
        description: '',
        scope: '全场通用',
        startTime: '',
        endTime: '',
        status: 'available' // available-可领取, unused-未使用, used-已使用, expired-已过期
      })
    }
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    statusClass() {
      return `coupon-${this.couponData.status}`
    },
    statusText() {
      const statusMap = {
        available: '可领取',
        unused: '未使用',
        used: '已使用',
        expired: '已过期'
      }
      return statusMap[this.couponData.status] || '未知状态'
    }
  },
  methods: {
    formatTime(time) {
      if (!time) return ''
      const date = new Date(time)
      return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`
    },
    
    async handleReceive() {
      if (this.loading) return
      
      this.loading = true
      try {
        // 发送领取请求
        this.$emit('receive', this.couponData)
        
        // 模拟异步操作
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        uni.showToast({
          title: '领取成功',
          icon: 'success'
        })
      } catch (error) {
        uni.showToast({
          title: '领取失败',
          icon: 'error'
        })
        console.error('领取优惠券失败:', error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.coupon-card {
  position: relative;
  margin: 20rpx;
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
  border-radius: 20rpx;
  overflow: hidden;
  box-shadow: 0 8rpx 24rpx rgba(255, 107, 107, 0.3);
}

.coupon-main {
  display: flex;
  padding: 30rpx;
  background: #fff;
  margin: 4rpx;
  border-radius: 16rpx;
  position: relative;
}.coupon-left {
  flex: 0 0 200rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-right: 30rpx;
  border-right: 2rpx dashed #e0e0e0;
}

.coupon-price {
  display: flex;
  align-items: baseline;
  margin-bottom: 10rpx;
}

.price-symbol {
  font-size: 24rpx;
  color: #ff6b6b;
  font-weight: bold;
}

.price-amount {
  font-size: 48rpx;
  color: #ff6b6b;
  font-weight: bold;
  margin-left: 4rpx;
}

.coupon-condition {
  font-size: 24rpx;
  color: #999;
  text-align: center;
}

.coupon-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 30rpx;
}

.coupon-info {
  flex: 1;
}

.coupon-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 12rpx;
}

.coupon-desc {
  font-size: 26rpx;
  color: #666;
  margin-bottom: 12rpx;
  line-height: 1.4;
}

.coupon-scope {
  font-size: 24rpx;
  color: #999;
  margin-bottom: 8rpx;
}

.coupon-time {
  font-size: 24rpx;
  color: #999;
}

.coupon-action {
  margin-top: 20rpx;
  display: flex;
  justify-content: flex-end;
}

.action-btn {
  padding: 16rpx 40rpx;
  border-radius: 50rpx;
  font-size: 28rpx;
  border: none;
  font-weight: bold;
}

.receive-btn {
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
  color: #fff;
}.receive-btn:disabled {
  opacity: 0.6;
}

.status-tag {
  padding: 12rpx 24rpx;
  border-radius: 20rpx;
  font-size: 24rpx;
  font-weight: bold;
}

.status-unused {
  background: #e8f5e8;
  color: #52c41a;
}

.status-used {
  background: #f0f0f0;
  color: #999;
}

.status-expired {
  background: #fff2f0;
  color: #ff4d4f;
}

.status-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20rpx;
}

.status-text {
  color: #fff;
  font-size: 36rpx;
  font-weight: bold;
  text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.3);
}

/* 不同状态下的样式调整 */
.coupon-used .coupon-main,
.coupon-expired .coupon-main {
  background: #f5f5f5;
}

.coupon-used .price-symbol,
.coupon-used .price-amount,
.coupon-expired .price-symbol,
.coupon-expired .price-amount {
  color: #ccc;
}

.coupon-used .coupon-title,
.coupon-expired .coupon-title {
  color: #999;
}

.coupon-unused {
  background: linear-gradient(135deg, #52c41a, #73d13d);
  box-shadow: 0 8rpx 24rpx rgba(82, 196, 26, 0.3);
}

/* 响应式设计 */
@media (max-width: 750rpx) {
  .coupon-left {
    flex: 0 0 160rpx;
    padding-right: 20rpx;
  }
  
  .price-amount {
    font-size: 36rpx;
  }
  
  .coupon-title {
    font-size: 28rpx;
  }
  
  .coupon-desc {
    font-size: 24rpx;
  }
}
</style>