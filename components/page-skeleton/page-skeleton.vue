<template>
	<view class="page-skeleton" :class="[`page-skeleton--${layout}`, {
		'page-skeleton--safe-area': safeArea,
		'page-skeleton--custom-bg': customBackground
	}]" :style="containerStyle">
		<!-- 顶部导航栏 -->
		<view v-if="showHeader" class="page-skeleton__header" :class="headerClass" :style="headerStyle">
			<slot name="header">
				<view class="skeleton-header-default">
					<view v-if="showBack" class="skeleton-back-btn" @click="handleBack">
						<uni-icons type="left" :color="headerTextColor" :size="18" />
					</view>
					<view class="skeleton-title">
						<text class="skeleton-title-text" :style="{ color: headerTextColor }">{{ title }}</text>
					</view>
					<view class="skeleton-right-action">
						<slot name="headerRight"></slot>
					</view>
				</view>
			</slot>
		</view>
		
		<!-- 内容区域 -->
		<view class="page-skeleton__content" :class="contentClass" :style="contentStyle">
			<!-- 顶部横幅区域 -->
			<view v-if="$slots.banner" class="page-skeleton__banner">
				<slot name="banner"></slot>
			</view>
			
			<!-- 搜索栏区域 -->
			<view v-if="$slots.search" class="page-skeleton__search" :style="searchStyle">
				<slot name="search"></slot>
			</view>
			
			<!-- 标签页区域 -->
			<view v-if="$slots.tabs" class="page-skeleton__tabs" :class="tabsClass" :style="tabsStyle">
				<slot name="tabs"></slot>
			</view>
			
			<!-- 主要内容区域 -->
			<view class="page-skeleton__main" :class="mainClass" :style="mainStyle">
				<slot></slot>
			</view>
			
			<!-- 侧边栏（仅在侧边栏布局时显示） -->
			<view v-if="layout === 'sidebar' && $slots.sidebar" class="page-skeleton__sidebar" :style="sidebarStyle">
				<slot name="sidebar"></slot>
			</view>
		</view>
		
		<!-- 底部操作栏 -->
		<view v-if="$slots.footer" class="page-skeleton__footer" :class="footerClass" :style="footerStyle">
			<slot name="footer"></slot>
		</view>
		
		<!-- 悬浮操作按钮 -->
		<view v-if="$slots.fab" class="page-skeleton__fab" :style="fabStyle">
			<slot name="fab"></slot>
		</view>
		
		<!-- 加载状态 -->
		<view v-if="loading" class="page-skeleton__loading" :style="loadingStyle">
			<slot name="loading">
				<view class="skeleton-loading-default">
					<uni-load-more status="loading" :content-text="loadingText" />
				</view>
			</slot>
		</view>
		
		<!-- 空状态 -->
		<view v-if="empty && !loading" class="page-skeleton__empty" :style="emptyStyle">
			<slot name="empty">
				<view class="skeleton-empty-default">
					<image class="empty-image" :src="emptyImage" mode="aspectFit" />
					<text class="empty-text">{{ emptyText }}</text>
					<view v-if="emptyButtonText" class="empty-button" @click="handleEmptyAction">
						<text class="empty-button-text">{{ emptyButtonText }}</text>
					</view>
				</view>
			</slot>
		</view>
		
		<!-- 遮罩层 -->
		<view v-if="showMask" class="page-skeleton__mask" :style="maskStyle" @click="handleMaskClick">
			<slot name="mask"></slot>
		</view>
	</view>
</template><script>
/**
 * PageSkeleton 页面骨架组件
 * @description 灵活的页面布局骨架，支持多种布局模式和内容区域自定义
 * @property {String} layout 布局模式：normal(普通)、sidebar(侧边栏)、tab(标签页)、flow(流式)
 * @property {String} title 页面标题
 * @property {Boolean} showHeader 是否显示头部，默认true
 * @property {Boolean} showBack 是否显示返回按钮，默认true
 * @property {Boolean} safeArea 是否适配安全区域，默认true
 * @property {String} backgroundColor 页面背景色
 * @property {Boolean} customBackground 是否使用自定义背景
 * @property {String} headerTextColor 头部文字颜色，默认#333
 * @property {String} headerBackground 头部背景色，默认#fff
 * @property {Number} headerHeight 头部高度，默认88rpx
 * @property {Boolean} loading 是否显示加载状态
 * @property {Object} loadingText 加载文案配置
 * @property {Boolean} empty 是否显示空状态
 * @property {String} emptyText 空状态文案
 * @property {String} emptyImage 空状态图片
 * @property {String} emptyButtonText 空状态按钮文字
 * @property {Boolean} showMask 是否显示遮罩
 * @property {String} maskOpacity 遮罩透明度，默认0.5
 */
