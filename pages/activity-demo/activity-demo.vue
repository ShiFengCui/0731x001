<template>
	<view class="container">
		<view class="demo-title">
			<text class="title-text">活动组件演示</text>
		</view>
		
		<!-- 活动组件演示 -->
		<activity-component
			:notice-list="noticeList"
			:banner-list="bannerList"
			:show-quick-entry="true"
			:quick-entry-title="'热门活动'"
			:quick-entry-list="quickEntryList"
			:notice-interval="2500"
			:banner-interval="3500"
			@noticeClick="onNoticeClick"
			@moreNotice="onMoreNotice"
			@bannerClick="onBannerClick"
			@bannerChange="onBannerChange"
			@quickEntryClick="onQuickEntryClick"
		/>
		
		<!-- 功能说明 -->
		<view class="features-section">
			<view class="section-title">组件功能特点</view>
			<view class="feature-list">
				<view class="feature-item">
					<text class="feature-icon">📢</text>
					<text class="feature-text">支持多条公告滚动播放</text>
				</view>
				<view class="feature-item">
					<text class="feature-icon">🖼️</text>
					<text class="feature-text">轮播图自动播放和手动切换</text>
				</view>
				<view class="feature-item">
					<text class="feature-icon">🎯</text>
					<text class="feature-text">快捷入口网格布局</text>
				</view>
				<view class="feature-item">
					<text class="feature-icon">🎨</text>
					<text class="feature-text">丰富的自定义配置选项</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import ActivityComponent from '@/components/activity-component/activity-component.vue'
	
	export default {
		components: {
			ActivityComponent
		},
		data() {
			return {
				noticeList: [
					{ 
						id: 1, 
						content: '🎉 欢迎使用活动组件！这是一个功能丰富的活动展示组件',
						link: '/pages/welcome/index'
					},
					{ 
						id: 2, 
						content: '📱 支持公告栏、轮播图和快捷入口等多种功能',
						link: '/pages/features/index'
					},
					{ 
						id: 3, 
						content: '🚀 完全可定制，满足各种业务需求',
						link: '/pages/customization/index'
					},
					{ 
						id: 4, 
						content: '💡 点击公告可查看详情，点击更多可查看全部',
						link: '/pages/guide/index'
					}
				],
				bannerList: [
					{
						id: 1,
						image: '/static/logo.png',
						title: '活动组件演示',
						subtitle: '展示轮播图功能和标题叠加效果',
						link: '/pages/banner/demo1'
					},
					{
						id: 2,
						image: '/static/logo.png',
						title: '自定义配置',
						subtitle: '支持多种自定义参数配置',
						link: '/pages/banner/demo2'
					},
					{
						id: 3,
						image: '/static/logo.png',
						title: '响应式设计',
						subtitle: '适配不同屏幕尺寸和设备',
						link: '/pages/banner/demo3'
					}
				],
				quickEntryList: [
					{
						id: 1,
						title: '组件文档',
						iconType: 'help',
						iconColor: '#007aff',
						link: '/pages/docs/index'
					},
					{
						id: 2,
						title: '在线演示',
						iconType: 'videocam',
						iconColor: '#ff6b35',
						badge: 'New',
						link: '/pages/demo/index'
					},
					{
						id: 3,
						title: '源码下载',
						iconType: 'download',
						iconColor: '#28a745',
						link: '/pages/download/index'
					},
					{
						id: 4,
						title: '问题反馈',
						iconType: 'chatbubble',
						iconColor: '#6f42c1',
						link: '/pages/feedback/index'
					}
				]
			}
		},
		methods: {
			onNoticeClick(data) {
				const { notice, index } = data;
				uni.showModal({
					title: '公告详情',
					content: `第${index + 1}条公告：\n${notice.content}`,
					confirmText: '知道了',
					showCancel: false
				});
			},
			
			onMoreNotice() {
				uni.showToast({
					title: '查看全部公告',
					icon: 'none'
				});
			},
			
			onBannerClick(data) {
				const { banner } = data;
				uni.showModal({
					title: banner.title,
					content: banner.subtitle || '点击了轮播图',
					confirmText: '查看详情',
					cancelText: '取消',
					success: (res) => {
						if (res.confirm) {
							console.log('Banner跳转:', banner.link);
						}
					}
				});
			},
			
			onBannerChange(detail) {
				console.log('轮播图切换到第', detail.current + 1, '张');
			},
			
			onQuickEntryClick(data) {
				const { entry } = data;
				uni.showToast({
					title: `点击了 ${entry.title}`,
					icon: 'success'
				});
				console.log('Quick entry click:', entry);
			}
		}
	}
</script>

<style scoped>
	.container {
		min-height: 100vh;
		background-color: #f8f9fa;
	}
	
	.demo-title {
		padding: 40rpx 30rpx 20rpx;
		text-align: center;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
	}
	
	.title-text {
		font-size: 36rpx;
		font-weight: bold;
	}
	
	.features-section {
		margin: 40rpx 30rpx;
		background: white;
		border-radius: 16rpx;
		padding: 30rpx;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
	}
	
	.section-title {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 30rpx;
		text-align: center;
	}
	
	.feature-list {
		display: flex;
		flex-direction: column;
		gap: 20rpx;
	}
	
	.feature-item {
		display: flex;
		align-items: center;
		padding: 20rpx;
		background: #f8f9fa;
		border-radius: 12rpx;
	}
	
	.feature-icon {
		font-size: 32rpx;
		margin-right: 20rpx;
		width: 50rpx;
		text-align: center;
	}
	
	.feature-text {
		font-size: 28rpx;
		color: #666;
		flex: 1;
	}
</style>