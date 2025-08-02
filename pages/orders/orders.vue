<template>
	<view class="orders-container">
		<!-- 订单状态筛选 -->
		<view class="status-filter">
			<view 
				v-for="(status, index) in orderStatus" 
				:key="index"
				:class="['status-item', { active: currentStatus === status.value }]"
				@click="switchStatus(status.value)"
			>
				<text class="status-text">{{status.label}}</text>
				<text v-if="status.count > 0" class="status-count">{{status.count}}</text>
			</view>
		</view>
		
		<!-- 订单列表 -->
		<view class="orders-list">
			<custom-orderlist 
				v-for="order in filteredOrders" 
				:key="order.id"
				:order-data="order"
				@orderClick="onOrderClick"
				@pay="onPay"
				@cancel="onCancel"
				@confirm="onConfirm"
				@rate="onRate"
				@detail="onDetail"
			/>
		</view>
		
		<!-- 空状态 -->
		<view v-if="filteredOrders.length === 0" class="empty-state">
			<image class="empty-icon" src="/static/icons/empty-order.png" mode="aspectFit"></image>
			<text class="empty-text">暂无相关订单</text>
			<button class="go-appointment-btn" @click="goToAppointment">去预约</button>
		</view>
	</view>
</template>

<script>
import CustomOrderlist from '@/components/custom-orderlist/custom-orderlist.vue'

