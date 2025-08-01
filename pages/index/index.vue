<template>
	<view class="content">
		<!-- 顶部海报组件示例 -->
		<view class="section">
			<view class="section-title">
				<text class="section-text">顶部海报组件示例</text>
			</view>
			
			<!-- 完整功能海报 -->
			<banner-top
				:banner-list="bannerTopList"
				:show-quick-entry="true"
				quick-entry-title="快捷功能"
				:quick-entry-list="bannerQuickEntryList"
				:show-notice="true"
				:notice-list="bannerNoticeList"
				@bannerClick="onBannerTopClick"
				@bannerChange="onBannerTopChange"
				@quickEntryClick="onBannerQuickEntryClick"
				@noticeClick="onBannerNoticeClick"
				@moreNotice="onBannerMoreNotice"
			/>
			
			<!-- 简化版海报（仅轮播） -->
			<view style="margin-top: 40rpx;">
				<banner-top
					:banner-list="simpleBannerList"
					:show-quick-entry="false"
					:show-notice="false"
					:autoplay="true"
					:interval="4000"
					banner-height="300rpx"
					@bannerClick="onBannerTopClick"
				/>
			</view>
		</view>
		
		<view class="page-title">
			<text class="title">组件示例</text>
		</view>
		
		<!-- 业务入口矩阵组件示例 -->
		<view class="section">
			<view class="section-title">
				<text class="section-text">业务入口矩阵组件示例</text>
			</view>
			
			<!-- 基础网格布局 -->
			<business-matrix
				:business-list="businessMatrixList"
				title="快捷入口"
				subtitle="常用功能一键直达"
				:columns="4"
				item-style="circle"
				size="medium"
				@item-click="onBusinessMatrixClick"
			/>
			
			<!-- 卡片布局 -->
			<view style="margin-top: 40rpx;">
				<business-matrix
					:business-list="businessCardList"
					title="业务管理"
					layout="card"
					:columns="2"
					item-style="rounded"
					size="large"
					:show-description="true"
					:shadow="true"
					@item-click="onBusinessMatrixClick"
				/>
			</view>
			
			<!-- 列表布局 -->
			<view style="margin-top: 40rpx;">
				<business-matrix
					:business-list="businessListLayout"
					title="系统工具"
					layout="list"
					item-style="square"
					:show-description="true"
					@item-click="onBusinessMatrixClick"
				/>
			</view>
		</view>
		
		<!-- 活动组件示例 -->
		<view class="section">
			<view class="section-title">
				<text class="section-text">活动组件示例</text>
			</view>
			
			<!-- 活动组件 -->
			<activity-component
				:notice-list="activityNoticeList"
				:banner-list="activityBannerList"
				:show-quick-entry="true"
				:quick-entry-title="'活动专区'"
				:quick-entry-list="activityQuickEntryList"
				@noticeClick="onActivityNoticeClick"
				@moreNotice="onActivityMoreNotice"
				@bannerClick="onActivityBannerClick"
				@bannerChange="onActivityBannerChange"
				@quickEntryClick="onActivityQuickEntryClick"
			/>
		</view>
		
		<!-- 优惠券组件示例 -->
		<view class="section">
			<view class="section-title">
				<text class="section-text">优惠券组件示例</text>
			</view>
			
			<!-- 优惠券列表 -->
			<view class="coupon-list">
				<!-- 可领取优惠券 -->
				<coupon-card 
					:coupon-data="availableCoupon"
					@receive="onReceiveCoupon"
				/>
				
				<!-- 未使用优惠券 -->
				<coupon-card 
					:coupon-data="unusedCoupon"
				/>
				
				<!-- 已使用优惠券 -->
				<coupon-card 
					:coupon-data="usedCoupon"
				/>
				
				<!-- 已过期优惠券 -->
				<coupon-card 
					:coupon-data="expiredCoupon"
				/>
			</view>
		</view>
		
		<!-- 商品组件示例 -->
		<view class="section">
			<view class="section-title">
				<text class="section-text">商品列表组件示例</text>
			</view>
			
			<!-- 网格布局商品列表 -->
			<product-list
				:product-list="productList"
				title="热门推荐"
				:show-count="true"
				layout="grid"
				@productClick="onProductClick"
				@addToCart="onAddToCart"
				@buyNow="onBuyNow"
			/>
			
			<!-- 单列布局商品列表 -->
			<product-list
				:product-list="singleLayoutProducts"
				title="单列布局示例"
				:show-count="false"
				layout="single"
				@productClick="onProductClick"
				@addToCart="onAddToCart"
				@buyNow="onBuyNow"
			/>
		</view>
		
		<!-- 地址管理组件示例 -->
		<view class="section">
			<view class="section-title">
				<text class="section-text">收货地址管理组件</text>
			</view>
			<address-manager 
				:address-list="addressList"
				@add="onAddAddress"
				@edit="onEditAddress"
				@delete="onDeleteAddress"
				@setDefault="onSetDefaultAddress"
			/>
		</view>
		
		<!-- 订单列表组件示例 -->
		<view class="section">
			<view class="section-title">
				<text class="section-text">订单列表组件示例</text>
			</view>
			
			<!-- 订单列表 -->
			<view class="order-list">
				<!-- 待支付订单 -->
				<custom-order-list 
					:order-data="pendingOrder"
					@orderClick="onOrderClick"
					@pay="onPay"
					@cancel="onCancel"
					@detail="onDetail"
				/>
				
				<!-- 已支付订单 -->
				<custom-order-list 
					:order-data="paidOrder"
					@orderClick="onOrderClick"
					@remind="onRemind"
					@detail="onDetail"
				/>
				
				<!-- 已发货订单 -->
				<custom-order-list 
					:order-data="shippedOrder"
					@orderClick="onOrderClick"
					@logistics="onLogistics"
					@confirm="onConfirm"
					@detail="onDetail"
				/>
				
				<!-- 已完成订单 -->
				<custom-order-list 
					:order-data="completedOrder"
					@orderClick="onOrderClick"
					@evaluate="onEvaluate"
					@rebuy="onRebuy"
					@detail="onDetail"
				/>
				
				<!-- 多商品订单 -->
				<custom-order-list 
					:order-data="multiGoodsOrder"
					@orderClick="onOrderClick"
					@detail="onDetail"
				/>
			</view>
		</view>
		
		<!-- 账户管理组件示例 -->
		<view class="section">
			<view class="section-title">
				<text class="section-text">账户管理组件示例</text>
			</view>
			
			<account-manager
				:account-data="accountData"
				@avatarChange="onAvatarChange"
				@nicknameChange="onNicknameChange"
				@phoneChange="onPhoneChange"
				@emailChange="onEmailChange"
				@passwordChange="onPasswordChange"
				@biometricToggle="onBiometricToggle"
				@deviceManagement="onDeviceManagement"
				@loginLog="onLoginLog"
				@accountDelete="onAccountDelete"
			/>
		</view>
		
		<!-- 会员中心组件示例 -->
		<view class="section">
			<view class="section-title">
				<text class="section-text">会员中心组件示例</text>
			</view>
			
			<member-center
				:member-data="memberData"
				:member-benefits="memberBenefits"
				:exchange-list="exchangeList"
				:points-records="pointsRecords"
				@exchange="onExchange"
				@exchangeItemClick="onExchangeItemClick"
				@viewMoreExchange="onViewMoreExchange"
				@viewMoreRecord="onViewMoreRecord"
			/>
		</view>
		
		<!-- 评价系统组件示例 -->
		<view class="section">
			<view class="section-title">
				<text class="section-text">评价系统组件示例</text>
			</view>
			
			<rating-system
				:target-id="ratingTargetId"
				rating-type="product"
				:can-add-review="true"
				:initial-reviews="initialReviews"
				@submitReview="onSubmitReview"
				@like="onReviewLike"
				@reply="onReviewReply"
				@loadMore="onLoadMoreReviews"
				@loadMoreReplies="onLoadMoreReplies"
			/>
		</view>
		
		<!-- List Group 列表组组件示例 -->
		<view class="section">
			<view class="section-title">
				<text class="section-text">List Group 列表组组件示例</text>
			</view>
			
			<!-- 基础列表组 -->
			<view style="margin-bottom: 40rpx;">
				<list-group
					title="系统功能"
					:items="listGroupData"
					@item-click="onListGroupItemClick"
					@action-click="onListGroupActionClick"
				/>
			</view>
			
			<!-- 用户列表（显示头像） -->
			<view style="margin-bottom: 40rpx;">
				<list-group
					title="团队成员"
					:items="userListData"
					size="large"
					@item-click="onListGroupItemClick"
				/>
			</view>
			
			<!-- 商品分类（边框样式） -->
			<view style="margin-bottom: 40rpx;">
				<list-group
					title="商品分类"
					:items="categoryListData"
					type="bordered"
					size="small"
					@item-click="onListGroupItemClick"
				/>
			</view>
			
			<!-- 可选择的列表 -->
			<view style="margin-bottom: 40rpx;">
				<list-group
					title="可选择列表（多选功能）"
					:items="categoryListData"
					:selectable="true"
					:selected-items="selectedListItems"
					@selection-change="onListGroupSelectionChange"
					@item-click="onListGroupItemClick"
				/>
			</view>
			
			<!-- flush样式（无圆角） -->
			<list-group
				title="Flush样式列表"
				:items="userListData"
				type="flush"
				:show-arrow="false"
				@item-click="onListGroupItemClick"
			/>
		</view>
		
		<!-- 收藏列表组件示例 -->
		<view class="section">
			<view class="section-title">
				<text class="section-text">收藏列表组件示例</text>
			</view>
			
			<favorite-list
				:favorite-list="favoriteList"
				title="我的收藏"
				:show-count="true"
				:show-search="true"
				:show-filter="true"
				:show-batch-delete="true"
				layout="grid"
				:categories="favoriteCategories"
				@removeFavorite="onRemoveFavorite"
				@batchRemove="onBatchRemoveFavorite"
				@viewProduct="onViewFavoriteProduct"
				@itemClick="onFavoriteItemClick"
				@browseProducts="onBrowseProducts"
				@layoutChange="onFavoriteLayoutChange"
			/>
		</view>
		
		<!-- 客服组件示例 -->
		<view class="section">
			<view class="section-title">
				<text class="section-text">客服组件示例</text>
			</view>
			
			<!-- 基础客服组件 -->
			<customer-service
				:show-title="true"
				title="客服中心"
				subtitle="我们为您提供专业的服务支持"
				:online-available="true"
				online-status="在线，立即沟通"
				phone-number="400-123-4567"
				phone-service-time="9:00-18:00"
				email-address="service@example.com"
				:show-wechat="true"
				wechat-id="service_wechat"
				:show-help-center="true"
				:help-list="customerServiceHelpList"
				:show-service-time="true"
				service-time-desc="客服工作时间：周一至周日 9:00-18:00，法定节假日可能会有调整"
				@online-service="onCustomerServiceOnline"
				@phone-call="onCustomerServicePhone"
				@email-contact="onCustomerServiceEmail"
				@wechat-service="onCustomerServiceWechat"
				@help-click="onCustomerServiceHelp"
				@more-help="onCustomerServiceMoreHelp"
			/>
			
			<!-- 带浮动按钮的客服组件 -->
			<view style="margin-top: 40rpx;">
				<customer-service
					:show-title="false"
					:show-float-btn="true"
					:float-position="{ right: '30rpx', bottom: '100rpx' }"
					:unread-count="3"
					:online-available="false"
					online-status="客服离线，稍后回复"
					@float-service-click="onFloatServiceClick"
				/>
			</view>
		</view>
		
		<!-- 会员卡组件示例 -->
		<view class="section">
			<view class="section-title">
				<text class="section-text">会员卡组件示例</text>
			</view>
			
			<!-- 青铜会员卡 -->
			<membership-card
				:username="'李明'"
				:member-id="'MB202412001'"
				:level-name="'青铜会员'"
				:card-type="'bronze'"
				:points="580"
				:expiry-date="'2025-12-31'"
				:benefits="bronzeBenefits"
				:user-avatar="'/static/logo.png'"
				@upgrade="onMembershipUpgrade"
				@viewDetails="onMembershipViewDetails"
			/>
			
			<!-- 黄金会员卡 -->
			<membership-card
				:username="'张小华'"
				:member-id="'MB202412002'"
				:level-name="'黄金会员'"
				:card-type="'gold'"
				:points="2580"
				:expiry-date="'2025-12-31'"
				:benefits="goldBenefits"
				:user-avatar="'/static/logo.png'"
				:show-crown="true"
				@upgrade="onMembershipUpgrade"
				@viewDetails="onMembershipViewDetails"
			/>
			
			<!-- 钻石会员卡 -->
			<membership-card
				:username="'王大宝'"
				:member-id="'MB202412003'"
				:level-name="'钻石会员'"
				:card-type="'diamond'"
				:points="15800"
				:expiry-date="'永久有效'"
				:benefits="diamondBenefits"
				:user-avatar="'/static/logo.png'"
				:show-crown="true"
				:logo-text="'VIP'"
				@upgrade="onMembershipUpgrade"
				@viewDetails="onMembershipViewDetails"
			/>
		</view>
		
		<!-- 在线预约系统组件示例 -->
		<view class="section">
			<view class="section-title">
				<text class="section-text">在线预约系统组件示例</text>
			</view>
			
			<!-- 简化的预约组件示例 -->
			<appointment-system
				title="快速预约"
				subtitle="体验在线预约功能"
				:appointment-slots="appointmentSlots"
				:show-my-appointments="false"
				@appointmentSuccess="onAppointmentSuccess"
				@appointmentCancel="onAppointmentCancel"
				@dateSelect="onAppointmentDateSelect"
				@slotSelect="onAppointmentSlotSelect"
			/>
			
			<!-- 查看完整示例按钮 -->
			<view class="appointment-actions">
				<button class="demo-btn" @click="goToAppointmentDemo">
					查看完整预约示例
				</button>
			</view>
		</view>
		
		<!-- 页面骨架组件示例 -->
		<view class="section">
			<view class="section-title">
				<text class="section-text">页面骨架组件示例</text>
			</view>
			
			<custom-card 
				image="/static/logo.png"
				title="PageSkeleton 页面骨架组件"
				description="灵活的页面布局骨架，支持多种布局模式（普通、侧边栏、标签页、流式）和内容区域自定义。提供丰富的插槽和配置选项，适用于各种页面场景。"
				:shadow="true"
				margin="20rpx"
				@click="goToSkeletonDemo"
			>
				<template #actions>
					<view class="card-actions">
						<button class="action-btn" size="mini" type="primary" @click.stop="goToSkeletonDemo">体验示例</button>
						<button class="action-btn" size="mini" type="default" @click.stop="viewSkeletonDocs">查看文档</button>
					</view>
				</template>
			</custom-card>
		</view>
		
		<!-- 原有的卡片组件示例 -->
		<view class="divider">
			<text class="divider-text">以下是卡片组件示例</text>
		</view>
		
		<!-- 卡片组件示例 -->
		<view class="section">
			<view class="section-title">
				<text class="section-text">卡片组件示例</text>
			</view>
			
			<!-- 基础卡片 -->
			<custom-card 
				image="/static/logo.png"
				title="基础卡片示例"
				description="这是一个基础的卡片组件，包含图片、标题和描述信息。支持点击事件和多种自定义配置。"
				@click="onCardClick('基础卡片')"
			/>
			
			<!-- 无图片卡片 -->
			<custom-card 
				title="无图片卡片"
				description="这是一个没有图片的卡片示例，仅包含标题和描述信息。"
				@click="onCardClick('无图片卡片')"
			/>
			
			<!-- 自定义样式卡片 -->
			<custom-card 
				image="/static/logo.png"
				title="自定义样式卡片"
				description="这个卡片展示了不同的样式配置，包括无边框、无阴影等选项。"
				:shadow="false"
				:border="false"
				margin="30rpx"
				@click="onCardClick('自定义样式卡片')"
			/>
			
			<!-- 带操作按钮的卡片 -->
			<custom-card 
				image="/static/logo.png"
				title="带操作按钮的卡片"
				description="这个卡片在底部包含了操作按钮区域，可以添加各种操作元素。"
				@click="onCardClick('带操作按钮的卡片')"
			>
				<template #actions>
					<view class="card-actions">
						<button class="action-btn" size="mini" type="primary" @click.stop="onLike">点赞</button>
						<button class="action-btn" size="mini" type="default" @click.stop="onShare">分享</button>
						<button class="action-btn" size="mini" type="warn" @click.stop="onCollect">收藏</button>
					</view>
				</template>
			</custom-card>
		</view>
		
		<!-- 长文本描述卡片 -->
		<custom-card 
			image="/static/logo.png"
			title="长文本描述卡片"
			description="这是一个包含很长描述文本的卡片示例，用来展示文本省略功能。当描述文本超过指定行数时，会自动显示省略号。这个功能对于保持界面整洁非常有用，特别是在列表展示的场景中。"
			:description-ellipsis="2"
			@click="onCardClick('长文本描述卡片')"
		/>
		
		<!-- TabBar 底部导航栏组件示例 -->
		<view class="section">
			<view class="section-title">
				<text class="section-text">TabBar 底部导航栏组件示例</text>
			</view>
			
			<!-- 基础导航栏示例 -->
			<view class="tab-demo-container">
				<view class="demo-title">
					<text class="demo-title-text">基础导航栏</text>
				</view>
				<view class="demo-wrapper">
					<tab-bar 
						:tab-list="basicTabList" 
						:current="currentBasicTab"
						@change="onBasicTabChange"
					/>
				</view>
			</view>
			
			<!-- 自定义样式导航栏示例 -->
			<view class="tab-demo-container">
				<view class="demo-title">
					<text class="demo-title-text">自定义样式导航栏</text>
				</view>
				<view class="demo-wrapper">
					<tab-bar 
						:tab-list="customTabList"
						:current="currentCustomTab"
						active-color="#ff6b35"
						inactive-color="#cccccc"
						background-color="#f8f8f8"
						:icon-size="56"
						:text-size="26"
						@change="onCustomTabChange"
					/>
				</view>
			</view>
			
			<!-- 带徽章的导航栏示例 -->
			<view class="tab-demo-container">
				<view class="demo-title">
					<text class="demo-title-text">带徽章的导航栏</text>
				</view>
				<view class="demo-wrapper">
					<tab-bar 
						:tab-list="badgeTabList"
						:current="currentBadgeTab"
						@change="onBadgeTabChange"
					/>
				</view>
			</view>
			
			<!-- 仅图标导航栏示例 -->
			<view class="tab-demo-container">
				<view class="demo-title">
					<text class="demo-title-text">仅图标导航栏</text>
				</view>
				<view class="demo-wrapper">
					<tab-bar 
						:tab-list="iconOnlyTabList"
						:current="currentIconOnlyTab"
						:show-text="false"
						:icon-size="64"
						@change="onIconOnlyTabChange"
					/>
				</view>
			</view>
			
			<!-- 图片图标导航栏示例 -->
			<view class="tab-demo-container">
				<view class="demo-title">
					<text class="demo-title-text">图片图标导航栏</text>
				</view>
				<view class="demo-wrapper">
					<tab-bar 
						:tab-list="imageTabList"
						:current="currentImageTab"
						@change="onImageTabChange"
					/>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import CustomCard from '@/components/custom-card/custom-card.vue'
	import CustomOrderList from '@/components/custom-orderlist/custom-orderlist.vue'
	import AddressManager from '@/components/address-manager/address-manager.vue'
	import CouponCard from '@/components/coupon-card/coupon-card.vue'
	import ProductList from '@/components/product-component/product-list.vue'
	import MemberCenter from '@/components/member-center/member-center.vue'
	import AccountManager from '@/components/account-manager/account-manager.vue'
	import RatingSystem from '@/components/rating-system/rating-system.vue'
	import ActivityComponent from '@/components/activity-component/activity-component.vue'
	import FavoriteList from '@/components/favorite-list/favorite-list.vue'
	import BusinessMatrix from '@/components/business-matrix/business-matrix.vue'
	import ListGroup from '@/components/list-group/list-group.vue'
	import CustomerService from '@/components/customer-service/customer-service.vue'
	import MembershipCard from '@/components/membership-card/membership-card.vue'
	import AppointmentSystem from '@/components/appointment-system/appointment-system.vue'
	import BannerTop from '@/components/banner-top/banner-top.vue'
	import TabBar from '@/components/tab-bar/tab-bar.vue'
	
	export default {
		components: {
			CustomCard,
			CustomOrderList,
			AddressManager,
			CouponCard,
			ProductList,
			MemberCenter,
			AccountManager,
			RatingSystem,
			ActivityComponent,
			FavoriteList,
			BusinessMatrix,
			ListGroup,
			CustomerService,
			MembershipCard,
			AppointmentSystem,
			BannerTop,
			TabBar
		},
		data() {
			return {
				title: 'Hello',
				
				// TabBar 组件数据
				currentBasicTab: 0,
				currentCustomTab: 0, 
				currentBadgeTab: 0,
				currentIconOnlyTab: 0,
				currentImageTab: 0,
				
				// 基础导航栏数据
				basicTabList: [
					{
						id: 'home',
						text: '首页',
						icon: 'home',
						pagePath: '/pages/index/index'
					},
					{
						id: 'category',
						text: '分类',
						icon: 'bars',
						pagePath: '/pages/category/category'
					},
					{
						id: 'cart',
						text: '购物车',
						icon: 'cart',
						pagePath: '/pages/cart/cart'
					},
					{
						id: 'profile',
						text: '我的',
						icon: 'person',
						pagePath: '/pages/profile/profile'
					}
				],
				
				// 自定义样式导航栏数据
				customTabList: [
					{
						id: 'discover',
						text: '发现',
						icon: 'search',
						pagePath: '/pages/discover/discover'
					},
					{
						id: 'message',
						text: '消息',
						icon: 'chatbubble',
						pagePath: '/pages/message/message'
					},
					{
						id: 'favorite',
						text: '收藏',
						icon: 'heart',
						pagePath: '/pages/favorite/favorite'
					},
					{
						id: 'settings',
						text: '设置',
						icon: 'gear',
						pagePath: '/pages/settings/settings'
					}
				],
				
				// 带徽章的导航栏数据
				badgeTabList: [
					{
						id: 'home',
						text: '首页',
						icon: 'home',
						pagePath: '/pages/index/index'
					},
					{
						id: 'news',
						text: '动态',
						icon: 'chatbubbles',
						badge: { count: 5 },
						pagePath: '/pages/news/news'
					},
					{
						id: 'cart',
						text: '购物车',
						icon: 'cart',
						badge: { count: 12 },
						pagePath: '/pages/cart/cart'
					},
					{
						id: 'profile',
						text: '我的',
						icon: 'person',
						badge: { dot: true },
						pagePath: '/pages/profile/profile'
					}
				],
				
				// 仅图标导航栏数据
				iconOnlyTabList: [
					{
						id: 'home',
						icon: 'home',
						pagePath: '/pages/index/index'
					},
					{
						id: 'search',
						icon: 'search',
						pagePath: '/pages/search/search'
					},
					{
						id: 'add',
						icon: 'plus',
						pagePath: '/pages/add/add'
					},
					{
						id: 'notification',
						icon: 'notification',
						badge: { count: 3 },
						pagePath: '/pages/notification/notification'
					},
					{
						id: 'profile',
						icon: 'person',
						pagePath: '/pages/profile/profile'
					}
				],
				
				// 图片图标导航栏数据
				imageTabList: [
					{
						id: 'home',
						text: '首页',
						image: '/static/logo.png',
						activeImage: '/static/logo.png',
						pagePath: '/pages/index/index'
					},
					{
						id: 'category',
						text: '分类',
						image: '/static/logo.png',
						activeImage: '/static/logo.png',
						pagePath: '/pages/category/category'
					},
					{
						id: 'cart',
						text: '购物车',
						image: '/static/logo.png',
						activeImage: '/static/logo.png',
						badge: { count: 2 },
						pagePath: '/pages/cart/cart'
					},
					{
						id: 'profile',
						text: '我的',
						image: '/static/logo.png',
						activeImage: '/static/logo.png',
						pagePath: '/pages/profile/profile'
					}
				],
				
				// 顶部海报组件数据
				bannerTopList: [
					{
						id: 1,
						image: '/static/logo.png',
						title: '新年狂欢节',
						subtitle: '全场商品5折起，错过再等一年',
						buttonText: '立即抢购',
						link: '/pages/promotion/newyear'
					},
					{
						id: 2,
						image: '/static/logo.png',
						title: '春季新品上市',
						subtitle: '时尚潮流，引领春季风尚',
						buttonText: '立即查看',
						link: '/pages/product/spring-new'
					},
					{
						id: 3,
						image: '/static/logo.png',
						title: '会员专享日',
						subtitle: '会员特权升级，专属折扣等你来',
						buttonText: '立即享受',
						link: '/pages/member/special'
					}
				],
				
				// 简化版海报数据
				simpleBannerList: [
					{
						id: 1,
						image: '/static/logo.png',
						link: '/pages/simple/banner1'
					},
					{
						id: 2,
						image: '/static/logo.png',
						link: '/pages/simple/banner2'
					}
				],
				
				// 海报快捷入口数据
				bannerQuickEntryList: [
					{
						id: 1,
						title: '扫一扫',
						iconType: 'scan',
						iconColor: '#007aff',
						link: '/pages/scan/index'
					},
					{
						id: 2,
						title: '消息',
						iconType: 'chatbubble',
						iconColor: '#10aeff',
						badge: '5',
						link: '/pages/message/index'
					},
					{
						id: 3,
						title: '收藏',
						iconType: 'heart',
						iconColor: '#ff5a5f',
						link: '/pages/favorite/index'
					},
					{
						id: 4,
						title: '购物车',
						iconType: 'cart',
						iconColor: '#ff6b35',
						badge: '3',
						link: '/pages/cart/index'
					}
				],
				
				// 海报公告数据
				bannerNoticeList: [
					{
						id: 1,
						content: '🎉 新用户注册立享20元优惠券，仅限今日！',
						link: '/pages/register/index'
					},
					{
						id: 2,
						content: '📦 全场免邮活动进行中，满99元立即免邮！',
						link: '/pages/activity/freeship'
					},
					{
						id: 3,
						content: '⭐ 春季大促开始了，精选商品低至3折！',
						link: '/pages/promotion/spring'
					}
				],
				
				// 业务入口矩阵数据
				businessMatrixList: [
					{
						id: 'bm_001',
						name: '商品管理',
						icon: '/static/logo.png',
						url: '/pages/product-demo/product-demo',
						badge: {
							type: 'new',
							text: 'NEW'
						}
					},
					{
						id: 'bm_002',
						name: '订单管理',
						icon: '/static/logo.png',
						url: '/pages/order-demo/order-demo',
						badge: {
							type: 'hot',
							text: 'HOT'
						}
					},
					{
						id: 'bm_003',
						name: '用户管理',
						icon: '/static/logo.png',
						url: '/pages/user-demo/user-demo'
					},
					{
						id: 'bm_004',
						name: '数据统计',
						icon: '/static/logo.png',
						url: '/pages/data-demo/data-demo'
					},
					{
						id: 'bm_005',
						name: '活动管理',
						icon: '/static/logo.png',
						url: '/pages/activity-demo/activity-demo'
					},
					{
						id: 'bm_006',
						name: '优惠券',
						icon: '/static/logo.png',
						url: '/pages/coupon-demo/coupon-demo',
						badge: {
							type: 'sale',
							text: '优惠'
						}
					},
					{
						id: 'bm_007',
						name: '会员中心',
						icon: '/static/logo.png',
						url: '/pages/member-demo/member-demo',
						badge: {
							type: 'vip',
							text: 'VIP'
						}
					},
					{
						id: 'bm_008',
						name: '收藏管理',
						icon: '/static/logo.png',
						url: '/pages/favorite-demo/favorite-demo'
					},
					{
						id: 'bm_009',
						name: '在线预约',
						icon: '/static/logo.png',
						url: '/pages/appointment-demo/appointment-demo',
						badge: {
							type: 'new',
							text: '新功能'
						}
					}
				],
				// 卡片布局业务入口
				businessCardList: [
					{
						id: 'bc_001',
						name: '财务管理',
						icon: '/static/logo.png',
						description: '收支管理、账单统计、财务报表分析',
						url: '/pages/finance-demo/finance-demo',
						badge: {
							type: 'vip',
							text: 'VIP'
						}
					},
					{
						id: 'bc_002',
						name: '库存管理',
						icon: '/static/logo.png',
						description: '商品库存、入库出库、库存预警提醒',
						url: '/pages/inventory-demo/inventory-demo'
					},
					{
						id: 'bc_003',
						name: '营销推广',
						icon: '/static/logo.png',
						description: '活动策划、推广管理、效果分析',
						url: '/pages/marketing-demo/marketing-demo',
						badge: {
							type: 'hot',
							text: '火爆'
						}
					},
					{
						id: 'bc_004',
						name: '客服中心',
						icon: '/static/logo.png',
						description: '在线客服、工单管理、服务质量监控',
						url: '/pages/service-demo/service-demo'
					}
				],
				// 列表布局业务入口
				businessListLayout: [
					{
						id: 'bl_001',
						name: '系统设置',
						icon: '/static/logo.png',
						description: '基础配置、权限管理、系统监控',
						url: '/pages/system-demo/system-demo'
					},
					{
						id: 'bl_002',
						name: '数据备份',
						icon: '/static/logo.png',
						description: '数据备份、恢复操作、备份计划管理',
						url: '/pages/backup-demo/backup-demo'
					},
					{
						id: 'bl_003',
						name: '日志管理',
						icon: '/static/logo.png',
						description: '操作日志、错误日志、系统日志查看',
						url: '/pages/log-demo/log-demo'
					},
					{
						id: 'bl_004',
						name: '安全中心',
						icon: '/static/logo.png',
						description: '安全策略、访问控制、风险监控',
						url: '/pages/security-demo/security-demo'
					}
				],
				// 活动组件数据
				activityNoticeList: [
					{ id: 1, content: '🎉 新用户注册立享专属优惠券，先到先得！', link: '/pages/register/index' },
					{ id: 2, content: '📦 全场包邮活动进行中，满99元免运费！', link: '/pages/shipping/index' },
					{ id: 3, content: '⭐ 每日签到赢积分，积分可兑换精美礼品！', link: '/pages/checkin/index' },
					{ id: 4, content: '🔥 限时秒杀活动开启，超值商品等你抢购！', link: '/pages/seckill/index' }
				],
				activityBannerList: [
					{
						id: 1,
						image: '/static/logo.png',
						title: '年终大促销',
						subtitle: '全场商品5折起，错过再等一年',
						link: '/pages/promotion/year-end'
					},
					{
						id: 2,
						image: '/static/logo.png',
						title: '新品首发',
						subtitle: '最新产品震撼上市，抢先体验',
						link: '/pages/product/new-arrival'
					},
					{
						id: 3,
						image: '/static/logo.png',
						title: '会员专享',
						subtitle: '会员特权日，专属折扣等你来',
						link: '/pages/member/exclusive'
					}
				],
				activityQuickEntryList: [
					{
						id: 1,
						title: '每日签到',
						iconType: 'calendar',
						iconColor: '#ff6b35',
						badge: '有奖',
						link: '/pages/checkin/index'
					},
					{
						id: 2,
						title: '限时秒杀',
						iconType: 'fire',
						iconColor: '#ff4757',
						badge: 'HOT',
						link: '/pages/seckill/index'
					},
					{
						id: 3,
						title: '优惠券',
						iconType: 'gift',
						iconColor: '#ffa726',
						link: '/pages/coupon/center'
					},
					{
						id: 4,
						title: '积分商城',
						iconType: 'star',
						iconColor: '#42a5f5',
						link: '/pages/points/mall'
					}
				],
				// 优惠券数据
				availableCoupon: {
					id: '1',
					title: '新用户专享券',
					amount: 50,
					threshold: 200,
					description: '限时优惠，首次下单可用',
					scope: '全场商品',
					startTime: '2024-01-01',
					endTime: '2024-12-31',
					status: 'available'
				},
				unusedCoupon: {
					id: '2',
					title: '满100减20',
					amount: 20,
					threshold: 100,
					description: '通用优惠券',
					scope: '全场通用',
					startTime: '2024-01-01',
					endTime: '2024-12-31',
					status: 'unused'
				},
				usedCoupon: {
					id: '3',
					title: '无门槛券',
					amount: 15,
					threshold: 0,
					description: '已使用的优惠券',
					scope: '指定商品',
					startTime: '2024-01-01',
					endTime: '2024-12-31',
					status: 'used'
				},
				expiredCoupon: {
					id: '4',
					title: '满300减80',
					amount: 80,
					threshold: 300,
					description: '已过期的优惠券',
					scope: '全场通用',
					startTime: '2024-01-01',
					endTime: '2024-06-30',
					status: 'expired'
				},
				// 地址列表数据
				addressList: [
					{
						id: 1,
						consigneeName: '张三',
						phone: '13812345678',
						province: '广东省',
						city: '深圳市',
						district: '南山区',
						detailAddress: '科技园南区深南大道10000号腾讯大厦A座20层',
						isDefault: true
					},
					{
						id: 2,
						consigneeName: '李四',
						phone: '13987654321',
						province: '北京市',
						city: '北京市',
						district: '朝阳区',
						detailAddress: '建国门外大街甲14号广播大厦',
						isDefault: false
					},
					{
						id: 3,
						consigneeName: '王五',
						phone: '13511112222',
						province: '上海市',
						city: '上海市',
						district: '浦东新区',
						detailAddress: '陆家嘴环路1000号恒生银行大厦',
						isDefault: false
					}
				],
				// 待支付订单
				pendingOrder: {
					orderNo: 'PO202412120001',
					status: 'pending',
					createTime: '2024-12-12 14:30:00',
					totalAmount: 299.00,
					goodsCount: 1,
					goodsList: [{
						image: '/static/logo.png',
						name: 'uni-app开发框架学习教程',
						spec: '电子版',
						price: 299.00,
						quantity: 1
					}]
				},
				// 已支付订单
				paidOrder: {
					orderNo: 'PO202412120002',
					status: 'paid',
					createTime: '2024-12-12 10:15:00',
					totalAmount: 158.50,
					goodsCount: 1,
					goodsList: [{
						image: '/static/logo.png',
						name: 'Vue.js实战开发指南',
						spec: '精装版',
						price: 158.50,
						quantity: 1
					}]
				},
				// 已发货订单
				shippedOrder: {
					orderNo: 'PO202412110003',
					status: 'shipped',
					createTime: '2024-12-11 16:20:00',
					totalAmount: 89.90,
					goodsCount: 1,
					goodsList: [{
						image: '/static/logo.png',
						name: 'JavaScript高级程序设计',
						spec: '第4版',
						price: 89.90,
						quantity: 1
					}]
				},
				// 已完成订单
				completedOrder: {
					orderNo: 'PO202412100004',
					status: 'completed',
					createTime: '2024-12-10 09:45:00',
					totalAmount: 199.00,
					goodsCount: 1,
					goodsList: [{
						image: '/static/logo.png',
						name: 'React开发实战',
						spec: '实体书',
						price: 199.00,
						quantity: 1
					}]
				},
				// 多商品订单
				multiGoodsOrder: {
					orderNo: 'PO202412090005',
					status: 'completed',
					createTime: '2024-12-09 20:30:00',
					totalAmount: 567.80,
					goodsCount: 3,
					goodsList: [
						{
							image: '/static/logo.png',
							name: 'TypeScript实战指南',
							spec: '精装版',
							price: 189.00,
							quantity: 1
						},
						{
							image: '/static/logo.png',
							name: 'Node.js开发实战',
							spec: '电子版',
							price: 129.90,
							quantity: 2
						},
						{
							image: '/static/logo.png',
							name: 'CSS3动效设计',
							spec: '彩印版',
							price: 119.00,
							quantity: 1
						}
					]
				},
				// 商品列表数据
				productList: [
					{
						id: 'prod_001',
						title: 'iPhone 15 Pro 钛金属',
						description: '强得离谱，全新A17 Pro芯片，钛金属设计',
						image: '/static/logo.png',
						price: 8999,
						originalPrice: 9999,
						sales: 1200,
						tags: ['新品', '热销'],
						specs: ['128GB', '256GB', '512GB']
					},
					{
						id: 'prod_002',
						title: 'MacBook Pro 14英寸',
						description: 'M3芯片，专业性能，创意无限',
						image: '/static/logo.png',
						price: 14999,
						originalPrice: 16999,
						sales: 580,
						tags: ['特价', '包邮'],
						specs: ['M3芯片', '8GB内存', '512GB存储']
					},
					{
						id: 'prod_003',
						title: 'AirPods Pro 第二代',
						description: '个人空间音频，自适应透明度',
						image: '/static/logo.png',
						price: 1899,
						originalPrice: 2399,
						sales: 2300,
						tags: ['限时', '包邮'],
						specs: ['USB-C', '主动降噪']
					},
					{
						id: 'prod_004',
						title: 'Apple Watch Series 9',
						description: '更快芯片，更亮显示屏，全新双指互点',
						image: '/static/logo.png',
						price: 2999,
						originalPrice: 3299,
						sales: 850,
						tags: ['新品'],
						specs: ['41mm', '45mm', 'GPS', 'LTE']
					}
				],
				// 单列布局商品数据
				singleLayoutProducts: [
					{
						id: 'single_001',
						title: 'iPad Air 15.3英寸 M2芯片',
						description: '轻薄设计，强大性能，支持Apple Pencil Pro',
						image: '/static/logo.png',
						price: 4599,
						originalPrice: 5299,
						sales: 620,
						tags: ['新品', '包邮'],
						specs: ['128GB', '256GB', '512GB']
					},
					{
						id: 'single_002',
						title: 'Apple TV 4K 第三代',
						description: '4K HDR，杜比视界，游戏体验升级',
						image: '/static/logo.png',
						price: 1499,
						originalPrice: 1799,
						sales: 340,
						tags: ['特价'],
						specs: ['64GB', '128GB', 'Wi-Fi']
					}
				],
				// 账户管理数据
				accountData: {
					nickname: '张小明',
					avatar: '/static/logo.png',
					phone: '138****5678',
					email: 'zhangxm@example.com',
					hasLoginPassword: true,
					hasPayPassword: true,
					biometricEnabled: true,
					deviceCount: 3
				},
				
				// 会员信息数据
				memberData: {
					nickname: '张小明',
					avatar: '/static/logo.png',
					level: 2,
					levelName: '黄金会员',
					levelDesc: '享受更多专属权益',
					points: 2580,
					totalPoints: 8900
				},
				// 会员权益数据
				memberBenefits: [
					{
						icon: 'gift',
						title: '生日礼包',
						desc: '生日当月可领取专属礼包',
						available: true,
						status: '可领取'
					},
					{
						icon: 'vip',
						title: '专属客服',
						desc: '享受1对1专属客服服务',
						available: true,
						status: '已开通'
					},
					{
						icon: 'heart',
						title: '积分翻倍',
						desc: '消费积分获得翻倍奖励',
						available: true,
						status: '已享受'
					},
					{
						icon: 'wallet',
						title: '免费包邮',
						desc: '全场商品免费包邮',
						available: true,
						status: '已享受'
					},
					{
						icon: 'star',
						title: '专属折扣',
						desc: '享受会员专属价格',
						available: false,
						status: '升级解锁'
					}
				],
				// 积分兑换列表
				exchangeList: [
					{
						id: 1,
						title: '10元优惠券',
						desc: '全场通用，无门槛使用',
						points: 1000,
						image: '/static/logo.png'
					},
					{
						id: 2,
						title: '20元优惠券',
						desc: '满100元可用',
						points: 1800,
						image: '/static/logo.png'
					},
					{
						id: 3,
						title: '50元优惠券',
						desc: '满300元可用',
						points: 4500,
						image: '/static/logo.png'
					},
					{
						id: 4,
						title: '精美礼品',
						desc: '会员专属纪念品',
						points: 3000,
						image: '/static/logo.png'
					}
				],
				// 积分记录
				pointsRecords: [
					{
						title: '每日签到',
						points: 10,
						type: 'earn',
						time: '2024-12-12 09:00'
					},
					{
						title: '购买商品获得积分',
						points: 150,
						type: 'earn',
						time: '2024-12-11 15:30'
					},
					{
						title: '兑换20元优惠券',
						points: 1800,
						type: 'spend',
						time: '2024-12-10 14:20'
					},
					{
						title: '邀请好友注册',
						points: 200,
						type: 'earn',
						time: '2024-12-09 11:45'
					},
					{
						title: '完善个人资料',
						points: 50,
						type: 'earn',
						time: '2024-12-08 16:15'
					},
					{
						title: '分享商品获得积分',
						points: 20,
						type: 'earn',
						time: '2024-12-07 10:30'
					}
				],
				
				// 评价系统相关数据
				ratingTargetId: 'product_demo_001',
				
				// 收藏列表数据
				favoriteList: [
					{
						id: 'fav_001',
						title: 'iPhone 15 Pro 钛金属',
						description: '强得离谱，全新A17 Pro芯片，钛金属设计',
						image: '/static/logo.png',
						price: 8999,
						originalPrice: 9999,
						category: '数码',
						categoryId: 'electronics',
						favoriteTime: '2024-12-12 14:30:00'
					},
					{
						id: 'fav_002',
						title: 'MacBook Pro 14英寸',
						description: 'M3芯片，专业性能，创意无限',
						image: '/static/logo.png',
						price: 14999,
						originalPrice: 16999,
						category: '数码',
						categoryId: 'electronics',
						favoriteTime: '2024-12-11 16:20:00'
					},
					{
						id: 'fav_003',
						title: 'AirPods Pro 第二代',
						description: '个人空间音频，自适应透明度',
						image: '/static/logo.png',
						price: 1899,
						originalPrice: 2399,
						category: '数码',
						categoryId: 'electronics',
						favoriteTime: '2024-12-10 12:15:00'
					},
					{
						id: 'fav_004',
						title: '时尚休闲连衣裙',
						description: '舒适面料，优雅设计，适合多种场合',
						image: '/static/logo.png',
						price: 299,
						originalPrice: 399,
						category: '服装',
						categoryId: 'clothing',
						favoriteTime: '2024-12-09 20:30:00'
					},
					{
						id: 'fav_005',
						title: 'JavaScript高级程序设计',
						description: '前端开发必读经典，深入浅出讲解JS核心',
						image: '/static/logo.png',
						price: 89,
						originalPrice: 129,
						category: '图书',
						categoryId: 'books',
						favoriteTime: '2024-12-08 09:45:00'
					},
					{
						id: 'fav_006',
						title: '有机蔬菜礼盒',
						description: '新鲜采摘，绿色健康，营养丰富',
						image: '/static/logo.png',
						price: 168,
						originalPrice: 198,
						category: '食品',
						categoryId: 'food',
						favoriteTime: '2024-12-07 15:20:00'
					}
				],
				
				// 收藏分类
				favoriteCategories: [
					{ id: 'all', name: '全部' },
					{ id: 'electronics', name: '数码产品' },
					{ id: 'clothing', name: '服装鞋帽' },
					{ id: 'books', name: '图书音像' },
					{ id: 'food', name: '食品饮料' },
					{ id: 'home', name: '家居用品' }
				],
				
				initialReviews: [
					{
						id: 'review_001',
						username: '张小明',
						avatar: '/static/logo.png',
						rating: 5,
						content: '非常满意！质量很好，物流也很快，客服态度也很好。包装很仔细，没有任何损坏。性价比很高，推荐大家购买！这是我买过的最棒的产品之一。',
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
								id: 'reply_001',
								username: '商家',
								content: '感谢您的好评！我们会继续努力提供更好的产品和服务。',
								date: '2024-12-12 15:00:00'
							},
							{
								id: 'reply_002',
								username: '其他用户',
								content: '我也买了同款，确实不错！',
								date: '2024-12-12 16:00:00'
							}
						]
					},
					{
						id: 'review_002',
						username: '李小花',
						avatar: '/static/logo.png',
						rating: 4,
						content: '整体还不错，就是颜色和图片稍微有点差异，不过质量还是很好的。发货速度很快，包装也很严实。客服回复很及时。',
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
						id: 'review_003',
						username: '王大锤',
						avatar: '/static/logo.png',
						rating: 5,
						content: '很棒的产品！用了一段时间了，质量确实不错。推荐给朋友了，他们也说很好用。会回购的！下次还会选择这个品牌。',
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
						id: 'review_004',
						username: '赵小美',
						avatar: '/static/logo.png',
						rating: 3,
						content: '一般般吧，没有预期的那么好。价格还可以，但是质量感觉不太好。客服态度还不错，处理问题比较及时。',
						date: '2024-12-09 09:15:00',
						media: [],
						likeCount: 2,
						isLiked: false,
						replyCount: 2,
						replies: []
					},
					{
						id: 'review_005',
						username: '刘大军',
						avatar: '/static/logo.png',
						rating: 5,
						content: '超级满意！比想象中的还要好，质量非常棒，做工精细。物流也很快，包装很好。强烈推荐！',
						date: '2024-12-08 20:30:00',
						media: [
							{ type: 'image', url: '/static/logo.png' },
							{ type: 'image', url: '/static/logo.png' },
							{ type: 'image', url: '/static/logo.png' }
						],
						likeCount: 20,
						isLiked: false,
						replyCount: 4,
						replies: []
					}
				],
				
				// List Group 组件示例数据
				listGroupData: [
					{
						id: 'lg_001',
						title: '用户管理',
						description: '管理系统用户，包括用户注册、权限分配等',
						icon: '👤',
						iconColor: '#007aff',
						badge: {
							type: 'primary',
							text: '管理'
						},
						status: 'active',
						statusText: '启用中'
					},
					{
						id: 'lg_002',
						title: '订单系统',
						description: '处理用户订单，包括订单创建、支付、发货等流程',
						icon: '📋',
						iconColor: '#28a745',
						price: 1299.00,
						tags: ['热门', '必备'],
						actions: [
							{ key: 'view', text: '查看', type: 'primary' },
							{ key: 'edit', text: '编辑', type: 'default' }
						]
					},
					{
						id: 'lg_003',
						title: '数据统计',
						description: '系统数据分析和报表展示',
						icon: '📊',
						iconColor: '#17a2b8',
						badge: {
							type: 'info',
							text: '新功能'
						}
					},
					{
						id: 'lg_004',
						title: '消息通知',
						description: '系统消息推送和通知管理',
						icon: '📢',
						iconColor: '#ffc107',
						badge: {
							type: 'warning',
							text: '5条未读'
						},
						status: 'warning',
						statusText: '待处理'
					},
					{
						id: 'lg_005',
						title: '已禁用功能',
						description: '此功能暂时不可用',
						icon: '🚫',
						iconColor: '#dc3545',
						disabled: true,
						status: 'danger',
						statusText: '已禁用'
					}
				],
				
				// 用户列表数据
				userListData: [
					{
						id: 'user_001',
						title: '张小明',
						description: '前端开发工程师 • 在线',
						avatar: '/static/logo.png',
						badge: {
							type: 'success',
							text: '在线'
						},
						tags: ['管理员', 'VIP']
					},
					{
						id: 'user_002',
						title: '李华',
						description: '产品经理 • 30分钟前活跃',
						avatar: '/static/logo.png',
						badge: {
							type: 'warning',
							text: '离开'
						}
					},
					{
						id: 'user_003',
						title: '王芳',
						description: 'UI设计师 • 2小时前活跃',
						avatar: '/static/logo.png',
						badge: {
							type: 'danger',
							text: '离线'
						}
					}
				],
				
				// 商品分类数据
				categoryListData: [
					{
						id: 'cat_001',
						title: '数码产品',
						description: '手机、电脑、相机等数码设备',
						icon: '📱',
						iconColor: '#007aff',
						price: 2999,
						tags: ['热销']
					},
					{
						id: 'cat_002',
						title: '服装鞋帽',
						description: '时尚服装、鞋子、配饰等',
						icon: '👗',
						iconColor: '#ff69b4',
						price: 299,
						badge: {
							type: 'danger',
							text: '折扣'
						}
					},
					{
						id: 'cat_003',
						title: '家居用品',
						description: '家具、装饰、生活用品等',
						icon: '🏠',
						iconColor: '#28a745',
						price: 599
					}
				],
				
				// 选中的列表项
				selectedListItems: [],
				
				// 客服组件帮助列表
				customerServiceHelpList: [
					{ title: '常见问题', icon: 'help', url: '/pages/help/faq' },
					{ title: '使用指南', icon: 'book', url: '/pages/help/guide' },
					{ title: '意见反馈', icon: 'compose', url: '/pages/help/feedback' },
					{ title: '联系我们', icon: 'contact', url: '/pages/help/contact' },
					{ title: '服务条款', icon: 'list', url: '/pages/help/terms' }
				],
				
				// 会员卡权益数据
				bronzeBenefits: [
					{ icon: 'gift', text: '生日礼包', color: '#CD7F32' },
					{ icon: 'heart', text: '积分奖励', color: '#ff6b35' }
				],
				goldBenefits: [
					{ icon: 'gift', text: '生日礼包', color: '#FFD700' },
					{ icon: 'vip', text: '专属客服', color: '#ffa726' },
					{ icon: 'heart', text: '积分翻倍', color: '#42a5f5' }
				],
				diamondBenefits: [
					{ icon: 'gift', text: '专属礼遇', color: '#B9F2FF' },
					{ icon: 'vip', text: '专属管家', color: '#87CEEB' },
					{ icon: 'star', text: '无限特权', color: '#4FC3F7' }
				],
				
				// 预约组件示例数据
				appointmentSlots: [
					{ startTime: '09:00', endTime: '10:00', maxCount: 3 },
					{ startTime: '10:00', endTime: '11:00', maxCount: 3 },
					{ startTime: '11:00', endTime: '12:00', maxCount: 2 },
					{ startTime: '14:00', endTime: '15:00', maxCount: 5 },
					{ startTime: '15:00', endTime: '16:00', maxCount: 5 },
					{ startTime: '16:00', endTime: '17:00', maxCount: 3 }
				]
			}
		},
		onLoad() {

		},
		methods: {
			// TabBar 组件事件处理
			onBasicTabChange(data) {
				console.log('基础导航栏切换:', data);
				this.currentBasicTab = data.index;
				uni.showToast({
					title: `切换到: ${data.item.text}`,
					icon: 'none',
					duration: 1500
				});
			},
			
			onCustomTabChange(data) {
				console.log('自定义样式导航栏切换:', data);
				this.currentCustomTab = data.index;
				uni.showToast({
					title: `切换到: ${data.item.text}`,
					icon: 'none',
					duration: 1500
				});
			},
			
			onBadgeTabChange(data) {
				console.log('带徽章导航栏切换:', data);
				this.currentBadgeTab = data.index;
				uni.showToast({
					title: `切换到: ${data.item.text}`,
					icon: 'none',
					duration: 1500
				});
				
				// 模拟清除徽章
				if (data.item.badge && data.item.badge.count > 0) {
					setTimeout(() => {
						if (data.item.badge.count > 0) {
							data.item.badge.count = Math.max(0, data.item.badge.count - 1);
						}
					}, 1000);
				}
			},
			
			onIconOnlyTabChange(data) {
				console.log('仅图标导航栏切换:', data);
				this.currentIconOnlyTab = data.index;
				uni.showToast({
					title: `切换到第${data.index + 1}个标签页`,
					icon: 'none',
					duration: 1500
				});
			},
			
			onImageTabChange(data) {
				console.log('图片图标导航栏切换:', data);
				this.currentImageTab = data.index;
				uni.showToast({
					title: `切换到: ${data.item.text}`,
					icon: 'none',
					duration: 1500
				});
			},
			
			// 顶部海报组件事件处理
			onBannerTopClick(data) {
				const { banner, index } = data;
				console.log('点击海报:', banner, '索引:', index);
				uni.showModal({
					title: '海报详情',
					content: `${banner.title || '海报'}\n${banner.subtitle || ''}`,
					confirmText: '立即查看',
					cancelText: '取消',
					success: (res) => {
						if (res.confirm && banner.link) {
							console.log('跳转到页面:', banner.link);
							// 可以在这里添加页面跳转逻辑
						}
					}
				});
			},
			
			onBannerTopChange(data) {
				const { current, banner } = data;
				console.log('海报切换到:', current, banner);
			},
			
			onBannerQuickEntryClick(data) {
				const { entry, index } = data;
				console.log('点击快捷入口:', entry, '索引:', index);
				uni.showToast({
					title: `打开${entry.title}`,
					icon: 'success'
				});
				if (entry.link) {
					console.log('跳转到:', entry.link);
					// 这里可以添加页面跳转逻辑
				}
			},
			
			onBannerNoticeClick(data) {
				const { notice, index } = data;
				console.log('点击公告:', notice, '索引:', index);
				uni.showModal({
					title: '公告详情',
					content: notice.content,
					showCancel: false,
					confirmText: '我知道了',
					success: () => {
						if (notice.link) {
							console.log('跳转到:', notice.link);
						}
					}
				});
			},
			
			onBannerMoreNotice() {
				console.log('查看更多公告');
				uni.showToast({
					title: '查看更多公告',
					icon: 'none'
				});
			},
			
			// 业务入口矩阵点击事件处理
			onBusinessMatrixClick({ item, index }) {
				console.log('点击了业务入口：', item.name, '索引：', index)
				
				// 显示提示信息
				uni.showToast({
					title: `点击了：${item.name}`,
					icon: 'none',
					duration: 1500
				})
				
				// 如果配置了跳转地址且页面存在，则跳转
				if (item.url) {
					// 检查是否为演示页面
					const demoPages = [
						'/pages/activity-demo/activity-demo',
						'/pages/coupon-demo/coupon-demo', 
						'/pages/member-demo/member-demo',
						'/pages/favorite-demo/favorite-demo'
					]
					
					if (demoPages.includes(item.url)) {
						uni.navigateTo({
							url: item.url,
							fail: (err) => {
								console.log('跳转失败：', err)
								uni.showModal({
									title: '页面跳转',
									content: `${item.name} 功能演示页面`,
									showCancel: false
								})
							}
						})
					} else {
						// 其他页面显示提示
						uni.showModal({
							title: '功能入口',
							content: `${item.name} 功能正在开发中，敬请期待！`,
							showCancel: false
						})
					}
				}
			},
			
			// 活动组件相关事件处理
			onActivityNoticeClick(data) {
				const { notice } = data;
				console.log('点击公告:', notice);
				uni.showModal({
					title: '公告详情',
					content: notice.content,
					showCancel: false,
					confirmText: '我知道了',
					success: () => {
						if (notice.link) {
							// 如果有链接，可以跳转到相应页面
							console.log('跳转到:', notice.link);
						}
					}
				});
			},
			
			onActivityMoreNotice() {
				uni.showToast({
					title: '查看更多公告',
					icon: 'none'
				});
				// 这里可以跳转到公告列表页面
			},
			
			onActivityBannerClick(data) {
				const { banner } = data;
				console.log('点击轮播图:', banner);
				uni.showModal({
					title: '活动详情',
					content: `${banner.title}\n${banner.subtitle || ''}`,
					confirmText: '立即参与',
					cancelText: '稍后再说',
					success: (res) => {
						if (res.confirm && banner.link) {
							console.log('跳转到活动页面:', banner.link);
							// 这里可以跳转到活动详情页面
						}
					}
				});
			},
			
			onActivityBannerChange(detail) {
				console.log('轮播图切换到:', detail.current);
			},
			
			onActivityQuickEntryClick(data) {
				const { entry } = data;
				console.log('点击快捷入口:', entry);
				uni.showToast({
					title: `进入${entry.title}`,
					icon: 'success'
				});
				// 这里可以根据entry.link跳转到相应页面
				if (entry.link) {
					console.log('跳转到:', entry.link);
				}
			},
			
			// 优惠券相关事件处理
			onReceiveCoupon(couponData) {
				console.log('领取优惠券:', couponData);
				uni.showModal({
					title: '领取成功',
					content: `成功领取${couponData.title}！`,
					showCancel: false,
					confirmText: '好的',
					success: () => {
						// 这里可以添加领取后的逻辑，比如更新优惠券状态
						// 模拟将优惠券状态改为未使用
						if (couponData.id === this.availableCoupon.id) {
							this.availableCoupon.status = 'unused';
						}
					}
				});
			},
			
			// 订单相关事件处理
			onOrderClick(_orderData) {
				// 处理订单点击事件
				uni.showToast({
					title: '点击了订单',
					icon: 'none'
				});
			},
			onPay(_orderData) {
				uni.showToast({
					title: '跳转到支付页面',
					icon: 'success'
				});
			},
			onCancel(_orderData) {
				uni.showModal({
					title: '取消订单',
					content: '确定要取消这个订单吗？',
					success: (res) => {
						if (res.confirm) {
							uni.showToast({
								title: '订单已取消',
								icon: 'success'
							});
						}
					}
				});
			},
			onConfirm(_orderData) {
				uni.showModal({
					title: '确认收货',
					content: '确定已收到商品吗？',
					success: (res) => {
						if (res.confirm) {
							uni.showToast({
								title: '确认收货成功',
								icon: 'success'
							});
						}
					}
				});
			},
			onEvaluate(_orderData) {
				uni.showToast({
					title: '跳转到评价页面',
					icon: 'success'
				});
			},
			onLogistics(_orderData) {
				uni.showToast({
					title: '查看物流信息',
					icon: 'success'
				});
			},
			onDetail(_orderData) {
				uni.showToast({
					title: '查看订单详情',
					icon: 'success'
				});
			},
			onRemind(_orderData) {
				uni.showToast({
					title: '已提醒商家发货',
					icon: 'success'
				});
			},
			onRebuy(_orderData) {
				uni.showToast({
					title: '重新下单',
					icon: 'success'
				});
			},
			
			// 卡片事件处理
			onCardClick(cardType) {
				uni.showToast({
					title: `点击了${cardType}`,
					icon: 'none'
				});
			},
			// 点赞操作
			onLike() {
				uni.showToast({
					title: '点赞成功',
					icon: 'success'
				});
			},
			// 分享操作
			onShare() {
				uni.showToast({
					title: '分享成功',
					icon: 'success'
				});
			},
			
			// 收藏相关事件处理
			onRemoveFavorite(item) {
				console.log('取消收藏:', item);
				// 从收藏列表中移除
				const index = this.favoriteList.findIndex(fav => fav.id === item.id);
				if (index > -1) {
					this.favoriteList.splice(index, 1);
					uni.showToast({
						title: '已取消收藏',
						icon: 'success'
					});
				}
			},
			
			onBatchRemoveFavorite(itemIds) {
				console.log('批量删除收藏:', itemIds);
				// 批量删除收藏
				this.favoriteList = this.favoriteList.filter(item => !itemIds.includes(item.id));
				uni.showToast({
					title: `已删除${itemIds.length}个收藏`,
					icon: 'success'
				});
			},
			
			onViewFavoriteProduct(item) {
				console.log('查看收藏的商品:', item);
				uni.showModal({
					title: '查看商品',
					content: `即将查看商品：${item.title}`,
					confirmText: '立即查看',
					cancelText: '稍后再看',
					success: (res) => {
						if (res.confirm) {
							// 这里可以跳转到商品详情页
							uni.showToast({
								title: '跳转到商品详情',
								icon: 'success'
							});
						}
					}
				});
			},
			
			onFavoriteItemClick(item) {
				console.log('点击收藏商品:', item);
				// 默认行为同 onViewFavoriteProduct
				this.onViewFavoriteProduct(item);
			},
			
			onBrowseProducts() {
				console.log('去逛逛商品');
				uni.showToast({
					title: '跳转到商品列表',
					icon: 'success'
				});
				// 这里可以跳转到商品列表页面
			},
			
			onFavoriteLayoutChange(layout) {
				console.log('收藏列表布局变化:', layout);
				uni.showToast({
					title: `切换到${layout === 'grid' ? '网格' : '列表'}布局`,
					icon: 'none'
				});
			},
			
			// 客服组件相关事件处理
			onCustomerServiceOnline(data) {
				console.log('在线客服点击:', data);
				uni.showToast({
					title: '正在为您接入客服...',
					icon: 'loading',
					duration: 2000
				});
			},
			
			onCustomerServicePhone(data) {
				console.log('电话客服点击:', data);
			},
			
			onCustomerServiceEmail(data) {
				console.log('邮件联系点击:', data);
			},
			
			onCustomerServiceWechat(data) {
				console.log('微信客服点击:', data);
			},
			
			onCustomerServiceHelp(item) {
				console.log('帮助项点击:', item);
				uni.showToast({
					title: `查看${item.title}`,
					icon: 'none'
				});
			},
			
			onCustomerServiceMoreHelp() {
				console.log('查看更多帮助');
				uni.showToast({
					title: '跳转到帮助中心',
					icon: 'none'
				});
			},
			
			onFloatServiceClick() {
				console.log('浮动客服按钮点击');
				uni.showToast({
					title: '客服暂时离线',
					icon: 'none'
				});
			},
			
			// 收藏操作
			onCollect() {
				uni.showToast({
					title: '收藏成功',
					icon: 'success'
				});
			},
			
			// List Group 相关事件处理
			onListGroupItemClick(data) {
				console.log('List Group 项被点击:', data);
				uni.showToast({
					title: `点击了: ${data.item.title}`,
					icon: 'none',
					duration: 1500
				});
			},
			
			onListGroupActionClick(data) {
				console.log('List Group 操作按钮被点击:', data);
				uni.showToast({
					title: `${data.action.text}: ${data.item.title}`,
					icon: 'none',
					duration: 1500
				});
			},
			
			onListGroupSelectionChange(selectedItems) {
				console.log('List Group 选择变化:', selectedItems);
				this.selectedListItems = selectedItems;
				uni.showToast({
					title: `已选择 ${selectedItems.length} 项`,
					icon: 'none',
					duration: 1000
				});
			},
			
			// 地址管理相关事件处理
			onAddAddress() {
				uni.showToast({
					title: '添加新地址',
					icon: 'success'
				});
			},
			onEditAddress(address) {
				uni.showToast({
					title: `编辑地址: ${address.consigneeName}`,
					icon: 'none'
				});
			},
			onDeleteAddress(_addressId) {
				uni.showModal({
					title: '删除地址',
					content: '确定要删除这个地址吗？',
					success: (res) => {
						if (res.confirm) {
							uni.showToast({
								title: '地址已删除',
								icon: 'success'
							});
						}
					}
				});
			},
			onSetDefaultAddress(_addressId) {
				uni.showToast({
					title: '设为默认地址成功',
					icon: 'success'
				});
			},
			
			// 商品相关事件处理
			onProductClick(product) {
				uni.showModal({
					title: '商品详情',
					content: `点击了商品: ${product.title}`,
					showCancel: false,
					confirmText: '好的'
				});
			},
			onAddToCart(product) {
				uni.showToast({
					title: `已将 ${product.title} 加入购物车`,
					icon: 'success',
					duration: 2000
				});
			},
			onBuyNow(product) {
				uni.showModal({
					title: '立即购买',
					content: `确定购买 ${product.title} 吗？`,
					success: (res) => {
						if (res.confirm) {
							uni.showToast({
								title: '跳转到结算页面',
								icon: 'success'
							});
						}
					}
				});
			},
			
			// 账户管理相关事件处理
			onAvatarChange(newAvatar) {
				console.log('头像更改:', newAvatar);
				this.accountData.avatar = newAvatar;
				// 这里可以调用API上传头像
			},
			
			onNicknameChange(newNickname) {
				console.log('昵称更改:', newNickname);
				this.accountData.nickname = newNickname;
				// 这里可以调用API更新昵称
			},
			
			onPhoneChange() {
				uni.showToast({
					title: '跳转到手机号修改页面',
					icon: 'none'
				});
			},
			
			onEmailChange() {
				uni.showToast({
					title: '跳转到邮箱修改页面',
					icon: 'none'
				});
			},
			
			onPasswordChange(passwordData) {
				console.log('密码更改:', passwordData);
				// 这里可以调用API修改密码
				if (passwordData.type === 'login') {
					this.accountData.hasLoginPassword = true;
				} else if (passwordData.type === 'pay') {
					this.accountData.hasPayPassword = true;
				}
			},
			
			onBiometricToggle(enabled) {
				console.log('生物识别切换:', enabled);
				this.accountData.biometricEnabled = enabled;
			},
			
			onDeviceManagement() {
				uni.showToast({
					title: '跳转到设备管理页面',
					icon: 'none'
				});
			},
			
			onLoginLog() {
				uni.showToast({
					title: '跳转到登录日志页面',
					icon: 'none'
				});
			},
			
			onAccountDelete() {
				uni.showModal({
					title: '账号注销确认',
					content: '您的账号注销申请已提交，我们会在7个工作日内处理。',
					showCancel: false,
					confirmText: '我知道了'
				});
			},
			
			// 会员中心相关事件处理
			onExchange(item) {
				console.log('兑换商品:', item);
				// 模拟兑换成功，扣除积分
				if (this.memberData.points >= item.points) {
					this.memberData.points -= item.points;
					// 添加一条消费记录
					this.pointsRecords.unshift({
						title: `兑换${item.title}`,
						points: item.points,
						type: 'spend',
						time: new Date().toLocaleString('zh-CN', {
							year: 'numeric',
							month: '2-digit',
							day: '2-digit',
							hour: '2-digit',
							minute: '2-digit'
						}).replace(/\//g, '-')
					});
				}
			},
			onExchangeItemClick(item) {
				uni.showModal({
					title: '商品详情',
					content: `${item.title}\n${item.desc}\n需要积分: ${item.points}`,
					showCancel: false,
					confirmText: '我知道了'
				});
			},
			onViewMoreExchange() {
				uni.showToast({
					title: '跳转到积分商城',
					icon: 'success'
				});
			},
			onViewMoreRecord() {
				uni.showToast({
					title: '查看完整积分记录',
					icon: 'success'
				});
			},
			
			// 评价系统相关事件处理
			onSubmitReview(reviewData) {
				console.log('提交评价:', reviewData);
				// 这里应该调用API提交评价到服务器
				uni.showToast({
					title: '评价提交成功，感谢您的反馈！',
					icon: 'success',
					duration: 2000
				});
			},
			
			onReviewLike(likeData) {
				console.log('点赞操作:', likeData);
				// 这里应该调用API更新点赞状态
				uni.showToast({
					title: likeData.isLiked ? '点赞成功' : '取消点赞',
					icon: 'success'
				});
			},
			
			onReviewReply(replyData) {
				console.log('回复评价:', replyData);
				// 这里应该调用API提交回复
				uni.showToast({
					title: '回复发送成功',
					icon: 'success'
				});
			},
			
			onLoadMoreReviews() {
				console.log('加载更多评价');
				// 这里应该调用API加载更多评价数据
				uni.showToast({
					title: '正在加载更多评价...',
					icon: 'loading'
				});
				
				// 模拟异步加载
				setTimeout(() => {
					uni.showToast({
						title: '加载完成',
						icon: 'success'
					});
				}, 1500);
			},
			
			onLoadMoreReplies(reviewId) {
				console.log('加载更多回复:', reviewId);
				// 这里应该调用API加载指定评价的更多回复
				uni.showToast({
					title: '正在加载更多回复...',
					icon: 'loading'
				});
			},
			
			// 会员卡相关事件处理
			onMembershipUpgrade() {
				console.log('升级会员');
				uni.showToast({
					title: '跳转到会员升级页面',
					icon: 'none',
					duration: 2000
				});
				// 这里可以跳转到会员升级页面
				// uni.navigateTo({
				//     url: '/pages/membership/upgrade'
				// });
			},
			
			onMembershipViewDetails() {
				console.log('查看会员详情');
				uni.showToast({
					title: '查看会员详情',
					icon: 'none',
					duration: 2000
				});
				// 这里可以跳转到会员详情页面
				// uni.navigateTo({
				//     url: '/pages/membership/details'
				// });
			},
			
			// 预约组件相关方法
			onAppointmentSuccess(appointment) {
				console.log('预约成功:', appointment);
				uni.showToast({
					title: '预约成功！',
					icon: 'success',
					duration: 2000
				});
			},
			onAppointmentCancel(appointment) {
				console.log('取消预约:', appointment);
				uni.showToast({
					title: '预约已取消',
					icon: 'none',
					duration: 1500
				});
			},
			onAppointmentDateSelect(date) {
				console.log('选择日期:', date);
			},
			onAppointmentSlotSelect(slot) {
				console.log('选择时间段:', slot);
			},
			goToAppointmentDemo() {
				console.log('跳转到预约示例页面');
				uni.navigateTo({
					url: '/pages/appointment-demo/appointment-demo'
				});
			},
			
			// 页面骨架组件相关方法
			goToSkeletonDemo() {
				console.log('跳转到页面骨架示例页面');
				uni.navigateTo({
					url: '/pages/skeleton-demo/skeleton-demo',
					success: () => {
						console.log('成功跳转到页面骨架示例');
					},
					fail: (err) => {
						console.error('跳转失败:', err);
						uni.showToast({
							title: '页面跳转失败',
							icon: 'error'
						});
					}
				});
			},
			
			viewSkeletonDocs() {
				console.log('查看页面骨架组件文档');
				uni.showModal({
					title: '组件文档',
					content: '页面骨架组件支持4种布局模式：\n\n• normal - 普通布局\n• sidebar - 侧边栏布局\n• tab - 标签页布局\n• flow - 流式布局\n\n提供12个命名插槽，支持高度自定义。详细文档请查看组件README。',
					confirmText: '体验示例',
					cancelText: '我知道了',
					success: (res) => {
						if (res.confirm) {
							this.goToSkeletonDemo();
						}
					}
				});
			}
		}
	};
