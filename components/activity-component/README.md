# 活动组件 (Activity Component)

一个功能丰富的活动展示组件，支持滚动公告栏、图片轮播和快捷入口功能。

## 功能特性

- 📢 **滚动公告栏**：垂直滚动展示文字通知
- 🖼️ **图片轮播**：支持自动播放的banner轮播
- 🎯 **快捷入口**：可配置的活动入口网格
- 🎨 **高度可定制**：丰富的配置选项
- 📱 **响应式设计**：适配不同屏幕尺寸

## 使用方法

```vue
<template>
  <activity-component
    :notice-list="noticeList"
    :banner-list="bannerList"
    :quick-entry-list="quickEntryList"
    @noticeClick="onNoticeClick"
    @bannerClick="onBannerClick"
    @quickEntryClick="onQuickEntryClick"
  />
</template>

<script>
import ActivityComponent from '@/components/activity-component/activity-component.vue'

export default {
  components: {
    ActivityComponent
  },
  data() {
    return {
      noticeList: [
        { id: 1, content: '欢迎使用活动组件！' },
        { id: 2, content: '新功能上线通知' }
      ],
      bannerList: [
        {
          id: 1,
          image: '/static/banner1.jpg',
          title: '活动标题',
          subtitle: '活动副标题',
          link: '/pages/activity/detail'
        }
      ],
      quickEntryList: [
        {
          id: 1,
          title: '签到',
          icon: '/static/checkin.png',
          link: '/pages/checkin/index'
        }
      ]
    }
  }
}
</script>
```

## 属性配置

### 公告栏相关
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| showNotice | Boolean | true | 是否显示公告栏 |
| noticeList | Array | [] | 公告数据列表 |
| noticeInterval | Number | 3000 | 公告切换间隔(ms) |

### 轮播图相关
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| showBanner | Boolean | true | 是否显示轮播图 |
| bannerList | Array | [] | 轮播图数据列表 |
| showDots | Boolean | true | 是否显示指示器 |
| autoplay | Boolean | true | 是否自动播放 |
| bannerInterval | Number | 4000 | 轮播间隔(ms) |
| bannerHeight | String | '300rpx' | 轮播图高度 |

### 快捷入口相关
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| showQuickEntry | Boolean | false | 是否显示快捷入口 |
| quickEntryList | Array | [] | 快捷入口数据列表 |
| quickEntryTitle | String | '' | 快捷入口标题 |

## 事件回调

| 事件名 | 参数 | 说明 |
|--------|------|------|
| noticeClick | {notice, index} | 点击公告项触发 |
| moreNotice | - | 点击公告更多按钮触发 |
| bannerClick | {banner, index} | 点击轮播图触发 |
| bannerChange | {current} | 轮播图切换触发 |
| quickEntryClick | {entry, index} | 点击快捷入口触发 |

## 数据格式

### 公告数据格式
```javascript
{
  id: String|Number,      // 唯一标识
  content: String,        // 公告内容
  link: String,          // 可选，跳转链接
  type: String           // 可选，公告类型
}
```

### 轮播图数据格式
```javascript
{
  id: String|Number,      // 唯一标识
  image: String,          // 图片地址
  title: String,          // 可选，标题
  subtitle: String,       // 可选，副标题
  link: String           // 可选，跳转链接
}
```

### 快捷入口数据格式
```javascript
{
  id: String|Number,      // 唯一标识
  title: String,          // 入口标题
  icon: String,           // 可选，图标地址
  iconType: String,       // 可选，uni-icons类型
  iconColor: String,      // 可选，图标颜色
  badge: String,          // 可选，角标文字
  link: String           // 可选，跳转链接
}
```