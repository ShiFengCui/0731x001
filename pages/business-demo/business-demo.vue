<template>
	<view class="business-demo">
		<view class="demo-header">
			<text class="header-title">业务入口矩阵演示</text>
			<text class="header-desc">展示不同样式和配置的业务入口矩阵</text>
		</view>
		
		<scroll-view class="demo-content" scroll-y>
			<!-- 基础网格布局 -->
			<view class="demo-section">
				<view class="section-title">基础网格布局</view>
				<business-matrix
					:business-list="basicBusinessList"
					title="核心业务"
					:columns="4"
					item-style="circle"
					@item-click="handleItemClick"
				/>
			</view>
			
			<!-- 卡片布局 -->
			<view class="demo-section">
				<view class="section-title">卡片布局</view>
				<business-matrix
					:business-list="cardBusinessList"
					title="管理中心"
					subtitle="企业级管理功能"
					layout="card"
					:columns="2"
					item-style="rounded"
					size="large"
					:show-description="true"
					:shadow="true"
					@item-click="handleItemClick"
				/>
			</view>
			
			<!-- 列表布局 -->
			<view class="demo-section">
				<view class="section-title">列表布局</view>
				<business-matrix
					:business-list="listBusinessList"
					title="快捷功能"
					layout="list"
					item-style="square"
					:show-description="true"
					@item-click="handleItemClick"
				/>
			</view>
			
			<!-- 自定义样式 -->
			<view class="demo-section">
				<view class="section-title">自定义样式</view>
				<business-matrix
					:business-list="customBusinessList"
					title="特色服务"
					:columns="3"
					item-style="rounded"
					size="small"
					gap="20rpx"
					background-color="#f0f2f5"
					:shadow="true"
					@item-click="handleItemClick"
				/>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import BusinessMatrix from '@/components/business-matrix/business-matrix.vue'
	
	export default {
		name: 'BusinessDemo',
		components: {
			BusinessMatrix
		},
		data() {
			return {
				// 基础业务列表
				basicBusinessList: [					{
						id: '1',
						name: '商品管理',
						icon: '/static/logo.png',
						url: '/pages/product-demo/product-demo'
					},
					{
						id: '2',
						name: '订单管理',
						icon: '/static/logo.png',
						url: '/pages/order-demo/order-demo',
						badge: {
							type: 'new',
							text: 'NEW'
						}
					},
					{
						id: '3',
						name: '用户管理',
						icon: '/static/logo.png',
						url: '/pages/user-demo/user-demo'
					},
					{
						id: '4',
						name: '数据统计',
						icon: '/static/logo.png',
						url: '/pages/data-demo/data-demo',
						badge: {
							type: 'hot',
							text: 'HOT'
						}
					},
					{
						id: '5',
						name: '系统设置',
						icon: '/static/logo.png',
						url: '/pages/setting-demo/setting-demo'
					}				],
				
				// 卡片业务列表
				cardBusinessList: [
					{
						id: '1',
						name: '财务管理',
						icon: '/static/logo.png',
						description: '收支管理、账单统计、财务报表',
						url: '/pages/finance-demo/finance-demo',
						badge: {
							type: 'vip',
							text: 'VIP'
						}
					},
					{
						id: '2',
						name: '库存管理',
						icon: '/static/logo.png',
						description: '商品库存、入库出库、库存预警',
						url: '/pages/inventory-demo/inventory-demo'
					}
				],
				
				// 列表业务列表
				listBusinessList: [
					{
						id: '1',
						name: '快速下单',
						icon: '/static/logo.png',
						description: '快速创建订单，提升工作效率',
						url: '/pages/quick-order/quick-order'
					}
				],
				
				// 自定义样式业务列表
				customBusinessList: [
					{
						id: '1',
						name: '会员服务',
						icon: '/static/logo.png',
						url: '/pages/member-demo/member-demo',
						badge: {
							type: 'vip',
							text: 'VIP'
						}
					},
					{
						id: '2',
						name: '积分商城',
						icon: '/static/logo.png',
						url: '/pages/points-mall/points-mall',
						badge: {
							type: 'hot',
							text: '火爆'
						}
					},
					{
						id: '3',
						name: '专属客服',
						icon: '/static/logo.png',
						url: '/pages/vip-service/vip-service'
					}
				]
			}
		},
		methods: {
			// 处理业务入口点击
			handleItemClick({ item, index }) {
				console.log('点击了业务入口：', item.name, '索引：', index)
				
				// 显示提示信息
				uni.showToast({
					title: `点击了：${item.name}`,
					icon: 'none',
					duration: 1500
				})
				
				// 如果没有配置跳转地址，显示提示
				if (!item.url) {
					uni.showModal({
						title: '提示',
						content: `${item.name} 功能正在开发中`,
						showCancel: false
					})
				}
			}
		},
		
		// 页面生命周期
		onLoad(options) {
			console.log('业务入口矩阵演示页面加载', options)
		},
		
		onShow() {
			console.log('业务入口矩阵演示页面显示')
		}
	}
</script>

<style lang="scss" scoped>
	.business-demo {
		min-height: 100vh;
		background-color: #f5f5f5;
	}
	
	.demo-header {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		padding: 60rpx 40rpx 40rpx;
		text-align: center;
		color: white;
		
		.header-title {
			font-size: 40rpx;
			font-weight: bold;
			margin-bottom: 16rpx;
			display: block;
		}
		
		.header-desc {
			font-size: 28rpx;
			opacity: 0.9;
			display: block;
		}
	}
	
	.demo-content {
		height: calc(100vh - 200rpx);
		padding: 40rpx 20rpx;
	}
	
	.demo-section {
		margin-bottom: 60rpx;
		
		&:last-child {
			margin-bottom: 20rpx;
		}
	}
	
	.section-title {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 24rpx;
		padding: 0 20rpx;
		position: relative;
		
		&::before {
			content: '';
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
			width: 8rpx;
			height: 32rpx;
			background: linear-gradient(135deg, #667eea, #764ba2);
			border-radius: 4rpx;
		}
	}
</style>