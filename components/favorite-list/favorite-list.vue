<template>
  <view class="favorite-list">
    <!-- 搜索栏 -->
    <view class="search-section" v-if="showSearch">
      <view class="search-input-wrapper">
        <uni-icons type="search" size="20" color="#999" class="search-icon"></uni-icons>
        <input 
          v-model="searchKeyword" 
          class="search-input" 
          placeholder="搜索收藏的商品" 
          @input="handleSearch"
        />
        <view v-if="searchKeyword" class="clear-btn" @click="clearSearch">
          <uni-icons type="clear" size="16" color="#999"></uni-icons>
        </view>
      </view>
    </view>

    <!-- 筛选和排序 -->
    <view class="filter-section" v-if="showFilter">
      <view class="filter-tags">
        <text 
          v-for="category in categories" 
          :key="category.id" 
          class="filter-tag"
          :class="{ 'active': selectedCategory === category.id }"
          @click="handleCategoryFilter(category.id)"
        >
          {{ category.name }}
        </text>
      </view>
      <view class="sort-selector">
        <picker 
          :value="sortIndex" 
          :range="sortOptions"
          range-key="name"
          @change="handleSortChange"
        >
          <view class="sort-display">
            <text class="sort-text">{{ sortOptions[sortIndex].name }}</text>
            <uni-icons type="arrowdown" size="14" color="#666"></uni-icons>
          </view>
        </picker>
      </view>
    </view>

    <!-- 列表头部 -->
    <view class="list-header" v-if="title || showCount">
      <view class="header-left">
        <text class="header-title" v-if="title">{{ title }}</text>
        <text class="header-count" v-if="showCount">({{ filteredList.length }})</text>
      </view>
      <view class="header-actions">
        <view class="layout-toggle" @click="toggleLayout">
          <uni-icons 
            :type="layout === 'grid' ? 'list' : 'th'" 
            size="18" 
            color="#666"
          ></uni-icons>
        </view>
        <view v-if="showBatchDelete" class="batch-manage" @click="toggleBatchMode">
          <text class="batch-text">{{ batchMode ? '完成' : '管理' }}</text>
        </view>
      </view>
    </view>

    <!-- 批量操作栏 -->
    <view v-if="batchMode" class="batch-actions">
      <view class="batch-select">
        <text class="select-all" @click="toggleSelectAll">
          {{ isAllSelected ? '取消全选' : '全选' }}
        </text>
        <text class="selected-count">已选择 {{ selectedItems.length }} 项</text>
      </view>
      <view class="batch-buttons">
        <button 
          class="batch-btn delete-btn" 
          size="mini" 
          :disabled="selectedItems.length === 0"
          @click="handleBatchDelete"
        >
          删除收藏
        </button>
      </view>
    </view>

    <!-- 收藏商品列表 -->
    <view class="favorite-grid" :class="{ 'grid-single': layout === 'single' }" v-if="filteredList.length">
      <view 
        v-for="item in filteredList" 
        :key="item.id" 
        class="favorite-item"
        :class="{ 'selected': selectedItems.includes(item.id) }"
        @click="handleItemClick(item)"
      >
        <!-- 批量选择 -->
        <view v-if="batchMode" class="select-checkbox" @click.stop="toggleItemSelect(item.id)">
          <uni-icons 
            :type="selectedItems.includes(item.id) ? 'checkbox-filled' : 'circle'" 
            :size="20" 
            :color="selectedItems.includes(item.id) ? '#1890ff' : '#ddd'"
          ></uni-icons>
        </view>

        <!-- 商品图片 -->
        <view class="product-image">
          <image 
            :src="item.image || defaultImage" 
            mode="aspectFill" 
            class="image"
            @error="handleImageError"
          />
          <view class="favorite-badge">
            <uni-icons type="heart-filled" size="16" color="#ff4757"></uni-icons>
          </view>
        </view>

        <!-- 商品信息 -->
        <view class="product-info">
          <text class="product-title">{{ item.title }}</text>
          <text v-if="item.description" class="product-desc">{{ item.description }}</text>
          
          <!-- 价格信息 -->
          <view class="price-section">
            <text class="current-price">¥{{ formatPrice(item.price) }}</text>
            <text 
              v-if="item.originalPrice && item.originalPrice > item.price" 
              class="original-price"
            >
              ¥{{ formatPrice(item.originalPrice) }}
            </text>
          </view>

          <!-- 收藏时间 -->
          <view class="favorite-info">
            <text class="favorite-time">{{ formatFavoriteTime(item.favoriteTime) }}</text>
            <text v-if="item.category" class="category-tag">{{ item.category }}</text>
          </view>

          <!-- 操作按钮 -->
          <view class="item-actions" v-if="!batchMode">
            <button 
              class="action-btn remove-btn" 
              size="mini"
              @click.stop="handleRemoveFavorite(item)"
            >
              取消收藏
            </button>
            <button 
              class="action-btn view-btn" 
              size="mini" 
              type="primary"
              @click.stop="handleViewProduct(item)"
            >
              查看商品
            </button>
          </view>
        </view>
      </view>
    </view>

    <!-- 空状态 -->
    <view v-else class="empty-state">
      <view class="empty-icon">
        <uni-icons type="heart" size="60" color="#ddd"></uni-icons>
      </view>
      <text class="empty-title">暂无收藏商品</text>
      <text class="empty-desc">快去收藏你喜欢的商品吧</text>
      <button class="browse-btn" size="small" type="primary" @click="handleBrowseProducts">
        去逛逛
      </button>
    </view>
  </view>
