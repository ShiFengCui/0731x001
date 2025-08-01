<template>
  <view class="customer-service-container">
    <!-- 客服标题 -->
    <view class="service-header" v-if="showTitle">
      <text class="header-title">{{ title }}</text>
      <text class="header-subtitle" v-if="subtitle">{{ subtitle }}</text>
    </view>
    
    <!-- 快速联系区域 -->
    <view class="quick-contact">
      <view class="contact-title">
        <text class="contact-text">快速联系</text>
      </view>
      
      <view class="contact-methods">
        <!-- 在线客服 -->
        <view 
          class="contact-item" 
          @click="handleOnlineService"
          :class="{ disabled: !onlineAvailable }"
        >
          <view class="contact-icon">
            <uni-icons type="chat" size="28" :color="onlineAvailable ? '#007aff' : '#c0c0c0'"></uni-icons>
          </view>
          <view class="contact-info">
            <text class="contact-name">在线客服</text>
            <text class="contact-desc">{{ onlineStatus }}</text>
          </view>
          <view class="contact-status">
            <view 
              class="status-dot" 
              :class="{ online: onlineAvailable }"
            ></view>
          </view>
        </view>
        
        <!-- 电话客服 -->
        <view class="contact-item" @click="handlePhoneCall">
          <view class="contact-icon">
            <uni-icons type="phone" size="28" color="#52c41a"></uni-icons>
          </view>
          <view class="contact-info">
            <text class="contact-name">电话客服</text>
            <text class="contact-desc">{{ phoneNumber }}</text>
          </view>
          <view class="contact-time">
            <text class="time-text">{{ phoneServiceTime }}</text>
          </view>
        </view>
        
        <!-- 邮件联系 -->
        <view class="contact-item" @click="handleEmailContact">
          <view class="contact-icon">
            <uni-icons type="email" size="28" color="#fa8c16"></uni-icons>
          </view>
          <view class="contact-info">
            <text class="contact-name">邮件联系</text>
            <text class="contact-desc">{{ emailAddress }}</text>
          </view>
          <view class="contact-arrow">
            <uni-icons type="right" size="16" color="#c0c0c0"></uni-icons>
          </view>
        </view>
        
        <!-- 微信客服 -->
        <view class="contact-item" @click="handleWechatService" v-if="showWechat">
          <view class="contact-icon">
            <uni-icons type="weixin" size="28" color="#52c41a"></uni-icons>
          </view>
          <view class="contact-info">
            <text class="contact-name">微信客服</text>
            <text class="contact-desc">{{ wechatId }}</text>
          </view>
          <view class="contact-arrow">
            <uni-icons type="right" size="16" color="#c0c0c0"></uni-icons>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 帮助中心 -->
    <view class="help-center" v-if="showHelpCenter">
      <view class="help-title">
        <text class="help-text">帮助中心</text>
        <text class="help-more" @click="handleMoreHelp">查看更多</text>
      </view>
      
      <view class="help-list">
        <view 
          class="help-item" 
          v-for="(item, index) in helpList" 
          :key="index"
          @click="handleHelpClick(item)"
        >
          <view class="help-icon">
            <uni-icons :type="item.icon" size="20" color="#666"></uni-icons>
          </view>
          <text class="help-name">{{ item.title }}</text>
          <view class="help-arrow">
            <uni-icons type="right" size="14" color="#c0c0c0"></uni-icons>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 服务时间说明 -->
    <view class="service-time" v-if="showServiceTime">
      <view class="time-title">
        <uni-icons type="info" size="16" color="#999"></uni-icons>
        <text class="time-text">服务时间</text>
      </view>
      <view class="time-content">
        <text class="time-desc">{{ serviceTimeDesc }}</text>
      </view>
    </view>
    
    <!-- 浮动客服按钮 -->
    <view 
      class="float-service-btn" 
      v-if="showFloatBtn"
      @click="handleFloatServiceClick"
      :style="floatBtnStyle"
    >
      <uni-icons type="chat" size="24" color="#fff"></uni-icons>
      <view class="float-badge" v-if="unreadCount > 0">
        <text class="badge-text">{{ unreadCount > 99 ? '99+' : unreadCount }}</text>
      </view>
    </view>
  </view>
</template>

