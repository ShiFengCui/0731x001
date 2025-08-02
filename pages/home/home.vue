<template>
	<view class="home-container">
		<!-- 顶部轮播横幅 -->
		<banner-top
			:banner-list="bannerList"
			:show-quick-entry="true"
			:quick-entry-list="quickEntryList"
			:show-notice="true"
			:notice-list="noticeList"
			@bannerClick="onBannerClick"
			@quickEntryClick="onQuickEntryClick"
			@noticeClick="onNoticeClick"
		/>
		
		<!-- 主要服务矩阵 -->
		<view class="services-section">
			<view class="section-title">
				<text class="title-text">热门服务</text>
				<text class="title-desc">专业理发师，贴心服务</text>
			</view>
			<business-matrix
				:business-list="servicesList"
				title=""
				layout="grid"
				:columns="2"
				@item-click="onServiceClick"
			/>
		</view>
		
		<!-- 推荐理发师 -->
		<view class="barbers-section">
			<view class="section-title">
				<text class="title-text">明星理发师</text>
				<text class="title-desc">技艺精湛，经验丰富</text>
			</view>
			<product-list
				:product-list="barbersList"
				title=""
				layout="grid"
				@product-click="onBarberClick"
				@add-to-cart="onMakeAppointment"
			/>
		</view>
		
		<!-- 活动信息 -->
		<activity-component
			:notice-list="activityNotices"
			:banner-list="activityBanners"
			:quick-entry-list="activityEntries"
			@noticeClick="onActivityNoticeClick"
			@bannerClick="onActivityBannerClick"
			@quickEntryClick="onActivityEntryClick"
		/>
	</view>
</template>

<script>
import BannerTop from '@/components/banner-top/banner-top.vue'
import BusinessMatrix from '@/components/business-matrix/business-matrix.vue'
import ProductList from '@/components/product-component/product-list.vue'
import ActivityComponent from '@/components/activity-component/activity-component.vue'

