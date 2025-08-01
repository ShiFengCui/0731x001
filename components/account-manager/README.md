# 账户管理组件 (AccountManager)

账户管理组件提供了完整的用户账户信息管理功能，包括个人信息编辑、密码管理和安全设置等。

## 功能特性

- 🔧 **个人信息管理**: 头像上传、昵称修改、手机号/邮箱绑定
- 🔐 **密码管理**: 登录密码和支付密码的修改
- 🛡️ **安全设置**: 生物识别、设备管理、登录日志等
- 📱 **响应式设计**: 适配不同屏幕尺寸
- 🎨 **美观界面**: 现代化的UI设计

## 使用方式

### 基础用法

```vue
<template>
  <account-manager 
    :account-data="accountInfo"
    @avatarChange="onAvatarChange"
    @nicknameChange="onNicknameChange"
    @passwordChange="onPasswordChange"
    @biometricToggle="onBiometricToggle"
  />
</template>

<script>
import AccountManager from '@/components/account-manager/account-manager.vue'

export default {
  components: {
    AccountManager
  },
  data() {
    return {
      accountInfo: {
        nickname: '张小明',
        avatar: '/static/avatar.png',
        phone: '138****5678',
        email: 'user@example.com',
        hasLoginPassword: true,
        hasPayPassword: false,
        biometricEnabled: true,
        deviceCount: 3
      }
    }
  },
  methods: {
    onAvatarChange(newAvatar) {
      console.log('头像更改:', newAvatar)
      // 处理头像上传逻辑
    },
    onNicknameChange(newNickname) {
      console.log('昵称更改:', newNickname)
      this.accountInfo.nickname = newNickname
    },
    onPasswordChange(passwordData) {
      console.log('密码更改:', passwordData)
      // 处理密码修改逻辑
    },
    onBiometricToggle(enabled) {
      console.log('生物识别切换:', enabled)
      this.accountInfo.biometricEnabled = enabled
    }
  }
}
</script>
```

## Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| accountData | Object | 见下方默认值 | 账户数据对象 |

### accountData 对象结构

```javascript
{
  nickname: '用户昵称',           // 用户昵称
  avatar: '/static/logo.png',    // 用户头像
  phone: '138****5678',          // 手机号码
  email: 'user@example.com',     // 邮箱地址
  hasLoginPassword: true,        // 是否设置登录密码
  hasPayPassword: false,         // 是否设置支付密码
  biometricEnabled: false,       // 是否启用生物识别
  deviceCount: 2                 // 登录设备数量
}
```

## Events

| 事件名 | 参数 | 说明 |
|-------|------|------|
| avatarChange | newAvatar: String | 头像更改时触发 |
| nicknameChange | newNickname: String | 昵称修改时触发 |
| phoneChange | - | 手机号修改按钮点击时触发 |
| emailChange | - | 邮箱修改按钮点击时触发 |
| passwordChange | passwordData: Object | 密码修改时触发 |
| biometricToggle | enabled: Boolean | 生物识别开关切换时触发 |
| deviceManagement | - | 设备管理按钮点击时触发 |
| loginLog | - | 登录日志按钮点击时触发 |
| accountDelete | - | 账号注销申请时触发 |

### passwordChange 事件参数

```javascript
{
  type: 'login' | 'pay',     // 密码类型
  currentPassword: String,    // 当前密码
  newPassword: String         // 新密码
}
```

## 样式自定义

组件使用 SCSS 编写样式，支持主题定制。主要的样式变量包括：

- 主色调: `#409EFF`
- 危险色: `#F56C6C`
- 成功色: `#67C23A`
- 警告色: `#E6A23C`

## 依赖

- uni-icons: 图标组件
- uni-popup: 弹窗组件

## 注意事项

1. 头像上传功能需要配合后端接口实现
2. 密码修改功能需要实际的密码验证逻辑
3. 生物识别功能需要在真机上测试
4. 设备管理和登录日志需要跳转到对应的详情页面

## 更新日志

### v1.0.0
- 初始版本发布
- 支持个人信息管理
- 支持密码修改
- 支持安全设置