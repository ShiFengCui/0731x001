<template>
	<view class="order-page">
		<page-skeleton title="我的订单" :show-header="true">
			<!-- 订单列表 -->
			<view class="order-section">
				<custom-order-list 
					v-for="order in orderList"
					:key="order.id"
					:order-data="order"
					@orderClick="onOrderClick"
					@pay="onPay"
					@cancel="onCancel"
					@detail="onDetail"
				/>
			</view>
			
			<!-- 底部导航栏 -->
			<tab-bar 
				:tab-list="tabBarList" 
				:current="2"
				active-color="#00B578"
				@change="onTabChange"
			/>
		</page-skeleton>
	</view>
</template>

<script>
	import PageSkeleton from '@/components/page-skeleton/page-skeleton.vue'
	import CustomOrderList from '@/components/custom-orderlist/custom-orderlist.vue'
	import TabBar from '@/components/tab-bar/tab-bar.vue'
	
	export default {
		name: 'OrderPage',
		components: {
			PageSkeleton,
			CustomOrderList,
			TabBar
		},
		data() {
			return {
				orderList: [
					{
						id: 'O20240101001',
						status: 'pending',
						statusText: '待支付',
						createTime: '2024-01-01 10:30:00',
						totalAmount: 56.00,
						items: [
							{
								name: '生椰拿铁',
								image: '/static/products/latte1.jpg',
								price: 27.00,
								quantity: 2,
								specs: '大杯 热饮'
							}
						],
						storeInfo: {
							name: '北京国贸店',
							address: '北京市朝阳区国贸中心'
						}
					},
					{
						id: 'O20240101002',
						status: 'completed',
						statusText: '已完成',
						createTime: '2024-01-01 09:15:00',
						totalAmount: 43.00,
						items: [
							{
								name: '美式咖啡',
								image: '/static/products/americano.jpg',
								price: 18.00,
								quantity: 1,
								specs: '中杯 热饮'
							},
							{
								name: '提拉米苏',
								image: '/static/products/tiramisu.jpg',
								price: 25.00,
								quantity: 1,
								specs: ''
							}
						],
						storeInfo: {
							name: '北京望京店',
							address: '北京市朝阳区望京SOHO'
						}
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
			onOrderClick(order) {
				uni.navigateTo({
					url: `/pages/order/detail?id=${order.id}`
				})
			},
			onPay(order) {
				uni.showToast({
					title: '正在跳转支付...',
					icon: 'loading'
				})
			},
			onCancel(order) {
				uni.showModal({
					title: '确认取消',
					content: '确定要取消这个订单吗？',
					success: (res) => {
						if (res.confirm) {
							uni.showToast({
								title: '订单已取消',
								icon: 'success'
							})
						}
					}
				})
			},
			onDetail(order) {
				uni.navigateTo({
					url: `/pages/order/detail?id=${order.id}`
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
	.order-page {
		background-color: #f5f5f5;
		min-height: 100vh;
		padding-bottom: 100rpx;
	}
	
	.order-section {
		background-color: #ffffff;
	}
</style> 