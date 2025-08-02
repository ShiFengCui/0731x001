<template>
	<view class="member-container">
		<!-- 会员卡展示 -->
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
		
		<!-- 会员中心功能 -->
		<member-center
			:member-data="memberData"
			:member-benefits="memberBenefits"
			:exchange-list="exchangeList"
			:points-records="pointsRecords"
			@exchange="onExchange"
			@exchangeItemClick="onExchangeItemClick"
		/>
		
		<!-- 优惠券管理 -->
		<view class="coupon-section">
			<view class="section-title">
				<text class="title-text">我的优惠券</text>
				<text class="title-desc">查看可用优惠券</text>
			</view>
			<view class="coupon-list">
				<coupon-card 
					v-for="coupon in couponList" 
					:key="coupon.id"
					:coupon-data="coupon" 
					@receive="handleReceiveCoupon"
					@use="handleUseCoupon"
				/>
			</view>
			<view class="more-coupons" @click="goToCouponCenter">
				<text>查看更多优惠券</text>
				<uni-icons type="right" size="16" color="#999"></uni-icons>
			</view>
		</view>
		
		<!-- 会员特权 -->
		<view class="privilege-section">
			<view class="section-title">
				<text class="title-text">会员特权</text>
				<text class="title-desc">专享服务与优惠</text>
			</view>
			<business-matrix
				:business-list="privilegeList"
				title=""
				layout="grid"
				:columns="2"
				@item-click="onPrivilegeClick"
			/>
		</view>
	</view>
</template>

<script>
import MembershipCard from '@/components/membership-card/membership-card.vue'
import MemberCenter from '@/components/member-center/member-center.vue'
import CouponCard from '@/components/coupon-card/coupon-card.vue'
import BusinessMatrix from '@/components/business-matrix/business-matrix.vue'

