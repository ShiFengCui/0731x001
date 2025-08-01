# BusinessMatrix 业务入口矩阵卡片组件

## 组件描述

业务入口矩阵卡片组件，支持多种矩阵样式的业务入口展示，可自定义图片、名字、地址等功能。

## 功能特性

- 📱 多种布局样式：网格布局、列表布局、卡片布局
- 🎨 多种图标样式：圆形、方形、圆角
- 📏 多种尺寸规格：小、中、大
- 🏷️ 支持角标显示：新品、热销、特价、VIP等
- 🔗 支持页面跳转：内部页面、外部链接
- 🎯 响应式设计：适配不同屏幕尺寸
- 🎨 自定义样式：支持自定义间距、背景色、阴影等

## 属性说明

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| businessList | Array | [] | 业务入口数据列表 |
| title | String | '' | 矩阵标题 |
| subtitle | String | '' | 矩阵副标题 |
| layout | String | 'grid' | 布局样式：grid(网格), list(列表), card(卡片) |
| columns | Number | 4 | 每行显示的列数（1-6） |
| itemStyle | String | 'circle' | 项目样式风格：circle(圆形), square(方形), rounded(圆角) |
| size | String | 'medium' | 尺寸大小：small, medium, large |
| showDescription | Boolean | false | 是否显示描述文字 |
| iconSize | String | '' | 图标尺寸（自定义） |
| gap | String | '' | 间距大小（自定义） |
| backgroundColor | String | '' | 背景颜色（自定义） |
| shadow | Boolean | false | 是否显示阴影 |

## 数据结构

### businessList 数组项结构

```javascript
{
  id: 'unique-id',           // 唯一标识
  name: '业务名称',          // 业务入口名称
  icon: '/path/to/icon.png', // 图标地址
  description: '业务描述',    // 业务描述（可选）
  url: '/pages/target/page', // 跳转地址（可选）
  badge: {                   // 角标配置（可选）
    type: 'new',             // 角标类型：new, hot, sale, vip
    text: 'NEW'              // 角标文字
  }
}
```

## 事件说明

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| itemClick | 点击业务入口项目时触发 | { item, index } |

## 使用示例

### 基础用法

```vue
<template>
  <business-matrix
    :business-list="businessList"
    title="业务入口"
    @item-click="handleItemClick"
  />
</template>

<script>
import BusinessMatrix from '@/components/business-matrix/business-matrix.vue'

export default {
  components: {
    BusinessMatrix
  },
  data() {
    return {
      businessList: [
        {
          id: '1',
          name: '商品管理',
          icon: '/static/icons/product.png',
          url: '/pages/product/list'
        },
        {
          id: '2',
          name: '订单管理',
          icon: '/static/icons/order.png',
          url: '/pages/order/list',
          badge: {
            type: 'new',
            text: 'NEW'
          }
        },
        {
          id: '3',
          name: '用户管理',
          icon: '/static/icons/user.png',
          url: '/pages/user/list'
        },
        {
          id: '4',
          name: '数据统计',
          icon: '/static/icons/data.png',
          url: '/pages/data/report'
        }
      ]
    }
  },
  methods: {
    handleItemClick({ item, index }) {
      console.log('点击了业务入口：', item.name, index)
    }
  }
}
</script>
```

### 高级用法

```vue
<template>
  <business-matrix
    :business-list="businessList"
    title="业务中心"
    subtitle="选择您需要的业务功能"
    layout="card"
    :columns="2"
    item-style="rounded"
    size="large"
    :show-description="true"
    :shadow="true"
    gap="24rpx"
    background-color="#f8f9fa"
    @item-click="handleItemClick"
  />
</template>
```

### 列表布局

```vue
<template>
  <business-matrix
    :business-list="businessList"
    layout="list"
    item-style="square"
    :show-description="true"
  />
</template>
```

## 样式定制

组件支持通过 CSS 变量进行样式定制：

```css
.business-matrix {
  --primary-color: #1890ff;
  --success-color: #52c41a;
  --warning-color: #faad14;
  --error-color: #ff4d4f;
  --text-color: #333;
  --border-color: #e8e8e8;
  --background-color: #fff;
}
```

## 注意事项

1. 图标建议使用正方形图片，以获得最佳显示效果
2. 业务入口数据中的 `url` 字段支持相对路径和绝对路径
3. 外部链接请使用完整的 HTTP/HTTPS 地址
4. 角标类型支持：new、hot、sale、vip，也可以自定义
5. 响应式设计会在小屏幕上自动调整列数