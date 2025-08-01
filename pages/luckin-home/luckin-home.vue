<template>
	<view class="luckin-home">
		<!-- 页面骨架框架 -->
		<page-skeleton 
			title="瑞幸咖啡"
			:show-header="false"
			layout="normal"
		>
			<!-- 顶部轮播横幅 -->
			<view class="home-section">
				<banner-top
					:banner-list="bannerList"
					:show-quick-entry="false"
					:show-notice="true"
					:notice-list="noticeList"
					:autoplay="true"
					:interval="3000"
					banner-height="360rpx"
					@bannerClick="onBannerClick"
					@noticeClick="onNoticeClick"
					@moreNotice="onMoreNotice"
				/>
			</view>
			
			<!-- 快捷入口矩阵 -->
			<view class="home-section">
				<business-matrix
					:business-list="quickEntryList"
					:columns="4"
					item-style="circle"
					size="medium"
					:shadow="false"
					@item-click="onQuickEntryClick"
				/>
			</view>
			
			<!-- 活动展示区 -->
			<view class="home-section">
				<activity-component
					:notice-list="activityNotices"
					:banner-list="activityBanners"
					:show-quick-entry="true"
					quick-entry-title="活动专区"
					:quick-entry-list="activityEntries"
					@noticeClick="onActivityNoticeClick"
					@bannerClick="onActivityBannerClick"
					@quickEntryClick="onActivityEntryClick"
				/>
			</view>
			
			<!-- 商品推荐 -->
			<view class="home-section">
				<product-list
					:product-list="recommendProducts"
					title="今日推荐"
					:show-count="true"
					layout="grid"
					@productClick="onProductClick"
					@addToCart="onAddToCart"
					@buyNow="onBuyNow"
				/>
			</view>
			
			<!-- 热销商品 -->
			<view class="home-section">
				<product-list
					:product-list="hotProducts"
					title="热销榜单"
					:show-count="false"
					layout="single"
					@productClick="onProductClick"
					@addToCart="onAddToCart"
					@buyNow="onBuyNow"
				/>
			</view>
			
			<!-- 底部导航栏 -->
			<tab-bar 
				:tab-list="tabBarList" 
				:current="currentTab"
				active-color="#00B578"
				inactive-color="#999999"
				@change="onTabChange"
			/>
		</page-skeleton>
	</view>
</template>

