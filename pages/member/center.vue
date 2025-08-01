<template>
	<view class="member-page">
		<page-skeleton title="会员中心" :show-header="true">
			<!-- 会员卡片 -->
			<view class="member-card-section">
				<membership-card
					:username="memberData.username"
					:member-id="memberData.memberId"
					:level-name="memberData.levelName"
					:card-type="memberData.cardType"
					:points="memberData.points"
					:benefits="memberData.benefits"
					@upgrade="onUpgrade"
					@viewDetails="onViewDetails"
				/>
			</view>
			
			<!-- 会员中心功能 -->
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
			
			<!-- 底部导航栏 -->
			<tab-bar 
				:tab-list="tabBarList" 
				:current="3"
				active-color="#00B578"
				@change="onTabChange"
			/>
		</page-skeleton>
	</view>
</template>

<script>
	import PageSkeleton from '@/components/page-skeleton/page-skeleton.vue'
	import MembershipCard from '@/components/membership-card/membership-card.vue'
	import MemberCenter from '@/components/member-center/member-center.vue'
	import TabBar from '@/components/tab-bar/tab-bar.vue'
	
	export default {
		name: 'MemberPage',
		components: {
			PageSkeleton,
			MembershipCard,
			MemberCenter,
			TabBar
		},
		data() {
			return {
				memberData: {
					username: '张三',
					memberId: 'LK20240001',
					levelName: '金卡会员',
					cardType: 'gold',
					points: 2580,
					totalPoints: 15680,
					benefits: [
						{
							id: 1,
							name: '生日免费饮品',
							description: '生日当月可享受一杯免费饮品',
							available: true
						},
						{
							id: 2,
							name: '积分倍增',
							description: '消费积分双倍累积',
							available: true
						},
						{
							id: 3,
							name: '专属客服',
							description: '享受VIP专属客服服务',
							available: true
						}
					]
				},
				memberBenefits: [
					{
						id: 1,
						name: '免费饮品券',
						description: '可兑换任意饮品一杯',
						pointsRequired: 500,
						available: true
					},
					{
						id: 2,
						name: '8.8折优惠券',
						description: '全场商品8.8折优惠',
						pointsRequired: 300,
						available: true
					},
					{
						id: 3,
						name: '免费升杯券',
						description: '中杯免费升大杯',
						pointsRequired: 200,
						available: true
					}
				],
				exchangeList: [
					{
						id: 1,
						name: '瑞幸周边T恤',
						image: '/static/exchange/tshirt.jpg',
						pointsRequired: 2000,
						stock: 50
					},
					{
						id: 2,
						name: '瑞幸保温杯',
						image: '/static/exchange/cup.jpg',
						pointsRequired: 1500,
						stock: 30
					}
				],
				pointsRecords: [
					{
						id: 1,
						type: 'earn',
						points: 50,
						description: '消费获得积分',
						date: '2024-01-01'
					},
					{
						id: 2,
						type: 'use',
						points: -200,
						description: '兑换优惠券',
						date: '2023-12-28'
					}
				],
				tabBarList: [
					{
						id: 'home',
						text: '首页',
						icon: 'home',
						pagePath: '/pages/luckin-home/luckin-home'
					},
					{
						id: 'menu',
						text: '点餐',
						icon: 'shop',
						pagePath: '/pages/menu/index'
					},
					{
						id: 'order',
						text: '订单',
						icon: 'list',
						pagePath: '/pages/order/list'
					},
					{
						id: 'member',
						text: '会员',
						icon: 'person',
						pagePath: '/pages/member/center'
					},
					{
						id: 'profile',
						text: '我的',
						icon: 'person-filled',
						pagePath: '/pages/profile/index'
					}
				]
			}
		},
		methods: {
			onUpgrade() {
				uni.navigateTo({
					url: '/pages/member/upgrade'
				})
			},
			onViewDetails() {
				uni.navigateTo({
					url: '/pages/member/details'
				})
			},
			onExchange(item) {
				uni.showModal({
					title: '确认兑换',
					content: `确定要花费${item.pointsRequired}积分兑换${item.name}吗？`,
					success: (res) => {
						if (res.confirm) {
							uni.showToast({
								title: '兑换成功',
								icon: 'success'
							})
						}
					}
				})
			},
			onExchangeItemClick(item) {
				uni.navigateTo({
					url: `/pages/exchange/detail?id=${item.id}`
				})
			},
			onTabChange(tab) {
				if (tab.item.pagePath) {
					uni.switchTab({
						url: tab.item.pagePath
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.member-page {
		background-color: #f5f5f5;
		min-height: 100vh;
		padding-bottom: 100rpx;
	}
	
	.member-card-section, .member-center-section {
		margin-bottom: 20rpx;
		background-color: #ffffff;
	}
</style> 