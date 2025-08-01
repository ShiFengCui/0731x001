<template>
  <view class="product-detail">
    <!-- 商品图片轮播 -->
    <view class="product-gallery">
      <swiper 
        class="gallery-swiper" 
        :indicator-dots="true" 
        :autoplay="false"
        :circular="true"
        indicator-color="#ffffff60"
        indicator-active-color="#fff"
      >
        <swiper-item v-for="(image, index) in productImages" :key="index">
          <image 
            :src="image" 
            mode="aspectFill" 
            class="gallery-image"
            @click="previewImage(index)"
          />
        </swiper-item>
      </swiper>
      
      <!-- 促销标签 -->
      <view v-if="productData.tags && productData.tags.length" class="detail-tags">
        <text 
          v-for="tag in productData.tags" 
          :key="tag" 
          class="detail-tag"
          :class="getTagClass(tag)"
        >
          {{ tag }}
        </text>
      </view>
    </view>
    
    <!-- 商品基本信息 -->
    <view class="product-basic-info">
      <!-- 价格区域 -->
      <view class="price-section">
        <view class="price-main">
          <text class="current-price">¥{{ formatPrice(productData.price) }}</text>
          <text 
            v-if="productData.originalPrice && productData.originalPrice > productData.price" 
            class="original-price"
          >
            ¥{{ formatPrice(productData.originalPrice) }}
          </text>
        </view>
        <view class="price-extra">
          <text v-if="productData.sales" class="sales-count">已售{{ productData.sales }}</text>
          <text v-if="productData.stock !== undefined" class="stock-count">
            库存{{ productData.stock }}件
          </text>
        </view>
      </view>
      
      <!-- 商品标题和描述 -->
      <view class="title-section">
        <text class="product-title">{{ productData.title }}</text>
        <text v-if="productData.description" class="product-subtitle">
          {{ productData.description }}
        </text>
      </view>
      
      <!-- 商品评分 -->
      <view v-if="productData.rating" class="rating-section">
        <view class="rating-stars">
          <text 
            v-for="i in 5" 
            :key="i" 
            class="star"
            :class="{ 'star-filled': i <= Math.floor(productData.rating) }"
          >
            ★
          </text>
        </view>
        <text class="rating-score">{{ productData.rating }}</text>
        <text v-if="productData.reviewCount" class="review-count">
          ({{ productData.reviewCount }}条评价)
        </text>
      </view>
    </view>
    
    <!-- 规格选择 -->
    <view v-if="productData.specifications && productData.specifications.length" class="spec-section">
      <view class="section-title">
        <text class="title-text">选择规格</text>
      </view>
      <view 
        v-for="spec in productData.specifications" 
        :key="spec.name" 
        class="spec-group"
      >
        <text class="spec-name">{{ spec.name }}:</text>
        <view class="spec-options">
          <text 
            v-for="option in spec.options" 
            :key="option.value"
            class="spec-option"
            :class="{ 
              'option-selected': selectedSpecs[spec.name] === option.value,
              'option-disabled': option.disabled 
            }"
            @click="selectSpec(spec.name, option)"
          >
            {{ option.label }}
          </text>
        </view>
      </view>
    </view>
    
    <!-- 数量选择 -->
    <view class="quantity-section">
      <view class="section-title">
        <text class="title-text">购买数量</text>
      </view>
      <view class="quantity-selector">
        <button 
          class="quantity-btn" 
          :disabled="quantity <= 1"
          @click="changeQuantity(-1)"
        >
          -
        </button>
        <input 
          class="quantity-input" 
          type="number" 
          :value="quantity"
          @input="onQuantityInput"
        />
        <button 
          class="quantity-btn" 
          :disabled="quantity >= maxQuantity"
          @click="changeQuantity(1)"
        >
          +
        </button>
      </view>
    </view>
    
    <!-- 商品详情描述 -->
    <view v-if="productData.details" class="detail-section">
      <view class="section-title">
        <text class="title-text">商品详情</text>
      </view>
      <view class="detail-content">
        <rich-text :nodes="productData.details" />
      </view>
    </view>
    
    <!-- 底部操作栏 -->
    <view class="bottom-actions">
      <button 
        v-if="showAddCart"
        class="action-btn add-cart-btn" 
        @click="handleAddToCart"
        :disabled="!canAddToCart"
      >
        加入购物车
      </button>
      <button 
        v-if="showBuyNow"
        class="action-btn buy-now-btn" 
        @click="handleBuyNow"
        :disabled="!canBuyNow"
      >
        立即购买
      </button>
    </view>
  </view>