<script>
	// 导入组件
	import BannerTop from '@/components/banner-top/banner-top.vue'
	import BusinessMatrix from '@/components/business-matrix/business-matrix.vue'
	import ActivityComponent from '@/components/activity-component/activity-component.vue'
	import ProductList from '@/components/product-component/product-list.vue'
	import PageSkeleton from '@/components/page-skeleton/page-skeleton.vue'
	import TabBar from '@/components/tab-bar/tab-bar.vue'
	
	export default {
		name: 'LuckinHome',
		components: {
			BannerTop,
			BusinessMatrix,
			ActivityComponent,
			ProductList,
			PageSkeleton,
			TabBar
		},
		data() {
			return {
				currentTab: 0,
				// 顶部轮播数据
				bannerList: [
					{
						id: 1,
						image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=400&fit=crop',
						title: '新品上市',
						subtitle: '生椰拿铁限时特惠',
						link: '/pages/product/detail?id=1'
					},
					{
						id: 2,
						image: 'https://images.unsplash.com/photo-1545665277-5937750b25b8?w=800&h=400&fit=crop',
						title: '会员专享',
						subtitle: '充值送券，最高立减50元',
						link: '/pages/member/recharge'
					},
					{
						id: 3,
						image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=400&fit=crop',
						title: '门店优惠',
						subtitle: '新店开业，全场8.8折',
						link: '/pages/store/list'
					}
				],
				
				// 公告数据
				noticeList: [
					{
						id: 1,
						content: '【新品】生椰系列全新上线，邀您品鉴'
					},
					{
						id: 2,
						content: '【活动】会员充值优惠，充100送20'
					},
					{
						id: 3,
						content: '【提醒】春节期间部分门店营业时间调整'
					}
				],
				
				// 快捷入口数据
				quickEntryList: [
					{
						id: 1,
						name: '附近门店',
						icon: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=100&h=100&fit=crop',
						link: '/pages/store/list'
					},
					{
						id: 2,
						name: '积分商城',
						icon: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=100&h=100&fit=crop',
						link: '/pages/points/mall',
						badge: {
							type: 'hot',
							text: 'HOT'
						}
					},
					{
						id: 3,
						name: '优惠券',
						icon: 'https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?w=100&h=100&fit=crop',
						link: '/pages/coupon/center'
					},
					{
						id: 4,
						name: '会员权益',
						icon: 'https://images.unsplash.com/photo-1624969862293-b749659ccc4e?w=100&h=100&fit=crop',
						link: '/pages/member/benefits'
					},
					{
						id: 5,
						name: '点餐',
						icon: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=100&h=100&fit=crop',
						link: '/pages/menu/index'
					},
					{
						id: 6,
						name: '外卖',
						icon: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=100&h=100&fit=crop',
						link: '/pages/delivery/index'
					},
					{
						id: 7,
						name: '预约取餐',
						icon: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop',
						link: '/pages/pickup/index'
					},
					{
						id: 8,
						name: '企业订购',
						icon: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
						link: '/pages/enterprise/index'
					}
				],
				
				// 活动公告
				activityNotices: [
					{
						id: 1,
						content: '新春活动：集齐福卡赢大奖'
					},
					{
						id: 2,
						content: '情人节限定：买一送一甜蜜来袭'
					}
				],
				
				// 活动轮播
				activityBanners: [
					{
						id: 1,
						image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=300&fit=crop',
						title: '新春集福',
						link: '/pages/activity/spring'
					},
					{
						id: 2,
						image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&h=300&fit=crop',
						title: '情人节特惠',
						link: '/pages/activity/valentine'
					}
				],
				
				// 活动入口
				activityEntries: [
					{
						id: 1,
						title: '签到领券',
						icon: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=80&h=80&fit=crop'
					},
					{
						id: 2,
						title: '每日转盘',
						icon: 'https://images.unsplash.com/photo-1593950315186-76a92975b60c?w=80&h=80&fit=crop'
					},
					{
						id: 3,
						title: '邀请有礼',
						icon: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?w=80&h=80&fit=crop'
					}
				],
				
				// 推荐商品
				recommendProducts: [
					{
						id: 1,
						name: '生椰拿铁',
						image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop',
						price: '27.00',
						originalPrice: '32.00',
						description: '香浓椰浆遇见意式浓缩',
						tags: ['新品', '热销'],
						salesCount: 1230
					},
					{
						id: 2,
						name: '陨石拿铁',
						image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
						price: '29.00',
						originalPrice: '35.00',
						description: '黑巧克力与咖啡的完美融合',
						tags: ['推荐'],
						salesCount: 856
					},
					{
						id: 3,
						name: '椰云拿铁',
						image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
						price: '25.00',
						description: '清香椰香，丝滑奶泡',
						tags: ['人气'],
						salesCount: 642
					},
					{
						id: 4,
						name: 'RAW拿铁',
						image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop',
						price: '31.00',
						description: '纯正意式，回归本真',
						tags: ['经典'],
						salesCount: 445
					}
				],
				
				// 热销商品
				hotProducts: [
					{
						id: 5,
						name: '瑞纳冰',
						image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400&h=300&fit=crop',
						price: '19.00',
						originalPrice: '22.00',
						description: '清爽柠檬，夏日必备',
						tags: ['热销', '限时特惠'],
						salesCount: 2156
					},
					{
						id: 6,
						name: '芝士茶拿铁',
						image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop',
						price: '33.00',
						description: '茶香与芝士的奇妙碰撞',
						tags: ['新品'],
						salesCount: 892
					}
				],
				
				// 底部导航数据
				tabBarList: [
					{
						id: 'home',
						text: '首页',
						icon: 'home',
						image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=60&h=60&fit=crop',
						activeImage: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=60&h=60&fit=crop&saturate=2',
						pagePath: '/pages/luckin-home/luckin-home'
					},
					{
						id: 'menu',
						text: '点餐',
						icon: 'shop',
						image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=60&h=60&fit=crop',
						activeImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=60&h=60&fit=crop&saturate=2',
						pagePath: '/pages/menu/index'
					},
					{
						id: 'order',
						text: '订单',
						icon: 'list',
						image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=60&h=60&fit=crop',
						activeImage: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=60&h=60&fit=crop&saturate=2',
						pagePath: '/pages/order/list',
						badge: {
							count: 2
						}
					},
					{
						id: 'member',
						text: '会员',
						icon: 'person',
						image: 'https://images.unsplash.com/photo-1624969862293-b749659ccc4e?w=60&h=60&fit=crop',
						activeImage: 'https://images.unsplash.com/photo-1624969862293-b749659ccc4e?w=60&h=60&fit=crop&saturate=2',
						pagePath: '/pages/member/center'
					},
					{
						id: 'profile',
						text: '我的',
						icon: 'person-filled',
						image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop',
						activeImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&saturate=2',
						pagePath: '/pages/profile/index'
					}
				]
			}
		},
		onLoad() {
			console.log('瑞幸咖啡首页加载完成')
		},
		methods: {
			// 轮播图点击
			onBannerClick(banner) {
				console.log('点击轮播图:', banner)
				if (banner.link) {
					uni.navigateTo({
						url: banner.link
					})
				}
			},
			
			// 公告点击
			onNoticeClick(notice) {
				console.log('点击公告:', notice)
				uni.showToast({
					title: notice.content,
					icon: 'none'
				})
			},
			
			// 更多公告
			onMoreNotice() {
				console.log('查看更多公告')
				uni.navigateTo({
					url: '/pages/notice/list'
				})
			},
			
			// 快捷入口点击
			onQuickEntryClick(entry) {
				console.log('点击快捷入口:', entry)
				if (entry.link) {
					uni.navigateTo({
						url: entry.link
					})
				}
			},
			
			// 活动公告点击
			onActivityNoticeClick(notice) {
				console.log('点击活动公告:', notice)
			},
			
			// 活动轮播点击
			onActivityBannerClick(banner) {
				console.log('点击活动轮播:', banner)
			},
			
			// 活动入口点击
			onActivityEntryClick(entry) {
				console.log('点击活动入口:', entry)
			},
			
			// 商品点击
			onProductClick(product) {
				console.log('点击商品:', product)
				uni.navigateTo({
					url: `/pages/product/detail?id=${product.id}`
				})
			},
			
			// 加入购物车
			onAddToCart(product) {
				console.log('加入购物车:', product)
				uni.showToast({
					title: '已加入购物车',
					icon: 'success'
				})
			},
			
			// 立即购买
			onBuyNow(product) {
				console.log('立即购买:', product)
				uni.navigateTo({
					url: `/pages/order/confirm?productId=${product.id}`
				})
			},
			
			// 底部导航切换
			onTabChange(tab) {
				console.log('切换导航:', tab)
				this.currentTab = tab.index
				
				// 处理页面跳转
				if (tab.item.pagePath && tab.index !== 0) {
					uni.switchTab({
						url: tab.item.pagePath,
						fail: () => {
							uni.navigateTo({
								url: tab.item.pagePath
							})
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.luckin-home {
		background-color: #f5f5f5;
		min-height: 100vh;
		padding-bottom: 100rpx; /* 为底部导航栏留出空间 */
	}
	
	.home-section {
		margin-bottom: 20rpx;
		background-color: #ffffff;
		
		&:last-child {
			margin-bottom: 0;
		}
	}
	
	/* 确保底部导航栏固定在底部 */
	:deep(.tab-bar) {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 999;
	}
</style> 