</template>

<script>
export default {
  name: 'FavoriteList',
  props: {
    // 收藏列表数据
    favoriteList: {
      type: Array,
      default: () => []
    },
    // 列表标题
    title: {
      type: String,
      default: '我的收藏'
    },
    // 是否显示商品数量
    showCount: {
      type: Boolean,
      default: true
    },
    // 布局方式: grid-网格布局, single-单列布局
    layout: {
      type: String,
      default: 'grid',
      validator: value => ['grid', 'single'].includes(value)
    },
    // 是否显示搜索功能
    showSearch: {
      type: Boolean,
      default: true
    },
    // 是否显示筛选功能
    showFilter: {
      type: Boolean,
      default: true
    },
    // 是否显示批量删除功能
    showBatchDelete: {
      type: Boolean,
      default: true
    },
    // 默认图片
    defaultImage: {
      type: String,
      default: '/static/logo.png'
    },
    // 商品分类
    categories: {
      type: Array,
      default: () => [
        { id: 'all', name: '全部' },
        { id: 'electronics', name: '数码' },
        { id: 'clothing', name: '服装' },
        { id: 'books', name: '图书' },
        { id: 'food', name: '食品' }
      ]
    }
  },
  data() {
    return {
      // 搜索关键词
      searchKeyword: '',
      // 选择的分类
      selectedCategory: 'all',
      // 排序选项
      sortOptions: [
        { key: 'time', name: '收藏时间', order: 'desc' },
        { key: 'price', name: '价格从低到高', order: 'asc' },
        { key: 'price', name: '价格从高到低', order: 'desc' },
        { key: 'title', name: '商品名称', order: 'asc' }
      ],
      // 当前排序索引
      sortIndex: 0,
      // 批量管理模式
      batchMode: false,
      // 已选择的项目
      selectedItems: [],
      // 布局方式（内部状态）
      currentLayout: 'grid'
    }
  },
  computed: {
    // 筛选后的列表
    filteredList() {
      let list = [...this.favoriteList]
      
      // 搜索筛选
      if (this.searchKeyword.trim()) {
        const keyword = this.searchKeyword.toLowerCase()
        list = list.filter(item => 
          item.title.toLowerCase().includes(keyword) ||
          (item.description && item.description.toLowerCase().includes(keyword))
        )
      }
      
      // 分类筛选
      if (this.selectedCategory !== 'all') {
        list = list.filter(item => item.categoryId === this.selectedCategory)
      }
      
      // 排序
      const sortOption = this.sortOptions[this.sortIndex]
      list.sort((a, b) => {
        let aValue = a[sortOption.key]
        let bValue = b[sortOption.key]
        
        if (sortOption.key === 'time') {
          aValue = new Date(a.favoriteTime).getTime()
          bValue = new Date(b.favoriteTime).getTime()
        } else if (sortOption.key === 'title') {
          aValue = aValue.toLowerCase()
          bValue = bValue.toLowerCase()
        }
        
        if (sortOption.order === 'asc') {
          return aValue > bValue ? 1 : -1
        } else {
          return aValue < bValue ? 1 : -1
        }
      })
      
      return list
    },
    // 是否全选
    isAllSelected() {
      return this.filteredList.length > 0 && this.selectedItems.length === this.filteredList.length
    }
  },
  watch: {
    layout: {
      immediate: true,
      handler(newVal) {
        this.currentLayout = newVal
      }
    }
  },
  methods: {
    // 格式化价格
    formatPrice(price) {
      return typeof price === 'number' ? price.toFixed(2) : '0.00'
    },
    
    // 格式化收藏时间
    formatFavoriteTime(time) {
      if (!time) return ''
      const date = new Date(time)
      const now = new Date()
      const diff = now.getTime() - date.getTime()
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      
      if (days === 0) {
        return '今天收藏'
      } else if (days === 1) {
        return '昨天收藏'
      } else if (days < 30) {
        return `${days}天前收藏`
      } else {
        return date.toLocaleDateString()
      }
    },
    
    // 搜索处理
    handleSearch() {
      // 实时搜索，已通过计算属性实现
    },
    
    // 清空搜索
    clearSearch() {
      this.searchKeyword = ''
    },
    
    // 分类筛选
    handleCategoryFilter(categoryId) {
      this.selectedCategory = categoryId
    },
    
    // 排序改变
    handleSortChange(e) {
      this.sortIndex = e.detail.value
    },
    
    // 切换布局
    toggleLayout() {
      this.currentLayout = this.currentLayout === 'grid' ? 'single' : 'grid'
      this.$emit('layoutChange', this.currentLayout)
    },
    
    // 切换批量管理模式
    toggleBatchMode() {
      this.batchMode = !this.batchMode
      if (!this.batchMode) {
        this.selectedItems = []
      }
    },
    
    // 切换全选
    toggleSelectAll() {
      if (this.isAllSelected) {
        this.selectedItems = []
      } else {
        this.selectedItems = this.filteredList.map(item => item.id)
      }
    },
    
    // 切换单项选择
    toggleItemSelect(itemId) {
      const index = this.selectedItems.indexOf(itemId)
      if (index > -1) {
        this.selectedItems.splice(index, 1)
      } else {
        this.selectedItems.push(itemId)
      }
    },
    
    // 批量删除
    handleBatchDelete() {
      if (this.selectedItems.length === 0) return
      
      uni.showModal({
        title: '确认删除',
        content: `确定要删除选中的 ${this.selectedItems.length} 项收藏吗？`,
        success: (res) => {
          if (res.confirm) {
            this.$emit('batchRemove', this.selectedItems)
            this.selectedItems = []
            this.batchMode = false
            uni.showToast({
              title: '删除成功',
              icon: 'success'
            })
          }
        }
      })
    },
    
    // 点击商品项
    handleItemClick(item) {
      if (this.batchMode) {
        this.toggleItemSelect(item.id)
      } else {
        this.$emit('itemClick', item)
      }
    },
    
    // 取消收藏
    handleRemoveFavorite(item) {
      uni.showModal({
        title: '取消收藏',
        content: '确定要取消收藏这个商品吗？',
        success: (res) => {
          if (res.confirm) {
            this.$emit('removeFavorite', item)
            uni.showToast({
              title: '已取消收藏',
              icon: 'success'
            })
          }
        }
      })
    },
    
    // 查看商品
    handleViewProduct(item) {
      this.$emit('viewProduct', item)
    },
    
    // 去逛逛
    handleBrowseProducts() {
      this.$emit('browseProducts')
    },
    
    // 处理图片加载失败
    handleImageError(e) {
      e.target.src = this.defaultImage
    }
  }
}
</script>

