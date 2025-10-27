<template>
  <page-skeleton 
    title="个人中心" 
    :show-header="true"
    layout="normal"
  >
    <view class="lifashop-profile">
      <!-- 用户信息卡片 -->
      <view class="user-info-section">
        <custom-card class="user-card">
          <view class="user-info">
            <image class="avatar" :src="userInfo.avatar" mode="aspectFill" />
            <view class="user-details">
              <view class="username">{{ userInfo.name }}</view>
              <view class="member-level">{{ userInfo.memberLevel }}</view>
              <view class="phone">{{ userInfo.phone }}</view>
            </view>
            <view class="edit-btn" @click="editProfile">
              <uni-icons type="gear" size="20" color="#666"></uni-icons>
            </view>
          </view>
        </custom-card>
      </view>
      
      <!-- 快捷功能 -->
      <view class="quick-actions-section">
        <business-matrix
          :business-list="quickActions"
          title="快捷功能"
          layout="grid"
          :columns="4"
          @item-click="onQuickActionClick"
        />
      </view>
      
      <!-- 我的服务 -->
      <view class="services-section">
        <list-group
          title="我的服务"
          :items="myServices"
          type="default"
          @item-click="onServiceClick"
          @action-click="onServiceAction"
        />
      </view>
      
      <!-- 收藏管理 -->
      <view class="favorites-section">
        <custom-card title="我的收藏" class="section-card">
          <favorite-list
            :favorite-list="favoriteList"
            layout="grid"
            @removeFavorite="onRemoveFavorite"
            @viewProduct="onViewProduct"
            @itemClick="onFavoriteClick"
          />
        </custom-card>
      </view>
      
      <!-- 客服服务 -->
      <view class="customer-service-section">
        <customer-service
          :show-title="true"
          title="客服中心"
          :online-available="true"
          phone-number="400-888-6666"
          email-address="service@lifashop.com"
          @online-service="onOnlineService"
          @phone-call="onPhoneCall"
          @email-contact="onEmailContact"
        />
      </view>
      
      <!-- 设置选项 -->
      <view class="settings-section">
        <list-group
          title="设置"
          :items="settingsOptions"
          type="default"
          @item-click="onSettingClick"
        />
      </view>
    </view>
  </page-skeleton>
</template>

<script>
import PageSkeleton from '@/components/page-skeleton/page-skeleton.vue'
import CustomCard from '@/components/custom-card/custom-card.vue'
import BusinessMatrix from '@/components/business-matrix/business-matrix.vue'
import ListGroup from '@/components/list-group/list-group.vue'
import FavoriteList from '@/components/favorite-list/favorite-list.vue'
import CustomerService from '@/components/customer-service/customer-service.vue'

