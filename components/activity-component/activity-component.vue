<template>
	<view class="activity-component">
		<!-- 公告栏区域 -->
		<view v-if="showNotice && noticeList.length > 0" class="notice-section">
			<view class="notice-container">
				<view class="notice-icon">
					<uni-icons type="sound" size="20" color="#ff6b35"></uni-icons>
				</view>
				<view class="notice-content">
					<swiper 
						class="notice-swiper" 
						:vertical="true" 
						:autoplay="true" 
						:interval="noticeInterval"
						:duration="300"
						:circular="true"
					>
						<swiper-item 
							v-for="(notice, index) in noticeList" 
							:key="index"
							class="notice-item"
							@click="onNoticeClick(notice, index)"
						>
							<text class="notice-text">{{ notice.content }}</text>
						</swiper-item>
					</swiper>
				</view>
				<view class="notice-more" @click="onMoreNotice">
					<uni-icons type="right" size="16" color="#999"></uni-icons>
				</view>
			</view>
		</view>

		<!-- 轮播图区域 -->
		<view v-if="showBanner && bannerList.length > 0" class="banner-section">
			<swiper 
				class="banner-swiper"
				:indicator-dots="showDots"
				:indicator-color="dotColor"
				:indicator-active-color="activeDotColor"
				:autoplay="autoplay"
				:interval="bannerInterval"
				:duration="bannerDuration"
				:circular="true"
				@change="onBannerChange"
			>
				<swiper-item 
					v-for="(banner, index) in bannerList" 
					:key="index"
					class="banner-item"
					@click="onBannerClick(banner, index)"
				>
					<image 
						:src="banner.image" 
						class="banner-image"
						:mode="imageMode"
						@error="onImageError"
						@load="onImageLoad"
					/>
					<!-- 标题叠加层 -->
					<view v-if="banner.title && showBannerTitle" class="banner-overlay">
						<text class="banner-title">{{ banner.title }}</text>
						<text v-if="banner.subtitle" class="banner-subtitle">{{ banner.subtitle }}</text>
					</view>
				</swiper-item>
			</swiper>
			
			<!-- 自定义指示器 -->
			<view v-if="showCustomDots" class="custom-dots">
				<view 
					v-for="(item, index) in bannerList" 
					:key="index"
					class="custom-dot"
					:class="{ active: currentBannerIndex === index }"
					@click="switchBanner(index)"
				></view>
			</view>
		</view>

		<!-- 活动快捷入口 -->
		<view v-if="showQuickEntry && quickEntryList.length > 0" class="quick-entry-section">
			<view class="quick-entry-title" v-if="quickEntryTitle">
				<text class="entry-title-text">{{ quickEntryTitle }}</text>
			</view>
			<view class="quick-entry-grid">
				<view 
					v-for="(entry, index) in quickEntryList" 
					:key="index"
					class="entry-item"
					@click="onQuickEntryClick(entry, index)"
				>
					<view class="entry-icon">
						<image v-if="entry.icon" :src="entry.icon" class="entry-icon-img" />
						<uni-icons v-else :type="entry.iconType || 'gift'" :size="24" :color="entry.iconColor || '#ff6b35'"></uni-icons>
					</view>
					<text class="entry-text">{{ entry.title }}</text>
					<text v-if="entry.badge" class="entry-badge">{{ entry.badge }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'ActivityComponent',
		props: {
			// 公告栏相关
			showNotice: {
				type: Boolean,
				default: true
			},
			noticeList: {
				type: Array,
				default: () => []
			},
			noticeInterval: {
				type: Number,
				default: 3000
			},
			
			// 轮播图相关
			showBanner: {
				type: Boolean,
				default: true
			},
			bannerList: {
				type: Array,
				default: () => []
			},
			showDots: {
				type: Boolean,
				default: true
			},
			showCustomDots: {
				type: Boolean,
				default: false
			},
			dotColor: {
				type: String,
				default: 'rgba(255, 255, 255, 0.5)'
			},
			activeDotColor: {
				type: String,
				default: '#ffffff'
			},
			autoplay: {
				type: Boolean,
				default: true
			},
			bannerInterval: {
				type: Number,
				default: 4000
			},
			bannerDuration: {
				type: Number,
				default: 500
			},
			imageMode: {
				type: String,
				default: 'aspectFill'
			},
			showBannerTitle: {
				type: Boolean,
				default: true
			},
			bannerHeight: {
				type: String,
				default: '300rpx'
			},
			
			// 快捷入口相关
			showQuickEntry: {
				type: Boolean,
				default: false
			},
			quickEntryTitle: {
				type: String,
				default: ''
			},
			quickEntryList: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				currentBannerIndex: 0
			}
		},
		computed: {
			bannerHeightStyle() {
				return {
					height: this.bannerHeight
				}
			}
		},
		methods: {
			// 公告栏事件处理
			onNoticeClick(notice, index) {
				this.$emit('noticeClick', { notice, index })
			},
			
			onMoreNotice() {
				this.$emit('moreNotice')
			},
			
			// 轮播图事件处理
			onBannerClick(banner, index) {
				this.$emit('bannerClick', { banner, index })
			},
			
			onBannerChange(e) {
				this.currentBannerIndex = e.detail.current
				this.$emit('bannerChange', e.detail)
			},
			
			switchBanner(index) {
				this.currentBannerIndex = index
				// 这里可以通过ref控制swiper切换，但uni-app限制较多
				// 实际项目中可能需要其他方式实现
			},
			
			onImageError(e) {
				this.$emit('imageError', e)
			},
			
			onImageLoad(e) {
				this.$emit('imageLoad', e)
			},
			
			// 快捷入口事件处理
			onQuickEntryClick(entry, index) {
				this.$emit('quickEntryClick', { entry, index })
			}
		}
	}