<script>export default {
  name: 'CustomerService',
  props: {
    // 是否显示标题
    showTitle: {
      type: Boolean,
      default: true
    },
    // 主标题
    title: {
      type: String,
      default: '客服中心'
    },
    // 副标题
    subtitle: {
      type: String,
      default: '我们为您提供专业的服务支持'
    },
    // 在线客服是否可用
    onlineAvailable: {
      type: Boolean,
      default: true
    },
    // 在线客服状态文本
    onlineStatus: {
      type: String,
      default: '在线，立即沟通'
    },
    // 客服电话
    phoneNumber: {
      type: String,
      default: '400-123-4567'
    },
    // 电话服务时间
    phoneServiceTime: {
      type: String,
      default: '9:00-18:00'
    },
    // 邮箱地址
    emailAddress: {
      type: String,
      default: 'service@example.com'
    },
    // 是否显示微信客服
    showWechat: {
      type: Boolean,
      default: true
    },
    // 微信号
    wechatId: {
      type: String,
      default: 'service_wechat'
    },
    // 是否显示帮助中心
    showHelpCenter: {
      type: Boolean,
      default: true
    },
    // 帮助列表
    helpList: {
      type: Array,
      default: () => [
        { title: '常见问题', icon: 'help', url: '/pages/help/faq' },
        { title: '使用指南', icon: 'book', url: '/pages/help/guide' },
        { title: '意见反馈', icon: 'compose', url: '/pages/help/feedback' },
        { title: '联系我们', icon: 'contact', url: '/pages/help/contact' }
      ]
    },
    // 是否显示服务时间
    showServiceTime: {
      type: Boolean,
      default: true
    },
    // 服务时间描述
    serviceTimeDesc: {
      type: String,
      default: '客服工作时间：周一至周日 9:00-18:00，法定节假日可能会有调整'
    },
    // 是否显示浮动按钮
    showFloatBtn: {
      type: Boolean,
      default: false
    },
    // 浮动按钮位置
    floatPosition: {
      type: Object,
      default: () => ({
        right: '30rpx',
        bottom: '100rpx'
      })
    },
    // 未读消息数
    unreadCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // 动态数据
    }
  },
  computed: {
    // 浮动按钮样式
    floatBtnStyle() {
      return {
        right: this.floatPosition.right,
        bottom: this.floatPosition.bottom
      }
    }
  },
  methods: {
    // 在线客服点击
    handleOnlineService() {
      if (!this.onlineAvailable) {
        uni.showToast({
          title: '客服暂时离线',
          icon: 'none'
        })
        return
      }
      
      this.$emit('onlineService', {
        type: 'online',
        available: this.onlineAvailable
      })
      
      // 默认行为：跳转到聊天页面
      uni.navigateTo({
        url: '/pages/chat/index'
      })
    },
    
    // 电话客服点击
    handlePhoneCall() {
      uni.showModal({
        title: '拨打客服电话',
        content: `是否拨打客服热线：${this.phoneNumber}`,
        success: (res) => {
          if (res.confirm) {
            this.$emit('phoneCall', {
              type: 'phone',
              number: this.phoneNumber
            })
            
            // 拨打电话
            uni.makePhoneCall({
              phoneNumber: this.phoneNumber,
              fail: (err) => {
                console.error('拨打电话失败:', err)
                uni.showToast({
                  title: '拨打失败',
                  icon: 'error'
                })
              }
            })
          }
        }
      })
    },
    
    // 邮件联系点击
    handleEmailContact() {
      this.$emit('emailContact', {
        type: 'email',
        address: this.emailAddress
      })
      
      // 复制邮箱地址到剪贴板
      uni.setClipboardData({
        data: this.emailAddress,
        success: () => {
          uni.showToast({
            title: '邮箱地址已复制',
            icon: 'success'
          })
        }
      })
    },
    
    // 微信客服点击
    handleWechatService() {
      this.$emit('wechatService', {
        type: 'wechat',
        wechatId: this.wechatId
      })
      
      // 复制微信号
      uni.setClipboardData({
        data: this.wechatId,
        success: () => {
          uni.showToast({
            title: '微信号已复制',
            icon: 'success'
          })
        }
      })
    },
    
    // 帮助项点击
    handleHelpClick(item) {
      this.$emit('helpClick', item)
      
      // 默认跳转行为
      if (item.url) {
        uni.navigateTo({
          url: item.url,
          fail: () => {
            uni.showToast({
              title: '页面不存在',
              icon: 'error'
            })
          }
        })
      }
    },
    
    // 查看更多帮助
    handleMoreHelp() {
      this.$emit('moreHelp')
      
      // 默认跳转到帮助中心
      uni.navigateTo({
        url: '/pages/help/index',
        fail: () => {
          uni.showToast({
            title: '帮助中心页面不存在',
            icon: 'error'
          })
        }
      })
    },
    
    // 浮动按钮点击
    handleFloatServiceClick() {
      this.$emit('floatServiceClick')
      
      // 默认行为：打开在线客服
      this.handleOnlineService()
    }
  }
}</script>

