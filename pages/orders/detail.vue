<template>
	<view class="order-detail-container">
		<!-- 订单状态 -->
		<view class="order-status-card">
			<view class="status-header">
				<image class="status-icon" :src="getStatusIcon(orderDetail.status)" mode="aspectFit"></image>
				<text class="status-text">{{orderDetail.statusText}}</text>
			</view>
			<view class="status-desc">{{getStatusDesc(orderDetail.status)}}</view>
			<view v-if="orderDetail.serviceTime" class="service-time">
				<text class="time-label">服务时间：</text>
				<text class="time-value">{{orderDetail.serviceTime}}</text>
			</view>
		</view>
		
		<!-- 服务信息 -->
		<view class="service-section">
			<view class="section-title">服务详情</view>
			<view class="service-item" v-for="service in orderDetail.services" :key="service.id">
				<image class="service-image" :src="service.image" mode="aspectFill"></image>
				<view class="service-info">
					<text class="service-name">{{service.name}}</text>
					<view class="service-details">
						<text class="barber-name">理发师：{{service.barber}}</text>
						<text class="duration">时长：{{service.duration}}</text>
					</view>
				</view>
				<view class="service-price">
					<text class="price-text">¥{{service.price}}</text>
					<text class="quantity">×{{service.quantity}}</text>
				</view>
			</view>
		</view>
		
		<!-- 店铺信息 -->
		<view class="shop-section">
			<view class="section-title">店铺信息</view>
			<view class="shop-info">
				<view class="shop-item">
					<text class="shop-label">店铺名称：</text>
					<text class="shop-value">{{orderDetail.shopInfo.name}}</text>
				</view>
				<view class="shop-item">
					<text class="shop-label">联系电话：</text>
					<text class="shop-value phone" @click="callShop">{{orderDetail.shopInfo.phone}}</text>
				</view>
				<view class="shop-item">
					<text class="shop-label">店铺地址：</text>
					<text class="shop-value address" @click="openMap">{{orderDetail.shopInfo.address}}</text>
				</view>
			</view>
		</view>
		
		<!-- 订单信息 -->
		<view class="order-section">
			<view class="section-title">订单信息</view>
			<view class="order-info">
				<view class="order-item">
					<text class="order-label">订单编号：</text>
					<text class="order-value">{{orderDetail.orderNumber}}</text>
				</view>
				<view class="order-item">
					<text class="order-label">下单时间：</text>
					<text class="order-value">{{orderDetail.createTime}}</text>
				</view>
				<view class="order-item">
					<text class="order-label">支付方式：</text>
					<text class="order-value">{{orderDetail.paymentMethod || '微信支付'}}</text>
				</view>
			</view>
		</view>
		
		<!-- 费用明细 -->
		<view class="cost-section">
			<view class="section-title">费用明细</view>
			<view class="cost-info">
				<view class="cost-item">
					<text class="cost-label">服务费用：</text>
					<text class="cost-value">¥{{getServiceTotal()}}</text>
				</view>
				<view v-if="orderDetail.discountAmount" class="cost-item">
					<text class="cost-label">优惠减免：</text>
					<text class="cost-value discount">-¥{{orderDetail.discountAmount}}</text>
				</view>
				<view class="cost-item total">
					<text class="cost-label">实付金额：</text>
					<text class="cost-value total-price">¥{{orderDetail.totalAmount}}</text>
				</view>
			</view>
		</view>
		
		<!-- 底部操作按钮 -->
		<view class="bottom-actions">
			<button v-if="orderDetail.canCancel" class="action-btn cancel-btn" @click="cancelOrder">取消预约</button>
			<button v-if="orderDetail.canPay" class="action-btn pay-btn" @click="payOrder">立即支付</button>
			<button v-if="orderDetail.canConfirm" class="action-btn confirm-btn" @click="confirmOrder">确认完成</button>
			<button v-if="orderDetail.canRate" class="action-btn rate-btn" @click="rateOrder">去评价</button>
			<button class="action-btn contact-btn" @click="contactShop">联系店铺</button>
		</view>
	</view>
</template>