export default {
	name: 'MemberPage',
	components: {
		MembershipCard,
		MemberCenter,
		CouponCard,
		BusinessMatrix
	},
	data() {
		return {
			// 会员基本信息
			memberData: {
				username: '李先生',
				memberId: 'VIP202412001',
				levelName: '黄金会员',
				cardType: 'gold',
				points: 2580,
				totalPoints: 8520,
				avatar: '/static/avatar/default.jpg',
				joinDate: '2024-01-15',
				nextLevelPoints: 1420, // 距离下一等级还需积分
				nextLevel: '白金会员'
			},
			
			// 会员权益列表
			memberBenefits: [
				{
					id: 1,
					name: '生日特权',
					description: '生日当月享受8折优惠',
					icon: '/static/icons/birthday.png',
					available: true,
					status: '可用'
				},
				{
					id: 2,
					name: '优先预约',
					description: '可提前3天预约热门时段',
					icon: '/static/icons/priority.png',
					available: true,
					status: '可用'
				},
				{
					id: 3,
					name: '免费洗发',
					description: '每月享受1次免费洗发服务',
					icon: '/static/icons/wash.png',
					available: false,
					status: '本月已使用'
				},
				{
					id: 4,
					name: '积分翻倍',
					description: '消费积分双倍累积',
					icon: '/static/icons/double-points.png',
					available: true,
					status: '可用'
				}
			],
			
			// 积分兑换商品列表
			exchangeList: [
				{
					id: 1,
					name: '洗发水套装',
					image: '/static/products/shampoo.jpg',
					points: 500,
					originalPrice: '￥68',
					stock: 20,
					description: '专业洗护套装'
				},
				{
					id: 2,
					name: '护发精油',
					image: '/static/products/oil.jpg',
					points: 800,
					originalPrice: '￥128',
					stock: 15,
					description: '深层滋养护发精油'
				},
				{
					id: 3,
					name: '免费理发券',
					image: '/static/products/coupon.jpg',
					points: 1000,
					originalPrice: '￥38',
					stock: 10,
					description: '经典理发服务免费券'
				},
				{
					id: 4,
					name: '烫发体验券',
					image: '/static/products/perm-coupon.jpg',
					points: 2000,
					originalPrice: '￥168',
					stock: 5,
					description: '时尚烫发服务体验券'
				}
			],
			
			// 积分记录
			pointsRecords: [
				{
					id: 1,
					type: 'earn',
					points: 38,
					description: '消费获得积分 - 经典理发',
					date: '2024-12-18 14:30'
				},
				{
					id: 2,
					type: 'spend',
					points: -500,
					description: '积分兑换 - 洗发水套装',
					date: '2024-12-15 10:20'
				},
				{
					id: 3,
					type: 'earn',
					points: 168,
					description: '消费获得积分 - 时尚烫发',
					date: '2024-12-10 16:45'
				}
			],
			
			// 优惠券列表
			couponList: [
				{
					id: 1,
					name: '新用户专享',
					type: 'discount',
					value: 20,
					minAmount: 100,
					expireDate: '2024-12-31',
					scope: '全场通用',
					status: 'unused',
					description: '满100元减20元'
				},
				{
					id: 2,
					name: '烫发专用券',
					type: 'discount',
					value: 50,
					minAmount: 200,
					expireDate: '2024-12-25',
					scope: '烫发服务',
					status: 'unused',
					description: '烫发服务满200元减50元'
				},
				{
					id: 3,
					name: '会员专享',
					type: 'percentage',
					value: 15,
					minAmount: 0,
					expireDate: '2024-12-30',
					scope: '全场通用',
					status: 'used',
					description: '全场8.5折优惠'
				}
			],
			
			// 会员特权功能
			privilegeList: [
				{
					id: 1,
					name: '积分商城',
					icon: '/static/icons/points-mall.png',
					description: '积分兑换好礼',
					badge: '热门',
					url: '/pages/points/mall'
				},
				{
					id: 2,
					name: '升级攻略',
					icon: '/static/icons/upgrade.png',
					description: '会员升级指南',
					badge: '',
					url: '/pages/member/upgrade'
				},
				{
					id: 3,
					name: '专属客服',
					icon: '/static/icons/vip-service.png',
					description: '一对一贴心服务',
					badge: 'VIP',
					url: '/pages/service/vip'
				},
				{
					id: 4,
					name: '邀请好友',
					icon: '/static/icons/invite.png',
					description: '邀请送积分',
					badge: '送200',
					url: '/pages/invite/index'
				}
			]
		}
	},
	
	onLoad() {
		this.loadMemberData()
	},
	
	onPullDownRefresh() {
		this.loadMemberData().finally(() => {
			uni.stopPullDownRefresh()
		})
	},
	
	methods: {
		// 加载会员数据
		loadMemberData() {
			return new Promise((resolve) => {
				// 这里可以调用API获取会员数据
				setTimeout(() => {
					resolve()
				}, 1000)
			})
		},
		
		// 会员升级
		onUpgrade() {
			console.log('会员升级')
			uni.navigateTo({
				url: '/pages/member/upgrade'
			})
		},
		
		// 查看会员详情
		onViewDetails() {
			console.log('查看会员详情')
			uni.navigateTo({
				url: '/pages/member/details'
			})
		},
		
		// 积分兑换
		onExchange(item) {
			console.log('积分兑换：', item)
			if (this.memberData.points < item.points) {
				uni.showToast({
					title: '积分不足',
					icon: 'none'
				})
				return
			}
			
			uni.showModal({
				title: '确认兑换',
				content: `确定使用${item.points}积分兑换${item.name}吗？`,
				success: (res) => {
					if (res.confirm) {
						// 扣除积分
						this.memberData.points -= item.points
						
						// 添加积分记录
						this.pointsRecords.unshift({
							id: Date.now(),
							type: 'spend',
							points: -item.points,
							description: `积分兑换 - ${item.name}`,
							date: new Date().toLocaleString()
						})
						
						uni.showToast({
							title: '兑换成功！',
							icon: 'success'
						})
					}
				}
			})
		},
		
		// 兑换商品点击
		onExchangeItemClick(item) {
			console.log('查看兑换商品详情：', item)
			uni.navigateTo({
				url: '/pages/points/product?id=' + item.id
			})
		},
		
		// 领取优惠券
		handleReceiveCoupon(coupon) {
			console.log('领取优惠券：', coupon)
			uni.showToast({
				title: '领取成功！',
				icon: 'success'
			})
		},
		
		// 使用优惠券
		handleUseCoupon(coupon) {
			console.log('使用优惠券：', coupon)
			uni.navigateTo({
				url: '/pages/appointment/appointment?couponId=' + coupon.id
			})
		},
		
		// 前往优惠券中心
		goToCouponCenter() {
			uni.navigateTo({
				url: '/pages/coupon/center'
			})
		},
		
		// 特权功能点击
		onPrivilegeClick(item) {
			console.log('点击特权功能：', item)
			if (item.url) {
				uni.navigateTo({
					url: item.url
				})
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.member-container {
	min-height: 100vh;
	background-color: #f8f8f8;
}

.coupon-section,
.privilege-section {
	margin: 20rpx;
	background-color: #ffffff;
	border-radius: 16rpx;
	padding: 30rpx;
	box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
	margin-bottom: 20rpx;
}

.section-title {
	margin-bottom: 30rpx;
	text-align: center;
	
	.title-text {
		font-size: 36rpx;
		font-weight: bold;
		color: #8B4513;
		display: block;
		margin-bottom: 10rpx;
	}
	
	.title-desc {
		font-size: 28rpx;
		color: #999999;
		display: block;
	}
}

.coupon-list {
	margin-bottom: 30rpx;
}

.more-coupons {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 20rpx;
	border: 2rpx dashed #ddd;
	border-radius: 12rpx;
	color: #999;
	font-size: 28rpx;
	
	text {
		margin-right: 10rpx;
	}
}
</style>