export default {
	name: 'PageSkeleton',
	emits: ['back', 'emptyAction', 'maskClick'],
	props: {
		// 布局模式
		layout: {
			type: String,
			default: 'normal',
			validator(value) {
				return ['normal', 'sidebar', 'tab', 'flow'].includes(value);
			}
		},
		// 页面标题
		title: {
			type: String,
			default: ''
		},
		// 是否显示头部
		showHeader: {
			type: Boolean,
			default: true
		},
		// 是否显示返回按钮
		showBack: {
			type: Boolean,
			default: true
		},
		// 是否适配安全区域
		safeArea: {
			type: Boolean,
			default: true
		},
		// 页面背景色
		backgroundColor: {
			type: String,
			default: '#f5f5f5'
		},
		// 是否使用自定义背景
		customBackground: {
			type: Boolean,
			default: false
		},
		// 头部文字颜色
		headerTextColor: {
			type: String,
			default: '#333333'
		},
		// 头部背景色
		headerBackground: {
			type: String,
			default: '#ffffff'
		},
		// 头部高度
		headerHeight: {
			type: Number,
			default: 88
		},
		// 内容区域padding
		contentPadding: {
			type: String,
			default: '0'
		},
		// 是否显示加载状态
		loading: {
			type: Boolean,
			default: false
		},
		// 加载文案配置
		loadingText: {
			type: Object,
			default() {
				return {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				};
			}
		},
		// 是否显示空状态
		empty: {
			type: Boolean,
			default: false
		},
		// 空状态文案
		emptyText: {
			type: String,
			default: '暂无数据'
		},
		// 空状态图片
		emptyImage: {
			type: String,
			default: '/static/empty.png'
		},
		// 空状态按钮文字
		emptyButtonText: {
			type: String,
			default: ''
		},
		// 是否显示遮罩
		showMask: {
			type: Boolean,
			default: false
		},
		// 遮罩透明度
		maskOpacity: {
			type: Number,
			default: 0.5
		}
	},
	computed: {
		// 容器样式
		containerStyle() {
			return {
				backgroundColor: this.customBackground ? 'transparent' : this.backgroundColor
			};
		},
		// 头部样式
		headerStyle() {
			return {
				backgroundColor: this.headerBackground,
				height: `${this.headerHeight}rpx`
			};
		},
		// 头部类名
		headerClass() {
			return {
				'page-skeleton__header--fixed': this.layout !== 'flow'
			};
		},
		// 内容区域样式
		contentStyle() {
			const style = {
				padding: this.contentPadding
			};
			if (this.showHeader && this.layout !== 'flow') {
				style.paddingTop = `${this.headerHeight}rpx`;
			}
			return style;
		},
		// 内容区域类名
		contentClass() {
			return {
				'page-skeleton__content--scrollable': this.layout !== 'sidebar'
			};
		},
		// 搜索栏样式
		searchStyle() {
			return {
				padding: '20rpx'
			};
		},
		// 标签页样式
		tabsStyle() {
			return {
				position: this.layout === 'tab' ? 'sticky' : 'relative',
				top: this.layout === 'tab' ? '0' : 'auto',
				zIndex: this.layout === 'tab' ? '10' : 'auto'
			};
		},
		// 标签页类名
		tabsClass() {
			return {
				'page-skeleton__tabs--sticky': this.layout === 'tab'
			};
		},
		// 主要内容区域样式
		mainStyle() {
			const style = {};
			if (this.layout === 'sidebar') {
				style.flex = '1';
				style.minHeight = '0';
			}
			return style;
		},
		// 主要内容区域类名
		mainClass() {
			return {
				'page-skeleton__main--flex': this.layout === 'sidebar',
				'page-skeleton__main--flow': this.layout === 'flow'
			};
		},
		// 侧边栏样式
		sidebarStyle() {
			return {
				width: '200rpx',
				backgroundColor: '#ffffff',
				borderLeft: '1rpx solid #eee'
			};
		},
		// 底部样式
		footerStyle() {
			return {
				backgroundColor: '#ffffff',
				borderTop: '1rpx solid #eee'
			};
		},
		// 底部类名
		footerClass() {
			return {
				'page-skeleton__footer--fixed': this.layout !== 'flow'
			};
		},
		// 悬浮按钮样式
		fabStyle() {
			return {
				position: 'fixed',
				right: '30rpx',
				bottom: '100rpx',
				zIndex: '100'
			};
		},
		// 加载状态样式
		loadingStyle() {
			return {
				backgroundColor: 'rgba(255, 255, 255, 0.8)'
			};
		},
		// 空状态样式
		emptyStyle() {
			return {
				backgroundColor: 'rgba(255, 255, 255, 0.8)'
			};
		},
		// 遮罩样式
		maskStyle() {
			return {
				backgroundColor: `rgba(0, 0, 0, ${this.maskOpacity})`
			};
		}
	},
	methods: {
		// 返回按钮点击
		handleBack() {
			this.$emit('back');
			// 默认行为：返回上一页
			uni.navigateBack();
		},
		// 空状态按钮点击
		handleEmptyAction() {
			this.$emit('emptyAction');
		},
		// 遮罩点击
		handleMaskClick() {
			this.$emit('maskClick');
		}
	}
};
</script><style lang="scss" scoped>
// 颜色变量
$primary-color: #007AFF;
$border-color: #EBEEF5;
$text-color: #303133;
$secondary-text-color: #606266;
$placeholder-color: #C0C4CC;
$background-color: #F5F5F5;
$white-color: #FFFFFF;

