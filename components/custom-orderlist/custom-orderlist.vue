<template>
	<view class="order-list-item" :class="{ 'order-list-item--shadow': shadow, 'order-list-item--border': border }"
		:style="{ margin: margin }" @click="handleOrderClick">
		
		<!-- 订单头部信息 -->
		<view class="order-header">
			<view class="order-header__left">
				<text class="order-number">订单号: {{ orderData.orderNo }}</text>
				<text class="order-time">{{ formatTime(orderData.createTime) }}</text>
			</view>
			<view class="order-header__right">
				<text class="order-status" :class="getStatusClass(orderData.status)">
					{{ getStatusText(orderData.status) }}
				</text>
			</view>
		</view>
		
		<!-- 商品列表 -->
		<view class="order-goods">
			<view v-for="(item, index) in orderData.goodsList" :key="index" class="goods-item">
				<view class="goods-image">
					<image 
						:src="item.image" 
						:mode="imageMode"
						:lazy-load="lazyLoad"
						@error="onImageError"
					/>
				</view>
				<view class="goods-info">
					<text class="goods-name">{{ item.name }}</text>
					<text class="goods-spec" v-if="item.spec">{{ item.spec }}</text>
					<view class="goods-price-qty">
						<text class="goods-price">¥{{ item.price }}</text>
						<text class="goods-qty">x{{ item.quantity }}</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 订单金额信息 -->
		<view class="order-amount">
			<view class="amount-row" v-if="orderData.goodsCount > 1">
				<text class="amount-label">共{{ orderData.goodsCount }}件商品</text>
			</view>
			<view class="amount-row">
				<text class="amount-label">实付款:</text>
				<text class="amount-value">¥{{ orderData.totalAmount }}</text>
			</view>
		</view>
		
		<!-- 操作按钮区域 -->
		<view class="order-actions" v-if="showActions">
			<view class="action-buttons">
				<!-- 根据订单状态显示不同按钮 -->
				<template v-if="orderData.status === 'pending'">
					<button class="action-btn cancel-btn" @click.stop="handleCancel">取消订单</button>
					<button class="action-btn pay-btn" @click.stop="handlePay">立即支付</button>
				</template>
				<template v-else-if="orderData.status === 'paid'">
					<button class="action-btn remind-btn" @click.stop="handleRemind">提醒发货</button>
				</template>
				<template v-else-if="orderData.status === 'shipped'">
					<button class="action-btn logistics-btn" @click.stop="handleLogistics">查看物流</button>
					<button class="action-btn confirm-btn" @click.stop="handleConfirm">确认收货</button>
				</template>
				<template v-else-if="orderData.status === 'completed'">
					<button class="action-btn evaluate-btn" @click.stop="handleEvaluate">去评价</button>
					<button class="action-btn rebuy-btn" @click.stop="handleRebuy">再次购买</button>
				</template>
				<button class="action-btn detail-btn" @click.stop="handleDetail">查看详情</button>
			</view>
		</view>
		
		<!-- 自定义插槽 -->
		<slot></slot>
	</view>
</template>

