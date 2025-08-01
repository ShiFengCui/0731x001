<template>
	<view class="custom-card" :class="{ 'custom-card--shadow': shadow, 'custom-card--border': border }"
		:style="{ margin: margin }" @click="handleClick">
		<!-- 图片区域 -->
		<view v-if="image" class="custom-card__image-wrapper">
			<image 
				class="custom-card__image" 
				:src="image" 
				:mode="imageMode"
				:lazy-load="lazyLoad"
				@load="onImageLoad"
				@error="onImageError"
			/>
		</view>
		
		<!-- 内容区域 -->
		<view class="custom-card__content">
			<!-- 标题 -->
			<view v-if="title" class="custom-card__title">
				<text class="custom-card__title-text" :class="{ 'custom-card__title-text--ellipsis': titleEllipsis }">
					{{ title }}
				</text>
			</view>
			
			<!-- 描述 -->
			<view v-if="description" class="custom-card__description">
				<text class="custom-card__description-text" :class="{ 'custom-card__description-text--ellipsis': descriptionEllipsis }">
					{{ description }}
				</text>
			</view>
			
			<!-- 插槽内容 -->
			<slot></slot>
		</view>
		
		<!-- 底部操作区域 -->
		<view v-if="$slots.actions" class="custom-card__actions">
			<slot name="actions"></slot>
		</view>
	</view>
</template>

<script>
	/**
	 * CustomCard 自定义卡片组件
	 * @description 包含图片、标题、描述的卡片组件，可被其他页面直接引入使用
	 * @property {String} image 卡片图片地址
	 * @property {String} title 卡片标题
	 * @property {String} description 卡片描述
	 * @property {String} imageMode 图片显示模式，默认aspectFill
	 * @property {Boolean} titleEllipsis 标题是否显示省略号，默认true
	 * @property {Boolean} descriptionEllipsis 描述是否显示省略号，默认true
	 * @property {Boolean} shadow 是否显示阴影，默认true
	 * @property {Boolean} border 是否显示边框，默认true
	 * @property {String} margin 外边距，默认15px
	 * @property {Boolean} lazyLoad 图片懒加载，默认true
	 * @event {Function} click 点击卡片触发
	 * @event {Function} imageLoad 图片加载完成触发
	 * @event {Function} imageError 图片加载失败触发
	 */
	export default {
		name: 'CustomCard',
		emits: ['click', 'imageLoad', 'imageError'],
		props: {
			// 图片地址
			image: {
				type: String,
				default: ''
			},
			// 标题
			title: {
				type: String,
				default: ''
			},
			// 描述
			description: {
				type: String,
				default: ''
			},
			// 图片显示模式
			imageMode: {
				type: String,
				default: 'aspectFill'
			},
			// 标题是否显示省略号
			titleEllipsis: {
				type: Boolean,
				default: true
			},
			// 描述是否显示省略号
			descriptionEllipsis: {
				type: Boolean,
				default: true
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
				default: '15px'
			},
			// 图片懒加载
			lazyLoad: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			// 点击卡片事件
			handleClick() {
				this.$emit('click');
			},
			// 图片加载完成事件
			onImageLoad(e) {
				this.$emit('imageLoad', e);
			},
			// 图片加载失败事件
			onImageError(e) {
				this.$emit('imageError', e);
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 变量定义
	$border-color: #EBEEF5;
	$shadow-color: rgba(0, 0, 0, 0.1);
	$title-color: #303133;
	$description-color: #606266;
	$background-color: #FFFFFF;
	
	.custom-card {
		background-color: $background-color;
		border-radius: 8rpx;
		overflow: hidden;
		transition: all 0.3s ease;
		
		&--shadow {
			box-shadow: 0 4rpx 12rpx $shadow-color;
		}
		
		&--border {
			border: 1rpx solid $border-color;
		}
		
		&:active {
			transform: scale(0.98);
		}
	}
	
	.custom-card__image-wrapper {
		width: 100%;
		height: 400rpx;
		overflow: hidden;
	}
	
	.custom-card__image {
		width: 100%;
		height: 100%;
		display: block;
	}
	
	.custom-card__content {
		padding: 24rpx;
	}
	
	.custom-card__title {
		margin-bottom: 16rpx;
	}
	
	.custom-card__title-text {
		font-size: 32rpx;
		font-weight: 600;
		color: $title-color;
		line-height: 1.4;
		
		&--ellipsis {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
	
	.custom-card__description {
		margin-bottom: 16rpx;
	}
	
	.custom-card__description-text {
		font-size: 28rpx;
		color: $description-color;
		line-height: 1.5;
		
		&--ellipsis {
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
	}
	
	.custom-card__actions {
		padding: 0 24rpx 24rpx;
		border-top: 1rpx solid $border-color;
		margin-top: 16rpx;
		padding-top: 16rpx;
	}
</style> 