</script>

<style lang="scss">
	.content {
		padding: 20rpx;
		background-color: #f5f5f5;
		min-height: 100vh;
	}
	
	.page-title {
		text-align: center;
		margin-bottom: 40rpx;
		padding: 20rpx 0;
	}

	.title {
		font-size: 36rpx;
		font-weight: 600;
		color: #303133;
	}
	
	.order-list {
		margin-bottom: 40rpx;
	}
	
	.divider {
		text-align: center;
		margin: 60rpx 0 40rpx;
		position: relative;
		
		&::before {
			content: '';
			position: absolute;
			top: 50%;
			left: 0;
			right: 0;
			height: 1rpx;
			background-color: #E4E7ED;
		}
	}
	
	.divider-text {
		background-color: #f5f5f5;
		padding: 0 32rpx;
		font-size: 28rpx;
		color: #909399;
	}
	
	.card-actions {
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 16rpx 0;
	}
	
	.action-btn {
		flex: 1;
		margin: 0 8rpx;
		font-size: 24rpx;
	}
	
	/* 优惠券列表样式 */
	.coupon-list {
		margin-bottom: 40rpx;
	}
	
	/* 通用section样式 */
	.section {
		margin-bottom: 60rpx;
		background-color: #fff;
		border-radius: 16rpx;
		padding: 32rpx 24rpx;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
	}
	
	.section-title {
		margin-bottom: 32rpx;
		text-align: center;
	}
	
	.section-text {
		font-size: 32rpx;
		font-weight: bold;
		color: #303133;
		position: relative;
		
		&::after {
			content: '';
			position: absolute;
			bottom: -12rpx;
			left: 50%;
			transform: translateX(-50%);
			width: 60rpx;
			height: 6rpx;
			background: linear-gradient(135deg, #667eea, #764ba2);
			border-radius: 3rpx;
		}
	}
	
	/* 预约组件样式 */
	.appointment-actions {
		text-align: center;
		margin-top: 40rpx;
		padding-top: 30rpx;
		border-top: 1rpx solid #eee;
	}
	
	.demo-btn {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		border: none;
		border-radius: 50rpx;
		font-size: 28rpx;
		font-weight: 600;
		padding: 24rpx 48rpx;
		min-width: 300rpx;
		transition: all 0.3s ease;
		
		&:active {
			transform: scale(0.98);
			opacity: 0.9;
		}
		
		&::after {
			border: none;
		}
	}
	
	/* TabBar 组件示例样式 */
	.tab-demo-container {
		margin-bottom: 40rpx;
		
		&:last-child {
			margin-bottom: 0;
		}
	}
	
	.demo-title {
		margin-bottom: 20rpx;
		text-align: center;
	}
	
	.demo-title-text {
		font-size: 28rpx;
		font-weight: 600;
		color: #333333;
		position: relative;
		
		&::before,
		&::after {
			content: '';
			position: absolute;
			top: 50%;
			width: 60rpx;
			height: 2rpx;
			background-color: #e0e0e0;
		}
		
		&::before {
			right: 100%;
			margin-right: 20rpx;
		}
		
		&::after {
			left: 100%;
			margin-left: 20rpx;
		}
	}
	
	.demo-wrapper {
		position: relative;
		border: 2rpx solid #f0f0f0;
		border-radius: 16rpx;
		overflow: hidden;
		background-color: #fafafa;
		min-height: 120rpx;
		padding-bottom: 20rpx;
	}
</style>
