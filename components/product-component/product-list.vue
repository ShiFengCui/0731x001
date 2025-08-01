<template>
  <view class="product-list">
    <view class="list-header" v-if="title">
      <text class="header-title">{{ title }}</text>
      <text class="header-count" v-if="showCount">({{ productList.length }})</text>
    </view>
    
    <view class="product-grid" :class="{ 'grid-single': layout === 'single' }">
      <view 
        v-for="product in productList" 
        :key="product.id" 
        class="product-item"
        @click="handleProductClick(product)"
      >
        <!-- 商品图片 -->
        <view class="product-image">
          <image 
            :src="product.image || defaultImage" 
            mode="aspectFill" 
            class="image"
            @error="handleImageError"
          />
          <!-- 促销标签 -->
          <view v-if="product.tags && product.tags.length" class="product-tags">
            <text 
              v-for="tag in product.tags.slice(0, 2)" 
              :key="tag" 
              class="tag"
              :class="getTagClass(tag)"
            >
              {{ tag }}
            </text>
          </view>
        </view>
        
        <!-- 商品信息 -->
        <view class="product-info">
          <text class="product-title" :class="{ 'title-ellipsis': titleEllipsis }">
            {{ product.title }}
          </text>
          <text v-if="product.description" class="product-desc">
            {{ product.description }}
          </text>
          
          <!-- 价格区域 -->
          <view class="price-section">
            <view class="price-info">
              <text class="current-price">¥{{ formatPrice(product.price) }}</text>
              <text 
                v-if="product.originalPrice && product.originalPrice > product.price" 
                class="original-price"
              >
                ¥{{ formatPrice(product.originalPrice) }}
              </text>
            </view>
            <text v-if="product.sales" class="sales-info">已售{{ product.sales }}</text>
          </view>
          
          <!-- 规格信息 -->
          <view v-if="product.specs && product.specs.length" class="specs-section">
            <text 
              v-for="spec in product.specs.slice(0, 3)" 
              :key="spec" 
              class="spec-item"
            >
              {{ spec }}
            </text>
          </view>
          
          <!-- 操作按钮 -->
          <view class="product-actions" v-if="showActions">
            <button 
              v-if="showAddCart"
              class="action-btn add-cart-btn" 
              size="mini"
              @click.stop="handleAddToCart(product)"
            >
              加购物车
            </button>
            <button 
              v-if="showBuyNow"
              class="action-btn buy-now-btn" 
              size="mini" 
              type="primary"
              @click.stop="handleBuyNow(product)"
            >
              立即购买
            </button>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 空状态 -->
    <view v-if="!productList.length" class="empty-state">
      <text class="empty-text">暂无商品数据</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'ProductList',
  props: {
    // 商品列表数据
    productList: {
      type: Array,
      default: () => []
    },
    // 列表标题
    title: {
      type: String,
      default: ''
    },
    // 是否显示商品数量
    showCount: {
      type: Boolean,
      default: false
    },
    // 布局方式: grid-网格布局, single-单列布局
    layout: {
      type: String,
      default: 'grid',
      validator: value => ['grid', 'single'].includes(value)
    },
    // 标题是否省略
    titleEllipsis: {
      type: Boolean,
      default: true
    },
    // 是否显示操作按钮
    showActions: {
      type: Boolean,
      default: true
    },
    // 是否显示加入购物车按钮
    showAddCart: {
      type: Boolean,
      default: true
    },
    // 是否显示立即购买按钮
    showBuyNow: {
      type: Boolean,
      default: true
    },
    // 默认图片
    defaultImage: {
      type: String,
      default: '/static/logo.png'
    }
  },
  methods: {
    // 格式化价格
    formatPrice(price) {
      return typeof price === 'number' ? price.toFixed(2) : '0.00'
    },
    
    // 获取标签样式类
    getTagClass(tag) {
      const tagMap = {
        '新品': 'tag-new',
        '热销': 'tag-hot',
        '特价': 'tag-sale',
        '限时': 'tag-limited',
        '包邮': 'tag-free-shipping'
      }
      return tagMap[tag] || 'tag-default'
    },
    
    // 处理商品点击
    handleProductClick(product) {
      this.$emit('productClick', product)
    },
    
    // 处理加入购物车
    handleAddToCart(product) {
      this.$emit('addToCart', product)
    },
    
    // 处理立即购买
    handleBuyNow(product) {
      this.$emit('buyNow', product)
    },
    
    // 处理图片加载失败
    handleImageError(e) {
      e.target.src = this.defaultImage
    }
  }
}
</script><style scoped>
.product-list {
  padding: 20rpx;
}

