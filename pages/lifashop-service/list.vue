<template>
  <page-skeleton 
    title="服务项目" 
    :show-header="true"
    :show-back="true"
    @back="onBack"
  >
    <view class="lifashop-service-list">
      <!-- 服务分类 -->
      <view class="category-section">
        <list-group
          title="服务分类"
          :items="categoryList"
          type="bordered"
          :selectable="true"
          @item-click="onCategoryClick"
          @selection-change="onCategoryChange"
        />
      </view>
      
      <!-- 搜索栏 -->
      <view class="search-section">
        <custom-card class="search-card">
          <view class="search-bar">
            <input 
              class="search-input" 
              placeholder="搜索服务项目..." 
              v-model="searchKeyword"
              @input="onSearch"
            />
            <view class="search-icon">🔍</view>
          </view>
        </custom-card>
      </view>
      
      <!-- 服务列表 -->
      <view class="services-section">
        <product-list
          :product-list="filteredServiceList"
          :title="selectedCategoryTitle"
          layout="list"
          @product-click="onServiceClick"
          @add-to-cart="onBookService"
        />
      </view>
    </view>
  </page-skeleton>
</template>

<script>
import PageSkeleton from '@/components/page-skeleton/page-skeleton.vue'
import ListGroup from '@/components/list-group/list-group.vue'
import CustomCard from '@/components/custom-card/custom-card.vue'
import ProductList from '@/components/product-component/product-list.vue'