<style scoped>
.customer-service-container {
  background: #f8f9fa;
  padding: 20rpx;
}

/* 服务标题 */
.service-header {
  text-align: center;
  padding: 40rpx 20rpx;
  background: #fff;
  border-radius: 16rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
}

.header-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 12rpx;
}

.header-subtitle {
  font-size: 26rpx;
  color: #666;
  line-height: 1.4;
}

/* 快速联系区域 */
.quick-contact {
  background: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
}

.contact-title {
  margin-bottom: 30rpx;
}

.contact-text {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.contact-methods {
  /* 联系方式列表 */
}

.contact-item {
  display: flex;
  align-items: center;
  padding: 24rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
  position: relative;
}

.contact-item:last-child {
  border-bottom: none;
}

.contact-item.disabled {
  opacity: 0.5;
}

.contact-icon {
  width: 56rpx;
  height: 56rpx;
  border-radius: 50%;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20rpx;
}

.contact-info {
  flex: 1;
}

.contact-name {
  font-size: 30rpx;
  font-weight: 500;
  color: #333;
  display: block;
  margin-bottom: 8rpx;
}

.contact-desc {
  font-size: 24rpx;
  color: #666;
  line-height: 1.4;
}

.contact-status {
  display: flex;
  align-items: center;
}

.status-dot {
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
  background: #d9d9d9;
}

.status-dot.online {
  background: #52c41a;
}

.contact-time {
  display: flex;
  align-items: center;
}

.time-text {
  font-size: 24rpx;
  color: #999;
}

.contact-arrow {
  display: flex;
  align-items: center;
}

/* 帮助中心 */
.help-center {
  background: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
}

.help-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30rpx;
}

.help-text {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.help-more {
  font-size: 26rpx;
  color: #007aff;
}

.help-list {
  /* 帮助列表 */
}

.help-item {
  display: flex;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
}

.help-item:last-child {
  border-bottom: none;
}

.help-icon {
  width: 40rpx;
  height: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20rpx;
}

.help-name {
  flex: 1;
  font-size: 28rpx;
  color: #333;
}

.help-arrow {
  display: flex;
  align-items: center;
}

/* 服务时间 */
.service-time {
  background: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
}

.time-title {
  display: flex;
  align-items: center;
  margin-bottom: 16rpx;
}

.time-title .time-text {
  font-size: 28rpx;
  font-weight: 500;
  color: #333;
  margin-left: 8rpx;
}

.time-content {
  /* 时间内容 */
}

.time-desc {
  font-size: 26rpx;
  color: #666;
  line-height: 1.5;
}

/* 浮动客服按钮 */
.float-service-btn {
  position: fixed;
  width: 100rpx;
  height: 100rpx;
  background: #007aff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 20rpx rgba(0, 122, 255, 0.3);
  z-index: 999;
}

.float-badge {
  position: absolute;
  top: -6rpx;
  right: -6rpx;
  min-width: 32rpx;
  height: 32rpx;
  background: #ff4d4f;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8rpx;
}

.badge-text {
  font-size: 20rpx;
  color: #fff;
  font-weight: bold;
}

/* 响应式设计 */
@media (max-width: 750rpx) {
  .contact-name {
    font-size: 28rpx;
  }
  
  .contact-desc {
    font-size: 22rpx;
  }
  
  .help-name {
    font-size: 26rpx;
  }
}

/* 深色模式支持 */
@media (prefers-color-scheme: dark) {
  .customer-service-container {
    background: #1a1a1a;
  }
  
  .service-header,
  .quick-contact,
  .help-center,
  .service-time {
    background: #2d2d2d;
    box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.3);
  }
  
  .header-title,
  .contact-text,
  .help-text,
  .contact-name,
  .help-name {
    color: #fff;
  }
  
  .header-subtitle,
  .contact-desc,
  .time-desc {
    color: #ccc;
  }
  
  .contact-item {
    border-bottom-color: #404040;
  }
  
  .help-item {
    border-bottom-color: #404040;
  }
  
  .contact-icon {
    background: #404040;
  }
}
</style>