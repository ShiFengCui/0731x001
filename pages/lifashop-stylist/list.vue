<template>
  <page-skeleton 
    title="发型师团队" 
    :show-header="true"
    :show-back="true"
    @back="onBack"
  >
    <view class="lifashop-stylist-list">
      <!-- 搜索和筛选 -->
      <view class="search-section">
        <custom-card class="search-card">
          <view class="search-bar">
            <input 
              class="search-input" 
              placeholder="搜索发型师..." 
              v-model="searchKeyword"
              @input="onSearch"
            />
            <view class="search-icon">🔍</view>
          </view>
        </custom-card>
        
        <!-- 筛选选项 -->
        <list-group 
          title="筛选条件"
          :items="filterOptions"
          type="flush"
          :selectable="true"
          @selection-change="onFilterChange"
        />
      </view>
      
      <!-- 发型师列表 -->
      <view class="stylists-section">
        <product-list
          :product-list="filteredStylistList"
          title="发型师团队"
          layout="grid"
          @product-click="onStylistClick"
          @add-to-cart="onBookStylist"
        />
      </view>
    </view>
  </page-skeleton>
</template>

<script>
import PageSkeleton from '@/components/page-skeleton/page-skeleton.vue'
import CustomCard from '@/components/custom-card/custom-card.vue'
import ListGroup from '@/components/list-group/list-group.vue'
import ProductList from '@/components/product-component/product-list.vue'

export default {
  name: 'LifashopStylistList',
  components: {
    PageSkeleton,
    CustomCard,
    ListGroup,
    ProductList
  },
  data() {
    return {
      searchKeyword: '',
      selectedFilters: [],
      stylistList: [
        {
          id: 1,
          name: 'Tony老师',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&auto=format',
          price: '298',
          originalPrice: '398',
          description: '10年经验，擅长时尚造型、商务发型',
          rating: 4.9,
          level: '首席发型师',
          experience: '10年',
          specialty: '时尚造型',
          tags: ['明星发型师', '人气推荐', '时尚造型'],
          works: 1580,
          satisfied: 98
        },
        {
          id: 2,
          name: 'Kevin',
          image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&auto=format',
          price: '198',
          originalPrice: '268',
          description: '烫染专家，擅长日韩风格造型',
          rating: 4.8,
          level: '高级发型师',
          experience: '6年',
          specialty: '烫染',
          tags: ['烫染专家', '日韩风格'],
          works: 980,
          satisfied: 96
        },
        {
          id: 3,
          name: 'Amy',
          image: 'https://images.unsplash.com/photo-1494790108755-2616b612b142?w=300&h=300&fit=crop&auto=format',
          price: '168',
          originalPrice: '218',
          description: '女士造型专家，温柔细致',
          rating: 4.7,
          level: '高级发型师',
          experience: '5年',
          specialty: '女士造型',
          tags: ['女士专家', '温柔细致'],
          works: 756,
          satisfied: 97
        },
        {
          id: 4,
          name: 'David',
          image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&auto=format',
          price: '228',
          originalPrice: '298',
          description: '男士造型专家，商务风格',
          rating: 4.8,
          level: '高级发型师',
          experience: '7年',
          specialty: '男士造型',
          tags: ['男士专家', '商务风格'],
          works: 1120,
          satisfied: 95
        },
        {
          id: 5,
          name: 'Lisa',
          image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&auto=format',
          price: '138',
          originalPrice: '188',
          description: '新锐发型师，创意十足',
          rating: 4.6,
          level: '中级发型师',
          experience: '3年',
          specialty: '创意造型',
          tags: ['新锐发型师', '创意造型'],
          works: 421,
          satisfied: 94
        },
        {
          id: 6,
          name: 'Michael',
          image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&auto=format',
          price: '188',
          originalPrice: '238',
          description: '色彩搭配专家，个性时尚',
          rating: 4.7,
          level: '高级发型师',
          experience: '4年',
          specialty: '色彩搭配',
          tags: ['色彩专家', '个性时尚'],
          works: 643,
          satisfied: 96
        }
      ],
      filterOptions: [
        { id: 'level_chief', title: '首席发型师', value: '首席发型师', selected: false },
        { id: 'level_senior', title: '高级发型师', value: '高级发型师', selected: false },
        { id: 'level_medium', title: '中级发型师', value: '中级发型师', selected: false },
        { id: 'specialty_fashion', title: '时尚造型', value: '时尚造型', selected: false },
        { id: 'specialty_perm', title: '烫染专家', value: '烫染', selected: false },
        { id: 'specialty_men', title: '男士专家', value: '男士造型', selected: false },
        { id: 'specialty_women', title: '女士专家', value: '女士造型', selected: false }
      ]
    }
  },
  computed: {
    filteredStylistList() {
      let filtered = [...this.stylistList]
      
      // 关键词搜索
      if (this.searchKeyword.trim()) {
        const keyword = this.searchKeyword.toLowerCase()
        filtered = filtered.filter(stylist => 
          stylist.name.toLowerCase().includes(keyword) ||
          stylist.description.toLowerCase().includes(keyword) ||
          stylist.specialty.toLowerCase().includes(keyword)
        )
      }
      
      // 筛选条件
      if (this.selectedFilters.length > 0) {
        filtered = filtered.filter(stylist => {
          return this.selectedFilters.some(filter => 
            stylist.level === filter || 
            stylist.specialty === filter
          )
        })
      }
      
      return filtered
    }
  },
  methods: {
    onBack() {
      uni.navigateBack()
    },
    onSearch() {
      // 搜索逻辑已在computed中处理
      console.log('搜索关键词:', this.searchKeyword)
    },
    onFilterChange(selectedItems) {
      this.selectedFilters = selectedItems.map(item => item.value)
      console.log('筛选条件:', this.selectedFilters)
    },
    onStylistClick(stylist) {
      console.log('点击发型师:', stylist)
      uni.navigateTo({
        url: `/pages/lifashop-stylist/detail?id=${stylist.id}`
      })
    },
    onBookStylist(stylist) {
      console.log('预约发型师:', stylist)
      uni.navigateTo({
        url: `/pages/lifashop-appointment/index?stylistId=${stylist.id}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.lifashop-stylist-list {
  padding-bottom: 20rpx;
}

.search-section {
  margin-bottom: 32rpx;
}

.search-card {
  margin: 24rpx;
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

.stylists-section {
  margin: 0 24rpx;
}
</style>