<script>
	/**
	 * CustomOrderList 订单列表组件
	 * @description 用于显示订单信息的列表组件，包含订单号、状态、商品信息、价格等
	 * @property {Object} orderData 订单数据对象
	 * @property {String} imageMode 图片显示模式，默认aspectFill
	 * @property {Boolean} shadow 是否显示阴影，默认true
	 * @property {Boolean} border 是否显示边框，默认true
	 * @property {String} margin 外边距，默认15rpx
	 * @property {Boolean} lazyLoad 图片懒加载，默认true
	 * @property {Boolean} showActions 是否显示操作按钮，默认true
	 * @event {Function} orderClick 点击订单触发
	 * @event {Function} pay 支付订单触发
	 * @event {Function} cancel 取消订单触发
	 * @event {Function} confirm 确认收货触发
	 * @event {Function} evaluate 评价订单触发
	 * @event {Function} logistics 查看物流触发
	 * @event {Function} detail 查看详情触发
	 * @event {Function} remind 提醒发货触发
	 * @event {Function} rebuy 再次购买触发
	 */
	export default {
		name: 'CustomOrderList',
		emits: ['orderClick', 'pay', 'cancel', 'confirm', 'evaluate', 'logistics', 'detail', 'remind', 'rebuy'],
		props: {
			// 订单数据
			orderData: {
				type: Object,
				default: () => ({
					orderNo: '',
					status: 'pending',
					createTime: '',
					goodsList: [],
					totalAmount: 0,
					goodsCount: 0
				})
			},
			// 图片显示模式
			imageMode: {
				type: String,
				default: 'aspectFill'
			},
			// 是否显示阴影
			shadow: {
				type: Boolean,
				default: true
			},
			// 是否显示边框
			border: {
				type: Boolean,
				default: true
			},
			// 外边距
			margin: {
				type: String,
				default: '15rpx'
			},
			// 图片懒加载
			lazyLoad: {
				type: Boolean,
				default: true
			},
			// 是否显示操作按钮
			showActions: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			// 点击订单事件
			handleOrderClick() {
				this.$emit('orderClick', this.orderData);
			},
			// 支付订单
			handlePay() {
				this.$emit('pay', this.orderData);
			},
			// 取消订单
			handleCancel() {
				this.$emit('cancel', this.orderData);
			},
			// 确认收货
			handleConfirm() {
				this.$emit('confirm', this.orderData);
			},
			// 评价订单
			handleEvaluate() {
				this.$emit('evaluate', this.orderData);
			},
			// 查看物流
			handleLogistics() {
				this.$emit('logistics', this.orderData);
			},
			// 查看详情
			handleDetail() {
				this.$emit('detail', this.orderData);
			},
			// 提醒发货
			handleRemind() {
				this.$emit('remind', this.orderData);
			},
			// 再次购买
			handleRebuy() {
				this.$emit('rebuy', this.orderData);
			},
			// 图片加载失败
			onImageError(e) {
				console.log('图片加载失败:', e);
			},
			// 格式化时间
			formatTime(time) {
				if (!time) return '';
				const date = new Date(time);
				const year = date.getFullYear();
				const month = String(date.getMonth() + 1).padStart(2, '0');
				const day = String(date.getDate()).padStart(2, '0');
				const hours = String(date.getHours()).padStart(2, '0');
				const minutes = String(date.getMinutes()).padStart(2, '0');
				return `${year}-${month}-${day} ${hours}:${minutes}`;
			},
			// 获取状态文本
			getStatusText(status) {
				const statusMap = {
					'pending': '待支付',
					'paid': '已支付',
					'shipped': '已发货',
					'completed': '已完成',
					'cancelled': '已取消',
					'refunding': '退款中',
					'refunded': '已退款'
				};
				return statusMap[status] || '未知状态';
			},
			// 获取状态样式类
			getStatusClass(status) {
				return `status-${status}`;
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 变量定义
	$border-color: #EBEEF5;
	$shadow-color: rgba(0, 0, 0, 0.1);
	$primary-color: #007AFF;
	$warning-color: #FF9500;
	$success-color: #34C759;
	$danger-color: #FF3B30;
	$text-color: #333333;
	$text-color-light: #666666;
	$text-color-lighter: #999999;
	$background-color: #FFFFFF;
	
	.order-list-item {
		background-color: $background-color;
		border-radius: 12rpx;
		overflow: hidden;
		
		&--shadow {
			box-shadow: 0 4rpx 12rpx $shadow-color;
		}
		
		&--border {
			border: 1rpx solid $border-color;
		}
	}
	
	// 订单头部
	.order-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		padding: 24rpx;
		border-bottom: 1rpx solid $border-color;
		
		&__left {
			flex: 1;
		}
		
		&__right {
			margin-left: 20rpx;
		}
	}
	
	.order-number {
		display: block;
		font-size: 28rpx;
		color: $text-color;
		font-weight: 500;
		margin-bottom: 8rpx;
	}
	
	.order-time {
		display: block;
		font-size: 24rpx;
		color: $text-color-lighter;
	}
	
	.order-status {
		font-size: 26rpx;
		font-weight: 500;
		padding: 8rpx 16rpx;
		border-radius: 20rpx;
		
		&.status-pending {
			color: $warning-color;
			background-color: rgba(255, 149, 0, 0.1);
		}
		
		&.status-paid {
			color: $primary-color;
			background-color: rgba(0, 122, 255, 0.1);
		}
		
		&.status-shipped {
			color: $success-color;
			background-color: rgba(52, 199, 89, 0.1);
		}
		
		&.status-completed {
			color: $text-color-light;
			background-color: #F2F2F7;
		}
		
		&.status-cancelled, &.status-refunded {
			color: $danger-color;
			background-color: rgba(255, 59, 48, 0.1);
		}
	}
	
	// 商品区域
	.order-goods {
		padding: 0 24rpx;
	}
	
	.goods-item {
		display: flex;
		padding: 24rpx 0;
		border-bottom: 1rpx solid #F5F5F5;
		
		&:last-child {
			border-bottom: none;
		}
	}
	
	.goods-image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
		overflow: hidden;
		margin-right: 24rpx;
		flex-shrink: 0;
		
		image {
			width: 100%;
			height: 100%;
		}
	}
	
	.goods-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	
	.goods-name {
		font-size: 28rpx;
		color: $text-color;
		line-height: 1.4;
		margin-bottom: 8rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	
	.goods-spec {
		font-size: 24rpx;
		color: $text-color-lighter;
		margin-bottom: 12rpx;
	}
	
	.goods-price-qty {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.goods-price {
		font-size: 28rpx;
		color: $danger-color;
		font-weight: 600;
	}
	
	.goods-qty {
		font-size: 24rpx;
		color: $text-color-lighter;
	}
	
	// 订单金额
	.order-amount {
		padding: 24rpx;
		border-top: 1rpx solid $border-color;
		text-align: right;
	}
	
	.amount-row {
		margin-bottom: 8rpx;
		
		&:last-child {
			margin-bottom: 0;
		}
	}
	
	.amount-label {
		font-size: 26rpx;
		color: $text-color-light;
		margin-right: 16rpx;
	}
	
	.amount-value {
		font-size: 28rpx;
		color: $danger-color;
		font-weight: 600;
	}
	
	// 操作按钮
	.order-actions {
		padding: 24rpx;
		border-top: 1rpx solid $border-color;
	}
	
	.action-buttons {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		flex-wrap: wrap;
		gap: 16rpx;
	}
	
	.action-btn {
		padding: 12rpx 24rpx;
		border-radius: 24rpx;
		font-size: 24rpx;
		border: 1rpx solid $border-color;
		background-color: $background-color;
		color: $text-color;
		
		&.pay-btn, &.confirm-btn {
			background-color: $primary-color;
			color: #FFFFFF;
			border-color: $primary-color;
		}
		
		&.cancel-btn {
			color: $text-color-light;
		}
		
		&.evaluate-btn, &.rebuy-btn {
			color: $primary-color;
			border-color: $primary-color;
		}
		
		&.remind-btn, &.logistics-btn {
			color: $warning-color;
			border-color: $warning-color;
		}
		
		&.detail-btn {
			color: $text-color-light;
		}
	}
</style> 