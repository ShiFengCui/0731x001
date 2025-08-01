# BannerTop 顶部海报组件

一个功能丰富的顶部海报轮播组件，支持海报轮播、快捷入口和公告栏功能。

## 功能特点

- 🎠 海报轮播：支持自动播放、指示点、循环播放
- 🔗 快捷入口：可配置的网格布局快捷入口
- 📢 公告栏：滚动公告展示
- 📱 响应式设计：适配不同屏幕尺寸
- 🎨 自定义样式：支持多种配置选项
- 🖱️ 事件丰富：完整的交互事件支持

## 基础用法

```vue
<template>
  <banner-top
    :banner-list="bannerList"
    :show-quick-entry="true"
    :quick-entry-list="quickEntryList"
    :show-notice="true"
    :notice-list="noticeList"
    @bannerClick="onBannerClick"
    @quickEntryClick="onQuickEntryClick"
    @noticeClick="onNoticeClick"
  />
</template>

<script>
import BannerTop from '@/components/banner-top/banner-top.vue'

export default {
  components: {
    BannerTop
  },
  data() {
    return {
      bannerList: [
        {
          id: 1,
          image: '/static/banner1.jpg',
          title: '新年大促销',
          subtitle: '全场商品5折起',
          buttonText: '立即抢购',
          link: '/pages/promotion/index'
        }
      ],
      quickEntryList: [
        {
          id: 1,
          title: '扫一扫',
          icon: '/static/scan.png',
          link: '/pages/scan/index'
        }
      ],
      noticeList: [
        {
          id: 1,
          content: '新用户注册立享专属优惠券！',
          link: '/pages/register/index'
        }
      ]
    }
  }
}
</script>
```

## Props 属性

### 海报相关

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| bannerList | Array | [] | 海报数据列表 |
| showDots | Boolean | true | 是否显示指示点 |
| autoplay | Boolean | true | 是否自动播放 |
| interval | Number | 3000 | 轮播间隔时间(ms) |
| duration | Number | 500 | 滑动动画时长(ms) |
| circular | Boolean | true | 是否循环播放 |
| indicatorActiveColor | String | '#ffffff' | 指示点激活颜色 |
| indicatorColor | String | 'rgba(255, 255, 255, 0.5)' | 指示点默认颜色 |
| imageMode | String | 'aspectFill' | 图片显示模式 |
| bannerHeight | String | '400rpx' | 海报高度 |

### 快捷入口相关

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| showQuickEntry | Boolean | false | 是否显示快捷入口 |
| quickEntryTitle | String | '' | 快捷入口标题 |
| quickEntryList | Array | [] | 快捷入口数据列表 |

### 公告栏相关

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| showNotice | Boolean | false | 是否显示公告栏 |
| noticeList | Array | [] | 公告数据列表 |
| noticeInterval | Number | 4000 | 公告轮播间隔(ms) |

## 数据结构

### bannerList 数据结构

```javascript
[
  {
    id: 1,                    // 唯一标识
    image: '/static/banner.jpg',  // 海报图片
    title: '标题',            // 海报标题（可选）
    subtitle: '副标题',       // 海报副标题（可选）
    buttonText: '按钮文字',   // 按钮文字（可选）
    link: '/pages/index'      // 跳转链接（可选）
  }
]
```

### quickEntryList 数据结构

```javascript
[
  {
    id: 1,                    // 唯一标识
    title: '扫一扫',          // 入口标题
    icon: '/static/scan.png', // 图标图片（可选）
    iconType: 'scan',         // uni-icons图标类型（可选）
    iconColor: '#666',        // 图标颜色（可选）
    badge: 'HOT',            // 徽章文字（可选）
    link: '/pages/scan'       // 跳转链接
  }
]
```

### noticeList 数据结构

```javascript
[
  {
    id: 1,                          // 唯一标识
    content: '这是一条公告内容',     // 公告内容
    link: '/pages/notice/detail'    // 跳转链接（可选）
  }
]
```

## Events 事件

| 事件名 | 说明 | 参数 |
|--------|------|------|
| bannerChange | 海报切换时触发 | { current, banner } |
| bannerClick | 点击海报时触发 | { banner, index } |
| buttonClick | 点击海报按钮时触发 | { banner, index } |
| quickEntryClick | 点击快捷入口时触发 | { entry, index } |
| noticeClick | 点击公告时触发 | { notice, index } |
| moreNotice | 点击更多公告时触发 | - |
| imageError | 图片加载失败时触发 | event |
| imageLoad | 图片加载成功时触发 | event |

## 样式定制

组件支持通过 CSS 变量或者覆盖样式类来自定义外观：

```css
/* 自定义海报高度 */
.banner-swiper {
  height: 300rpx;
}

/* 自定义快捷入口图标样式 */
.entry-icon-wrapper {
  background-color: #your-color;
  border-radius: 20rpx;
}

/* 自定义公告栏样式 */
.notice-section {
  background-color: #your-background;
}
```

## 注意事项

1. 确保图片资源路径正确且图片存在
2. 快捷入口建议不超过8个，以保证界面美观
3. 公告内容不宜过长，避免显示不全
4. 在低版本微信小程序中，某些CSS特性可能不支持
5. 建议为海报图片设置合适的尺寸比例（如16:9）

## 更新日志

### v1.0.0
- 初始版本发布
- 支持海报轮播、快捷入口、公告栏功能
- 完整的事件系统和属性配置