</template>

<script>
export default {
  name: 'ProductDetail',
  props: {
    // 商品详情数据
    productData: {
      type: Object,
      default: () => ({
        id: '',
        title: '商品名称',
        description: '',
        price: 0,
        originalPrice: 0,
        images: [],
        tags: [],
        sales: 0,
        stock: 0,
        rating: 0,
        reviewCount: 0,
        specifications: [],
        details: ''
      })
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
    // 最大购买数量
    maxQuantity: {
      type: Number,
      default: 99
    }
  },
  data() {
    return {
      quantity: 1,
      selectedSpecs: {}
    }
  },
  computed: {
    // 商品图片列表
    productImages() {
      return this.productData.images && this.productData.images.length 
        ? this.productData.images 
        : ['/static/logo.png']
    },
    
    // 是否可以加入购物车
    canAddToCart() {
      return this.quantity > 0 && this.checkSpecsSelected()
    },
    
    // 是否可以立即购买
    canBuyNow() {
      return this.quantity > 0 && this.checkSpecsSelected()
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
    
    // 预览图片
    previewImage(index) {
      uni.previewImage({
        urls: this.productImages,
        current: index
      })
    },
    
    // 选择规格
    selectSpec(specName, option) {
      if (option.disabled) return
      
      this.$set(this.selectedSpecs, specName, option.value)
      this.$emit('specChange', {
        specName,
        option,
        allSpecs: this.selectedSpecs
      })
    },
    
    // 检查规格是否已选择
    checkSpecsSelected() {
      if (!this.productData.specifications || !this.productData.specifications.length) {
        return true
      }
      
      return this.productData.specifications.every(spec => 
        this.selectedSpecs[spec.name] !== undefined
      )
    },
    
    // 改变数量
    changeQuantity(delta) {
      const newQuantity = this.quantity + delta
      if (newQuantity >= 1 && newQuantity <= this.maxQuantity) {
        this.quantity = newQuantity
        this.$emit('quantityChange', this.quantity)
      }
    },
    
    // 数量输入
    onQuantityInput(e) {
      const value = parseInt(e.detail.value) || 1
      this.quantity = Math.max(1, Math.min(value, this.maxQuantity))
      this.$emit('quantityChange', this.quantity)
    },
    
    // 处理加入购物车
    handleAddToCart() {
      if (!this.canAddToCart) return
      
      const cartData = {
        product: this.productData,
        quantity: this.quantity,
        selectedSpecs: this.selectedSpecs
      }
      
      this.$emit('addToCart', cartData)
    },
    
    // 处理立即购买
    handleBuyNow() {
      if (!this.canBuyNow) return
      
      const orderData = {
        product: this.productData,
        quantity: this.quantity,
        selectedSpecs: this.selectedSpecs
      }
      
      this.$emit('buyNow', orderData)
    }
  }
}
</script><style scoped>
.product-detail {
  background: #f8f9fa;
  min-height: 100vh;
  padding-bottom: 120rpx;
}

/* 商品图片轮播 */
.product-gallery {
  position: relative;
  background: #fff;
}

.gallery-swiper {
  width: 100%;
  height: 750rpx;
}

.gallery-image {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}

.detail-tags {
  position: absolute;
  top: 20rpx;
  left: 20rpx;
  z-index: 10;
  display: flex;
  flex-wrap: wrap;
  gap: 10rpx;
}

.detail-tag {
  padding: 8rpx 16rpx;
  border-radius: 20rpx;
  font-size: 22rpx;
  color: #fff;
  font-weight: bold;
  text-align: center;
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

/* 商品基本信息 */
.product-basic-info {
  background: #fff;
  padding: 30rpx;
  margin-bottom: 20rpx;
}

.price-section {
  margin-bottom: 20rpx;
}

.price-main {
  display: flex;
  align-items: baseline;
  gap: 15rpx;
  margin-bottom: 10rpx;
}

.current-price {
  font-size: 48rpx;
  font-weight: bold;
  color: #ff4d4f;
}

.original-price {
  font-size: 28rpx;
  color: #999;
  text-decoration: line-through;
}

.price-extra {
  display: flex;
  gap: 20rpx;
}

.sales-count,
.stock-count {
  font-size: 24rpx;
  color: #666;
}

.title-section {
  margin-bottom: 20rpx;
}

.product-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  line-height: 1.4;
  margin-bottom: 12rpx;
  display: block;
}

.product-subtitle {
  font-size: 28rpx;
  color: #666;
  line-height: 1.4;
  display: block;
}

.rating-section {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.rating-stars {
  display: flex;
  gap: 4rpx;
}

.star {
  font-size: 28rpx;
  color: #ddd;
}

.star-filled {
  color: #ffd700;
}

.rating-score {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
}

.review-count {
  font-size: 24rpx;
  color: #666;
}

/* 规格选择 */
.spec-section {
  background: #fff;
  padding: 30rpx;
  margin-bottom: 20rpx;
}

.section-title {
  margin-bottom: 20rpx;
}

.title-text {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.spec-group {
  margin-bottom: 30rpx;
}

.spec-name {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 16rpx;
  display: block;
}

.spec-options {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.spec-option {
  padding: 16rpx 24rpx;
  background: #f5f5f5;
  border: 2rpx solid transparent;
  border-radius: 8rpx;
  font-size: 26rpx;
  color: #333;
  transition: all 0.2s ease;
}

.option-selected {
  background: #e6f7ff;
  border-color: #1890ff;
  color: #1890ff;
}

.option-disabled {
  background: #f0f0f0;
  color: #ccc;
  cursor: not-allowed;
}

/* 数量选择 */
.quantity-section {
  background: #fff;
  padding: 30rpx;
  margin-bottom: 20rpx;
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.quantity-btn {
  width: 60rpx;
  height: 60rpx;
  border: 2rpx solid #ddd;
  border-radius: 8rpx;
  background: #fff;
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.quantity-btn:disabled {
  background: #f5f5f5;
  color: #ccc;
  border-color: #f0f0f0;
}

.quantity-input {
  width: 120rpx;
  height: 60rpx;
  border: 2rpx solid #ddd;
  border-radius: 8rpx;
  text-align: center;
  font-size: 28rpx;
  background: #fff;
}

/* 商品详情 */
.detail-section {
  background: #fff;
  padding: 30rpx;
  margin-bottom: 20rpx;
}

.detail-content {
  margin-top: 20rpx;
  line-height: 1.6;
}

/* 底部操作栏 */
.bottom-actions {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  padding: 20rpx 30rpx;
  padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
  box-shadow: 0 -4rpx 12rpx rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 20rpx;
  z-index: 100;
}

.action-btn {
  flex: 1;
  height: 88rpx;
  border-radius: 50rpx;
  font-size: 32rpx;
  font-weight: bold;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-cart-btn {
  background: #fff;
  color: #1890ff;
  border: 2rpx solid #1890ff;
}

.add-cart-btn:disabled {
  background: #f5f5f5;
  color: #ccc;
  border-color: #f0f0f0;
}

.buy-now-btn {
  background: linear-gradient(135deg, #1890ff, #40a9ff);
  color: #fff;
}

.buy-now-btn:disabled {
  background: #f0f0f0;
  color: #ccc;
}

/* 响应式设计 */
@media (max-width: 750rpx) {
  .gallery-swiper {
    height: 600rpx;
  }
  
  .current-price {
    font-size: 40rpx;
  }
  
  .product-title {
    font-size: 32rpx;
  }
  
  .product-subtitle {
    font-size: 26rpx;
  }
  
  .spec-option {
    padding: 12rpx 20rpx;
    font-size: 24rpx;
  }
  
  .action-btn {
    height: 80rpx;
    font-size: 28rpx;
  }
}
</style>