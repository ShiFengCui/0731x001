<template>
  <view class="favorite-demo">
    <view class="demo-header">
      <text class="demo-title">收藏组件演示页面</text>
      <text class="demo-desc">展示收藏组件的各种功能和用法</text>
    </view>
    
    <!-- 基础收藏组件 -->
    <view class="demo-section">
      <text class="section-title">基础收藏列表</text>
      <favorite-list
        :favorite-list="basicFavorites"
        title="我的收藏"
        :show-count="true"
        :show-search="false"
        :show-filter="false"
        :show-batch-delete="false"
        @removeFavorite="handleRemoveFavorite"
        @viewProduct="handleViewProduct"
        @itemClick="handleItemClick"
      />
    </view>
    
    <!-- 完整功能收藏组件 -->
    <view class="demo-section">
      <text class="section-title">完整功能收藏列表</text>
      <favorite-list
        :favorite-list="fullFavorites"
        title="收藏夹"
        :show-count="true"
        :show-search="true"
        :show-filter="true"
        :show-batch-delete="true"
        layout="grid"
        :categories="categories"
        @removeFavorite="handleRemoveFavorite"
        @batchRemove="handleBatchRemove"
        @viewProduct="handleViewProduct"
        @itemClick="handleItemClick"
        @browseProducts="handleBrowseProducts"
        @layoutChange="handleLayoutChange"
      />
    </view>
  </view>
</template>

<script>
import FavoriteList from '@/components/favorite-list/favorite-list.vue'

export default {
  name: 'FavoriteDemo',
  components: {
    FavoriteList
  },
  data() {
    return {
      // 基础收藏数据
      basicFavorites: [
        {
          id: 'basic_001',
          title: 'iPhone 15',
          description: '最新款iPhone，性能强劲',
          image: '/static/logo.png',
          price: 5999,
          originalPrice: 6999,
          category: '数码',
          categoryId: 'electronics',
          favoriteTime: '2024-12-12 14:30:00'
        },
        {
          id: 'basic_002',
          title: '运动鞋',
          description: '轻便舒适，适合运动',
          image: '/static/logo.png',
          price: 299,
          originalPrice: 399,
          category: '服装',
          categoryId: 'clothing',
          favoriteTime: '2024-12-11 16:20:00'
        }
      ],
      
      // 完整功能收藏数据
      fullFavorites: [
        {
          id: 'full_001',
          title: 'MacBook Air M3',
          description: '轻薄本的新标杆，M3芯片强劲性能',
          image: '/static/logo.png',
          price: 8999,
          originalPrice: 9999,
          category: '数码',
          categoryId: 'electronics',
          favoriteTime: '2024-12-12 14:30:00'
        },
        {
          id: 'full_002',
          title: 'AirPods Max',
          description: '顶级头戴式耳机，音质卓越',
          image: '/static/logo.png',
          price: 4399,
          originalPrice: 4899,
          category: '数码',
          categoryId: 'electronics',
          favoriteTime: '2024-12-11 16:20:00'
        },
        {
          id: 'full_003',
          title: '羽绒服',
          description: '保暖舒适，冬季必备',
          image: '/static/logo.png',
          price: 699,
          originalPrice: 899,
          category: '服装',
          categoryId: 'clothing',
          favoriteTime: '2024-12-10 12:15:00'
        },
        {
          id: 'full_004',
          title: '算法导论',
          description: '计算机科学经典教材',
          image: '/static/logo.png',
          price: 128,
          originalPrice: 158,
          category: '图书',
          categoryId: 'books',
          favoriteTime: '2024-12-09 20:30:00'
        },
        {
          id: 'full_005',
          title: '有机牛奶',
          description: '天然有机，营养健康',
          image: '/static/logo.png',
          price: 29,
          originalPrice: 35,
          category: '食品',
          categoryId: 'food',
          favoriteTime: '2024-12-08 09:45:00'
        }
      ],
      
      // 分类配置
      categories: [
        { id: 'all', name: '全部' },
        { id: 'electronics', name: '数码产品' },
        { id: 'clothing', name: '服装鞋帽' },
        { id: 'books', name: '图书音像' },
        { id: 'food', name: '食品饮料' }
      ]
    }
  },
  methods: {
    // 处理取消收藏
    handleRemoveFavorite(item) {
      console.log('取消收藏:', item)
      
      // 从基础收藏中移除
      let index = this.basicFavorites.findIndex(fav => fav.id === item.id)
      if (index > -1) {
        this.basicFavorites.splice(index, 1)
      }
      
      // 从完整收藏中移除
      index = this.fullFavorites.findIndex(fav => fav.id === item.id)
      if (index > -1) {
        this.fullFavorites.splice(index, 1)
      }
      
      uni.showToast({
        title: '已取消收藏',
        icon: 'success'
      })
    },
    
    // 处理批量删除
    handleBatchRemove(itemIds) {
      console.log('批量删除:', itemIds)
      this.fullFavorites = this.fullFavorites.filter(item => !itemIds.includes(item.id))
      uni.showToast({
        title: `已删除${itemIds.length}个收藏`,
        icon: 'success'
      })
    },
    
    // 处理查看商品
    handleViewProduct(item) {
      console.log('查看商品:', item)
      uni.showModal({
        title: '商品详情',
        content: `商品：${item.title}\n价格：¥${item.price}`,
        showCancel: false,
        confirmText: '知道了'
      })
    },
    
    // 处理点击商品
    handleItemClick(item) {
      console.log('点击商品:', item)
      this.handleViewProduct(item)
    },
    
    // 处理去逛逛
    handleBrowseProducts() {
      console.log('去逛逛')
      uni.showToast({
        title: '跳转到商品列表',
        icon: 'success'
      })
    },
    
    // 处理布局变化
    handleLayoutChange(layout) {
      console.log('布局变化:', layout)
      uni.showToast({
        title: `切换到${layout === 'grid' ? '网格' : '列表'}布局`,
        icon: 'none'
      })
    }
  }
}
</script>

<style scoped>
.favorite-demo {
  padding: 30rpx;
  background-color: #f8f8f8;
}

.demo-header {
  text-align: center;
  margin-bottom: 40rpx;
  padding: 40rpx 20rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20rpx;
  color: #fff;
}

.demo-title {
  display: block;
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 16rpx;
}

.demo-desc {
  display: block;
  font-size: 28rpx;
  opacity: 0.9;
}

.demo-section {
  margin-bottom: 60rpx;
}

.section-title {
  display: block;
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 30rpx;
  padding: 0 20rpx;
}
</style>