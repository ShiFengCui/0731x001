<template>
  <page-skeleton 
    title="优惠券中心" 
    :show-header="true"
    :show-back="true"
    @back="onBack"
  >
    <view class="lifashop-coupon-list">
      <!-- 券码兑换 -->
      <view class="exchange-section">
        <custom-card class="exchange-card">
          <view class="exchange-content">
            <view class="exchange-title">券码兑换</view>
            <view class="exchange-input-area">
              <input 
                class="exchange-input" 
                placeholder="请输入兑换码" 
                v-model="exchangeCode"
                maxlength="20"
              />
              <button 
                class="exchange-btn" 
                @click="exchangeCoupon"
                :disabled="!exchangeCode.trim()"
              >
                兑换
              </button>
            </view>
          </view>
        </custom-card>
      </view>
      
      <!-- 优惠券分类 -->
      <view class="category-section">
        <list-group
          :items="categoryList"
          type="flush"
          :selectable="true"
          @selection-change="onCategoryChange"
        />
      </view>
      
      <!-- 新客券包 -->
      <view class="newbie-section" v-if="showNewbieCoupons">
        <view class="section-title">新客专享券包</view>
        <view class="coupon-grid">
          <coupon-card 
            v-for="coupon in newbieCoupons" 
            :key="coupon.id"
            :coupon-data="coupon"
            @receive="onReceiveCoupon"
          />
        </view>
      </view>
      
      <!-- 优惠券列表 -->
      <view class="coupons-section">
        <view class="section-title">{{ selectedCategoryName }}</view>
        <view class="coupon-list">
          <coupon-card 
            v-for="coupon in filteredCoupons" 
            :key="coupon.id"
            :coupon-data="coupon"
            @receive="onReceiveCoupon"
            @use="onUseCoupon"
          />
        </view>
        
        <!-- 空状态 -->
        <view class="empty-state" v-if="filteredCoupons.length === 0">
          <view class="empty-icon">🎫</view>
          <view class="empty-text">暂无优惠券</view>
        </view>
      </view>
      
      <!-- 节日活动券 -->
      <view class="festival-section" v-if="festivalCoupons.length > 0">
        <activity-component
          :notice-list="[]"
          :banner-list="festivalBanners"
          :quick-entry-list="[]"
          @bannerClick="onFestivalBannerClick"
        />
        <view class="section-title">节日特惠券</view>
        <view class="coupon-grid">
          <coupon-card 
            v-for="coupon in festivalCoupons" 
            :key="coupon.id"
            :coupon-data="coupon"
            @receive="onReceiveCoupon"
          />
        </view>
      </view>
    </view>
  </page-skeleton>
</template>

<script>
import PageSkeleton from '@/components/page-skeleton/page-skeleton.vue'
import CustomCard from '@/components/custom-card/custom-card.vue'
import ListGroup from '@/components/list-group/list-group.vue'
import CouponCard from '@/components/coupon-card/coupon-card.vue'
import ActivityComponent from '@/components/activity-component/activity-component.vue'

