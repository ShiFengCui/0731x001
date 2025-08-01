<template>
	<view class="banner-top-container">
		<!-- 主要海报轮播 -->
		<swiper 
			class="banner-swiper" 
			:indicator-dots="showDots" 
			:autoplay="autoplay" 
			:interval="interval" 
			:duration="duration"
			:circular="circular"
			:indicator-active-color="indicatorActiveColor"
			:indicator-color="indicatorColor"
			@change="onSwiperChange"
		>
			<swiper-item 
				v-for="(banner, index) in bannerList" 
				:key="banner.id || index"
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
				<!-- 文字覆盖层 -->
				<view v-if="banner.title || banner.subtitle" class="banner-overlay">
					<view class="banner-content">
						<text v-if="banner.title" class="banner-title">{{ banner.title }}</text>
						<text v-if="banner.subtitle" class="banner-subtitle">{{ banner.subtitle }}</text>
						<view v-if="banner.buttonText" class="banner-button" @click.stop="onButtonClick(banner, index)">
							<text class="button-text">{{ banner.buttonText }}</text>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
		
		<!-- 快捷入口区域 -->
		<view v-if="showQuickEntry && quickEntryList.length > 0" class="quick-entry-section">
			<view v-if="quickEntryTitle" class="quick-entry-title">
				<text class="quick-title-text">{{ quickEntryTitle }}</text>
			</view>
			<view class="quick-entry-grid">
				<view 
					v-for="(entry, index) in quickEntryList" 
					:key="entry.id || index"
					class="quick-entry-item"
					@click="onQuickEntryClick(entry, index)"
				>
					<view class="entry-icon-wrapper">
						<image v-if="entry.icon" :src="entry.icon" class="entry-icon" />
						<uni-icons v-else-if="entry.iconType" :type="entry.iconType" :color="entry.iconColor || '#666'" :size="24" />
						<view v-if="entry.badge" class="entry-badge">
							<text class="badge-text">{{ entry.badge }}</text>
						</view>
					</view>
					<text class="entry-title">{{ entry.title }}</text>
				</view>
			</view>
		</view>
		
		<!-- 公告栏区域 -->
		<view v-if="showNotice && noticeList.length > 0" class="notice-section">
			<view class="notice-container">
				<uni-icons type="sound" color="#ff6b35" size="16" />
				<swiper 
					class="notice-swiper" 
					:vertical="true" 
					:autoplay="true" 
					:interval="noticeInterval"
					:circular="true"
					:display-multiple-items="1"
				>
					<swiper-item 
						v-for="(notice, index) in noticeList" 
						:key="notice.id || index"
						class="notice-item"
						@click="onNoticeClick(notice, index)"
					>
						<text class="notice-text">{{ notice.content }}</text>
					</swiper-item>
				</swiper>
				<view class="notice-more" @click="onNoticeMore">
					<text class="more-text">更多</text>
					<uni-icons type="right" color="#999" size="12" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'BannerTop',
	props: {
		// 海报列表数据
		bannerList: {
			type: Array,
			default() {
				return [];
			}
		},
		// 是否显示指示点
		showDots: {
			type: Boolean,
			default: true
		},
		// 是否自动播放
		autoplay: {
			type: Boolean,
			default: true
		},
		// 轮播间隔时间
		interval: {
			type: Number,
			default: 3000
		},
		// 滑动动画时长
		duration: {
			type: Number,
			default: 500
		},
		// 是否循环播放
		circular: {
			type: Boolean,
			default: true
		},
		// 指示点激活颜色
		indicatorActiveColor: {
			type: String,
			default: '#ffffff'
		},
		// 指示点默认颜色
		indicatorColor: {
			type: String,
			default: 'rgba(255, 255, 255, 0.5)'
		},
		// 图片显示模式
		imageMode: {
			type: String,
			default: 'aspectFill'
		},
		// 是否显示快捷入口
		showQuickEntry: {
			type: Boolean,
			default: false
		},
		// 快捷入口标题
		quickEntryTitle: {
			type: String,
			default: ''
		},
		// 快捷入口列表
		quickEntryList: {
			type: Array,
			default() {
				return [];
			}
		},
		// 是否显示公告
		showNotice: {
			type: Boolean,
			default: false
		},
		// 公告列表
		noticeList: {
			type: Array,
			default() {
				return [];
			}
		},
		// 公告轮播间隔
		noticeInterval: {
			type: Number,
			default: 4000
		},
		// 海报高度
		bannerHeight: {
			type: String,
			default: '400rpx'
		}
	},
	data() {
		return {
			currentIndex: 0
		};
	},
	methods: {
		// 海报轮播切换
		onSwiperChange(e) {
			this.currentIndex = e.detail.current;
			this.$emit('bannerChange', {
				current: this.currentIndex,
				banner: this.bannerList[this.currentIndex]
			});
		},
		
		// 海报点击事件
		onBannerClick(banner, index) {
			this.$emit('bannerClick', { banner, index });
		},
		
		// 按钮点击事件
		onButtonClick(banner, index) {
			this.$emit('buttonClick', { banner, index });
		},
		
		// 快捷入口点击
		onQuickEntryClick(entry, index) {
			this.$emit('quickEntryClick', { entry, index });
		},
		
		// 公告点击
		onNoticeClick(notice, index) {
			this.$emit('noticeClick', { notice, index });
		},
		
		// 查看更多公告
		onNoticeMore() {
			this.$emit('moreNotice');
		},
		
		// 图片加载失败
		onImageError(e) {
			console.log('Banner image load error:', e);
			this.$emit('imageError', e);
		},
		
		// 图片加载成功
		onImageLoad(e) {
			this.$emit('imageLoad', e);
		}
	}
};
</script>

