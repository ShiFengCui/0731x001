<template>
	<view class="business-matrix" :class="matrixClass">
		<!-- 矩阵标题 -->
		<view v-if="title" class="matrix-header">
			<text class="matrix-title">{{ title }}</text>
			<text v-if="subtitle" class="matrix-subtitle">{{ subtitle }}</text>
		</view>
		
		<!-- 矩阵网格 -->
		<view class="matrix-grid" :class="gridClass" :style="gridStyle">
			<view 
				v-for="(item, index) in businessList" 
				:key="item.id || index"
				class="matrix-item"
				:class="itemClass"
				:style="itemInlineStyle"
				@click="handleItemClick(item, index)"
			>
				<!-- 图标区域 -->
				<view class="item-icon-wrapper">
					<image 
						v-if="item.icon"
						:src="item.icon" 
						class="item-icon"
						:class="iconClass"
						mode="aspectFit"
						@error="handleImageError"
					/>
					<view v-else class="item-icon-placeholder" :class="iconClass">
						<text class="placeholder-text">{{ item.name ? item.name.charAt(0) : '?' }}</text>
					</view>
					
					<!-- 角标 -->
					<view v-if="item.badge" class="item-badge" :class="getBadgeClass(item.badge.type)">
						<text class="badge-text">{{ item.badge.text }}</text>
					</view>
				</view>
				
				<!-- 名称 -->
				<text class="item-name" :class="nameClass">{{ item.name }}</text>
				
				<!-- 描述 -->
				<text v-if="item.description && showDescription" class="item-description">
					{{ item.description }}
				</text>
			</view>
		</view>
		
		<!-- 空状态 -->
		<view v-if="!businessList.length" class="empty-state">
			<text class="empty-text">暂无业务入口</text>
		</view>
	</view>
</template>

