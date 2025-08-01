<template>
  <page-skeleton 
    title="会员中心" 
    :show-header="true"
    :show-back="true"
    @back="onBack"
  >
    <view class="lifashop-member-center">
      <!-- 会员卡片 -->
      <view class="member-card-section">
        <membership-card
          :username="memberData.username"
          :member-id="memberData.memberId"
          :level-name="memberData.levelName"
          :card-type="memberData.cardType"
          :points="memberData.points"
          :benefits="memberBenefits"
          @upgrade="onUpgrade"
          @viewDetails="onViewDetails"
        />
      </view>
      
      <!-- 会员中心主体 -->
      <view class="member-center-section">
        <member-center
          :member-data="memberData"
          :member-benefits="memberBenefits"
          :exchange-list="exchangeList"
          :points-records="pointsRecords"
          @exchange="onExchange"
          @exchangeItemClick="onExchangeItemClick"
        />
      </view>
      
      <!-- 会员特权说明 -->
      <view class="privileges-section">
        <custom-card 
          title="会员特权说明"
          class="privileges-card"
        >
          <view class="privileges-content">
            <view class="privilege-level" v-for="level in memberLevels" :key="level.type">
              <view class="level-header">
                <view class="level-name">{{ level.name }}</view>
                <view class="level-condition">{{ level.condition }}</view>
              </view>
              <view class="level-benefits">
                <view 
                  class="benefit-item" 
                  v-for="benefit in level.benefits" 
                  :key="benefit"
                >
                  ✓ {{ benefit }}
                </view>
              </view>
            </view>
          </view>
        </custom-card>
      </view>
    </view>
  </page-skeleton>
</template>

<script>
import PageSkeleton from '@/components/page-skeleton/page-skeleton.vue'
import MembershipCard from '@/components/membership-card/membership-card.vue'
import MemberCenter from '@/components/member-center/member-center.vue'
import CustomCard from '@/components/custom-card/custom-card.vue'

export default {
  name: 'LifashopMemberCenter',
  components: {
    PageSkeleton,
    MembershipCard,
    MemberCenter,
    CustomCard
  },
  data() {
    return {
      memberData: {
        username: '张小美',
        memberId: 'LF202401001',
        levelName: '黄金会员',
        cardType: 'gold',
        points: 2580,
        totalPoints: 5680,
        balance: 380,
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b142?w=200&h=200&fit=crop&auto=format',
        joinDate: '2023-03-15',
        consumeAmount: 3680,
        visitCount: 28
      },
      memberBenefits: [
        {
          id: 1,
          title: '专属折扣',
          description: '所有服务享受9折优惠',
          icon: '💰',
          available: true,
          used: false
        },
        {
          id: 2,
          title: '优先预约',
          description: '节假日可优先预约时间',
          icon: '⏰',
          available: true,
          used: false
        },
        {
          id: 3,
          title: '免费洗发',
          description: '每月享受1次免费洗发',
          icon: '🚿',
          available: true,
          used: true
        },
        {
          id: 4,
          title: '生日特惠',
          description: '生日月享受额外8折',
          icon: '🎂',
          available: false,
          used: false
        },
        {
          id: 5,
          title: '专属客服',
          description: '7×24小时专属客服',
          icon: '👨‍💼',
          available: true,
          used: false
        }
      ],
      exchangeList: [
        {
          id: 1,
          name: '洗发券',
          points: 200,
          image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=300&h=200&fit=crop&auto=format',
          description: '免费洗发一次',
          stock: 50
        },
        {
          id: 2,
          name: '护理券',
          points: 500,
          image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=300&h=200&fit=crop&auto=format',
          description: '深度护理一次',
          stock: 20
        },
        {
          id: 3,
          name: '造型券',
          points: 800,
          image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=200&fit=crop&auto=format',
          description: '专业造型一次',
          stock: 10
        },
        {
          id: 4,
          name: '9折券',
          points: 300,
          image: 'https://img.icons8.com/fluency/96/discount.png',
          description: '全店9折优惠券',
          stock: 30
        }
      ],
      pointsRecords: [
        {
          id: 1,
          type: 'earn',
          points: 88,
          description: '消费获得积分',
          date: '2024-01-10',
          detail: '精致洗剪吹'
        },
        {
          id: 2,
          type: 'spend',
          points: -200,
          description: '兑换洗发券',
          date: '2024-01-08',
          detail: '积分兑换'
        },
        {
          id: 3,
          type: 'earn',
          points: 298,
          description: '消费获得积分',
          date: '2024-01-05',
          detail: '时尚烫发'
        }
      ],
      memberLevels: [
        {
          type: 'bronze',
          name: '青铜会员',
          condition: '消费满100元',
          benefits: ['基础积分奖励', '生日祝福']
        },
        {
          type: 'silver',
          name: '银卡会员',
          condition: '消费满500元',
          benefits: ['积分1.2倍奖励', '9.5折优惠', '优先预约']
        },
        {
          type: 'gold',
          name: '黄金会员',
          condition: '消费满1500元',
          benefits: ['积分1.5倍奖励', '9折优惠', '免费洗发', '专属客服']
        },
        {
          type: 'platinum',
          name: '白金会员',
          condition: '消费满3000元',
          benefits: ['积分2倍奖励', '8.5折优惠', '免费护理', '生日特惠']
        },
        {
          type: 'diamond',
          name: '钻石会员',
          condition: '消费满5000元',
          benefits: ['积分3倍奖励', '8折优惠', '免费造型', '专属发型师']
        }
      ]
    }
  },
  methods: {
    onBack() {
      uni.navigateBack()
    },
    onUpgrade() {
      console.log('升级会员')
      uni.navigateTo({
        url: '/pages/lifashop-member/upgrade'
      })
    },
    onViewDetails() {
      console.log('查看会员详情')
      uni.navigateTo({
        url: '/pages/lifashop-member/details'
      })
    },
    onExchange(item) {
      console.log('兑换商品:', item)
      
      if (this.memberData.points < item.points) {
        uni.showToast({
          title: '积分不足',
          icon: 'none'
        })
        return
      }
      
      uni.showModal({
        title: '确认兑换',
        content: `确定要用${item.points}积分兑换${item.name}吗？`,
        success: (res) => {
          if (res.confirm) {
            this.memberData.points -= item.points
            uni.showToast({
              title: '兑换成功',
              icon: 'success'
            })
            
            // 添加积分记录
            this.pointsRecords.unshift({
              id: Date.now(),
              type: 'spend',
              points: -item.points,
              description: `兑换${item.name}`,
              date: new Date().toISOString().split('T')[0],
              detail: '积分兑换'
            })
          }
        }
      })
    },
    onExchangeItemClick(item) {
      console.log('点击兑换商品:', item)
      this.onExchange(item)
    }
  }
}
</script>

<style lang="scss" scoped>
.lifashop-member-center {
  padding-bottom: 20rpx;
}

.member-card-section {
  margin: 24rpx;
  margin-bottom: 32rpx;
}

.member-center-section {
  margin-bottom: 32rpx;
}

.privileges-section {
  margin: 24rpx;
}

.privileges-card {
  padding: 32rpx;
  border-radius: 16rpx;
}

.privileges-content {
  .privilege-level {
    margin-bottom: 40rpx;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  .level-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16rpx;
  }
  
  .level-name {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
  }
  
  .level-condition {
    font-size: 24rpx;
    color: #999;
  }
  
  .level-benefits {
    padding-left: 20rpx;
  }
  
  .benefit-item {
    font-size: 28rpx;
    color: #666;
    margin-bottom: 8rpx;
    line-height: 1.4;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>