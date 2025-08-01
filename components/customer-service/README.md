# CustomerService 客服组件

## 简介

CustomerService 是一个功能完整的客服组件，提供多种客服联系方式和帮助中心功能。支持在线客服、电话客服、邮件联系、微信客服等多种沟通渠道，并提供帮助中心快速入口。

## 功能特性

- 📞 **多种联系方式**：在线客服、电话、邮件、微信等
- 🔄 **实时状态显示**：显示在线客服的实时状态
- 📋 **帮助中心**：集成常见问题和帮助文档入口
- 🎨 **灵活样式配置**：支持多种显示模式和自定义样式
- 📱 **响应式设计**：适配不同屏幕尺寸
- 🌙 **深色模式支持**：自动适配系统深色模式
- 🔔 **消息提醒**：支持未读消息数显示
- 🎯 **浮动按钮**：可选的浮动客服按钮

## 使用方法

### 基础用法

```vue
<template>
  <customer-service />
</template>

<script>
import CustomerService from '@/components/customer-service/customer-service.vue'

export default {
  components: {
    CustomerService
  }
}
</script>
```

### 完整配置

```vue
<template>
  <customer-service
    :show-title="true"
    title="客服中心"
    subtitle="我们为您提供24小时服务支持"
    :online-available="true"
    online-status="在线，立即沟通"
    phone-number="400-123-4567"
    phone-service-time="24小时服务"
    email-address="service@example.com"
    :show-wechat="true"
    wechat-id="service_wechat"
    :show-help-center="true"
    :help-list="helpList"
    :show-service-time="true"
    service-time-desc="全年无休，24小时为您服务"
    :show-float-btn="true"
    :float-position="{ right: '30rpx', bottom: '100rpx' }"
    :unread-count="5"
    @online-service="handleOnlineService"
    @phone-call="handlePhoneCall"
    @email-contact="handleEmailContact"
    @wechat-service="handleWechatService"
    @help-click="handleHelpClick"
    @more-help="handleMoreHelp"
    @float-service-click="handleFloatServiceClick"
  />
</template>
```

## Props 属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| showTitle | Boolean | true | 是否显示标题区域 |
| title | String | '客服中心' | 主标题文本 |
| subtitle | String | '我们为您提供专业的服务支持' | 副标题文本 |
| onlineAvailable | Boolean | true | 在线客服是否可用 |
| onlineStatus | String | '在线，立即沟通' | 在线客服状态文本 |
| phoneNumber | String | '400-123-4567' | 客服电话号码 |
| phoneServiceTime | String | '9:00-18:00' | 电话服务时间 |
| emailAddress | String | 'service@example.com' | 客服邮箱地址 |
| showWechat | Boolean | true | 是否显示微信客服 |
| wechatId | String | 'service_wechat' | 微信客服号 |
| showHelpCenter | Boolean | true | 是否显示帮助中心 |
| helpList | Array | 默认帮助列表 | 帮助中心项目列表 |
| showServiceTime | Boolean | true | 是否显示服务时间说明 |
| serviceTimeDesc | String | 默认服务时间说明 | 服务时间描述文本 |
| showFloatBtn | Boolean | false | 是否显示浮动客服按钮 |
| floatPosition | Object | {right: '30rpx', bottom: '100rpx'} | 浮动按钮位置 |
| unreadCount | Number | 0 | 未读消息数量 |

## Events 事件

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| online-service | {type: 'online', available: Boolean} | 点击在线客服时触发 |
| phone-call | {type: 'phone', number: String} | 点击电话客服时触发 |
| email-contact | {type: 'email', address: String} | 点击邮件联系时触发 |
| wechat-service | {type: 'wechat', wechatId: String} | 点击微信客服时触发 |
| help-click | {title: String, icon: String, url: String} | 点击帮助项时触发 |
| more-help | - | 点击查看更多帮助时触发 |
| float-service-click | - | 点击浮动客服按钮时触发 |

## 样式定制

组件支持通过 CSS 变量进行样式定制：

```css
.customer-service-container {
  --primary-color: #007aff;
  --success-color: #52c41a;
  --warning-color: #fa8c16;
  --error-color: #ff4d4f;
  --text-color: #333;
  --text-secondary: #666;
  --background-color: #fff;
  --border-color: #f0f0f0;
}
```

## 使用示例

```javascript
export default {
  data() {
    return {
      helpList: [
        { title: '常见问题', icon: 'help', url: '/pages/help/faq' },
        { title: '使用教程', icon: 'book', url: '/pages/help/tutorial' },
        { title: '联系我们', icon: 'contact', url: '/pages/help/contact' },
        { title: '意见反馈', icon: 'compose', url: '/pages/help/feedback' }
      ]
    }
  },
  methods: {
    // 在线客服点击处理
    handleOnlineService(data) {
      console.log('在线客服:', data)
      // 跳转到聊天页面或打开客服窗口
    },
    
    // 电话客服点击处理
    handlePhoneCall(data) {
      console.log('电话客服:', data)
      // 拨打电话的逻辑已内置
    },
    
    // 邮件联系点击处理
    handleEmailContact(data) {
      console.log('邮件联系:', data)
      // 邮箱复制逻辑已内置
    },
    
    // 微信客服点击处理
    handleWechatService(data) {
      console.log('微信客服:', data)
      // 微信号复制逻辑已内置
    },
    
    // 帮助项点击处理
    handleHelpClick(item) {
      console.log('帮助项点击:', item)
      // 页面跳转逻辑已内置
    },
    
    // 更多帮助点击处理
    handleMoreHelp() {
      console.log('查看更多帮助')
      // 跳转到帮助中心
    },
    
    // 浮动按钮点击处理
    handleFloatServiceClick() {
      console.log('浮动客服按钮点击')
      // 默认打开在线客服
    }
  }
}
```

## 注意事项

1. 使用电话功能需要在 `manifest.json` 中配置相应权限
2. 浮动按钮建议在需要全局客服入口的页面使用
3. 深色模式会自动跟随系统设置
4. 组件内置了错误处理，页面不存在时会显示提示
5. 所有联系方式都支持自定义点击行为

## 版本历史

- v1.0.0: 初始版本，支持基础客服功能
- 计划功能：语音客服、视频客服、工单系统集成