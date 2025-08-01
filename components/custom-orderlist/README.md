# CustomOrderList 订单列表组件

## 简介

`CustomOrderList` 是一个专业的订单列表组件，用于显示订单信息，包含订单号、状态、商品信息、价格等，支持不同订单状态下的操作按钮。

## 功能特性

- 📦 订单信息完整展示（订单号、状态、时间、金额）
- 🛍️ 商品列表展示（图片、名称、规格、价格、数量）
- 🎯 订单状态智能识别与显示
- 🔘 基于状态的操作按钮动态展示
- 📱 响应式设计，支持多平台
- 🎨 美观的UI设计，符合现代设计规范
- ⚡ 高性能，支持大量订单列表展示
- 🔧 灵活的事件处理机制

## 订单状态支持

| 状态值 | 显示文本 | 可用操作 |
|--------|----------|----------|
| pending | 待支付 | 取消订单、立即支付 |
| paid | 已支付 | 提醒发货 |
| shipped | 已发货 | 查看物流、确认收货 |
| completed | 已完成 | 去评价、再次购买 |
| cancelled | 已取消 | - |
| refunding | 退款中 | - |
| refunded | 已退款 | - |

## 安装使用

### 1. 组件引入

```javascript
import CustomOrderList from '@/components/custom-orderlist/custom-orderlist.vue'

export default {
  components: {
    CustomOrderList
  }
}
```

### 2. 基础使用

```vue
<template>
  <custom-order-list 
    :order-data="orderData"
    @orderClick="onOrderClick"
    @pay="onPay"
    @detail="onDetail"
  />
</template>

<script>
export default {
  data() {
    return {
      orderData: {
        orderNo: 'PO202412120001',
        status: 'pending',
        createTime: '2024-12-12 14:30:00',
        totalAmount: 299.00,
        goodsCount: 1,
        goodsList: [{
          image: '/static/goods1.jpg',
          name: '商品名称',
          spec: '规格信息',
          price: 299.00,
          quantity: 1
        }]
      }
    }
  },
  methods: {
    onOrderClick(orderData) {
      console.log('点击订单:', orderData);
    },
    onPay(orderData) {
      console.log('支付订单:', orderData);
    },
    onDetail(orderData) {
      console.log('查看详情:', orderData);
    }
  }
}
</script>
```

## API 参数

### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| orderData | Object | {} | 订单数据对象 |
| imageMode | String | 'aspectFill' | 图片显示模式 |
| shadow | Boolean | true | 是否显示阴影 |
| border | Boolean | true | 是否显示边框 |
| margin | String | '15rpx' | 外边距 |
| lazyLoad | Boolean | true | 图片懒加载 |
| showActions | Boolean | true | 是否显示操作按钮 |

### orderData 对象结构

```javascript
{
  orderNo: '',         // 订单号
  status: 'pending',   // 订单状态
  createTime: '',      // 创建时间
  totalAmount: 0,      // 总金额
  goodsCount: 0,       // 商品总数
  goodsList: [         // 商品列表
    {
      image: '',       // 商品图片
      name: '',        // 商品名称
      spec: '',        // 商品规格
      price: 0,        // 商品价格
      quantity: 1      // 商品数量
    }
  ]
}
```

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| orderClick | 点击订单时触发 | orderData |
| pay | 点击支付按钮时触发 | orderData |
| cancel | 点击取消订单时触发 | orderData |
| confirm | 点击确认收货时触发 | orderData |
| evaluate | 点击评价按钮时触发 | orderData |
| logistics | 点击查看物流时触发 | orderData |
| detail | 点击查看详情时触发 | orderData |
| remind | 点击提醒发货时触发 | orderData |
| rebuy | 点击再次购买时触发 | orderData |

## 使用示例

### 待支付订单