export default {
  name: 'LifashopCouponList',
  components: {
    PageSkeleton,
    CustomCard,
    ListGroup,
    CouponCard,
    ActivityComponent
  },
  data() {
    return {
      exchangeCode: '',
      selectedCategory: 'all',
      categoryList: [
        { id: 'all', title: '全部优惠券', selected: true },
        { id: 'discount', title: '折扣券', selected: false },
        { id: 'cash', title: '代金券', selected: false },
        { id: 'service', title: '服务券', selected: false },
        { id: 'newbie', title: '新人券', selected: false }
      ],
      newbieCoupons: [
        {
          id: 1,
          title: '新客专享券',
          type: 'discount',
          value: '8',
          unit: '折',
          threshold: 100,
          description: '首次消费满100元可用',
          validDays: 30,
          status: 'available',
          category: 'newbie',
          tags: ['新客专享', '限量']
        },
        {
          id: 2,
          title: '免费洗发券',
          type: 'service',
          value: '1',
          unit: '次',
          threshold: 0,
          description: '免费洗发一次',
          validDays: 15,
          status: 'available',
          category: 'newbie',
          tags: ['新客礼品']
        }
      ],
      couponList: [
        {
          id: 3,
          title: '满减券',
          type: 'cash',
          value: '50',
          unit: '元',
          threshold: 200,
          description: '消费满200元减50元',
          validDays: 30,
          status: 'available',
          category: 'cash',
          tags: ['热门']
        },
        {
          id: 4,
          title: '9折优惠券',
          type: 'discount',
          value: '9',
          unit: '折',
          threshold: 150,
          description: '消费满150元享9折',
          validDays: 45,
          status: 'available',
          category: 'discount',
          tags: ['限时']
        },
        {
          id: 5,
          title: '护理券',
          type: 'service',
          value: '1',
          unit: '次',
          threshold: 0,
          description: '免费深度护理一次',
          validDays: 60,
          status: 'available',
          category: 'service',
          tags: ['护理专享']
        },
        {
          id: 6,
          title: '烫发优惠券',
          type: 'discount',
          value: '8.5',
          unit: '折',
          threshold: 250,
          description: '烫发服务8.5折优惠',
          validDays: 30,
          status: 'available',
          category: 'discount',
          tags: ['烫发专用']
        },
        {
          id: 7,
          title: '代金券',
          type: 'cash',
          value: '100',
          unit: '元',
          threshold: 300,
          description: '消费满300元减100元',
          validDays: 60,
          status: 'available',
          category: 'cash',
          tags: ['高额减免']
        }
      ],
      festivalCoupons: [
        {
          id: 8,
          title: '新年特惠券',
          type: 'discount',
          value: '7.5',
          unit: '折',
          threshold: 200,
          description: '新年活动7.5折优惠',
          validDays: 15,
          status: 'available',
          category: 'festival',
          tags: ['新年特惠', '限时']
        },
        {
          id: 9,
          title: '春节红包',
          type: 'cash',
          value: '88',
          unit: '元',
          threshold: 288,
          description: '春节红包，满288减88',
          validDays: 10,
          status: 'available',
          category: 'festival',
          tags: ['春节专享']
        }
      ],
      festivalBanners: [
        {
          id: 1,
          image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=400&fit=crop&auto=format',
          title: '新年优惠大放送',
          url: '/pages/lifashop-activity/festival'
        }
      ]
    }
  },
  computed: {
    selectedCategoryName() {
      const category = this.categoryList.find(cat => cat.id === this.selectedCategory)
      return category ? category.title : '全部优惠券'
    },
    showNewbieCoupons() {
      return this.selectedCategory === 'all' || this.selectedCategory === 'newbie'
    },
    filteredCoupons() {
      if (this.selectedCategory === 'all') {
        return this.couponList
      }
      return this.couponList.filter(coupon => coupon.category === this.selectedCategory)
    }
  },
  methods: {
    onBack() {
      uni.navigateBack()
    },
    onCategoryChange(selectedItems) {
      if (selectedItems.length > 0) {
        this.selectedCategory = selectedItems[0].id
      }
    },
    exchangeCoupon() {
      if (!this.exchangeCode.trim()) {
        uni.showToast({ title: '请输入兑换码', icon: 'none' })
        return
      }
      
      console.log('兑换券码:', this.exchangeCode)
      
      // 模拟兑换逻辑
      uni.showLoading({ title: '兑换中...' })
      
      setTimeout(() => {
        uni.hideLoading()
        
        // 模拟兑换成功
        if (this.exchangeCode.toLowerCase() === 'welcome') {
          uni.showToast({ title: '兑换成功', icon: 'success' })
          this.exchangeCode = ''
          
          // 添加新券到列表
          this.couponList.unshift({
            id: Date.now(),
            title: '兑换券',
            type: 'discount',
            value: '9',
            unit: '折',
            threshold: 100,
            description: '通过兑换码获得的优惠券',
            validDays: 30,
            status: 'received',
            category: 'discount',
            tags: ['兑换获得']
          })
        } else {
          uni.showToast({ title: '兑换码无效', icon: 'error' })
        }
      }, 1000)
    },
    onReceiveCoupon(coupon) {
      console.log('领取优惠券:', coupon)
      
      uni.showLoading({ title: '领取中...' })
      
      setTimeout(() => {
        uni.hideLoading()
        
        // 更新券状态
        const targetCoupon = this.findCouponById(coupon.id)
        if (targetCoupon) {
          targetCoupon.status = 'received'
          uni.showToast({ title: '领取成功', icon: 'success' })
        }
      }, 800)
    },
    onUseCoupon(coupon) {
      console.log('使用优惠券:', coupon)
      
      uni.showModal({
        title: '使用优惠券',
        content: '确定要使用这张优惠券吗？使用后将跳转到预约页面。',
        success: (res) => {
          if (res.confirm) {
            uni.navigateTo({
              url: `/pages/lifashop-appointment/index?couponId=${coupon.id}`
            })
          }
        }
      })
    },
    onFestivalBannerClick(banner) {
      console.log('点击节日banner:', banner)
      if (banner.url) {
        uni.navigateTo({ url: banner.url })
      }
    },
    findCouponById(id) {
      // 在所有券列表中查找
      let found = this.newbieCoupons.find(c => c.id === id)
      if (found) return found
      
      found = this.couponList.find(c => c.id === id)
      if (found) return found
      
      found = this.festivalCoupons.find(c => c.id === id)
      return found
    }
  }
}
</script>

<style lang="scss" scoped>
.lifashop-coupon-list {
  padding-bottom: 20rpx;
}

.exchange-section {
  margin: 24rpx;
  margin-bottom: 32rpx;
}

.exchange-card {
  padding: 32rpx;
  border-radius: 16rpx;
  background: linear-gradient(135deg, #ff6b35, #f7931e);
  color: white;
}

.exchange-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 24rpx;
}

.exchange-input-area {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.exchange-input {
  flex: 1;
  padding: 16rpx 20rpx;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8rpx;
  color: #333;
  font-size: 28rpx;
}

.exchange-btn {
  padding: 16rpx 32rpx;
  background-color: white;
  color: #ff6b35;
  border-radius: 8rpx;
  font-size: 28rpx;
  font-weight: bold;
  border: none;
  
  &:disabled {
    opacity: 0.5;
  }
}

.category-section {
  margin: 0 24rpx 32rpx;
}

.newbie-section,
.coupons-section,
.festival-section {
  margin: 0 24rpx 32rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 24rpx;
  padding-left: 16rpx;
  border-left: 6rpx solid #ff6b35;
}

.coupon-grid,
.coupon-list {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.empty-state {
  text-align: center;
  padding: 80rpx 0;
}

.empty-icon {
  font-size: 120rpx;
  margin-bottom: 24rpx;
}

.empty-text {
  font-size: 28rpx;
  color: #999;
}
</style>