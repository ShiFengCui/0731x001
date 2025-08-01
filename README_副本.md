# Demo-005 - UniApp 组件库项目

> 一个基于 Vue 3 和 uni-app 构建的移动端组件库演示项目，包含丰富的业务组件和UI组件。

## 📋 项目介绍

Demo-005 是一个综合性的 uni-app 项目，提供了完整的移动端应用开发所需的组件集合。项目采用模块化设计，组件分类明确，便于开发者快速构建功能完整的移动应用。

### ✨ 主要特色

- 🎯 **组件丰富**: 涵盖业务、商品、用户、UI四大类组件
- 📱 **跨平台支持**: 支持 H5、微信小程序等多平台
- 🔧 **开箱即用**: 每个组件都有完整的演示页面
- 📚 **文档完善**: 详细的组件说明和使用示例
- 🎨 **现代设计**: 采用现代化的UI设计风格

### 🏗️ 组件分类

#### 🏢 业务组件
- **business-matrix** - 业务入口矩阵
- **member-center** - 会员中心
- **membership-card** - 会员卡
- **appointment-system** - 预约系统
- **rating-system** - 评价系统

#### 📦 商品组件
- **product-component** - 商品展示
- **custom-orderlist** - 订单列表
- **favorite-list** - 收藏列表
- **coupon-card** - 优惠券卡片

#### 👤 用户组件
- **account-manager** - 账户管理
- **address-manager** - 地址管理
- **customer-service** - 客服服务

#### 🎨 UI组件
- **banner-top** - 顶部横幅
- **activity-component** - 活动组件
- **custom-card** - 自定义卡片
- **list-group** - 列表组
- **tab-bar** - 底部导航栏
- **page-skeleton** - 页面骨架

## 🚀 快速开始

### 📋 系统要求

- Node.js >= 16.0.0
- npm >= 8.0.0 或 yarn >= 1.22.0
- HBuilderX 或其他支持 uni-app 的开发工具

### 🔧 安装依赖

```bash
# 克隆项目
git clone <your-repository-url>
cd demo-005

# 安装依赖
npm install
# 或使用 yarn
yarn install
```

### 🏃‍♂️ 运行项目

```bash
# 开发环境运行 H5
npm run dev:h5

# 开发环境运行微信小程序
npm run dev:mp-weixin

# 构建 H5 生产版本
npm run build:h5

# 构建微信小程序生产版本
npm run build:mp-weixin
```

### 🛠️ 代码检查

```bash
# 运行 ESLint 检查
npm run lint

# 自动修复 ESLint 问题
npm run lint:fix
```

## 📁 项目结构

```
demo-005/
├── components/          # 组件库
│   ├── account-manager/     # 账户管理组件
│   ├── activity-component/  # 活动组件
│   ├── address-manager/     # 地址管理组件
│   ├── appointment-system/  # 预约系统组件
│   ├── banner-top/          # 顶部横幅组件
│   ├── business-matrix/     # 业务矩阵组件
│   ├── coupon-card/         # 优惠券卡片组件
│   ├── custom-card/         # 自定义卡片组件
│   ├── custom-orderlist/    # 订单列表组件
│   ├── customer-service/    # 客服组件
│   ├── favorite-list/       # 收藏列表组件
│   ├── list-group/          # 列表组组件
│   ├── member-center/       # 会员中心组件
│   ├── membership-card/     # 会员卡组件
│   ├── page-skeleton/       # 页面骨架组件
│   ├── product-component/   # 商品组件
│   ├── rating-system/       # 评价系统组件
│   └── tab-bar/             # 底部导航栏组件
├── pages/               # 演示页面
│   ├── activity-demo/       # 活动演示页
│   ├── business-demo/       # 业务演示页
│   ├── coupon-demo/         # 优惠券演示页
│   ├── favorite-demo/       # 收藏演示页
│   ├── index/               # 首页
│   ├── list-group-demo/     # 列表组演示页
│   ├── member-demo/         # 会员演示页
│   └── skeleton-demo/       # 骨架屏演示页
├── static/              # 静态资源
├── uni_modules/         # uni-app 官方组件库
├── App.vue              # 应用入口
├── main.js              # 主文件
├── manifest.json        # 应用配置
├── pages.json           # 页面配置
└── uni.scss             # 全局样式
```## 💡 使用指南

### 📖 组件使用

每个组件都位于 `components/` 目录下，包含：
- `.vue` 文件 - 组件实现
- `README.md` - 组件文档和使用说明

### 🔍 组件引用示例

```vue
<template>
  <view>
    <!-- 使用业务矩阵组件 -->
    <business-matrix :data="matrixData" />
    
    <!-- 使用会员卡组件 -->
    <membership-card :userInfo="userInfo" />
    
    <!-- 使用优惠券组件 -->
    <coupon-card :couponList="coupons" />
  </view>
</template>

<script>
import BusinessMatrix from '@/components/business-matrix/business-matrix.vue'
import MembershipCard from '@/components/membership-card/membership-card.vue'
import CouponCard from '@/components/coupon-card/coupon-card.vue'

export default {
  components: {
    BusinessMatrix,
    MembershipCard,
    CouponCard
  },
  data() {
    return {
      matrixData: [], // 业务矩阵数据
      userInfo: {},   // 用户信息
      coupons: []     // 优惠券列表
    }
  }
}
</script>
```

### 🎨 样式自定义

项目使用 uni.scss 作为全局样式文件，你可以：
1. 修改 `uni.scss` 中的全局变量
2. 在组件中使用 `scoped` 样式进行局部定制
3. 通过 CSS 变量实现主题切换

### 📱 平台兼容

项目支持以下平台：
- ✅ H5 (Web)
- ✅ 微信小程序
- ✅ 支付宝小程序
- ✅ 百度小程序
- ✅ 头条小程序
- ✅ App (需要相应配置)

## 🔧 开发指南

### 📝 添加新组件

1. 在 `components/` 目录下创建新组件文件夹
2. 创建 `.vue` 组件文件
3. 添加 `README.md` 组件文档
4. 在 `pages/` 中创建对应的演示页面
5. 更新 `pages.json` 配置

### 🧪 测试

项目包含测试相关文件：
- `.test-*.cjs` - 测试脚本
- 运行测试前请确保安装了所有依赖

### 📦 构建部署

```bash
# H5 部署
npm run build:h5
# 构建产物在 unpackage/dist/build/h5/

# 小程序部署
npm run build:mp-weixin
# 构建产物在 unpackage/dist/build/mp-weixin/
```

## 🤝 贡献指南

### 提交代码

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

### 代码规范

- 使用 ESLint 进行代码检查
- 遵循 Vue 3 组合式 API 规范
- 组件命名使用 kebab-case
- 提交信息使用约定式提交格式

## 📚 相关文档

- [uni-app 官方文档](https://uniapp.dcloud.net.cn/)
- [Vue 3 官方文档](https://v3.vuejs.org/)
- [组件列表说明文档](./组件列表.md)

## 🐛 问题反馈

如果你发现了bug或有功能建议，请：

1. 在 Issues 中搜索是否已有相关问题
2. 如果没有，请创建新的 Issue
3. 详细描述问题或建议
4. 提供必要的截图或代码示例

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 👥 维护者

- 项目维护者: [cuishifeng]
- 创建时间: 2024
- 最后更新: 2024-06-25

---

⭐ 如果这个项目对你有帮助，请给个 Star 支持一下！