export default {
	name: 'BarberShopHome',
	components: {
		BannerTop,
		BusinessMatrix,
		ProductList,
		ActivityComponent
	},
	data() {
		return {
			// 顶部轮播图数据
			bannerList: [
				{
					id: 1,
					image: '/static/banners/banner1.jpg',
					title: '新店开业大酬宾',
					description: '全场服务8折优惠',
					url: '/pages/activity/newstore'
				},
				{
					id: 2,
					image: '/static/banners/banner2.jpg',
					title: '会员充值送好礼',
					description: '充500送100，充1000送300',
					url: '/pages/member/recharge'
				},
				{
					id: 3,
					image: '/static/banners/banner3.jpg',
					title: '专业烫染服务',
					description: '韩式烫发，时尚染发',
					url: '/pages/services/permdye'
				}
			],
			
			// 快捷入口数据
			quickEntryList: [
				{
					id: 1,
					name: '立即预约',
					icon: '/static/icons/appointment.png',
					url: '/pages/appointment/appointment',
					badge: ''
				},
				{
					id: 2,
					name: '会员卡',
					icon: '/static/icons/member-card.png',
					url: '/pages/member/member',
					badge: 'VIP'
				},
				{
					id: 3,
					name: '优惠券',
					icon: '/static/icons/coupon.png',
					url: '/pages/coupon/list',
					badge: '3'
				},
				{
					id: 4,
					name: '客服',
					icon: '/static/icons/service.png',
					url: '/pages/service/contact',
					badge: ''
				}
			],
			
			// 公告数据
			noticeList: [
				{
					id: 1,
					content: '🎉 新店开业，全场服务8折优惠！',
					url: '/pages/activity/newstore'
				},
				{
					id: 2,
					content: '💝 会员充值享优惠，充500送100！',
					url: '/pages/member/recharge'
				},
				{
					id: 3,
					content: '✨ 预约满3次送精美礼品一份！',
					url: '/pages/activity/gift'
				}
			],
			
			// 服务项目数据
			servicesList: [
				{
					id: 1,
					name: '经典理发',
					icon: '/static/services/haircut.png',
					description: '专业理发师精心设计',
					price: '￥38',
					badge: '热门',
					url: '/pages/services/haircut'
				},
				{
					id: 2,
					name: '时尚烫发',
					icon: '/static/services/perm.png',
					description: '韩式烫发技术',
					price: '￥168',
					badge: '推荐',
					url: '/pages/services/perm'
				},
				{
					id: 3,
					name: '个性染发',
					icon: '/static/services/dye.png',
					description: '时尚色彩搭配',
					price: '￥128',
					badge: '新品',
					url: '/pages/services/dye'
				},
				{
					id: 4,
					name: '头发护理',
					icon: '/static/services/care.png',
					description: '深层营养护理',
					price: '￥88',
					badge: '',
					url: '/pages/services/care'
				}
			],
			
			// 理发师数据
			barbersList: [
				{
					id: 1,
					name: '张师傅',
					image: '/static/barbers/zhang.jpg',
					level: '高级理发师',
					experience: '10年经验',
					specialties: ['经典理发', '商务发型'],
					rating: 4.8,
					price: '预约￥0',
					description: '专业商务发型设计'
				},
				{
					id: 2,
					name: '李师傅',
					image: '/static/barbers/li.jpg',
					level: '首席设计师',
					experience: '8年经验',
					specialties: ['时尚烫发', '个性染发'],
					rating: 4.9,
					price: '预约￥0',
					description: '时尚造型专家'
				}
			],
			
			// 活动公告
			activityNotices: [
				{
					id: 1,
					content: '🔥 限时特惠：烫发+染发套餐仅需268元！',
					url: '/pages/activity/combo'
				}
			],
			
			// 活动轮播
			activityBanners: [
				{
					id: 1,
					image: '/static/activity/activity1.jpg',
					title: '双12狂欢节',
					url: '/pages/activity/double12'
				}
			],
			
			// 活动入口
			activityEntries: [
				{
					id: 1,
					name: '签到',
					icon: '/static/icons/checkin.png',
					url: '/pages/activity/checkin'
				},
				{
					id: 2,
					name: '积分商城',
					icon: '/static/icons/points.png',
					url: '/pages/points/mall'
				}
			]
		}
	},
	
	onLoad() {
		this.loadData()
	},
	
	onPullDownRefresh() {
		this.loadData().finally(() => {
			uni.stopPullDownRefresh()
		})
	},
	
	methods: {
		// 加载数据
		loadData() {
			return new Promise((resolve) => {
				// 这里可以调用API获取数据
				setTimeout(() => {
					resolve()
				}, 1000)
			})
		},
		
		// 轮播图点击
		onBannerClick(item) {
			console.log('点击轮播图：', item)
			if (item.url) {
				uni.navigateTo({
					url: item.url
				})
			}
		},
		
		// 快捷入口点击
		onQuickEntryClick(item) {
			console.log('点击快捷入口：', item)
			if (item.url) {
				if (item.url.startsWith('/pages/')) {
					uni.switchTab({
						url: item.url,
						fail: () => {
							uni.navigateTo({
								url: item.url
							})
						}
					})
				}
			}
		},
		
		// 公告点击
		onNoticeClick(item) {
			console.log('点击公告：', item)
			if (item.url) {
				uni.navigateTo({
					url: item.url
				})
			}
		},
		
		// 服务项目点击
		onServiceClick(item) {
			console.log('点击服务项目：', item)
			uni.navigateTo({
				url: '/pages/appointment/appointment?serviceId=' + item.id
			})
		},
		
		// 理发师点击
		onBarberClick(item) {
			console.log('点击理发师：', item)
			uni.navigateTo({
				url: '/pages/barber/detail?barberId=' + item.id
			})
		},
		
		// 预约理发师
		onMakeAppointment(item) {
			console.log('预约理发师：', item)
			uni.navigateTo({
				url: '/pages/appointment/appointment?barberId=' + item.id
			})
		},
		
		// 活动相关点击事件
		onActivityNoticeClick(item) {
			this.onNoticeClick(item)
		},
		
		onActivityBannerClick(item) {
			this.onBannerClick(item)
		},
		
		onActivityEntryClick(item) {
			this.onQuickEntryClick(item)
		}
	}
}
</script>

<style lang="scss" scoped>
.home-container {
	min-height: 100vh;
	background-color: #f8f8f8;
}

.services-section,
.barbers-section {
	margin: 20rpx 0;
	background-color: #ffffff;
	border-radius: 16rpx;
	padding: 30rpx;
	margin: 20rpx;
	box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
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
</style>