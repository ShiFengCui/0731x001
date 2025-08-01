<template>
  <page-skeleton 
    title="评价中心" 
    :show-header="true"
    :show-back="true"
    @back="onBack"
  >
    <view class="lifashop-rating-list">
      <!-- 评价统计 -->
      <view class="rating-stats-section">
        <custom-card class="stats-card">
          <view class="stats-content">
            <view class="overall-rating">
              <view class="rating-score">4.8</view>
              <view class="rating-stars">
                <uni-rate :value="4.8" readonly size="16" />
              </view>
              <view class="rating-desc">综合评分</view>
            </view>
            <view class="rating-breakdown">
                             <view class="breakdown-item" v-for="item in ratingBreakdown" :key="item.stars">
                 <view class="stars">{{ item.stars }}星</view>
                 <view class="progress-bar">
                   <view class="progress" :style="{ width: item.percentage + '%' }"></view>
                 </view>
                 <view class="count">{{ item.count }}</view>
               </view>
             </view>
          </view>
        </custom-card>
      </view>
      
      <!-- 筛选选项 -->
      <view class="filter-section">
        <list-group
          :items="filterOptions"
          type="flush"
          :selectable="true"
          @selection-change="onFilterChange"
        />
      </view>
      
      <!-- 我可以评价的服务 -->
      <view class="pending-rating-section" v-if="pendingRatings.length > 0">
        <view class="section-title">待评价服务</view>
        <view class="pending-list">
          <custom-card 
            v-for="item in pendingRatings" 
            :key="item.id"
            class="pending-item"
            @click="rateService(item)"
          >
            <view class="pending-content">
              <image class="service-image" :src="item.image" mode="aspectFill" />
              <view class="service-info">
                <view class="service-name">{{ item.serviceName }}</view>
                <view class="stylist-name">发型师：{{ item.stylistName }}</view>
                <view class="service-date">{{ item.date }}</view>
              </view>
              <view class="rate-btn">
                <button class="btn-rate">评价</button>
              </view>
            </view>
          </custom-card>
        </view>
      </view>
      
      <!-- 评价系统 -->
      <view class="rating-system-section">
        <rating-system 
          target-id="lifashop"
          rating-type="store"
          :can-add-review="true"
          :initial-reviews="filteredReviews"
          @submitReview="onSubmitReview"
          @like="onLikeReview"
          @reply="onReplyReview"
        />
      </view>
    </view>
  </page-skeleton>
</template>

<script>
import PageSkeleton from '@/components/page-skeleton/page-skeleton.vue'
import CustomCard from '@/components/custom-card/custom-card.vue'
import ListGroup from '@/components/list-group/list-group.vue'
import RatingSystem from '@/components/rating-system/rating-system.vue'