.page-skeleton {
	position: relative;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	
	&--safe-area {
		// 使用安全区域变量
		padding-top: constant(safe-area-inset-top);
		padding-top: env(safe-area-inset-top);
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}
	
	&--custom-bg {
		background: transparent;
	}
	
	// 不同布局模式
	&--normal {
		.page-skeleton__content {
			flex: 1;
		}
	}
	
	&--sidebar {
		.page-skeleton__content {
			flex: 1;
			display: flex;
			min-height: 0;
		}
	}
	
	&--tab {
		.page-skeleton__content {
			flex: 1;
			display: flex;
			flex-direction: column;
		}
	}
	
	&--flow {
		.page-skeleton__header {
			position: relative;
		}
		.page-skeleton__footer {
			position: relative;
		}
	}
}

// 头部区域
.page-skeleton__header {
	background-color: $white-color;
	border-bottom: 1rpx solid $border-color;
	z-index: 99;
	
	&--fixed {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
	}
}

.skeleton-header-default {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 100%;
	padding: 0 30rpx;
	
	.skeleton-back-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		
		&:active {
			background-color: rgba(0, 0, 0, 0.05);
		}
	}
	
	.skeleton-title {
		flex: 1;
		text-align: center;
		margin: 0 20rpx;
		
		.skeleton-title-text {
			font-size: 36rpx;
			font-weight: 600;
			line-height: 1.4;
		}
	}
	
	.skeleton-right-action {
		min-width: 60rpx;
	}
}

// 内容区域
.page-skeleton__content {
	background-color: $background-color;
	
	&--scrollable {
		overflow-y: auto;
	}
}

// 横幅区域
.page-skeleton__banner {
	background-color: $white-color;
	margin-bottom: 20rpx;
}

// 搜索区域
.page-skeleton__search {
	background-color: $white-color;
	margin-bottom: 20rpx;
}

// 标签页区域
.page-skeleton__tabs {
	background-color: $white-color;
	border-bottom: 1rpx solid $border-color;
	
	&--sticky {
		position: sticky;
		top: 0;
		z-index: 10;
	}
}

// 主要内容区域
.page-skeleton__main {
	flex: 1;
	
	&--flex {
		display: flex;
		flex-direction: column;
		min-height: 0;
	}
	
	&--flow {
		padding-bottom: 40rpx;
	}
}

// 侧边栏
.page-skeleton__sidebar {
	background-color: $white-color;
	border-left: 1rpx solid $border-color;
	overflow-y: auto;
}

// 底部区域
.page-skeleton__footer {
	background-color: $white-color;
	border-top: 1rpx solid $border-color;
	z-index: 98;
	
	&--fixed {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
	}
}

// 悬浮按钮
.page-skeleton__fab {
	position: fixed;
	z-index: 100;
}

// 加载状态
.page-skeleton__loading {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 999;
	
	.skeleton-loading-default {
		background-color: $white-color;
		padding: 40rpx;
		border-radius: 16rpx;
		box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
	}
}

// 空状态
.page-skeleton__empty {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 998;
	
	.skeleton-empty-default {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 60rpx 40rpx;
		
		.empty-image {
			width: 200rpx;
			height: 200rpx;
			margin-bottom: 30rpx;
			opacity: 0.6;
		}
		
		.empty-text {
			font-size: 28rpx;
			color: $secondary-text-color;
			margin-bottom: 40rpx;
			text-align: center;
		}
		
		.empty-button {
			background-color: $primary-color;
			color: $white-color;
			padding: 20rpx 40rpx;
			border-radius: 50rpx;
			
			.empty-button-text {
				font-size: 28rpx;
				color: $white-color;
			}
			
			&:active {
				opacity: 0.8;
			}
		}
	}
}

// 遮罩层
.page-skeleton__mask {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 997;
}
</style>