# PageSkeleton 页面骨架组件

一个灵活、可配置的页面布局骨架组件，支持多种布局模式和内容区域自定义。

## 功能特点

- 🎯 **多种布局模式**: 支持普通、侧边栏、标签页、流式布局
- 🎨 **高度可定制**: 支持自定义样式、颜色、尺寸等
- 📱 **响应式设计**: 自动适配不同屏幕尺寸和安全区域
- 🔧 **插槽丰富**: 提供多个命名插槽，方便内容组合
- ⚡ **性能优化**: 合理的DOM结构和CSS优化
- 🛡️ **类型安全**: 完整的Props验证和事件定义

## 基本用法

```vue
<template>
  <page-skeleton title="页面标题">
    <view>页面内容</view>
  </page-skeleton>
</template>

<script>
import PageSkeleton from '@/components/page-skeleton/page-skeleton.vue'

export default {
  components: {
    PageSkeleton
  }
}
</script>
```

## 布局模式

### 1. 普通布局 (normal)
```vue
<page-skeleton layout="normal" title="普通页面">
  <view>内容区域</view>
</page-skeleton>
```

### 2. 侧边栏布局 (sidebar)
```vue
<page-skeleton layout="sidebar" title="侧边栏页面">
  <view>主内容区域</view>
  <template #sidebar>
    <view>侧边栏内容</view>
  </template>
</page-skeleton>
```

### 3. 标签页布局 (tab)
```vue
<page-skeleton layout="tab" title="标签页面">
  <template #tabs>
    <uni-segmented-control :current="current" :values="tabs" @clickItem="onTabChange" />
  </template>
  <view>标签页内容</view>
</page-skeleton>
```

### 4. 流式布局 (flow)
```vue
<page-skeleton layout="flow" title="流式页面">
  <view>流式内容，头部和底部不固定</view>
</page-skeleton>
```

## API文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| layout | String | 'normal' | 布局模式：normal/sidebar/tab/flow |
| title | String | '' | 页面标题 |
| showHeader | Boolean | true | 是否显示头部 |
| showBack | Boolean | true | 是否显示返回按钮 |
| safeArea | Boolean | true | 是否适配安全区域 |
| backgroundColor | String | '#f5f5f5' | 页面背景色 |
| customBackground | Boolean | false | 是否使用自定义背景 |
| headerTextColor | String | '#333333' | 头部文字颜色 |
| headerBackground | String | '#ffffff' | 头部背景色 |
| headerHeight | Number | 88 | 头部高度(rpx) |
| contentPadding | String | '0' | 内容区域padding |
| loading | Boolean | false | 是否显示加载状态 |
| loadingText | Object | {...} | 加载文案配置 |
| empty | Boolean | false | 是否显示空状态 |
| emptyText | String | '暂无数据' | 空状态文案 |
| emptyImage | String | '/static/empty.png' | 空状态图片 |
| emptyButtonText | String | '' | 空状态按钮文字 |
| showMask | Boolean | false | 是否显示遮罩 |
| maskOpacity | Number | 0.5 | 遮罩透明度 |

### Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| back | 返回按钮点击 | - |
| emptyAction | 空状态按钮点击 | - |
| maskClick | 遮罩点击 | - |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 主要内容区域 |
| header | 自定义头部内容 |
| headerRight | 头部右侧操作区域 |
| banner | 顶部横幅区域 |
| search | 搜索栏区域 |
| tabs | 标签页区域 |
| sidebar | 侧边栏内容（仅sidebar布局） |
| footer | 底部操作栏 |
| fab | 悬浮操作按钮 |
| loading | 自定义加载状态 |
| empty | 自定义空状态 |
| mask | 自定义遮罩内容 |

## 完整示例

```vue
<template>
  <page-skeleton 
    layout="normal"
    title="示例页面"
    :show-header="true"
    :show-back="true"
    background-color="#f0f2f5"
    header-text-color="#333"
    :loading="isLoading"
    :empty="isEmpty"
    empty-text="暂无内容"
    empty-button-text="重新加载"
    @back="handleBack"
    @emptyAction="handleReload"
  >
    <!-- 搜索栏 -->
    <template #search>
      <uni-search-bar 
        v-model="keyword"
        placeholder="请输入搜索关键词"
        @confirm="handleSearch"
      />
    </template>
    
    <!-- 主要内容 -->
    <view class="content-wrapper">
      <custom-card 
        v-for="item in list" 
        :key="item.id"
        :title="item.title"
        :description="item.description"
        :image="item.image"
        @click="handleItemClick(item)"
      />
    </view>
    
    <!-- 底部操作 -->
    <template #footer>
      <view class="footer-actions">
        <button @click="handleAdd">添加</button>
        <button @click="handleBatch">批量操作</button>
      </view>
    </template>
    
    <!-- 悬浮按钮 -->
    <template #fab>
      <uni-fab 
        :options="fabOptions"
        @click="handleFabClick"
      />
    </template>
  </page-skeleton>
</template>
```

## 注意事项

1. 组件依赖 `uni-icons`、`uni-load-more` 等uni-ui组件
2. 使用安全区域适配时，需要在App.vue中设置相应的CSS变量
3. 自定义背景时，需要自行处理状态栏适配
4. 侧边栏布局建议在较大屏幕设备上使用