export default {
  name: 'LifashopServiceList',
  components: {
    PageSkeleton,
    ListGroup,
    CustomCard,
    ProductList
  },
  data() {
    return {
      searchKeyword: '',
      selectedCategory: 'all',
      categoryList: [
        { 
          id: 'all', 
          title: '全部服务', 
          icon: '📋',
          description: '查看所有服务项目',
          selected: true 
        },
        { 
          id: 'basic', 
          title: '洗剪吹', 
          icon: '✂️',
          description: '基础理发服务',
          selected: false 
        },
        { 
          id: 'perm', 
          title: '烫发', 
          icon: '〰️',
          description: '各式烫发造型',
          selected: false 
        },
        { 
          id: 'color', 
          title: '染发', 
          icon: '🎨',
          description: '专业染发服务',
          selected: false 
        },
        { 
          id: 'care', 
          title: '护理', 
          icon: '💆',
          description: '头发护理保养',
          selected: false 
        },
        { 
          id: 'styling', 
          title: '造型设计', 
          icon: '✨',
          description: '个性化造型设计',
          selected: false 
        }
      ],
      serviceList: [
        {
          id: 1,
          name: '精致洗剪吹',
          image: '/static/lifashop/services/cut.jpg',
          price: '88',
          originalPrice: '128',
          description: '专业洗发+精剪+造型，适合日常维护',
          duration: '60分钟',
          category: 'basic',
          tags: ['热门', '基础服务'],
          features: ['专业洗发', '精细修剪', '基础造型']
        },
        {
          id: 2,
          name: '商务男士理发',
          image: '/static/lifashop/services/business-cut.jpg',
          price: '108',
          originalPrice: '148',
          description: '商务人士专属，干练精神',
          duration: '45分钟',
          category: 'basic',
          tags: ['商务', '男士专享'],
          features: ['商务造型', '精准修剪', '整理胡须']
        },
        {
          id: 3,
          name: '时尚烫发',
          image: '/static/lifashop/services/perm.jpg',
          price: '298',
          originalPrice: '398',
          description: '韩式烫发+护理，打造时尚卷发',
          duration: '120分钟',
          category: 'perm',
          tags: ['人气推荐', '韩式'],
          features: ['时尚烫发', '深度护理', '造型指导']
        },
        {
          id: 4,
          name: '纹理烫',
          image: '/static/lifashop/services/texture-perm.jpg',
          price: '258',
          originalPrice: '328',
          description: '自然纹理，增加层次感',
          duration: '100分钟',
          category: 'perm',
          tags: ['自然', '纹理'],
          features: ['纹理烫发', '层次造型', '自然效果']
        },
        {
          id: 5,
          name: '潮流染发',
          image: '/static/lifashop/services/color.jpg',
          price: '258',
          originalPrice: '328',
          description: '进口染膏+专业护色，持久亮丽',
          duration: '90分钟',
          category: 'color',
          tags: ['新品', '进口染膏'],
          features: ['进口染膏', '专业调色', '护色护理']
        },
        {
          id: 6,
          name: '挑染',
          image: '/static/lifashop/services/highlight.jpg',
          price: '188',
          originalPrice: '248',
          description: '局部挑染，时尚个性',
          duration: '75分钟',
          category: 'color',
          tags: ['个性', '时尚'],
          features: ['局部挑染', '个性设计', '时尚搭配']
        },
        {
          id: 7,
          name: '深度护理',
          image: '/static/lifashop/services/treatment.jpg',
          price: '128',
          originalPrice: '168',
          description: '专业护理，修复受损发质',
          duration: '45分钟',
          category: 'care',
          tags: ['护理', '修复'],
          features: ['深度滋养', '修复护理', '柔顺亮泽']
        },
        {
          id: 8,
          name: '头皮SPA',
          image: '/static/lifashop/services/scalp-spa.jpg',
          price: '158',
          originalPrice: '198',
          description: '头皮深层清洁+按摩放松',
          duration: '60分钟',
          category: 'care',
          tags: ['SPA', '放松'],
          features: ['头皮清洁', '按摩放松', '改善血液循环']
        },
        {
          id: 9,
          name: '个性化造型设计',
          image: '/static/lifashop/services/custom-styling.jpg',
          price: '388',
          originalPrice: '488',
          description: '根据脸型和气质量身定制',
          duration: '150分钟',
          category: 'styling',
          tags: ['定制', '高端'],
          features: ['脸型分析', '个性设计', '全程指导']
        },
        {
          id: 10,
          name: '新娘造型',
          image: '/static/lifashop/services/bridal.jpg',
          price: '588',
          originalPrice: '688',
          description: '新娘专属造型，完美婚礼',
          duration: '180分钟',
          category: 'styling',
          tags: ['新娘', '专属'],
          features: ['新娘造型', '妆发一体', '完美效果']
        }
      ]
    }
  },
  computed: {
    selectedCategoryTitle() {
      const category = this.categoryList.find(cat => cat.id === this.selectedCategory)
      return category ? category.title : '全部服务'
    },
    filteredServiceList() {
      let filtered = [...this.serviceList]
      
      // 分类筛选
      if (this.selectedCategory !== 'all') {
        filtered = filtered.filter(service => service.category === this.selectedCategory)
      }
      
      // 关键词搜索
      if (this.searchKeyword.trim()) {
        const keyword = this.searchKeyword.toLowerCase()
        filtered = filtered.filter(service => 
          service.name.toLowerCase().includes(keyword) ||
          service.description.toLowerCase().includes(keyword) ||
          service.features.some(feature => feature.toLowerCase().includes(keyword))
        )
      }
      
      return filtered
    }
  },
  methods: {
    onBack() {
      uni.navigateBack()
    },
    onCategoryClick(category) {
      this.selectedCategory = category.id
      console.log('选择分类:', category)
    },
    onCategoryChange(selectedItems) {
      if (selectedItems.length > 0) {
        this.selectedCategory = selectedItems[0].id
      }
    },
    onSearch() {
      console.log('搜索关键词:', this.searchKeyword)
    },
    onServiceClick(service) {
      console.log('点击服务:', service)
      uni.navigateTo({
        url: `/pages/lifashop-service/detail?id=${service.id}`
      })
    },
    onBookService(service) {
      console.log('预约服务:', service)
      uni.navigateTo({
        url: `/pages/lifashop-appointment/index?serviceId=${service.id}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.lifashop-service-list {
  padding-bottom: 20rpx;
}

.category-section {
  margin: 24rpx;
  margin-bottom: 32rpx;
}

.search-section {
  margin-bottom: 32rpx;
}

.search-card {
  margin: 0 24rpx;
  padding: 24rpx;
  border-radius: 16rpx;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 24rpx;
  padding: 16rpx 24rpx;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 28rpx;
}

.search-icon {
  margin-left: 16rpx;
  font-size: 32rpx;
}

.services-section {
  margin: 0 24rpx;
}
</style>