export default {
	name: 'OrdersPage',
	components: {
		CustomOrderlist
	},
	data() {
		return {
			// 当前选中的状态
			currentStatus: 'all',
			
			// 订单状态筛选选项
			orderStatus: [
				{ label: '全部', value: 'all', count: 0 },
				{ label: '待付款', value: 'pending', count: 0 },
				{ label: '已确认', value: 'confirmed', count: 0 },
				{ label: '进行中', value: 'processing', count: 0 },
				{ label: '已完成', value: 'completed', count: 0 },
				{ label: '已取消', value: 'cancelled', count: 0 }
			],
			
			// 订单列表数据
			ordersList: [
				{
					id: 'A202412001',
					orderNumber: 'A202412001',
					status: 'completed',
					statusText: '已完成',
					createTime: '2024-12-18 13:30',
					serviceTime: '2024-12-18 14:00',
					totalAmount: 38,
					services: [
						{
							id: 1,
							name: '经典理发',
							image: '/static/services/haircut.png',
							price: 38,
							quantity: 1,
							barber: '张师傅',
							duration: '30分钟'
						}
					],
					shopInfo: {
						name: '美发沙龙',
						address: '北京市朝阳区xxx路xxx号',
						phone: '010-12345678'
					},
					canRate: true,
					canCancel: false,
					canPay: false,
					canConfirm: false
				},
				{
					id: 'A202412002',
					orderNumber: 'A202412002',
					status: 'confirmed',
					statusText: '已确认',
					createTime: '2024-12-19 10:15',
					serviceTime: '2024-12-22 10:00',
					totalAmount: 168,
					services: [
						{
							id: 2,
							name: '时尚烫发',
							image: '/static/services/perm.png',
							price: 168,
							quantity: 1,
							barber: '李师傅',
							duration: '120分钟'
						}
					],
					shopInfo: {
						name: '美发沙龙',
						address: '北京市朝阳区xxx路xxx号',
						phone: '010-12345678'
					},
					canRate: false,
					canCancel: true,
					canPay: false,
					canConfirm: false
				},
				{
					id: 'A202412003',
					orderNumber: 'A202412003',
					status: 'pending',
					statusText: '待付款',
					createTime: '2024-12-19 15:20',
					serviceTime: '2024-12-20 16:00',
					totalAmount: 128,
					services: [
						{
							id: 3,
							name: '个性染发',
							image: '/static/services/dye.png',
							price: 128,
							quantity: 1,
							barber: '王师傅',
							duration: '90分钟'
						}
					],
					shopInfo: {
						name: '美发沙龙',
						address: '北京市朝阳区xxx路xxx号',
						phone: '010-12345678'
					},
					canRate: false,
					canCancel: true,
					canPay: true,
					canConfirm: false
				},
				{
					id: 'A202412004',
					orderNumber: 'A202412004',
					status: 'processing',
					statusText: '进行中',
					createTime: '2024-12-19 14:00',
					serviceTime: '2024-12-19 15:00',
					totalAmount: 268,
					services: [
						{
							id: 5,
							name: '烫染套餐',
							image: '/static/services/combo.png',
							price: 268,
							quantity: 1,
							barber: '李师傅',
							duration: '180分钟'
						}
					],
					shopInfo: {
						name: '美发沙龙',
						address: '北京市朝阳区xxx路xxx号',
						phone: '010-12345678'
					},
					canRate: false,
					canCancel: false,
					canPay: false,
					canConfirm: true
				}
			]
		}
	},
	
	computed: {
		// 根据状态筛选订单
		filteredOrders() {
			if (this.currentStatus === 'all') {
				return this.ordersList
			}
			return this.ordersList.filter(order => order.status === this.currentStatus)
		}
	},
	
	onLoad(options) {
		// 如果从其他页面跳转过来带了状态参数
		if (options.status) {
			this.currentStatus = options.status
		}
		this.loadOrdersData()
		this.updateStatusCount()
	},
	
	onPullDownRefresh() {
		this.loadOrdersData().finally(() => {
			uni.stopPullDownRefresh()
		})
	},
	
	methods: {
		// 加载订单数据
		loadOrdersData() {
			return new Promise((resolve) => {
				// 这里可以调用API获取订单数据
				setTimeout(() => {
					this.updateStatusCount()
					resolve()
				}, 1000)
			})
		},
		
		// 更新状态计数
		updateStatusCount() {
			this.orderStatus.forEach(status => {
				if (status.value === 'all') {
					status.count = this.ordersList.length
				} else {
					status.count = this.ordersList.filter(order => order.status === status.value).length
				}
			})
		},
		
		// 切换状态筛选
		switchStatus(status) {
			this.currentStatus = status
		},
		
		// 订单点击
		onOrderClick(order) {
			console.log('点击订单：', order)
			this.onDetail(order)
		},
		
		// 支付订单
		onPay(order) {
			console.log('支付订单：', order)
			uni.showModal({
				title: '确认支付',
				content: `确定支付 ¥${order.totalAmount} 吗？`,
				success: (res) => {
					if (res.confirm) {
						// 模拟支付成功
						order.status = 'confirmed'
						order.statusText = '已确认'
						order.canPay = false
						order.canCancel = true
						
						this.updateStatusCount()
						
						uni.showToast({
							title: '支付成功！',
							icon: 'success'
						})
					}
				}
			})
		},
		
		// 取消订单
		onCancel(order) {
			console.log('取消订单：', order)
			uni.showModal({
				title: '确认取消',
				content: '确定要取消这个预约吗？',
				success: (res) => {
					if (res.confirm) {
						order.status = 'cancelled'
						order.statusText = '已取消'
						order.canCancel = false
						order.canPay = false
						
						this.updateStatusCount()
						
						uni.showToast({
							title: '预约已取消',
							icon: 'success'
						})
					}
				}
			})
		},
		
		// 确认完成
		onConfirm(order) {
			console.log('确认完成：', order)
			order.status = 'completed'
			order.statusText = '已完成'
			order.canConfirm = false
			order.canRate = true
			
			this.updateStatusCount()
			
			uni.showToast({
				title: '服务已确认完成！',
				icon: 'success'
			})
		},
		
		// 评价订单
		onRate(order) {
			console.log('评价订单：', order)
			uni.navigateTo({
				url: '/pages/rating/create?orderId=' + order.id
			})
		},
		
		// 查看订单详情
		onDetail(order) {
			console.log('查看订单详情：', order)
			uni.navigateTo({
				url: '/pages/orders/detail?orderId=' + order.id
			})
		},
		
		// 前往预约
		goToAppointment() {
			uni.switchTab({
				url: '/pages/appointment/appointment'
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.orders-container {
	min-height: 100vh;
	background-color: #f8f8f8;
}

.status-filter {
	display: flex;
	background-color: #ffffff;
	padding: 20rpx 0;
	border-bottom: 2rpx solid #f0f0f0;
	position: sticky;
	top: 0;
	z-index: 10;
	
	.status-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20rpx 10rpx;
		position: relative;
		
		&.active {
			.status-text {
				color: #8B4513;
				font-weight: bold;
			}
			
			&::after {
				content: '';
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
				width: 60rpx;
				height: 4rpx;
				background-color: #8B4513;
				border-radius: 2rpx;
			}
		}
		
		.status-text {
			font-size: 28rpx;
			color: #666666;
			margin-bottom: 8rpx;
		}
		
		.status-count {
			font-size: 20rpx;
			color: #ffffff;
			background-color: #ff4757;
			border-radius: 20rpx;
			padding: 4rpx 8rpx;
			min-width: 32rpx;
			text-align: center;
			line-height: 1;
		}
	}
}

.orders-list {
	padding: 20rpx;
}

.empty-state {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 100rpx 40rpx;
	
	.empty-icon {
		width: 200rpx;
		height: 200rpx;
		margin-bottom: 40rpx;
		opacity: 0.6;
	}
	
	.empty-text {
		font-size: 32rpx;
		color: #999999;
		margin-bottom: 40rpx;
	}
	
	.go-appointment-btn {
		background-color: #8B4513;
		color: #ffffff;
		border: none;
		border-radius: 50rpx;
		padding: 20rpx 60rpx;
		font-size: 28rpx;
	}
}
</style>