</script>

<style scoped>
	.activity-component {
		width: 100%;
		background-color: #ffffff;
	}

	/* 公告栏样式 */
	.notice-section {
		background: linear-gradient(90deg, #fff2e6 0%, #fff8f0 100%);
		border-bottom: 1px solid #f5f5f5;
	}

	.notice-container {
		display: flex;
		align-items: center;
		padding: 20rpx 30rpx;
		position: relative;
	}

	.notice-icon {
		margin-right: 20rpx;
		flex-shrink: 0;
	}

	.notice-content {
		flex: 1;
		height: 40rpx;
		overflow: hidden;
	}

	.notice-swiper {
		height: 40rpx;
	}

	.notice-item {
		display: flex;
		align-items: center;
		height: 40rpx;
	}

	.notice-text {
		font-size: 28rpx;
		color: #333333;
		line-height: 40rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.notice-more {
		margin-left: 20rpx;
		flex-shrink: 0;
	}

	/* 轮播图样式 */
	.banner-section {
		position: relative;
	}

	.banner-swiper {
		height: 300rpx;
	}

	.banner-item {
		position: relative;
		overflow: hidden;
	}

	.banner-image {
		width: 100%;
		height: 100%;
		display: block;
	}

	.banner-overlay {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
		padding: 40rpx 30rpx 30rpx;
	}

	.banner-title {
		display: block;
		color: #ffffff;
		font-size: 32rpx;
		font-weight: bold;
		margin-bottom: 10rpx;
		text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.3);
	}

	.banner-subtitle {
		display: block;
		color: rgba(255, 255, 255, 0.9);
		font-size: 26rpx;
		text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.3);
	}

	/* 自定义指示器 */
	.custom-dots {
		position: absolute;
		bottom: 20rpx;
		right: 30rpx;
		display: flex;
		gap: 12rpx;
	}

	.custom-dot {
		width: 16rpx;
		height: 16rpx;
		border-radius: 8rpx;
		background-color: rgba(255, 255, 255, 0.5);
		transition: all 0.3s ease;
	}

	.custom-dot.active {
		background-color: #ffffff;
		width: 32rpx;
	}

	/* 快捷入口样式 */
	.quick-entry-section {
		padding: 30rpx;
	}

	.quick-entry-title {
		margin-bottom: 30rpx;
	}

	.entry-title-text {
		font-size: 32rpx;
		font-weight: bold;
		color: #333333;
	}

	.quick-entry-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 30rpx;
	}

	.entry-item {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 30rpx 20rpx;
		background-color: #fafafa;
		border-radius: 16rpx;
		position: relative;
		transition: all 0.3s ease;
	}

	.entry-item:active {
		background-color: #f0f0f0;
		transform: scale(0.98);
	}

	.entry-icon {
		margin-bottom: 16rpx;
		position: relative;
	}

	.entry-icon-img {
		width: 48rpx;
		height: 48rpx;
		border-radius: 8rpx;
	}

	.entry-text {
		font-size: 26rpx;
		color: #333333;
		text-align: center;
		line-height: 1.2;
	}

	.entry-badge {
		position: absolute;
		top: 20rpx;
		right: 20rpx;
		background-color: #ff4757;
		color: #ffffff;
		font-size: 20rpx;
		padding: 4rpx 8rpx;
		border-radius: 10rpx;
		min-width: 32rpx;
		text-align: center;
		line-height: 1;
	}

	/* 响应式设计 */
	.quick-entry-grid .entry-item {
		flex-basis: calc((100% - 30rpx) / 2);
	}

	@media (min-width: 750px) {
		.quick-entry-grid .entry-item {
			flex-basis: calc((100% - 60rpx) / 3);
		}
	}

	@media (min-width: 1200px) {
		.quick-entry-grid .entry-item {
			flex-basis: calc((100% - 90rpx) / 4);
		}
	}
</style>