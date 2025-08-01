# 收藏列表组件 (favorite-list)

一个功能完善的收藏商品列表组件，支持搜索、筛选、排序、批量管理等功能。

## 功能特性

- 🔍 **搜索功能** - 支持按商品名称和描述搜索
- 🏷️ **分类筛选** - 按商品分类进行筛选
- 📊 **多种排序** - 支持按收藏时间、价格、名称排序
- 🎯 **布局切换** - 支持网格和单列两种布局模式
- ✅ **批量管理** - 支持批量选择和删除收藏
- 💫 **精美动效** - 流畅的交互动画效果
- 📱 **响应式设计** - 适配不同屏幕尺寸

## 使用方法

### 基础用法

```vue
<template>
  <favorite-list
    :favorite-list="favoriteList"
    @removeFavorite="handleRemoveFavorite"
    @viewProduct="handleViewProduct"
    @itemClick="handleItemClick"
  />
</template>

<script>
import FavoriteList from '@/components/favorite-list/favorite-list.vue'

export default {
  components: {
    FavoriteList
  },
  data() {
    return {
      favoriteList: [
        {
          id: 'fav_001',
          title: 'iPhone 15 Pro',
          description: '强得离谱的专业级手机',
          image: '/static/product1.jpg',
          price: 8999,
          originalPrice: 9999,
          category: '数码',
          categoryId: 'electronics',
          favoriteTime: '2024-12-12 14:30:00'
        }
        // ... 更多收藏数据
      ]
    }
  },
  methods: {
    handleRemoveFavorite(item) {
      // 处理取消收藏
      console.log('取消收藏:', item)
    },
    handleViewProduct(item) {
      // 处理查看商品
      console.log('查看商品:', item)
    },
    handleItemClick(item) {
      // 处理点击商品
      console.log('点击商品:', item)
    }
  }
}
</script>
```

### 高级用法

```vue
<template>
  <favorite-list
    :favorite-list="favoriteList"
    title="我的收藏夹"
    :show-count="true"
    :show-search="true"
    :show-filter="true"
    :show-batch-delete="true"
    layout="grid"
    :categories="customCategories"
    @removeFavorite="handleRemoveFavorite"
    @batchRemove="handleBatchRemove"
    @viewProduct="handleViewProduct"
    @itemClick="handleItemClick"
    @browseProducts="handleBrowseProducts"
    @layoutChange="handleLayoutChange"
  />
</template>

<script>
export default {
  data() {
    return {
      favoriteList: [...],
      customCategories: [
        { id: 'all', name: '全部' },
        { id: 'electronics', name: '数码产品' },
        { id: 'clothing', name: '服装鞋帽' },
        { id: 'books', name: '图书音像' },
        { id: 'home', name: '家居用品' },
        { id: 'food', name: '食品饮料' }
      ]
    }
  },
  methods: {
    handleBatchRemove(itemIds) {
      // 处理批量删除
      console.log('批量删除:', itemIds)
      this.favoriteList = this.favoriteList.filter(item => !itemIds.includes(item.id))
    },
    handleBrowseProducts() {
      // 处理去逛逛
      uni.navigateTo({
        url: '/pages/product/list'
      })
    },
    handleLayoutChange(layout) {
      // 处理布局变化
      console.log('布局变化:', layout)
    }
  }
}
</script>
```

## 属性说明

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| favorite-list | Array | [] | 收藏列表数据 |
| title | String | '我的收藏' | 列表标题 |
| show-count | Boolean | true | 是否显示数量统计 |
| layout | String | 'grid' | 布局方式，可选值：grid、single |
| show-search | Boolean | true | 是否显示搜索功能 |
| show-filter | Boolean | true | 是否显示筛选功能 |
| show-batch-delete | Boolean | true | 是否显示批量删除功能 |
| default-image | String | '/static/logo.png' | 默认图片 |
| categories | Array | 内置分类 | 商品分类配置 |

## 数据结构

### 收藏商品数据结构

```javascript
{
  id: 'fav_001',                    // 唯一标识
  title: 'iPhone 15 Pro',           // 商品标题
  description: '强得离谱的专业级手机',  // 商品描述
  image: '/static/product1.jpg',    // 商品图片
  price: 8999,                      // 当前价格
  originalPrice: 9999,              // 原价（可选）
  category: '数码',                  // 分类名称
  categoryId: 'electronics',        // 分类ID
  favoriteTime: '2024-12-12 14:30:00' // 收藏时间
}
```

### 分类数据结构

```javascript
{
  id: 'electronics',    // 分类ID
  name: '数码产品'       // 分类名称
}
```

## 事件说明

| 事件名 | 参数 | 说明 |
|--------|------|------|
| removeFavorite | item | 取消收藏某个商品 |
| batchRemove | itemIds | 批量删除收藏，参数为商品ID数组 |
| viewProduct | item | 查看商品详情 |
| itemClick | item | 点击商品项 |
| browseProducts | - | 点击去逛逛按钮 |
| layoutChange | layout | 布局变化，参数为新的布局方式 |

## 样式定制

组件使用了CSS变量，可以通过覆盖以下变量来定制样式：

```css
/* 主色调 */
--primary-color: #1890ff;
--danger-color: #ff4757;
--success-color: #52c41a;

/* 文字颜色 */
--text-color-primary: #333;
--text-color-secondary: #666;
--text-color-tertiary: #999;

/* 背景颜色 */
--bg-color-primary: #fff;
--bg-color-secondary: #f8f8f8;
--bg-color-tertiary: #f5f5f5;

/* 边框圆角 */
--border-radius-small: 8rpx;
--border-radius-medium: 16rpx;
--border-radius-large: 50rpx;
```

## 注意事项

1. 组件依赖 `uni-icons` 图标组件，请确保项目中已安装
2. 收藏数据需要包含必要的字段，特别是 `id`、`title`、`price` 等
3. 批量删除功能需要父组件处理实际的删除逻辑
4. 建议在使用前先调用相关接口获取收藏数据
5. 组件使用了 `grid` 布局，在低版本浏览器中可能需要 polyfill

## 更新日志

### v1.0.0
- 初始版本发布
- 支持基础的收藏列表展示
- 支持搜索、筛选、排序功能
- 支持批量管理功能
- 支持布局切换功能