export default {
  name: 'LifashopProfile',
  components: {
    PageSkeleton,
    CustomCard,
    BusinessMatrix,
    ListGroup,
    FavoriteList,
    CustomerService
  },
  data() {
    return {
      userInfo: {
        name: '张小美',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b142?w=200&h=200&fit=crop&auto=format',
        memberLevel: '黄金会员',
        phone: '138****8888',
        points: 2580,
        balance: 380
      },
      quickActions: [
        {
          id: 1,
          title: '我的预约',
          icon: 'https://img.icons8.com/color/96/appointment-scheduling.png',
          url: '/pages/lifashop-appointment/my-list'
        },
        {
          id: 2,
          title: '消费记录',
          icon: 'https://img.icons8.com/color/96/bill.png',
          url: '/pages/lifashop-order/list'
        },
        {
          id: 3,
          title: '优惠券',
          icon: 'https://img.icons8.com/color/96/discount.png',
          url: '/pages/lifashop-coupon/my-list',
          badge: '3'
        },
        {
          id: 4,
          title: '储值卡',
          icon: 'https://img.icons8.com/color/96/membership-card.png',
          url: '/pages/lifashop-card/balance'
        }
      ],
      myServices: [
        {
          id: 1,
          title: '我的预约',
          description: '查看预约记录和状态',
          icon: '📅',
          action: {
            text: '查看',
            type: 'view'
          },
          url: '/pages/lifashop-appointment/my-list'
        },
        {
          id: 2,
          title: '消费记录',
          description: '历史消费明细',
          icon: '📋',
          action: {
            text: '查看',
            type: 'view'
          },
          url: '/pages/lifashop-order/list'
        },
        {
          id: 3,
          title: '我的评价',
          description: '查看和管理评价',
          icon: '⭐',
          action: {
            text: '查看',
            type: 'view'
          },
          url: '/pages/lifashop-rating/my-list'
        },
        {
          id: 4,
          title: '地址管理',
          description: '管理收货地址',
          icon: '📍',
          action: {
            text: '管理',
            type: 'manage'
          },
          url: '/pages/lifashop-address/list'
        }
      ],
      favoriteList: [
        {
          id: 1,
          name: 'Tony老师',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&auto=format',
          price: '298',
          category: '发型师',
          rating: 4.9,
          description: '10年经验，擅长时尚造型'
        },
        {
          id: 2,
          name: '时尚烫发',
          image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop&auto=format',
          price: '298',
          category: '服务',
          rating: 4.8,
          description: '韩式烫发+护理'
        },
        {
          id: 3,
          name: 'Kevin',
          image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&auto=format',
          price: '198',
          category: '发型师',
          rating: 4.8,
          description: '烫染专家，日韩风格'
        }
      ],
      settingsOptions: [
        {
          id: 1,
          title: '账户管理',
          description: '个人信息、密码、安全设置',
          icon: '👤',
          url: '/pages/lifashop-account/manage'
        },
        {
          id: 2,
          title: '消息设置',
          description: '通知提醒、推送设置',
          icon: '🔔',
          url: '/pages/lifashop-settings/notification'
        },
        {
          id: 3,
          title: '隐私设置',
          description: '隐私保护、数据管理',
          icon: '🔒',
          url: '/pages/lifashop-settings/privacy'
        },
        {
          id: 4,
          title: '关于我们',
          description: '版本信息、服务条款',
          icon: 'ℹ️',
          url: '/pages/lifashop-about/index'
        },
        {
          id: 5,
          title: '退出登录',
          description: '',
          icon: '🚪',
          action: 'logout'
        }
      ]
    }
  },
  methods: {
    editProfile() {
      uni.navigateTo({
        url: '/pages/lifashop-account/manage'
      })
    },
    onQuickActionClick(item) {
      console.log('快捷功能点击:', item)
      if (item.url) {
        uni.navigateTo({ url: item.url })
      }
    },
    onServiceClick(item) {
      console.log('服务点击:', item)
      if (item.url) {
        uni.navigateTo({ url: item.url })
      }
    },
    onServiceAction(action, item) {
      console.log('服务操作:', action, item)
      if (item.url) {
        uni.navigateTo({ url: item.url })
      }
    },
    onRemoveFavorite(item) {
      console.log('取消收藏:', item)
      const index = this.favoriteList.findIndex(fav => fav.id === item.id)
      if (index !== -1) {
        this.favoriteList.splice(index, 1)
        uni.showToast({ title: '已取消收藏', icon: 'success' })
      }
    },
    onViewProduct(item) {
      console.log('查看收藏商品:', item)
      if (item.category === '发型师') {
        uni.navigateTo({ url: `/pages/lifashop-stylist/detail?id=${item.id}` })
      } else {
        uni.navigateTo({ url: `/pages/lifashop-service/detail?id=${item.id}` })
      }
    },
    onFavoriteClick(item) {
      this.onViewProduct(item)
    },
    onOnlineService() {
      console.log('在线客服')
      uni.showToast({ title: '正在连接客服...', icon: 'loading' })
    },
    onPhoneCall() {
      console.log('电话客服')
      uni.makePhoneCall({
        phoneNumber: '400-888-6666'
      })
    },
    onEmailContact() {
      console.log('邮件联系')
      uni.showToast({ title: '请发送邮件至 service@lifashop.com', icon: 'none', duration: 3000 })
    },
    onSettingClick(item) {
      console.log('设置点击:', item)
      if (item.action === 'logout') {
        this.logout()
      } else if (item.url) {
        uni.navigateTo({ url: item.url })
      }
    },
    logout() {
      uni.showModal({
        title: '确认退出',
        content: '确定要退出登录吗？',
        success: (res) => {
          if (res.confirm) {
            // 清除用户信息
            uni.removeStorageSync('userInfo')
            uni.removeStorageSync('token')
            
            uni.showToast({ title: '已退出登录', icon: 'success' })
            
            // 跳转到登录页面
            setTimeout(() => {
              uni.reLaunch({ url: '/pages/login/index' })
            }, 1500)
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.lifashop-profile {
  padding-bottom: 20rpx;
}

.user-info-section {
  margin: 24rpx;
  margin-bottom: 32rpx;
}

.user-card {
  padding: 32rpx;
  border-radius: 16rpx;
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 60rpx;
  margin-right: 24rpx;
}

.user-details {
  flex: 1;
}

.username {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 8rpx;
}

.member-level {
  font-size: 28rpx;
  color: #ff6b35;
  margin-bottom: 8rpx;
}

.phone {
  font-size: 24rpx;
  color: #999;
}

.edit-btn {
  padding: 16rpx;
  border-radius: 50%;
  background-color: #f5f5f5;
}

.quick-actions-section {
  margin: 0 24rpx 32rpx;
}

.services-section {
  margin: 0 24rpx 32rpx;
}

.favorites-section {
  margin: 0 24rpx 32rpx;
}

.section-card {
  padding: 32rpx;
  border-radius: 16rpx;
}

.customer-service-section {
  margin: 0 24rpx 32rpx;
}

.settings-section {
  margin: 0 24rpx;
}
</style>