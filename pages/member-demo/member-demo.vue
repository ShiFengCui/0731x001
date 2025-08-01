<template>
	<view class="page">
		<view class="page-header">
			<text class="page-title">会员中心演示</text>
		</view>
		
		<member-center
			:member-data="memberData"
			:member-benefits="memberBenefits"
			:exchange-list="exchangeList"
			:points-records="pointsRecords"
			@exchange="onExchange"
			@exchangeItemClick="onExchangeItemClick"
			@viewMoreExchange="onViewMoreExchange"
			@viewMoreRecord="onViewMoreRecord"
		/>
	</view>
</template>

<script>
	import MemberCenter from '@/components/member-center/member-center.vue'
	
	export default {
		components: {
			MemberCenter
		},
		data() {
			return {
				memberData: {
					nickname: '测试用户',
					avatar: '/static/logo.png',
					level: 3,
					levelName: '钻石会员',
					levelDesc: '享受最高级别的专属权益',
					points: 5280,
					totalPoints: 12680
				},
				memberBenefits: [
					{
						icon: 'gift',
						title: '生日礼包',
						desc: '生日当月可领取专属礼包',
						available: true,
						status: '可领取'
					},
					{
						icon: 'vip',
						title: '专属客服',
						desc: '享受1对1专属客服服务',
						available: true,
						status: '已开通'
					},
					{
						icon: 'heart',
						title: '积分翻倍',
						desc: '消费积分获得翻倍奖励',
						available: true,
						status: '已享受'
					},
					{
						icon: 'wallet',
						title: '免费包邮',
						desc: '全场商品免费包邮',
						available: true,
						status: '已享受'
					},
					{
						icon: 'star',
						title: '专属折扣',
						desc: '享受会员专属价格',
						available: true,
						status: '已享受'
					}
				],
				exchangeList: [
					{
						id: 1,
						title: '50元优惠券',
						desc: '全场通用，无门槛使用',
						points: 3000,
						image: '/static/logo.png'
					},
					{
						id: 2,
						title: '88元优惠券',
						desc: '满300元可用',
						points: 5000,
						image: '/static/logo.png'
					},
					{
						id: 3,
						title: '会员专享礼盒',
						desc: '限量版纪念品',
						points: 8000,
						image: '/static/logo.png'
					}
				],
				pointsRecords: [
					{
						title: '钻石会员升级奖励',
						points: 500,
						type: 'earn',
						time: '2024-12-12 10:00'
					},
					{
						title: '每日签到',
						points: 15,
						type: 'earn',
						time: '2024-12-12 09:00'
					},
					{
						title: '购买商品获得积分',
						points: 280,
						type: 'earn',
						time: '2024-12-11 16:30'
					}
				]
			}
		},
		methods: {
			onExchange(item) {
				console.log('兑换商品:', item);
			},
			onExchangeItemClick(item) {
				console.log('点击兑换商品:', item);
			},
			onViewMoreExchange() {
				console.log('查看更多兑换商品');
			},
			onViewMoreRecord() {
				console.log('查看更多积分记录');
			}
		}
	}
</script>

<style lang="scss">
	.page {
		background-color: #f5f5f5;
		min-height: 100vh;
	}
	
	.page-header {
		text-align: center;
		padding: 40rpx 0;
		background: white;
		margin-bottom: 20rpx;
	}
	
	.page-title {
		font-size: 36rpx;
		font-weight: 600;
		color: #303133;
	}
</style>