<script>
	/**
	 * BusinessMatrix 业务入口矩阵卡片组件
	 * @description 支持多种矩阵样式的业务入口展示组件，可自定义图片、名字、地址等
	 * @property {Array} businessList 业务入口数据列表
	 * @property {String} title 矩阵标题
	 * @property {String} subtitle 矩阵副标题
	 * @property {String} layout 布局样式：grid(网格), list(列表), card(卡片)
	 * @property {Number} columns 每行显示的列数，默认4
	 * @property {String} itemStyle 每个项目的样式风格：circle(圆形), square(方形), rounded(圆角)
	 * @property {String} size 尺寸大小：small, medium, large
	 * @property {Boolean} showDescription 是否显示描述文字
	 * @property {String} iconSize 图标尺寸
	 * @property {String} gap 间距大小
	 * @property {String} backgroundColor 背景颜色
	 * @property {Boolean} shadow 是否显示阴影
	 * @event {Function} itemClick 点击业务入口项目时触发
	 */
	export default {
		name: 'BusinessMatrix',
		emits: ['itemClick'],
		props: {
			// 业务入口数据列表
			businessList: {
				type: Array,
				default: () => []
			},
			// 矩阵标题
			title: {
				type: String,
				default: ''
			},
			// 矩阵副标题
			subtitle: {
				type: String,
				default: ''
			},
			// 布局样式
			layout: {
				type: String,
				default: 'grid',
				validator: value => ['grid', 'list', 'card'].includes(value)
			},
			// 每行显示的列数
			columns: {
				type: Number,
				default: 4,
				validator: value => value >= 1 && value <= 6
			},
			// 项目样式风格
			itemStyle: {
				type: String,
				default: 'circle',
				validator: value => ['circle', 'square', 'rounded'].includes(value)
			},
			// 尺寸大小
			size: {
				type: String,
				default: 'medium',
				validator: value => ['small', 'medium', 'large'].includes(value)
			},
			// 是否显示描述文字
			showDescription: {
				type: Boolean,
				default: false
			},
			// 图标尺寸
			iconSize: {
				type: String,
				default: ''
			},
			// 间距大小
			gap: {
				type: String,
				default: ''
			},
			// 背景颜色
			backgroundColor: {
				type: String,
				default: ''
			},
			// 是否显示阴影
			shadow: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			// 矩阵容器样式类
			matrixClass() {
				return [
					`matrix-${this.layout}`,
					`matrix-${this.size}`,
					{
						'matrix-shadow': this.shadow
					}
				]
			},
			// 网格样式类
			gridClass() {
				return [
					`grid-${this.layout}`,
					`grid-columns-${this.columns}`
				]
			},
			// 网格样式
			gridStyle() {
				const style = {}
				if (this.gap) {
					style.gap = this.gap
				}
				if (this.backgroundColor) {
					style.backgroundColor = this.backgroundColor
				}
				return style
			},
			// 项目样式类
			itemClass() {
				return [
					`item-${this.itemStyle}`,
					`item-${this.size}`
				]
			},
			// 项目内联样式
			itemInlineStyle() {
				const style = {}
				if (this.layout === 'list') {
					style.width = '100%'
				}
				return style
			},
			// 图标样式类
			iconClass() {
				return [
					`icon-${this.itemStyle}`,
					`icon-${this.size}`
				]
			},
			// 名称样式类
			nameClass() {
				return [
					`name-${this.size}`,
					{
						'name-ellipsis': this.layout !== 'card'
					}
				]
			}
		},
		methods: {
			// 处理项目点击事件
			handleItemClick(item, index) {
				this.$emit('itemClick', { item, index })
				
				// 如果有地址，进行页面跳转
				if (item.url) {
					if (item.url.startsWith('http')) {
						// 外部链接
						// #ifdef H5
						window.open(item.url)
						// #endif
						// #ifndef H5
						uni.showToast({
							title: '即将跳转到外部链接',
							icon: 'none'
						})
						// #endif
					} else {
						// 内部页面跳转
						uni.navigateTo({
							url: item.url,
							fail: () => {
								uni.switchTab({
									url: item.url
								})
							}
						})
					}
				}
			},
			// 获取角标样式类
			getBadgeClass(type) {
				const typeMap = {
					'new': 'badge-new',
					'hot': 'badge-hot',
					'sale': 'badge-sale',
					'vip': 'badge-vip'
				}
				return typeMap[type] || 'badge-default'
			},
			// 处理图片加载失败
			handleImageError() {
				console.warn('业务入口图标加载失败')
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 变量定义
	$primary-color: #1890ff;
	$success-color: #52c41a;
	$warning-color: #faad14;
	$error-color: #ff4d4f;
	$text-color: #333;
	$text-color-secondary: #666;
	$text-color-placeholder: #999;
	$border-color: #e8e8e8;
	$background-color: #fff;
	$shadow-color: rgba(0, 0, 0, 0.1);
	
	.business-matrix {
		background-color: $background-color;
		border-radius: 16rpx;
		overflow: hidden;
		
		&.matrix-shadow {
			box-shadow: 0 4rpx 16rpx $shadow-color;
		}
	}
	
	// 标题区域
	.matrix-header {
		padding: 32rpx 24rpx 16rpx;
		text-align: center;
		
		.matrix-title {
			font-size: 36rpx;
			font-weight: bold;
			color: $text-color;
			line-height: 1.4;
		}
		
		.matrix-subtitle {
			font-size: 28rpx;
			color: $text-color-secondary;
			margin-top: 8rpx;
			display: block;
		}
	}
	
	// 网格布局
	.matrix-grid {
		padding: 24rpx;
		
		&.grid-grid {
			display: grid;
			gap: 32rpx;
			
			&.grid-columns-1 { grid-template-columns: repeat(1, 1fr); }
			&.grid-columns-2 { grid-template-columns: repeat(2, 1fr); }
			&.grid-columns-3 { grid-template-columns: repeat(3, 1fr); }
			&.grid-columns-4 { grid-template-columns: repeat(4, 1fr); }
			&.grid-columns-5 { grid-template-columns: repeat(5, 1fr); }
			&.grid-columns-6 { grid-template-columns: repeat(6, 1fr); }
		}
		
		&.grid-list {
			display: flex;
			flex-direction: column;
			gap: 24rpx;
		}
		
		&.grid-card {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 24rpx;
		}
	}
	
	// 矩阵项目
	.matrix-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		transition: all 0.3s ease;
		
		&:active {
			transform: scale(0.95);
		}
		
		// 列表布局
		.grid-list &.item-square,
		.grid-list &.item-rounded {
			flex-direction: row;
			text-align: left;
			padding: 20rpx;
			background-color: #f8f9fa;
			border-radius: 12rpx;
			
			.item-icon-wrapper {
				margin-right: 24rpx;
				margin-bottom: 0;
			}
			
			.item-name {
				align-self: flex-start;
				margin-top: 8rpx;
			}
		}
		
		// 卡片布局
		.grid-card & {
			padding: 24rpx;
			background-color: #f8f9fa;
			border-radius: 16rpx;
			box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
		}
	}
	
	// 图标区域
	.item-icon-wrapper {
		position: relative;
		margin-bottom: 16rpx;
	}
	
	.item-icon,
	.item-icon-placeholder {
		display: block;
		
		// 圆形样式
		&.icon-circle {
			border-radius: 50%;
			
			&.icon-small { width: 80rpx; height: 80rpx; }
			&.icon-medium { width: 96rpx; height: 96rpx; }
			&.icon-large { width: 112rpx; height: 112rpx; }
		}
		
		// 方形样式
		&.icon-square {
			border-radius: 0;
			
			&.icon-small { width: 80rpx; height: 80rpx; }
			&.icon-medium { width: 96rpx; height: 96rpx; }
			&.icon-large { width: 112rpx; height: 112rpx; }
		}
		
		// 圆角样式
		&.icon-rounded {
			border-radius: 16rpx;
			
			&.icon-small { width: 80rpx; height: 80rpx; }
			&.icon-medium { width: 96rpx; height: 96rpx; }
			&.icon-large { width: 112rpx; height: 112rpx; }
		}
	}
	
	.item-icon-placeholder {
		background-color: #e8e8e8;
		display: flex;
		align-items: center;
		justify-content: center;
		
		.placeholder-text {
			font-size: 32rpx;
			font-weight: bold;
			color: $text-color-placeholder;
		}
	}
	
	// 角标
	.item-badge {
		position: absolute;
		top: -8rpx;
		right: -8rpx;
		padding: 4rpx 8rpx;
		border-radius: 20rpx;
		font-size: 20rpx;
		font-weight: bold;
		color: white;
		min-width: 32rpx;
		text-align: center;
		
		&.badge-new { background-color: $error-color; }
		&.badge-hot { background-color: $warning-color; }
		&.badge-sale { background-color: $success-color; }
		&.badge-vip { background-color: $primary-color; }
		&.badge-default { background-color: $text-color-placeholder; }
	}
	
	.badge-text {
		font-size: 20rpx;
		line-height: 1.2;
	}
	
	// 名称
	.item-name {
		font-weight: 500;
		line-height: 1.4;
		
		&.name-small { font-size: 24rpx; }
		&.name-medium { font-size: 28rpx; }
		&.name-large { font-size: 32rpx; }
		
		&.name-ellipsis {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			max-width: 100%;
		}
	}
	
	// 描述
	.item-description {
		font-size: 22rpx;
		color: $text-color-secondary;
		margin-top: 8rpx;
		line-height: 1.3;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	
	// 空状态
	.empty-state {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 100rpx 0;
		
		.empty-text {
			font-size: 28rpx;
			color: $text-color-placeholder;
		}
	}
	
	// 尺寸变体
	.matrix-small {
		.matrix-grid {
			padding: 16rpx;
			gap: 24rpx;
		}
		
		.matrix-header {
			padding: 24rpx 16rpx 8rpx;
		}
	}
	
	.matrix-large {
		.matrix-grid {
			padding: 32rpx;
			gap: 40rpx;
		}
		
		.matrix-header {
			padding: 40rpx 32rpx 24rpx;
		}
	}
	
	// 响应式设计
	@media (max-width: 750rpx) {
		.matrix-grid.grid-columns-5,
		.matrix-grid.grid-columns-6 {
			grid-template-columns: repeat(4, 1fr);
		}
	}
	
	@media (max-width: 600rpx) {
		.matrix-grid.grid-columns-4,
		.matrix-grid.grid-columns-5,
		.matrix-grid.grid-columns-6 {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>