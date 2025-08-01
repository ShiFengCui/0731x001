# CustomCard 自定义卡片组件

## 简介

`CustomCard` 是一个基于 uni-ui 设计的自定义卡片组件，包含图片、标题、描述等功能，可以被其他页面直接引入使用。

## 功能特性

- ✨ 支持图片、标题、描述显示
- 🎨 自定义样式配置（阴影、边框、间距等）
- 📱 响应式设计，支持多平台
- 🔧 灵活的插槽支持
- 📝 文本省略处理
- 🖱️ 点击事件支持
- 🖼️ 图片懒加载
- 📊 图片加载状态监听

## 安装使用

### 1. 组件引入

```javascript
import CustomCard from '@/components/custom-card/custom-card.vue'

export default {
  components: {
    CustomCard
  }
}
```

### 2. 基础使用

```vue
<template>
  <custom-card 
    image="/static/logo.png"
    title="卡片标题"
    description="卡片描述信息"
    @click="onCardClick"
  />
</template>
```

### 3. 高级使用

```vue
<template>
  <!-- 带操作按钮的卡片 -->
  <custom-card 
    image="/static/logo.png"
    title="带操作按钮的卡片"
    description="这个卡片在底部包含了操作按钮区域"
    :shadow="true"
    :border="true"
    margin="20rpx"
    @click="onCardClick"
  >
    <template #actions>
      <view class="card-actions">
        <button size="mini" type="primary" @click.stop="onLike">点赞</button>
        <button size="mini" type="default" @click.stop="onShare">分享</button>
      </view>
    </template>
  </custom-card>
</template>
```

## API 参数

### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| image | String | '' | 卡片图片地址 |
| title | String | '' | 卡片标题 |
| description | String | '' | 卡片描述 |
| imageMode | String | 'aspectFill' | 图片显示模式 |
| titleEllipsis | Boolean | true | 标题是否显示省略号 |
| descriptionEllipsis | Boolean | true | 描述是否显示省略号 |
| shadow | Boolean | true | 是否显示阴影 |
| border | Boolean | true | 是否显示边框 |
| margin | String | '15px' | 外边距 |
| lazyLoad | Boolean | true | 图片懒加载 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击卡片时触发 | - |
| imageLoad | 图片加载完成时触发 | event |
| imageError | 图片加载失败时触发 | event |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 自定义卡片内容 |
| actions | 自定义底部操作区域 |

## 使用示例

### 基础卡片

```vue
<custom-card 
  image="/static/logo.png"
  title="基础卡片示例"
  description="这是一个基础的卡片组件"
  @click="onCardClick"
/>
```

### 无图片卡片

```vue
<custom-card 
  title="无图片卡片"
  description="这是一个没有图片的卡片示例"
/>
```

### 自定义样式卡片

```vue
<custom-card 
  image="/static/logo.png"
  title="自定义样式卡片"
  description="自定义样式配置"
  :shadow="false"
  :border="false"
  margin="30rpx"
/>
```

### 带操作按钮的卡片

```vue
<custom-card 
  image="/static/logo.png"
  title="带操作按钮的卡片"
  description="包含底部操作按钮"
>
  <template #actions>
    <view class="card-actions">
      <button size="mini" type="primary">点赞</button>
      <button size="mini" type="default">分享</button>
      <button size="mini" type="warn">收藏</button>
    </view>
  </template>
</custom-card>
```

## 样式自定义

组件使用 SCSS 编写样式，支持以下样式变量自定义：

```scss
$border-color: #EBEEF5;        // 边框颜色
$shadow-color: rgba(0, 0, 0, 0.1); // 阴影颜色
$title-color: #303133;         // 标题颜色
$description-color: #606266;   // 描述颜色
$background-color: #FFFFFF;    // 背景颜色
```

## 注意事项

1. 图片路径需要是有效的网络地址或本地静态资源路径
2. 使用插槽时，建议使用 `@click.stop` 阻止事件冒泡
3. 组件支持多平台，建议使用 rpx 单位进行样式适配
4. 长文本会自动省略，可通过 `titleEllipsis` 和 `descriptionEllipsis` 控制

## 更新日志

### v1.0.0
- 初始版本发布
- 支持图片、标题、描述显示
- 支持自定义样式配置
- 支持插槽和事件 