.list-header {
  display: flex;
  align-items: center;
  margin-bottom: 30rpx;
  padding: 0 10rpx;
}

.header-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.header-count {
  font-size: 28rpx;
  color: #666;
  margin-left: 10rpx;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
}

.grid-single {
  grid-template-columns: 1fr;
}

.product-item {
  background: #fff;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.product-item:active {
  transform: scale(0.98);
}

.product-image {
  position: relative;
  width: 100%;
  height: 300rpx;
}

.grid-single .product-image {
  height: 200rpx;
}

.image {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}

.product-tags {
  position: absolute;
  top: 10rpx;
  left: 10rpx;
  display: flex;
  flex-direction: column;
  gap: 6rpx;
}

.tag {
  padding: 4rpx 12rpx;
  border-radius: 20rpx;
  font-size: 20rpx;
  color: #fff;
  font-weight: bold;
  text-align: center;
  min-width: 60rpx;
}

.tag-new {
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
}

.tag-hot {
  background: linear-gradient(135deg, #ff9500, #ffad33);
}

.tag-sale {
  background: linear-gradient(135deg, #52c41a, #73d13d);
}

.tag-limited {
  background: linear-gradient(135deg, #1890ff, #40a9ff);
}

.tag-free-shipping {
  background: linear-gradient(135deg, #722ed1, #9254de);
}

.tag-default {
  background: linear-gradient(135deg, #666, #888);
}

.product-info {
  padding: 20rpx;
}

.product-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  line-height: 1.4;
  margin-bottom: 8rpx;
}

.title-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-desc {
  font-size: 24rpx;
  color: #666;
  line-height: 1.3;
  margin-bottom: 12rpx;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.price-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12rpx;
}

.price-info {
  display: flex;
  align-items: baseline;
  gap: 10rpx;
}

.current-price {
  font-size: 32rpx;
  font-weight: bold;
  color: #ff4d4f;
}

.original-price {
  font-size: 24rpx;
  color: #999;
  text-decoration: line-through;
}

.sales-info {
  font-size: 22rpx;
  color: #999;
}

.specs-section {
  display: flex;
  flex-wrap: wrap;
  gap: 8rpx;
  margin-bottom: 16rpx;
}

.spec-item {
  padding: 6rpx 12rpx;
  background: #f5f5f5;
  border-radius: 20rpx;
  font-size: 22rpx;
  color: #666;
}

.product-actions {
  display: flex;
  gap: 12rpx;
  margin-top: 16rpx;
}

.action-btn {
  flex: 1;
  padding: 16rpx 0;
  border-radius: 50rpx;
  font-size: 24rpx;
  font-weight: bold;
  border: none;
}

.add-cart-btn {
  background: #fff;
  color: #1890ff;
  border: 2rpx solid #1890ff;
}

.buy-now-btn {
  background: linear-gradient(135deg, #1890ff, #40a9ff);
  color: #fff;
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100rpx 0;
}

.empty-text {
  font-size: 28rpx;
  color: #999;
}

/* 单列布局特殊样式 */
.grid-single .product-item {
  display: flex;
  padding: 20rpx;
}

.grid-single .product-image {
  flex: 0 0 200rpx;
  height: 150rpx;
  margin-right: 20rpx;
  border-radius: 12rpx;
  overflow: hidden;
}

.grid-single .product-info {
  flex: 1;
  padding: 0;
}

.grid-single .product-actions {
  margin-top: 20rpx;
}

/* 响应式设计 */
@media (max-width: 750rpx) {
  .product-grid {
    gap: 15rpx;
  }
  
  .product-image {
    height: 250rpx;
  }
  
  .product-title {
    font-size: 26rpx;
  }
  
  .current-price {
    font-size: 28rpx;
  }
}
</style>