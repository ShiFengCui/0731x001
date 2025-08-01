<template>
	<view class="rating-system">
		<!-- 评价统计头部 -->
		<view class="rating-header">
			<view class="overall-rating">
				<view class="rating-score">
					<text class="score-number">{{ overallRating.toFixed(1) }}</text>
					<text class="score-total">/5.0</text>
				</view>
				<view class="rating-stars">
					<uni-rate :value="overallRating" :readonly="true" size="16" color="#FFB400" />
				</view>
				<text class="rating-count">基于{{ totalCount }}条评价</text>
			</view>
			
			<view class="rating-distribution">
				<view 
					v-for="(item, index) in ratingDistribution" 
					:key="index"
					class="distribution-item"
				>
					<text class="star-label">{{ 5 - index }}星</text>
					<view class="progress-bar">
						<view 
							class="progress-fill" 
							:style="{ width: item.percentage + '%' }"
						></view>
					</view>
					<text class="count-text">{{ item.count }}</text>
				</view>
			</view>
		</view>

		<!-- 筛选和排序 -->
		<view class="filter-section">
			<view class="filter-tabs">
				<text 
					v-for="(filter, index) in filterOptions" 
					:key="index"
					class="filter-tab"
					:class="{ active: currentFilter === filter.value }"
					@click="onFilterChange(filter.value)"
				>
					{{ filter.label }}
				</text>
			</view>
			
			<view class="sort-dropdown" @click="toggleSortDropdown">
				<text class="sort-text">{{ getSortText() }}</text>
				<uni-icons type="down" size="16" color="#909399" />
				
				<view v-if="showSortDropdown" class="dropdown-menu">
					<text 
						v-for="(sort, index) in sortOptions" 
						:key="index"
						class="dropdown-item"
						:class="{ active: currentSort === sort.value }"
						@click.stop="onSortChange(sort.value)"
					>
						{{ sort.label }}
					</text>
				</view>
			</view>
		</view>

		<!-- 发表评价按钮 -->
		<button 
			class="add-review-btn" 
			@click="showAddReview"
			v-if="canAddReview"
		>
			<uni-icons type="compose" size="18" color="#409EFF" />
			<text class="btn-text">发表评价</text>
		</button>

		<!-- 评价列表 -->
		<view class="reviews-list">
			<view 
				v-for="review in filteredReviews" 
				:key="review.id"
				class="review-item"
			>
				<!-- 评价者信息 -->
				<view class="reviewer-info">
					<image :src="review.avatar" class="avatar" />
					<view class="user-detail">
						<text class="username">{{ review.username }}</text>
						<view class="rating-date">
							<uni-rate :value="review.rating" :readonly="true" size="12" color="#FFB400" />
							<text class="date">{{ formatDate(review.date) }}</text>
						</view>
					</view>
				</view>

				<!-- 评价内容 -->
				<view class="review-content">
					<text class="review-text">{{ review.content }}</text>
					
					<!-- 图片/视频 -->
					<view v-if="review.media && review.media.length > 0" class="media-list">
						<view 
							v-for="(media, index) in review.media" 
							:key="index"
							class="media-item"
							@click="previewMedia(review.media, index)"
						>
							<image v-if="media.type === 'image'" :src="media.url" class="media-img" />
							<view v-else-if="media.type === 'video'" class="video-container">
								<video :src="media.url" class="media-video" />
								<view class="play-icon">
									<uni-icons type="play" size="24" color="#fff" />
								</view>
							</view>
						</view>
					</view>
				</view>

				<!-- 评价互动 -->
				<view class="review-actions">
					<view 
						class="action-item"
						:class="{ active: review.isLiked }"
						@click="toggleLike(review)"
					>
						<uni-icons 
							:type="review.isLiked ? 'heart-filled' : 'heart'" 
							size="16" 
							:color="review.isLiked ? '#F56C6C' : '#909399'" 
						/>
						<text class="action-text">{{ review.likeCount || 0 }}</text>
					</view>
					
					<view class="action-item" @click="showReplyInput(review)">
						<uni-icons type="chat" size="16" color="#909399" />
						<text class="action-text">评论{{ review.replyCount > 0 ? `(${review.replyCount})` : '' }}</text>
					</view>
				</view>

				<!-- 回复列表 -->
				<view v-if="review.replies && review.replies.length > 0" class="replies-list">
					<view 
						v-for="reply in review.replies" 
						:key="reply.id"
						class="reply-item"
					>
						<text class="reply-user">{{ reply.username }}：</text>
						<text class="reply-content">{{ reply.content }}</text>
						<text class="reply-date">{{ formatDate(reply.date) }}</text>
					</view>
					
					<text 
						v-if="review.replyCount > review.replies.length"
						class="view-more-replies"
						@click="loadMoreReplies(review)"
					>
						查看更多{{ review.replyCount - review.replies.length }}条回复
					</text>
				</view>

				<!-- 回复输入框 -->
				<view v-if="review.showReplyInput" class="reply-input-container">
					<input 
						v-model="replyContent"
						class="reply-input"
						placeholder="写下你的评论..."
						:focus="review.showReplyInput"
					/>
					<button class="reply-send-btn" @click="sendReply(review)">发送</button>
				</view>
			</view>
		</view>

		<!-- 加载更多 -->
		<uni-load-more 
			v-if="hasMore"
			:status="loadStatus"
			@clickLoadMore="loadMoreReviews"
		/>

		<!-- 发表评价弹窗 -->
		<uni-popup ref="addReviewPopup" type="bottom">
			<view class="add-review-popup">
				<view class="popup-header">
					<text class="popup-title">发表评价</text>
					<uni-icons type="close" size="20" color="#909399" @click="closeAddReview" />
				</view>

				<view class="review-form">
					<!-- 评分 -->
					<view class="form-item">
						<text class="form-label">整体评分</text>
						<uni-rate 
							v-model="newReview.rating" 
							:size="24" 
							color="#FFB400"
							:allow-half="false"
						/>
					</view>

					<!-- 评价内容 -->
					<view class="form-item">
						<text class="form-label">评价内容</text>
						<textarea 
							v-model="newReview.content"
							class="review-textarea"
							placeholder="请分享你的使用体验..."
							maxlength="500"
							:show-confirm-bar="false"
						/>
						<view class="char-count">
							<text class="count-text">{{ newReview.content.length }}/500</text>
						</view>
					</view>

					<!-- 图片/视频上传 -->
					<view class="form-item">
						<text class="form-label">添加图片或视频（可选）</text>
						<view class="media-upload">
							<view 
								v-for="(media, index) in newReview.media" 
								:key="index"
								class="upload-item"
							>
								<image v-if="media.type === 'image'" :src="media.url" class="upload-img" />
								<view v-else-if="media.type === 'video'" class="upload-video">
									<video :src="media.url" class="upload-video-player" />
								</view>
								<view class="delete-media" @click="deleteMedia(index)">
									<uni-icons type="close" size="16" color="#fff" />
								</view>
							</view>
							
							<view 
								v-if="newReview.media.length < 9"
								class="upload-btn"
								@click="selectMedia"
							>
								<uni-icons type="plus" size="24" color="#C0C4CC" />
								<text class="upload-text">添加</text>
							</view>
						</view>
					</view>
				</view>

				<view class="popup-actions">
					<button class="cancel-btn" @click="closeAddReview">取消</button>
					<button class="submit-btn" @click="submitReview" :disabled="!canSubmit">发表评价</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name: 'RatingSystem',
		props: {
			// 产品ID或评价目标ID
			targetId: {
				type: String,
				required: true
			},
			// 评价类型 (product, service, etc.)
			ratingType: {
				type: String,
				default: 'product'
			},
			// 是否可以添加评价
			canAddReview: {
				type: Boolean,
				default: true
			},
			// 初始评价数据
			initialReviews: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				// 整体评分
				overallRating: 4.3,
				totalCount: 0,
				
				// 评分分布
				ratingDistribution: [
					{ count: 45, percentage: 60 }, // 5星
					{ count: 20, percentage: 27 }, // 4星
					{ count: 8, percentage: 11 },  // 3星
					{ count: 2, percentage: 2 },   // 2星
					{ count: 0, percentage: 0 }    // 1星
				],
				
				// 筛选选项
				filterOptions: [
					{ label: '全部', value: 'all' },
					{ label: '有图', value: 'with_image' },
					{ label: '5星', value: '5' },
					{ label: '4星', value: '4' },
					{ label: '3星', value: '3' },
					{ label: '2星', value: '2' },
					{ label: '1星', value: '1' }
				],
				currentFilter: 'all',
				
				// 排序选项
				sortOptions: [
					{ label: '最新发布', value: 'newest' },
					{ label: '最早发布', value: 'oldest' },
					{ label: '评分最高', value: 'highest_rating' },
					{ label: '评分最低', value: 'lowest_rating' },
					{ label: '最多点赞', value: 'most_liked' }
				],
				currentSort: 'newest',
				showSortDropdown: false,
				
				// 评价列表
				reviews: [],
				hasMore: true,
				loadStatus: 'more',
				
				// 回复相关
				replyContent: '',
				
				// 发表评价表单
				newReview: {
					rating: 5,
					content: '',
					media: []
				}
			};
		},
		computed: {
			filteredReviews() {
				let filtered = [...this.reviews];
				
				// 筛选
				if (this.currentFilter !== 'all') {
					if (this.currentFilter === 'with_image') {
						filtered = filtered.filter(review => 
							review.media && review.media.length > 0
						);
					} else {
						const rating = parseInt(this.currentFilter);
						filtered = filtered.filter(review => review.rating === rating);
					}
				}
				
				// 排序
				switch (this.currentSort) {
					case 'newest':
						filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
						break;
					case 'oldest':
						filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
						break;
					case 'highest_rating':
						filtered.sort((a, b) => b.rating - a.rating);
						break;
					case 'lowest_rating':
						filtered.sort((a, b) => a.rating - b.rating);
						break;
					case 'most_liked':
						filtered.sort((a, b) => (b.likeCount || 0) - (a.likeCount || 0));
						break;
				}
				
				return filtered;
			},
			canSubmit() {
				return this.newReview.rating > 0 && this.newReview.content.trim().length > 0;
			}
		},
		mounted() {
			this.initializeData();
		},
		methods: {
			// 初始化数据
			initializeData() {
				// 使用传入的初始数据或默认数据
				this.reviews = this.initialReviews.length > 0 ? this.initialReviews : this.getDefaultReviews();
				this.calculateOverallRating();
			},
			
			// 获取默认评价数据
			getDefaultReviews() {
				return [
					{
						id: '1',
						username: '张小明',
						avatar: '/static/logo.png',
						rating: 5,
						content: '非常满意！质量很好，物流也很快，客服态度也很好。包装很仔细，没有任何损坏。性价比很高，推荐大家购买！',
						date: '2024-12-12 14:30:00',
						media: [
							{ type: 'image', url: '/static/logo.png' },
							{ type: 'image', url: '/static/logo.png' }
						],
						likeCount: 12,
						isLiked: false,
						replyCount: 3,
						replies: [
							{
								id: 'r1',
								username: '商家',
								content: '感谢您的好评！我们会继续努力提供更好的产品和服务。',
								date: '2024-12-12 15:00:00'
							}
						]
					},					{
						id: '2',
						username: '李小花',
						avatar: '/static/logo.png',
						rating: 4,
						content: '整体还不错，就是颜色和图片稍微有点差异，不过质量还是很好的。发货速度很快，包装也很严实。',
						date: '2024-12-11 10:20:00',
						media: [
							{ type: 'image', url: '/static/logo.png' }
						],
						likeCount: 8,
						isLiked: false,
						replyCount: 1,
						replies: []
					},
					{
						id: '3',
						username: '王大锤',
						avatar: '/static/logo.png',
						rating: 5,
						content: '很棒的产品！用了一段时间了，质量确实不错。推荐给朋友了，他们也说很好用。会回购的！',
						date: '2024-12-10 16:45:00',
						media: [
							{ type: 'video', url: '/static/logo.png' }
						],
						likeCount: 15,
						isLiked: true,
						replyCount: 0,
						replies: []
					},
					{
						id: '4',
						username: '赵小美',
						avatar: '/static/logo.png',
						rating: 3,
						content: '一般般吧，没有预期的那么好。价格还可以，但是质量感觉不太好。客服态度还不错。',
						date: '2024-12-09 09:15:00',
						media: [],
						likeCount: 2,
						isLiked: false,
						replyCount: 2,
						replies: []
					}
				];
			},
			
			// 计算整体评分
			calculateOverallRating() {
				if (this.reviews.length === 0) {
					this.overallRating = 0;
					this.totalCount = 0;
					return;
				}
				
				const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
				this.overallRating = totalRating / this.reviews.length;
				this.totalCount = this.reviews.length;
				
				// 重新计算评分分布
				const distribution = [0, 0, 0, 0, 0]; // 5星到1星
				this.reviews.forEach(review => {
					distribution[5 - review.rating]++;
				});
				
				this.ratingDistribution = distribution.map(count => ({
					count: count,
					percentage: this.totalCount > 0 ? (count / this.totalCount) * 100 : 0
				}));
			},
			
			// 筛选改变
			onFilterChange(filterValue) {
				this.currentFilter = filterValue;
			},
			
			// 排序改变
			onSortChange(sortValue) {
				this.currentSort = sortValue;
				this.showSortDropdown = false;
			},
			
			// 切换排序下拉框
			toggleSortDropdown() {
				this.showSortDropdown = !this.showSortDropdown;
			},
			
			// 获取排序文本
			getSortText() {
				const sortOption = this.sortOptions.find(option => option.value === this.currentSort);
				return sortOption ? sortOption.label : '最新发布';
			},
			
			// 格式化日期
			formatDate(dateString) {
				const date = new Date(dateString);
				const now = new Date();
				const diffTime = Math.abs(now - date);
				const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
				
				if (diffDays === 0) {
					return '今天';
				} else if (diffDays === 1) {
					return '昨天';
				} else if (diffDays < 7) {
					return `${diffDays}天前`;
				} else {
					return date.toLocaleDateString('zh-CN');
				}
			},
			
			// 切换点赞
			toggleLike(review) {
				review.isLiked = !review.isLiked;
				if (review.isLiked) {
					review.likeCount = (review.likeCount || 0) + 1;
				} else {
					review.likeCount = Math.max((review.likeCount || 0) - 1, 0);
				}
				
				// 这里可以调用API更新点赞状态
				this.$emit('like', {
					reviewId: review.id,
					isLiked: review.isLiked
				});
			},
			
			// 显示回复输入框
			showReplyInput(review) {
				// 关闭其他回复输入框
				this.reviews.forEach(r => {
					if (r.id !== review.id) {
						r.showReplyInput = false;
					}
				});
				
				review.showReplyInput = !review.showReplyInput;
				this.replyContent = '';
			},
			
			// 发送回复
			sendReply(review) {
				if (!this.replyContent.trim()) {
					uni.showToast({
						title: '请输入回复内容',
						icon: 'error'
					});
					return;
				}
				
				const reply = {
					id: 'r' + Date.now(),
					username: '当前用户', // 这里应该是当前登录用户的昵称
					content: this.replyContent.trim(),
					date: new Date().toISOString()
				};
				
				if (!review.replies) {
					review.replies = [];
				}
				review.replies.push(reply);
				review.replyCount = (review.replyCount || 0) + 1;
				review.showReplyInput = false;
				this.replyContent = '';
				
				// 调用API发送回复
				this.$emit('reply', {
					reviewId: review.id,
					content: reply.content
				});
				
				uni.showToast({
					title: '回复成功',
					icon: 'success'
				});
			},
			
			// 加载更多回复
			loadMoreReplies(review) {
				// 这里可以调用API加载更多回复
				this.$emit('loadMoreReplies', review.id);
			},
			
			// 预览媒体
			previewMedia(mediaList, index) {
				const imageUrls = mediaList
					.filter(media => media.type === 'image')
					.map(media => media.url);
				
				if (imageUrls.length > 0) {
					uni.previewImage({
						urls: imageUrls,
						current: index < imageUrls.length ? imageUrls[index] : imageUrls[0]
					});
				}
			},
			
			// 加载更多评价
			loadMoreReviews() {
				this.loadStatus = 'loading';
				
				// 模拟API调用
				setTimeout(() => {
					// 这里应该调用实际的API
					this.$emit('loadMore');
					this.loadStatus = 'more';
				}, 1500);
			},
			
			// 显示添加评价弹窗
			showAddReview() {
				this.resetNewReview();
				this.$refs.addReviewPopup.open();
			},
			
			// 关闭添加评价弹窗
			closeAddReview() {
				this.$refs.addReviewPopup.close();
			},
			
			// 重置新评价表单
			resetNewReview() {
				this.newReview = {
					rating: 5,
					content: '',
					media: []
				};
			},
			
			// 选择媒体文件
			selectMedia() {
				uni.showActionSheet({
					itemList: ['选择图片', '选择视频'],
					success: (res) => {
						if (res.tapIndex === 0) {
							this.selectImage();
						} else if (res.tapIndex === 1) {
							this.selectVideo();
						}
					}
				});
			},
			
			// 选择图片
			selectImage() {
				const remainingSlots = 9 - this.newReview.media.length;
				uni.chooseImage({
					count: remainingSlots,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success: (res) => {
						res.tempFilePaths.forEach(path => {
							this.newReview.media.push({
								type: 'image',
								url: path
							});
						});
					}
				});
			},
			
			// 选择视频
			selectVideo() {
				uni.chooseVideo({
					sourceType: ['album', 'camera'],
					maxDuration: 60,
					camera: 'back',
					success: (res) => {
						this.newReview.media.push({
							type: 'video',
							url: res.tempFilePath
						});
					}
				});
			},
			
			// 删除媒体文件
			deleteMedia(index) {
				this.newReview.media.splice(index, 1);
			},
			
			// 提交评价
			submitReview() {
				if (!this.canSubmit) {
					uni.showToast({
						title: '请完善评价信息',
						icon: 'error'
					});
					return;
				}
				
				const review = {
					id: 'new_' + Date.now(),
					username: '当前用户', // 这里应该是当前登录用户的昵称
					avatar: '/static/logo.png', // 当前用户头像
					rating: this.newReview.rating,
					content: this.newReview.content.trim(),
					date: new Date().toISOString(),
					media: [...this.newReview.media],
					likeCount: 0,
					isLiked: false,
					replyCount: 0,
					replies: []
				};
				
				// 添加到评价列表前面
				this.reviews.unshift(review);
				this.calculateOverallRating();
				
				// 调用API提交评价
				this.$emit('submitReview', {
					targetId: this.targetId,
					rating: review.rating,
					content: review.content,
					media: review.media
				});
				
				this.closeAddReview();
				
				uni.showToast({
					title: '评价发表成功',
					icon: 'success'
				});
			}
		}
	};