<style scoped>
.banner-top-container {
	width: 100%;
	background-color: #fff;
}

/* 海报轮播样式 */
.banner-swiper {
	width: 100%;
	height: 400rpx;
}

.banner-item {
	position: relative;
	width: 100%;
	height: 100%;
}

.banner-image {
	width: 100%;
	height: 100%;
	display: block;
}

/* 文字覆盖层 */
.banner-overlay {
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
	padding: 60rpx 30rpx 30rpx;
}

.banner-content {
	color: #fff;
}

.banner-title {
	font-size: 36rpx;
	font-weight: bold;
	line-height: 1.4;
	margin-bottom: 10rpx;
	display: block;
}

.banner-subtitle {
	font-size: 26rpx;
	opacity: 0.9;
	line-height: 1.4;
	margin-bottom: 20rpx;
	display: block;
}

.banner-button {
	display: inline-block;
	background-color: rgba(255, 255, 255, 0.2);
	border: 1rpx solid rgba(255, 255, 255, 0.3);
	border-radius: 25rpx;
	padding: 12rpx 24rpx;
	backdrop-filter: blur(10rpx);
}

.button-text {
	color: #fff;
	font-size: 24rpx;
	font-weight: 500;
}

/* 快捷入口样式 */
.quick-entry-section {
	padding: 30rpx 20rpx;
}

.quick-entry-title {
	margin-bottom: 20rpx;
}

.quick-title-text {
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
}

.quick-entry-grid {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}

.quick-entry-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 22%;
	margin-bottom: 30rpx;
}

.entry-icon-wrapper {
	position: relative;
	width: 80rpx;
	height: 80rpx;
	border-radius: 16rpx;
	background-color: #f8f9fa;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 12rpx;
}

.entry-icon {
	width: 48rpx;
	height: 48rpx;
}

.entry-badge {
	position: absolute;
	top: -8rpx;
	right: -8rpx;
	background-color: #ff4757;
	border-radius: 20rpx;
	min-width: 32rpx;
	height: 32rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 8rpx;
}

.badge-text {
	color: #fff;
	font-size: 18rpx;
	transform: scale(0.8);
}

.entry-title {
	font-size: 24rpx;
	color: #666;
	text-align: center;
	line-height: 1.2;
}

/* 公告栏样式 */
.notice-section {
	padding: 20rpx;
	background-color: #fff5e6;
	border-top: 1rpx solid #f0f0f0;
}

.notice-container {
	display: flex;
	align-items: center;
	padding: 16rpx 20rpx;
	background-color: #fff;
	border-radius: 12rpx;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
}

.notice-swiper {
	flex: 1;
	height: 40rpx;
	margin: 0 20rpx;
}

.notice-item {
	display: flex;
	align-items: center;
	height: 40rpx;
}

.notice-text {
	font-size: 26rpx;
	color: #333;
	line-height: 40rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.notice-more {
	display: flex;
	align-items: center;
	padding: 8rpx;
}

.more-text {
	font-size: 24rpx;
	color: #999;
	margin-right: 4rpx;
}

/* 响应式调整 */
@media screen and (max-width: 750rpx) {
	.quick-entry-item {
		width: 25%;
	}
}

@media screen and (max-width: 600rpx) {
	.banner-title {
		font-size: 32rpx;
	}
	
	.banner-subtitle {
		font-size: 24rpx;
	}
	
	.quick-entry-item {
		width: 20%;
	}
	
	.entry-icon-wrapper {
		width: 70rpx;
		height: 70rpx;
	}
	
	.entry-icon {
		width: 40rpx;
		height: 40rpx;
	}
}
</style>