```vue
<custom-order-list 
  :order-data="{
    orderNo: 'PO202412120001',
    status: 'pending',
    createTime: '2024-12-12 14:30:00',
    totalAmount: 299.00,
    goodsCount: 1,
    goodsList: [{
      image: '/static/goods1.jpg',
      name: 'uni-app开发框架学习教程',
      spec: '电子版',
      price: 299.00,
      quantity: 1
    }]
  }"
  @pay="handlePay"
  @cancel="handleCancel"
/>
```

### 多商品订单

```vue
<custom-order-list 
  :order-data="{
    orderNo: 'PO202412090005',
    status: 'completed',
    createTime: '2024-12-09 20:30:00',
    totalAmount: 567.80,
    goodsCount: 3,
    goodsList: [
      {
        image: '/static/goods1.jpg',
        name: 'TypeScript实战指南',
        spec: '精装版',
        price: 189.00,
        quantity: 1
      },
      {
        image: '/static/goods2.jpg',
        name: 'Node.js开发实战',
        spec: '电子版',
        price: 129.90,
        quantity: 2
      }
    ]
  }"
  @evaluate="handleEvaluate"
  @rebuy="handleRebuy"
/>
```

### 自定义样式

```vue
<custom-order-list 
  :order-data="orderData"
  :shadow="false"
  :border="false"
  margin="20rpx"
  @orderClick="onOrderClick"
/>
```

### 隐藏操作按钮

```vue
<custom-order-list 
  :order-data="orderData"
  :show-actions="false"
  @orderClick="onOrderClick"
/>
```

## 事件处理示例

```javascript
export default {
  methods: {
    // 支付订单
    handlePay(orderData) {
      uni.navigateTo({
        url: `/pages/pay/index?orderNo=${orderData.orderNo}`
      });
    },
    
    // 取消订单
    handleCancel(orderData) {
      uni.showModal({
        title: '取消订单',
        content: '确定要取消这个订单吗？',
        success: (res) => {
          if (res.confirm) {
            // 调用取消订单API
            this.cancelOrder(orderData.orderNo);
          }
        }
      });
    },
    
    // 确认收货
    handleConfirm(orderData) {
      uni.showModal({
        title: '确认收货',
        content: '确定已收到商品吗？',
        success: (res) => {
          if (res.confirm) {
            // 调用确认收货API
            this.confirmOrder(orderData.orderNo);
          }
        }
      });
    },
    
    // 查看物流
    handleLogistics(orderData) {
      uni.navigateTo({
        url: `/pages/logistics/index?orderNo=${orderData.orderNo}`
      });
    },
    
    // 订单评价
    handleEvaluate(orderData) {
      uni.navigateTo({
        url: `/pages/evaluate/index?orderNo=${orderData.orderNo}`
      });
    }
  }
}
```

## 样式自定义

组件使用 SCSS 编写样式，支持以下样式变量自定义：

```scss
$border-color: #EBEEF5;        // 边框颜色
$shadow-color: rgba(0, 0, 0, 0.1); // 阴影颜色
$primary-color: #007AFF;       // 主色调
$warning-color: #FF9500;       // 警告色
$success-color: #34C759;       // 成功色
$danger-color: #FF3B30;        // 危险色
$text-color: #333333;          // 主文本颜色
$text-color-light: #666666;    // 次要文本颜色
$text-color-lighter: #999999;  // 辅助文本颜色
$background-color: #FFFFFF;    // 背景颜色
```

## 注意事项

1. **数据格式**：确保 `orderData` 对象包含所有必需字段
2. **图片资源**：商品图片建议使用网络地址或正确的本地路径
3. **事件处理**：根据业务需求实现相应的事件处理逻辑
4. **状态管理**：建议配合状态管理工具使用，便于订单状态同步更新
5. **性能优化**：大量订单时建议使用虚拟列表或分页加载

## 更新日志

### v1.0.0
- 初始版本发布
- 支持完整的订单信息展示
- 支持多种订单状态和操作按钮
- 支持多商品订单展示
- 支持自定义样式配置 