export default {
  name: 'LifashopRatingList',
  components: {
    PageSkeleton,
    CustomCard,
    ListGroup,
    RatingSystem
  },
  data() {
    return {
      selectedFilter: 'all',
      ratingBreakdown: [
        { stars: 5, count: 245, percentage: 65 },
        { stars: 4, count: 89, percentage: 24 },
        { stars: 3, count: 28, percentage: 7 },
        { stars: 2, count: 12, percentage: 3 },
        { stars: 1, count: 3, percentage: 1 }
      ],
      filterOptions: [
        { id: 'all', title: '全部评价', selected: true },
        { id: 'high', title: '好评 (4-5星)', selected: false },
        { id: 'medium', title: '中评 (3星)', selected: false },
        { id: 'low', title: '差评 (1-2星)', selected: false },
        { id: 'photos', title: '有图评价', selected: false },
        { id: 'my', title: '我的评价', selected: false }
      ],
      pendingRatings: [
        {
          id: 1,
          serviceName: '精致洗剪吹',
          stylistName: 'Tony老师',
          date: '2024-01-10',
          image: '/static/lifashop/services/cut.jpg',
          orderId: 'LF202401001'
        },
        {
          id: 2,
          serviceName: '时尚烫发',
          stylistName: 'Kevin',
          date: '2024-01-08',
          image: '/static/lifashop/services/perm.jpg',
          orderId: 'LF202401002'
        }
      ],
      allReviews: [
        {
          id: 1,
          username: '张小美',
          avatar: '/static/lifashop/users/user1.jpg',
          rating: 5,
          date: '2024-01-12',
          content: 'Tony老师的技术真的很棒，剪出来的效果超出预期！店里环境也很好，服务很贴心。',
          serviceName: '精致洗剪吹',
          stylistName: 'Tony老师',
          images: [
            '/static/lifashop/reviews/review1-1.jpg',
            '/static/lifashop/reviews/review1-2.jpg'
          ],
          likes: 12,
          replies: [
            {
              id: 1,
              username: '店主',
              content: '谢谢您的好评，欢迎下次光临！',
              date: '2024-01-12'
            }
          ],
          tags: ['技术好', '环境佳', '服务棒'],
          isMyReview: true
        },
        {
          id: 2,
          username: '李先生',
          avatar: '/static/lifashop/users/user2.jpg',
          rating: 4,
          date: '2024-01-11',
          content: 'Kevin的烫发技术不错，效果还是挺满意的。不过等待时间有点长。',
          serviceName: '时尚烫发',
          stylistName: 'Kevin',
          images: [],
          likes: 8,
          replies: [],
          tags: ['技术可以', '等待时间长'],
          isMyReview: false
        },
        {
          id: 3,
          username: '王小姐',
          avatar: '/static/lifashop/users/user3.jpg',
          rating: 5,
          date: '2024-01-10',
          content: 'Amy的服务真的很好，很温柔很专业。剪完头发整个人都精神了！强烈推荐！',
          serviceName: '女士精剪',
          stylistName: 'Amy',
          images: [
            '/static/lifashop/reviews/review3-1.jpg'
          ],
          likes: 15,
          replies: [
            {
              id: 1,
              username: 'Amy',
              content: '谢谢亲的认可，期待您的再次光临～',
              date: '2024-01-10'
            }
          ],
          tags: ['服务好', '技术专业', '推荐'],
          isMyReview: false
        },
        {
          id: 4,
          username: '赵大哥',
          avatar: '/static/lifashop/users/user4.jpg',
          rating: 3,
          date: '2024-01-09',
          content: '整体还可以，就是价格有点贵。David的技术还行，但没有想象中那么好。',
          serviceName: '男士商务造型',
          stylistName: 'David',
          images: [],
          likes: 3,
          replies: [],
          tags: ['价格偏贵', '技术一般'],
          isMyReview: false
        },
        {
          id: 5,
          username: '陈女士',
          avatar: '/static/lifashop/users/user5.jpg',
          rating: 5,
          date: '2024-01-08',
          content: '第一次来这家店，感觉非常棒！Lisa虽然年轻但技术很好，创意十足。店里装修也很有格调。',
          serviceName: '创意造型',
          stylistName: 'Lisa',
          images: [
            '/static/lifashop/reviews/review5-1.jpg',
            '/static/lifashop/reviews/review5-2.jpg',
            '/static/lifashop/reviews/review5-3.jpg'
          ],
          likes: 20,
          replies: [
            {
              id: 1,
              username: '店主',
              content: '感谢您的支持！Lisa确实很有天赋，欢迎常来！',
              date: '2024-01-08'
            }
          ],
          tags: ['技术好', '有创意', '环境好'],
          isMyReview: false
        }
      ]
    }
  },
  computed: {
    filteredReviews() {
      let filtered = [...this.allReviews]
      
      switch (this.selectedFilter) {
        case 'high':
          filtered = filtered.filter(review => review.rating >= 4)
          break
        case 'medium':
          filtered = filtered.filter(review => review.rating === 3)
          break
        case 'low':
          filtered = filtered.filter(review => review.rating <= 2)
          break
        case 'photos':
          filtered = filtered.filter(review => review.images && review.images.length > 0)
          break
        case 'my':
          filtered = filtered.filter(review => review.isMyReview)
          break
        default:
          // 全部评价，不过滤
          break
      }
      
      return filtered
    }
  },
  methods: {
    onBack() {
      uni.navigateBack()
    },
    onFilterChange(selectedItems) {
      if (selectedItems.length > 0) {
        this.selectedFilter = selectedItems[0].id
      }
    },
    rateService(item) {
      console.log('评价服务:', item)
      uni.navigateTo({
        url: `/pages/lifashop-rating/add?orderId=${item.orderId}&serviceId=${item.id}`
      })
    },
    onSubmitReview(reviewData) {
      console.log('提交评价:', reviewData)
      
      // 模拟添加新评价
      const newReview = {
        id: Date.now(),
        username: '我',
        avatar: '/static/lifashop/avatar.jpg',
        rating: reviewData.rating,
        date: new Date().toISOString().split('T')[0],
        content: reviewData.content,
        serviceName: reviewData.serviceName || '服务项目',
        stylistName: reviewData.stylistName || '发型师',
        images: reviewData.images || [],
        likes: 0,
        replies: [],
        tags: reviewData.tags || [],
        isMyReview: true
      }
      
      this.allReviews.unshift(newReview)
      
      uni.showToast({
        title: '评价提交成功',
        icon: 'success'
      })
    },
    onLikeReview(reviewId) {
      console.log('点赞评价:', reviewId)
      
      const review = this.allReviews.find(r => r.id === reviewId)
      if (review) {
        review.likes = (review.likes || 0) + 1
        uni.showToast({
          title: '点赞成功',
          icon: 'success'
        })
      }
    },
    onReplyReview(reviewId, replyContent) {
      console.log('回复评价:', reviewId, replyContent)
      
      const review = this.allReviews.find(r => r.id === reviewId)
      if (review) {
        if (!review.replies) {
          review.replies = []
        }
        
        review.replies.push({
          id: Date.now(),
          username: '我',
          content: replyContent,
          date: new Date().toISOString().split('T')[0]
        })
        
        uni.showToast({
          title: '回复成功',
          icon: 'success'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.lifashop-rating-list {
  padding-bottom: 20rpx;
}

.rating-stats-section {
  margin: 24rpx;
  margin-bottom: 32rpx;
}

.stats-card {
  padding: 32rpx;
  border-radius: 16rpx;
}

.stats-content {
  display: flex;
  align-items: center;
  gap: 40rpx;
}

.overall-rating {
  text-align: center;
}

.rating-score {
  font-size: 72rpx;
  font-weight: bold;
  color: #ff6b35;
  line-height: 1;
}

.rating-stars {
  margin: 16rpx 0;
}

.rating-desc {
  font-size: 24rpx;
  color: #999;
}

.rating-breakdown {
  flex: 1;
}

.breakdown-item {
  display: flex;
  align-items: center;
  margin-bottom: 12rpx;
  gap: 16rpx;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.stars {
  font-size: 24rpx;
  color: #666;
  width: 80rpx;
}

.progress-bar {
  flex: 1;
  height: 12rpx;
  background-color: #f0f0f0;
  border-radius: 6rpx;
  overflow: hidden;
}

.progress {
  height: 100%;
  background-color: #ff6b35;
  transition: width 0.3s ease;
}

.count {
  font-size: 24rpx;
  color: #999;
  width: 60rpx;
  text-align: right;
}

.filter-section {
  margin: 0 24rpx 32rpx;
}

.pending-rating-section {
  margin: 0 24rpx 32rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 24rpx;
  padding-left: 16rpx;
  border-left: 6rpx solid #ff6b35;
}

.pending-list {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.pending-item {
  padding: 24rpx;
  border-radius: 12rpx;
}

.pending-content {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.service-image {
  width: 120rpx;
  height: 120rpx;
  border-radius: 12rpx;
}

.service-info {
  flex: 1;
}

.service-name {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 8rpx;
}

.stylist-name {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 8rpx;
}

.service-date {
  font-size: 24rpx;
  color: #999;
}

.rate-btn {
  .btn-rate {
    padding: 16rpx 32rpx;
    background-color: #ff6b35;
    color: white;
    border-radius: 8rpx;
    font-size: 28rpx;
    border: none;
  }
}

.rating-system-section {
  margin: 0 24rpx;
}
</style>