</script>

<style lang="scss">
	.rating-system {
		background-color: #f5f5f5;
		
		// 评价头部
		.rating-header {
			background: white;
			padding: 40rpx 30rpx;
			margin-bottom: 20rpx;
			
			.overall-rating {
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-bottom: 40rpx;
				
				.rating-score {
					display: flex;
					align-items: baseline;
					margin-bottom: 20rpx;
					
					.score-number {
						font-size: 60rpx;
						font-weight: 600;
						color: #FFB400;
					}
					
					.score-total {
						font-size: 28rpx;
						color: #909399;
						margin-left: 8rpx;
					}
				}
				
				.rating-stars {
					margin-bottom: 16rpx;
				}
				
				.rating-count {
					font-size: 26rpx;
					color: #909399;
				}
			}
			
			.rating-distribution {
				.distribution-item {
					display: flex;
					align-items: center;
					margin-bottom: 16rpx;
					
					.star-label {
						width: 60rpx;
						font-size: 24rpx;
						color: #606266;
					}
					
					.progress-bar {
						flex: 1;
						height: 12rpx;
						background: #f0f0f0;
						border-radius: 6rpx;
						margin: 0 20rpx;
						overflow: hidden;
						
						.progress-fill {
							height: 100%;
							background: #FFB400;
							border-radius: 6rpx;
							transition: width 0.3s ease;
						}
					}
					
					.count-text {
						width: 60rpx;
						text-align: right;
						font-size: 24rpx;
						color: #909399;
					}
				}
			}
		}
		
		// 筛选和排序
		.filter-section {
			background: white;
			padding: 30rpx;
			margin-bottom: 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			.filter-tabs {
				display: flex;
				flex-wrap: wrap;
				gap: 20rpx;
				
				.filter-tab {
					padding: 12rpx 24rpx;
					border: 1rpx solid #DCDFE6;
					border-radius: 40rpx;
					font-size: 26rpx;
					color: #606266;
					background: #f8f9fa;
					
					&.active {
						background: #409EFF;
						color: white;
						border-color: #409EFF;
					}
				}
			}
			
			.sort-dropdown {
				position: relative;
				display: flex;
				align-items: center;
				padding: 12rpx 20rpx;
				border: 1rpx solid #DCDFE6;
				border-radius: 8rpx;
				background: white;
				
				.sort-text {
					font-size: 26rpx;
					color: #606266;
					margin-right: 8rpx;
				}
				
				.dropdown-menu {
					position: absolute;
					top: 100%;
					right: 0;
					background: white;
					border: 1rpx solid #DCDFE6;
					border-radius: 8rpx;
					box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
					z-index: 10;
					min-width: 200rpx;
					
					.dropdown-item {
						display: block;
						padding: 20rpx 24rpx;
						font-size: 26rpx;
						color: #606266;
						border-bottom: 1rpx solid #f0f0f0;
						
						&:last-child {
							border-bottom: none;
						}
						
						&.active {
							color: #409EFF;
							background: #f0f8ff;
						}
					}
				}
			}
		}
		
		// 添加评价按钮
		.add-review-btn {
			background: white;
			border: 1rpx solid #409EFF;
			color: #409EFF;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 24rpx;
			margin: 0 30rpx 20rpx;
			border-radius: 12rpx;
			font-size: 28rpx;
			
			.btn-text {
				margin-left: 12rpx;
			}
		}
		
		// 评价列表
		.reviews-list {
			.review-item {
				background: white;
				padding: 30rpx;
				margin-bottom: 20rpx;
				
				// 评价者信息
				.reviewer-info {
					display: flex;
					align-items: center;
					margin-bottom: 24rpx;
					
					.avatar {
						width: 80rpx;
						height: 80rpx;
						border-radius: 40rpx;
						margin-right: 20rpx;
					}
					
					.user-detail {
						flex: 1;
						
						.username {
							font-size: 28rpx;
							font-weight: 600;
							color: #303133;
							display: block;
							margin-bottom: 8rpx;
						}
						
						.rating-date {
							display: flex;
							align-items: center;
							
							.date {
								font-size: 24rpx;
								color: #909399;
								margin-left: 20rpx;
							}
						}
					}
				}
				
				// 评价内容
				.review-content {
					margin-bottom: 24rpx;
					
					.review-text {
						font-size: 28rpx;
						color: #303133;
						line-height: 1.6;
						display: block;
						margin-bottom: 20rpx;
					}
					
					.media-list {
						display: flex;
						flex-wrap: wrap;
						gap: 12rpx;
						
						.media-item {
							width: 160rpx;
							height: 160rpx;
							border-radius: 12rpx;
							overflow: hidden;
							position: relative;
							
							.media-img {
								width: 100%;
								height: 100%;
								object-fit: cover;
							}
							
							.video-container {
								width: 100%;
								height: 100%;
								position: relative;
								
								.media-video {
									width: 100%;
									height: 100%;
									object-fit: cover;
								}
								
								.play-icon {
									position: absolute;
									top: 50%;
									left: 50%;
									transform: translate(-50%, -50%);
									width: 60rpx;
									height: 60rpx;
									background: rgba(0, 0, 0, 0.6);
									border-radius: 30rpx;
									display: flex;
									align-items: center;
									justify-content: center;
								}
							}
						}
					}
				}
				
				// 评价互动
				.review-actions {
					display: flex;
					align-items: center;
					gap: 40rpx;
					margin-bottom: 20rpx;
					
					.action-item {
						display: flex;
						align-items: center;
						
						&.active {
							.action-text {
								color: #F56C6C;
							}
						}
						
						.action-text {
							font-size: 24rpx;
							color: #909399;
							margin-left: 8rpx;
						}
					}
				}
				
				// 回复列表
				.replies-list {
					background: #f8f9fa;
					padding: 20rpx;
					border-radius: 12rpx;
					margin-bottom: 20rpx;
					
					.reply-item {
						margin-bottom: 16rpx;
						
						&:last-child {
							margin-bottom: 0;
						}
						
						.reply-user {
							font-size: 24rpx;
							color: #409EFF;
							font-weight: 600;
						}
						
						.reply-content {
							font-size: 24rpx;
							color: #303133;
						}
						
						.reply-date {
							font-size: 22rpx;
							color: #C0C4CC;
							margin-left: 12rpx;
						}
					}
					
					.view-more-replies {
						font-size: 24rpx;
						color: #409EFF;
						display: block;
						text-align: center;
						padding: 12rpx 0;
					}
				}
				
				// 回复输入
				.reply-input-container {
					display: flex;
					align-items: center;
					gap: 20rpx;
					
					.reply-input {
						flex: 1;
						padding: 16rpx 20rpx;
						border: 1rpx solid #DCDFE6;
						border-radius: 20rpx;
						font-size: 26rpx;
						background: #f8f9fa;
					}
					
					.reply-send-btn {
						padding: 16rpx 32rpx;
						background: #409EFF;
						color: white;
						border: none;
						border-radius: 20rpx;
						font-size: 26rpx;
					}
				}
			}
		}
		
		// 发表评价弹窗
		.add-review-popup {
			background: white;
			border-radius: 20rpx 20rpx 0 0;
			max-height: 80vh;
			overflow: hidden;
			
			.popup-header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 40rpx 30rpx 20rpx;
				border-bottom: 1rpx solid #f0f0f0;
				
				.popup-title {
					font-size: 32rpx;
					font-weight: 600;
					color: #303133;
				}
			}
			
			.review-form {
				padding: 40rpx 30rpx;
				max-height: 60vh;
				overflow-y: auto;
				
				.form-item {
					margin-bottom: 40rpx;
					
					.form-label {
						font-size: 28rpx;
						color: #303133;
						margin-bottom: 20rpx;
						display: block;
					}
					
					.review-textarea {
						width: 100%;
						min-height: 200rpx;
						padding: 20rpx;
						border: 1rpx solid #DCDFE6;
						border-radius: 12rpx;
						font-size: 28rpx;
						background: #f8f9fa;
						resize: none;
					}
					
					.char-count {
						text-align: right;
						margin-top: 12rpx;
						
						.count-text {
							font-size: 24rpx;
							color: #909399;
						}
					}
					
					.media-upload {
						display: flex;
						flex-wrap: wrap;
						gap: 20rpx;
						
						.upload-item {
							width: 160rpx;
							height: 160rpx;
							position: relative;
							border-radius: 12rpx;
							overflow: hidden;
							
							.upload-img {
								width: 100%;
								height: 100%;
								object-fit: cover;
							}
							
							.upload-video {
								width: 100%;
								height: 100%;
								
								.upload-video-player {
									width: 100%;
									height: 100%;
									object-fit: cover;
								}
							}
							
							.delete-media {
								position: absolute;
								top: 8rpx;
								right: 8rpx;
								width: 40rpx;
								height: 40rpx;
								background: rgba(0, 0, 0, 0.6);
								border-radius: 20rpx;
								display: flex;
								align-items: center;
								justify-content: center;
							}
						}
						
						.upload-btn {
							width: 160rpx;
							height: 160rpx;
							border: 2rpx dashed #DCDFE6;
							border-radius: 12rpx;
							display: flex;
							flex-direction: column;
							align-items: center;
							justify-content: center;
							background: #f8f9fa;
							
							.upload-text {
								font-size: 24rpx;
								color: #C0C4CC;
								margin-top: 8rpx;
							}
						}
					}
				}
			}
			
			.popup-actions {
				display: flex;
				border-top: 1rpx solid #f0f0f0;
				
				.cancel-btn,
				.submit-btn {
					flex: 1;
					height: 100rpx;
					border: none;
					font-size: 30rpx;
					
					&.cancel-btn {
						background: #f8f9fa;
						color: #606266;
					}
					
					&.submit-btn {
						background: #409EFF;
						color: white;
						
						&:disabled {
							background: #C0C4CC;
							color: #fff;
						}
					}
				}
			}
		}
	}
</style>