<script>
export default {
	name: 'OrderDetail',
	data() {
		return {
			orderId: '',
			orderDetail: {
				id: '',
				orderNumber: '',
				status: '',
				statusText: '',
				createTime: '',
				serviceTime: '',
				totalAmount: 0,
				paymentMethod: '',
				discountAmount: 0,
				services: [],
				shopInfo: {
					name: '',
					address: '',
					phone: ''
				},
				canRate: false,
				canCancel: false,
				canPay: false,
				canConfirm: false
			}
		}
	},
	
	onLoad(options) {
		if (options.orderId) {
			this.orderId = options.orderId
			this.loadOrderDetail()
		}
	},
	
	methods: {
		// 加载订单详情
		loadOrderDetail() {
			// 模拟订单数据，实际应该从API获取
			const mockOrderData = {
				'A202412001': {
					id: 'A202412001',
					orderNumber: 'A202412001',
					status: 'completed',
					statusText: '已完成',
					createTime: '2024-12-18 13:30',
					serviceTime: '2024-12-18 14:00',
					totalAmount: 38,
					paymentMethod: '微信支付',
					discountAmount: 0,
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
				}
			}
			
			this.orderDetail = mockOrderData[this.orderId] || {}
			
			// 设置导航栏标题
			uni.setNavigationBarTitle({
				title: '订单详情'
			})
		},
		
		// 获取状态图标
		getStatusIcon(status) {
			const iconMap = {
				pending: '/static/icons/status-pending.png',
				confirmed: '/static/icons/status-confirmed.png',
				processing: '/static/icons/status-processing.png',
				completed: '/static/icons/status-completed.png',
				cancelled: '/static/icons/status-cancelled.png'
			}
			return iconMap[status] || '/static/icons/status-default.png'
		},
		
		// 获取状态描述
		getStatusDesc(status) {
			const descMap = {
				pending: '请尽快完成支付，超时订单将自动取消',
				confirmed: '预约已确认，请按时到店享受服务',
				processing: '服务正在进行中，请耐心等待',
				completed: '服务已完成，感谢您的光临',
				cancelled: '订单已取消'
			}
			return descMap[status] || ''
		},
		
		// 计算服务总费用
		getServiceTotal() {
			return this.orderDetail.services.reduce((total, service) => {
				return total + service.price * service.quantity
			}, 0)
		},
		
		// 取消订单
		cancelOrder() {
			uni.showModal({
				title: '确认取消',
				content: '确定要取消这个预约吗？',
				success: (res) => {
					if (res.confirm) {
						// 这里调用取消订单API
						uni.showToast({
							title: '预约已取消',
							icon: 'success'
						})
						
						// 更新订单状态
						this.orderDetail.status = 'cancelled'
						this.orderDetail.statusText = '已取消'
						this.orderDetail.canCancel = false
					}
				}
			})
		},
		
		// 支付订单
		payOrder() {
			uni.showModal({
				title: '确认支付',
				content: `确定支付 ¥${this.orderDetail.totalAmount} 吗？`,
				success: (res) => {
					if (res.confirm) {
						// 这里调用支付API
						uni.showToast({
							title: '支付成功！',
							icon: 'success'
						})
						
						// 更新订单状态
						this.orderDetail.status = 'confirmed'
						this.orderDetail.statusText = '已确认'
						this.orderDetail.canPay = false
						this.orderDetail.canCancel = true
					}
				}
			})
		},
		
		// 确认完成
		confirmOrder() {
			this.orderDetail.status = 'completed'
			this.orderDetail.statusText = '已完成'
			this.orderDetail.canConfirm = false
			this.orderDetail.canRate = true
			
			uni.showToast({
				title: '服务已确认完成！',
				icon: 'success'
			})
		},
		
		// 去评价
		rateOrder() {
			uni.navigateTo({
				url: '/pages/rating/create?orderId=' + this.orderId
			})
		},
		
		// 联系店铺
		contactShop() {
			uni.showActionSheet({
				itemList: ['拨打电话', '发送短信'],
				success: (res) => {
					if (res.tapIndex === 0) {
						this.callShop()
					} else if (res.tapIndex === 1) {
						this.sendSms()
					}
				}
			})
		},
		
		// 拨打电话
		callShop() {
			uni.makePhoneCall({
				phoneNumber: this.orderDetail.shopInfo.phone
			})
		},
		
		// 发送短信
		sendSms() {
			uni.showToast({
				title: '发送短信功能开发中',
				icon: 'none'
			})
		},
		
		// 打开地图
		openMap() {
			uni.openLocation({
				name: this.orderDetail.shopInfo.name,
				address: this.orderDetail.shopInfo.address,
				latitude: 39.908823,
				longitude: 116.397470,
				scale: 18
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.order-detail-container {
	min-height: 100vh;
	background-color: #f8f8f8;
	padding-bottom: 120rpx;
}

.order-status-card {
	background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%);
	margin: 20rpx;
	border-radius: 20rpx;
	padding: 40rpx;
	color: #ffffff;
	
	.status-header {
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
		
		.status-icon {
			width: 60rpx;
			height: 60rpx;
			margin-right: 20rpx;
		}
		
		.status-text {
			font-size: 36rpx;
			font-weight: bold;
		}
	}
	
	.status-desc {
		font-size: 28rpx;
		opacity: 0.9;
		margin-bottom: 20rpx;
		line-height: 1.5;
	}
	
	.service-time {
		font-size: 28rpx;
		
		.time-label {
			opacity: 0.8;
		}
		
		.time-value {
			font-weight: bold;
		}
	}
}

.service-section, .shop-section, .order-section, .cost-section {
	background-color: #ffffff;
	margin: 20rpx;
	border-radius: 20rpx;
	padding: 30rpx;
	
	.section-title {
		font-size: 32rpx;
		font-weight: bold;
		color: #333333;
		margin-bottom: 30rpx;
		padding-bottom: 20rpx;
		border-bottom: 2rpx solid #f0f0f0;
	}
}

.service-item {
	display: flex;
	align-items: center;
	padding: 20rpx 0;
	border-bottom: 2rpx solid #f8f8f8;
	
	&:last-child {
		border-bottom: none;
	}
	
	.service-image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 10rpx;
		margin-right: 20rpx;
	}
	
	.service-info {
		flex: 1;
		
		.service-name {
			font-size: 30rpx;
			font-weight: bold;
			color: #333333;
			display: block;
			margin-bottom: 10rpx;
		}
		
		.service-details {
			display: flex;
			flex-direction: column;
			gap: 5rpx;
			
			.barber-name, .duration {
				font-size: 24rpx;
				color: #666666;
			}
		}
	}
	
	.service-price {
		text-align: right;
		
		.price-text {
			font-size: 32rpx;
			font-weight: bold;
			color: #8B4513;
			display: block;
		}
		
		.quantity {
			font-size: 24rpx;
			color: #999999;
		}
	}
}

.shop-info, .order-info {
	.shop-item, .order-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 15rpx 0;
		border-bottom: 2rpx solid #f8f8f8;
		
		&:last-child {
			border-bottom: none;
		}
		
		.shop-label, .order-label {
			font-size: 28rpx;
			color: #666666;
		}
		
		.shop-value, .order-value {
			font-size: 28rpx;
			color: #333333;
			flex: 1;
			text-align: right;
			
			&.phone {
				color: #8B4513;
				text-decoration: underline;
			}
			
			&.address {
				color: #8B4513;
				text-decoration: underline;
			}
		}
	}
}

.cost-info {
	.cost-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 15rpx 0;
		
		&.total {
			border-top: 2rpx solid #f0f0f0;
			padding-top: 20rpx;
			margin-top: 10rpx;
		}
		
		.cost-label {
			font-size: 28rpx;
			color: #666666;
		}
		
		.cost-value {
			font-size: 28rpx;
			color: #333333;
			
			&.discount {
				color: #ff4757;
			}
			
			&.total-price {
				font-size: 32rpx;
				font-weight: bold;
				color: #8B4513;
			}
		}
	}
}

.bottom-actions {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: #ffffff;
	padding: 20rpx;
	border-top: 2rpx solid #f0f0f0;
	display: flex;
	gap: 20rpx;
	
	.action-btn {
		flex: 1;
		height: 80rpx;
		border-radius: 40rpx;
		border: none;
		font-size: 28rpx;
		
		&.cancel-btn {
			background-color: #f8f8f8;
			color: #666666;
		}
		
		&.pay-btn {
			background-color: #ff4757;
			color: #ffffff;
		}
		
		&.confirm-btn {
			background-color: #5cb85c;
			color: #ffffff;
		}
		
		&.rate-btn {
			background-color: #f39c12;
			color: #ffffff;
		}
		
		&.contact-btn {
			background-color: #8B4513;
			color: #ffffff;
		}
	}
}
</style>