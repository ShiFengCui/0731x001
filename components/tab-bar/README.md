# TabBar 底部导航栏组件

## 简介

TabBar 是一个通用的底部导航栏组件，支持图标、文字、徽章等功能，可以让各类应用自由定义tabbar样式和行为。

## 功能特性

- ✅ 支持图标和文字显示
- ✅ 支持自定义图片图标
- ✅ 支持 uni-icons 图标
- ✅ 支持徽章数字和小红点
- ✅ 支持自定义颜色和大小
- ✅ 支持底部安全区域适配
- ✅ 支持页面跳转功能
- ✅ 响应式设计，适配各种屏幕

## 基础用法

```vue
<template>
  <view>
    <!-- 基础底部导航栏 -->
    <tab-bar 
      :tab-list="tabList" 
      :current="currentTab"
      @change="onTabChange"
    />
  </view>
</template>

<script>
import TabBar from '@/components/tab-bar/tab-bar.vue'

export default {
  components: {
    TabBar
  },
  data() {
    return {
      currentTab: 0,
      tabList: [
        {
          id: 'home',
          text: '首页',
          icon: 'home',
          pagePath: '/pages/index/index'
        },
        {
          id: 'category',
          text: '分类',
          icon: 'bars',
          pagePath: '/pages/category/category'
        },
        {
          id: 'cart',
          text: '购物车',
          icon: 'cart',
          badge: { count: 3 },
          pagePath: '/pages/cart/cart'
        },
        {
          id: 'profile',
          text: '我的',
          icon: 'person',
          badge: { dot: true },
          pagePath: '/pages/profile/profile'
        }
      ]
    }
  },
  methods: {
    onTabChange(data) {
      console.log('切换到标签页:', data)
      this.currentTab = data.index
    }
  }
}
</script>
```

## 属性说明

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| tabList | Array | [] | 标签页列表数据 |
| current | Number | 0 | 当前选中的标签页索引 |
| activeColor | String | #007aff | 激活状态的颜色 |
| inactiveColor | String | #999999 | 未激活状态的颜色 |
| showText | Boolean | true | 是否显示文字 |
| iconSize | Number | 48 | 图标大小（单位rpx） |
| textSize | Number | 22 | 文字大小（单位rpx） |
| safeArea | Boolean | true | 是否适配底部安全区域 |
| backgroundColor | String | #ffffff | 背景颜色 |
| border | Boolean | true | 是否显示顶部边框 |

## tabList 数据结构

```javascript
[
  {
    id: 'home',                    // 唯一标识
    text: '首页',                  // 显示文字
    icon: 'home',                  // uni-icons 图标名称
    image: '/static/home.png',     // 自定义图片图标
    activeImage: '/static/home-active.png',  // 激活状态图片
    pagePath: '/pages/index/index', // 页面路径
    badge: {                       // 徽章配置
      count: 5,                    // 数字徽章
      dot: true                    // 小红点徽章
    }
  }
]
```

## 事件说明

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 切换标签页时触发 | { item: Object, index: Number } |

## 使用示例

### 基础导航栏

```vue
<tab-bar 
  :tab-list="basicTabList" 
  :current="0"
  @change="onTabChange"
/>
```

### 自定义样式

```vue
<tab-bar 
  :tab-list="customTabList"
  active-color="#ff6b35"
  inactive-color="#cccccc"
  background-color="#f8f8f8"
  :icon-size="56"
  :text-size="24"
/>
```

### 带徽章的导航栏

```vue
<tab-bar 
  :tab-list="badgeTabList"
  @change="onTabChange"
/>
```

### 仅图标导航栏

```vue
<tab-bar 
  :tab-list="iconOnlyTabList"
  :show-text="false"
  :icon-size="64"
/>
```

### 图片图标导航栏

```vue
<tab-bar 
  :tab-list="imageTabList"
  @change="onTabChange"
/>
```

## 注意事项

1. 确保已安装 uni-icons 组件
2. 图片路径建议使用绝对路径
3. 徽章数字超过99会显示为"99+"
4. 页面跳转会自动判断是否为 tabBar 页面
5. 组件默认为 fixed 定位，请确保页面有足够的底部边距

## 兼容性

- ✅ H5
- ✅ 小程序
- ✅ App
- ✅ Nvue

## 更新日志

### v1.0.0 (2024-12-12)

- 🎉 初始版本发布
- ✅ 支持基础导航功能
- ✅ 支持徽章显示
- ✅ 支持自定义样式