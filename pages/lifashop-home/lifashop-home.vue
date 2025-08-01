<template>
  <page-skeleton 
    title="理发店" 
    :show-header="true"
    layout="normal"
  >
    <view class="lifashop-home">
      <!-- 顶部轮播横幅 -->
      <banner-top
        :banner-list="bannerList"
        :show-quick-entry="false"
        :show-notice="true"
        :notice-list="noticeList"
        @bannerClick="onBannerClick"
        @noticeClick="onNoticeClick"
      />
      
      <!-- 快捷服务入口 -->
      <view class="section">
        <business-matrix
          :business-list="serviceEntryList"
          title="快捷服务"
          layout="grid"
          :columns="4"
          @item-click="onServiceEntryClick"
        />
      </view>
      
      <!-- 店铺公告展示 -->
      <view class="section">
        <activity-component
          :notice-list="storeNoticeList"
          :banner-list="[]"
          :quick-entry-list="[]"
          @noticeClick="onStoreNoticeClick"
        />
      </view>
      
      <!-- 发型师推荐 -->
      <view class="section">
        <product-list
          :product-list="stylistList"
          title="明星发型师"
          layout="grid"
          @product-click="onStylistClick"
          @add-to-cart="onBookStylist"
        />
      </view>
      
      <!-- 热门服务 -->
      <view class="section">
        <product-list
          :product-list="hotServicesList"
          title="热门服务"
          layout="list"
          @product-click="onServiceClick"
          @add-to-cart="onBookService"
        />
      </view>
    </view>
  </page-skeleton>
</template>

<script>
import PageSkeleton from '@/components/page-skeleton/page-skeleton.vue'
import BannerTop from '@/components/banner-top/banner-top.vue'
import BusinessMatrix from '@/components/business-matrix/business-matrix.vue'
import ActivityComponent from '@/components/activity-component/activity-component.vue'
import ProductList from '@/components/product-component/product-list.vue'

