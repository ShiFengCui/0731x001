# 商品组件 (Product Component)

商品组件包含商品列表和商品详情两个子组件，提供完整的商品展示和交互功能。

## 组件结构

- `product-list.vue` - 商品列表组件
- `product-detail.vue` - 商品详情组件

## 商品列表组件 (ProductList)

### 功能特点

- 支持网格和单列两种布局模式
- 支持商品标题省略显示
- 支持促销标签展示
- 支持价格对比显示（原价/现价）
- 支持销量和规格信息展示
- 支持加购物车和立即购买操作
- 支持空状态展示
- 响应式设计，适配不同屏幕尺寸

### Props

| 参数 | 类型 | 默认值 | 说明 |
|-----|------|--------|------|
| productList | Array | [] | 商品列表数据 |
| title | String | '' | 列表标题 |
| showCount | Boolean | false | 是否显示商品数量 |
| layout | String | 'grid' | 布局方式：grid/single |
| titleEllipsis | Boolean | true | 标题是否省略 |
| showActions | Boolean | true | 是否显示操作按钮 |
| showAddCart | Boolean | true | 是否显示加购物车按钮 |
| showBuyNow | Boolean | true | 是否显示立即购买按钮 |
| defaultImage | String | '/static/logo.png' | 默认图片 |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| productClick | product | 商品点击事件 |
| addToCart | product | 加入购物车事件 |
| buyNow | product | 立即购买事件 |

### 商品数据格式

```javascript
{
  id: 'product_001',           // 商品ID
  title: '商品名称',           // 商品标题
  description: '商品描述',     // 商品描述
  image: '/path/to/image.jpg', // 商品图片
  price: 99.99,               // 现价
  originalPrice: 199.99,      // 原价
  sales: 1000,                // 销量
  tags: ['新品', '热销'],      // 促销标签
  specs: ['规格1', '规格2']    // 规格信息
}
```

## 商品详情组件 (ProductDetail)

### 功能特点

- 支持图片轮播展示
- 支持图片预览功能
- 支持促销标签展示
- 支持商品评分显示
- 支持规格选择功能
- 支持数量选择器
- 支持富文本详情展示
- 支持加购物车和立即购买操作
- 固定底部操作栏设计

### Props

| 参数 | 类型 | 默认值 | 说明 |
|-----|------|--------|------|
| productData | Object | {} | 商品详情数据 |
| showAddCart | Boolean | true | 是否显示加购物车按钮 |
| showBuyNow | Boolean | true | 是否显示立即购买按钮 |
| maxQuantity | Number | 99 | 最大购买数量 |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| specChange | {specName, option, allSpecs} | 规格变更事件 |
| quantityChange | quantity | 数量变更事件 |
| addToCart | cartData | 加入购物车事件 |
| buyNow | orderData | 立即购买事件 |

### 商品详情数据格式

```javascript
{
  id: 'product_001',              // 商品ID
  title: '商品名称',              // 商品标题
  description: '商品副标题',      // 商品副标题
  price: 99.99,                  // 现价
  originalPrice: 199.99,         // 原价
  images: ['/img1.jpg', '/img2.jpg'], // 商品图片数组
  tags: ['新品', '包邮'],         // 促销标签
  sales: 1000,                   // 销量
  stock: 100,                    // 库存
  rating: 4.8,                   // 评分
  reviewCount: 128,              // 评价数量
  specifications: [              // 规格配置
    {
      name: '颜色',
      options: [
        { label: '红色', value: 'red', disabled: false },
        { label: '蓝色', value: 'blue', disabled: true }
      ]
    }
  ],
  details: '<p>商品详情HTML内容</p>' // 商品详情
}
```

## 使用示例

### 商品列表使用示例

```vue
<template>
  <product-list
    :product-list="productList"
    title="推荐商品"
    :show-count="true"
    layout="grid"
    @product-click="onProductClick"
    @add-to-cart="onAddToCart"
    @buy-now="onBuyNow"
  />
</template>

<script>
import ProductList from '@/components/product-component/product-list.vue'

export default {
  components: { ProductList },
  data() {
    return {
      productList: [
        {
          id: '1',
          title: 'iPhone 15 Pro',
          description: '全新A17 Pro芯片，更强性能',
          image: '/static/iphone.jpg',
          price: 7999,
          originalPrice: 8999,
          sales: 1200,
          tags: ['新品', '热销'],
          specs: ['128GB', '256GB', '512GB']
        }
        // ... 更多商品
      ]
    }
  },
  methods: {
    onProductClick(product) {
      // 跳转到商品详情页
      uni.navigateTo({
        url: `/pages/product-detail/product-detail?id=${product.id}`
      })
    },
    onAddToCart(product) {
      // 处理加入购物车逻辑
      console.log('加入购物车:', product)
    },
    onBuyNow(product) {
      // 处理立即购买逻辑
      console.log('立即购买:', product)
    }
  }
}
</script>
```

### 商品详情使用示例

```vue
<template>
  <product-detail
    :product-data="productData"
    :show-add-cart="true"
    :show-buy-now="true"
    :max-quantity="10"
    @spec-change="onSpecChange"
    @quantity-change="onQuantityChange"
    @add-to-cart="onAddToCart"
    @buy-now="onBuyNow"
  />
</template>

<script>
import ProductDetail from '@/components/product-component/product-detail.vue'

export default {
  components: { ProductDetail },
  data() {
    return {
      productData: {
        id: '1',
        title: 'iPhone 15 Pro',
        description: '强得离谱，全新A17 Pro芯片',
        price: 7999,
        originalPrice: 8999,
        images: [
          '/static/iphone1.jpg',
          '/static/iphone2.jpg',
          '/static/iphone3.jpg'
        ],
        tags: ['新品', '包邮'],
        sales: 1200,
        stock: 50,
        rating: 4.8,
        reviewCount: 328,
        specifications: [
          {
            name: '容量',
            options: [
              { label: '128GB', value: '128gb', disabled: false },
              { label: '256GB', value: '256gb', disabled: false },
              { label: '512GB', value: '512gb', disabled: true }
            ]
          },
          {
            name: '颜色',
            options: [
              { label: '深空黑色', value: 'black', disabled: false },
              { label: '银色', value: 'silver', disabled: false },
              { label: '金色', value: 'gold', disabled: false }
            ]
          }
        ],
        details: '<div><h3>产品特色</h3><p>配备A17 Pro芯片...</p></div>'
      }
    }
  },
  methods: {
    onSpecChange(data) {
      console.log('规格变更:', data)
    },
    onQuantityChange(quantity) {
      console.log('数量变更:', quantity)
    },
    onAddToCart(cartData) {
      console.log('加入购物车:', cartData)
    },
    onBuyNow(orderData) {
      console.log('立即购买:', orderData)
    }
  }
}
</script>
```

## 样式定制

组件使用了 scoped 样式，支持通过 CSS 变量进行主题定制：

```css
/* 自定义主题色 */
.product-list {
  --primary-color: #1890ff;
  --success-color: #52c41a;
  --warning-color: #faad14;
  --error-color: #ff4d4f;
}
```

## 注意事项

1. 商品图片建议使用统一的宽高比例，推荐 1:1 或 4:3
2. 促销标签建议不超过 3 个，保持界面简洁
3. 商品详情的富文本内容需要确保安全性，避免 XSS 攻击
4. 在使用规格选择功能时，需要根据实际业务逻辑处理规格联动
5. 组件内部已处理了图片加载失败的情况，会显示默认图片