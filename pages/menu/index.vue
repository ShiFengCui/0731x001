<template>
	<view class="menu-page">
		<page-skeleton title="点餐" :show-header="true">
			<!-- 商品分类 -->
			<view class="category-section">
				<list-group
					title="商品分类"
					:items="categoryList"
					type="default"
					@item-click="onCategoryClick"
				/>
			</view>
			
			<!-- 商品列表 -->
			<view class="product-section">
				<product-list
					:product-list="currentProducts"
					:title="currentCategoryName"
					layout="single"
					@productClick="onProductClick"
					@addToCart="onAddToCart"
					@buyNow="onBuyNow"
				/>
			</view>
			
			<!-- 底部导航栏 -->
			<tab-bar 
				:tab-list="tabBarList" 
				:current="1"
				active-color="#00B578"
				@change="onTabChange"
			/>
		</page-skeleton>
	</view>
</template>

<script>
	import PageSkeleton from '@/components/page-skeleton/page-skeleton.vue'
	import ListGroup from '@/components/list-group/list-group.vue'
	import ProductList from '@/components/product-component/product-list.vue'
	import TabBar from '@/components/tab-bar/tab-bar.vue'
	
	export default {
		name: 'MenuPage',
		components: {
			PageSkeleton,
			ListGroup,
			ProductList,
			TabBar
		},
		data() {
			return {
				currentCategory: 'coffee',
				categoryList: [
					{
						id: 'coffee',
						title: '咖啡',
						description: '精选咖啡豆，匠心制作',
						icon: '/static/icons/coffee.png'
					},
					{
						id: 'tea',
						title: '茶饮',
						description: '清香茶叶，回味甘甜',
						icon: '/static/icons/tea.png'
					},
					{
						id: 'light',
						title: '轻食',
						description: '健康美味，营养搭配',
						icon: '/static/icons/food.png'
					},
					{
						id: 'dessert',
						title: '甜品',
						description: '精致甜品，甜蜜时光',
						icon: '/static/icons/dessert.png'
					}
				],
				// 所有商品数据
				allProducts: {
					coffee: [
						{
							id: 101,
							name: '美式咖啡',
							image: '/static/products/americano.jpg',
							price: '18.00',
							description: '经典美式，香醇浓郁',
							tags: ['经典'],
							salesCount: 856
						},
						{
							id: 102,
							name: '拿铁咖啡',
							image: '/static/products/latte.jpg',
							price: '25.00',
							description: '丝滑奶泡，咖啡香浓',
							tags: ['热销'],
							salesCount: 1245
						}
					],
					tea: [
						{
							id: 201,
							name: '柠檬蜂蜜茶',
							image: '/static/products/lemon-tea.jpg',
							price: '22.00',
							description: '清香柠檬，甜蜜蜂蜜',
							tags: ['推荐'],
							salesCount: 632
						}
					],
					light: [
						{
							id: 301,
							name: '全麦三明治',
							image: '/static/products/sandwich.jpg',
							price: '28.00',
							description: '全麦面包，营养健康',
							tags: ['健康'],
							salesCount: 423
						}
					],
					dessert: [
						{
							id: 401,
							name: '提拉米苏',
							image: '/static/products/tiramisu.jpg',
							price: '35.00',
							description: '意式经典，层次丰富',
							tags: ['经典'],
							salesCount: 267
						}
					]
				},
				tabBarList: [
					{
						id: 'home',
						text: '首页',
						icon: 'home',
						pagePath: '/pages/luckin-home/luckin-home'
					},
					{
						id: 'menu',
						text: '点餐',
						icon: 'shop',
						pagePath: '/pages/menu/index'
					},
					{
						id: 'order',
						text: '订单',
						icon: 'list',
						pagePath: '/pages/order/list'
					},
					{
						id: 'member',
						text: '会员',
						icon: 'person',
						pagePath: '/pages/member/center'
					},
					{
						id: 'profile',
						text: '我的',
						icon: 'person-filled',
						pagePath: '/pages/profile/index'
					}
				]
			}
		},
		computed: {
			currentProducts() {
				return this.allProducts[this.currentCategory] || []
			},
			currentCategoryName() {
				const category = this.categoryList.find(item => item.id === this.currentCategory)
				return category ? category.title : '商品'
			}
		},
		methods: {
			onCategoryClick(category) {
				this.currentCategory = category.id
			},
			onProductClick(product) {
				uni.navigateTo({
					url: `/pages/product/detail?id=${product.id}`
				})
			},
			onAddToCart(product) {
				uni.showToast({
					title: '已加入购物车',
					icon: 'success'
				})
			},
			onBuyNow(product) {
				uni.navigateTo({
					url: `/pages/order/confirm?productId=${product.id}`
				})
			},
			onTabChange(tab) {
				if (tab.item.pagePath) {
					uni.switchTab({
						url: tab.item.pagePath
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.menu-page {
		background-color: #f5f5f5;
		min-height: 100vh;
		padding-bottom: 100rpx;
	}
	
	.category-section, .product-section {
		margin-bottom: 20rpx;
		background-color: #ffffff;
	}
</style> 