export default {
  name: 'LifashopHome',
  components: {
    PageSkeleton,
    BannerTop,
    BusinessMatrix,
    ActivityComponent,
    ProductList
  },
  data() {
    return {
      // 轮播图数据
      bannerList: [
        {
          id: 1,
          image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=400&fit=crop&auto=format',
          title: '新年新造型',
          url: '/pages/lifashop-service/detail?id=1'
        },
        {
          id: 2,
          image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&h=400&fit=crop&auto=format',
          title: '明星发型师',
          url: '/pages/lifashop-stylist/list'
        },
        {
          id: 3,
          image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=400&fit=crop&auto=format',
          title: '会员特惠',
          url: '/pages/lifashop-member/center'
        }
      ],
      // 顶部公告
      noticeList: [
        { id: 1, content: '新年优惠活动进行中，充值满500送100', type: 'promotion' },
        { id: 2, content: '预约发型师Tony，享受8折优惠', type: 'stylist' },
        { id: 3, content: '春节期间营业时间调整，详情见店内公告', type: 'notice' }
      ],
      // 快捷服务入口
      serviceEntryList: [
        {
          id: 1,
          title: '在线预约',
          icon: 'https://img.icons8.com/fluency/96/calendar.png',
          url: '/pages/lifashop-appointment/index',
          badge: 'hot'
        },
        {
          id: 2,
          title: '发型师',
          icon: 'https://img.icons8.com/fluency/96/user.png',
          url: '/pages/lifashop-stylist/list'
        },
        {
          id: 3,
          title: '会员中心',
          icon: 'https://img.icons8.com/fluency/96/crown.png',
          url: '/pages/lifashop-member/center'
        },
        {
          id: 4,
          title: '优惠券',
          icon: 'https://img.icons8.com/fluency/96/ticket.png',
          url: '/pages/lifashop-coupon/list',
          badge: 'new'
        },
        {
          id: 5,
          title: '服务项目',
          icon: 'https://img.icons8.com/fluency/96/scissors.png',
          url: '/pages/lifashop-service/list'
        },
        {
          id: 6,
          title: '门店信息',
          icon: 'https://img.icons8.com/fluency/96/shop.png',
          url: '/pages/lifashop-store/info'
        },
        {
          id: 7,
          title: '客服',
          icon: 'https://img.icons8.com/fluency/96/customer-support.png',
          url: '/pages/lifashop-customer/service'
        },
        {
          id: 8,
          title: '评价',
          icon: 'https://img.icons8.com/fluency/96/star.png',
          url: '/pages/lifashop-rating/list'
        }
      ],
      // 店铺公告
      storeNoticeList: [
        { id: 1, content: '本店推出新春造型套餐，洗剪吹+护理仅需128元', type: 'promotion' },
        { id: 2, content: '春节期间营业时间：初一至初三 10:00-18:00', type: 'schedule' }
      ],
      // 发型师列表
      stylistList: [
        {
          id: 1,
          name: 'Tony老师',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&auto=format',
          price: '298',
          originalPrice: '398',
          description: '10年经验，擅长时尚造型',
          rating: 4.9,
          tags: ['明星发型师', '人气推荐']
        },
        {
          id: 2,
          name: 'Kevin',
          image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&auto=format',
          price: '198',
          originalPrice: '268',
          description: '烫染专家，日韩风格',
          rating: 4.8,
          tags: ['烫染专家']
        },
        {
          id: 3,
          name: 'Amy',
          image: 'https://images.unsplash.com/photo-1494790108755-2616b612b142?w=300&h=300&fit=crop&auto=format',
          price: '168',
          originalPrice: '218',
          description: '女士造型专家',
          rating: 4.7,
          tags: ['女士专家']
        },
        {
          id: 4,
          name: 'David',
          image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&auto=format',
          price: '228',
          originalPrice: '298',
          description: '男士造型，商务风格',
          rating: 4.8,
          tags: ['男士专家']
        }
      ],
      // 热门服务
      hotServicesList: [
        {
          id: 1,
          name: '精致洗剪吹',
          image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=300&fit=crop&auto=format',
          price: '88',
          originalPrice: '128',
          description: '专业洗发+精剪+造型',
          duration: '60分钟',
          tags: ['热门', '基础服务']
        },
        {
          id: 2,
          name: '时尚烫发',
          image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop&auto=format',
          price: '298',
          originalPrice: '398',
          description: '韩式烫发+护理',
          duration: '120分钟',
          tags: ['人气推荐']
        },
        {
          id: 3,
          name: '潮流染发',
          image: 'https://images.unsplash.com/photo-1562322140-8198f8bbc8d9?w=400&h=300&fit=crop&auto=format',
          price: '258',
          originalPrice: '328',
          description: '进口染膏+专业护色',
          duration: '90分钟',
          tags: ['新品']
        }
      ]
    }
  },
  methods: {
    onBannerClick(item) {
      console.log('Banner clicked:', item)
      if (item.url) {
        uni.navigateTo({ url: item.url })
      }
    },
    onNoticeClick(item) {
      console.log('Notice clicked:', item)
    },
    onServiceEntryClick(item) {
      console.log('Service entry clicked:', item)
      if (item.url) {
        uni.navigateTo({ url: item.url })
      }
    },
    onStoreNoticeClick(item) {
      console.log('Store notice clicked:', item)
    },
    onStylistClick(item) {
      console.log('Stylist clicked:', item)
      uni.navigateTo({ 
        url: `/pages/lifashop-stylist/detail?id=${item.id}` 
      })
    },
    onBookStylist(item) {
      console.log('Book stylist:', item)
      uni.navigateTo({ 
        url: `/pages/lifashop-appointment/index?stylistId=${item.id}` 
      })
    },
    onServiceClick(item) {
      console.log('Service clicked:', item)
      uni.navigateTo({ 
        url: `/pages/lifashop-service/detail?id=${item.id}` 
      })
    },
    onBookService(item) {
      console.log('Book service:', item)
      uni.navigateTo({ 
        url: `/pages/lifashop-appointment/index?serviceId=${item.id}` 
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.lifashop-home {
  padding-bottom: 20rpx;
}

.section {
  margin-bottom: 32rpx;
  background-color: #fff;
  border-radius: 16rpx;
  margin: 0 24rpx 32rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}
</style>