<style scoped>
.favorite-list {
  padding: 20rpx;
  background-color: #f8f8f8;
}

/* 搜索区域 */
.search-section {
  margin-bottom: 20rpx;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 50rpx;
  padding: 0 30rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.search-icon {
  margin-right: 20rpx;
}

.search-input {
  flex: 1;
  height: 80rpx;
  font-size: 28rpx;
  color: #333;
}

.clear-btn {
  padding: 10rpx;
  margin-left: 10rpx;
}

/* 筛选区域 */
.filter-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
  padding: 20rpx;
  background: #fff;
  border-radius: 16rpx;
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.filter-tag {
  padding: 12rpx 24rpx;
  background: #f5f5f5;
  color: #666;
  border-radius: 50rpx;
  font-size: 24rpx;
  transition: all 0.2s ease;
}

.filter-tag.active {
  background: #1890ff;
  color: #fff;
}

.sort-selector {
  margin-left: 20rpx;
}

.sort-display {
  display: flex;
  align-items: center;
  gap: 8rpx;
  padding: 12rpx 20rpx;
  background: #f5f5f5;
  border-radius: 50rpx;
  font-size: 24rpx;
  color: #666;
}

/* 列表头部 */
.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
  padding: 0 10rpx;
}

.header-left {
  display: flex;
  align-items: center;
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

.header-actions {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.layout-toggle, .batch-manage {
  padding: 12rpx;
  border-radius: 8rpx;
  background: #fff;
  box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.1);
}

.batch-text {
  font-size: 24rpx;
  color: #1890ff;
}

/* 批量操作栏 */
.batch-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx;
  margin-bottom: 20rpx;
  background: #fff;
  border-radius: 16rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.batch-select {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.select-all {
  font-size: 28rpx;
  color: #1890ff;
}

.selected-count {
  font-size: 24rpx;
  color: #666;
}

.batch-buttons {
  display: flex;
  gap: 12rpx;
}

.batch-btn {
  padding: 16rpx 32rpx;
  border-radius: 50rpx;
  font-size: 24rpx;
  border: none;
}

.delete-btn {
  background: #ff4757;
  color: #fff;
}

.delete-btn[disabled] {
  background: #ddd;
  color: #999;
}

/* 收藏列表 */
.favorite-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
}

.grid-single {
  grid-template-columns: 1fr;
}

.favorite-item {
  position: relative;
  background: #fff;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.favorite-item:active {
  transform: scale(0.98);
}

.favorite-item.selected {
  border: 4rpx solid #1890ff;
}

.select-checkbox {
  position: absolute;
  top: 16rpx;
  left: 16rpx;
  z-index: 10;
  width: 40rpx;
  height: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
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

.favorite-badge {
  position: absolute;
  top: 12rpx;
  right: 12rpx;
  width: 36rpx;
  height: 36rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
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
  align-items: baseline;
  gap: 10rpx;
  margin-bottom: 12rpx;
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

.favorite-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
}

.favorite-time {
  font-size: 22rpx;
  color: #999;
}

.category-tag {
  padding: 4rpx 12rpx;
  background: #f0f0f0;
  color: #666;
  border-radius: 20rpx;
  font-size: 20rpx;
}

.item-actions {
  display: flex;
  gap: 12rpx;
}

.action-btn {
  flex: 1;
  padding: 16rpx 0;
  border-radius: 50rpx;
  font-size: 24rpx;
  font-weight: bold;
  border: none;
}

.remove-btn {
  background: #fff;
  color: #ff4757;
  border: 2rpx solid #ff4757;
}

.view-btn {
  background: linear-gradient(135deg, #1890ff, #40a9ff);
  color: #fff;
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100rpx 0;
  text-align: center;
}

.empty-icon {
  margin-bottom: 30rpx;
}

.empty-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 16rpx;
}

.empty-desc {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 40rpx;
}

.browse-btn {
  padding: 20rpx 60rpx;
  border-radius: 50rpx;
  background: linear-gradient(135deg, #1890ff, #40a9ff);
  color: #fff;
  font-size: 28rpx;
  font-weight: bold;
  border: none;
}

/* 单列布局特殊样式 */
.grid-single .favorite-item {
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

.grid-single .item-actions {
  margin-top: 20rpx;
}

/* 响应式设计 */
@media (max-width: 750rpx) {
  .favorite-grid {
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
  
  .filter-tags {
    flex-wrap: wrap;
  }
}
</style>