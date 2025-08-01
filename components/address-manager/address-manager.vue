<template>
	<view class="address-manager">
		<!-- 地址列表 -->
		<view class="address-list" v-if="!showEditForm">
			<view class="list-header">
				<text class="header-title">收货地址</text>
				<button class="add-btn" @click="showAddAddress">
					<text class="add-icon">+</text>
					<text class="add-text">新增地址</text>
				</button>
			</view>
			
			<!-- 地址卡片列表 -->
			<view class="address-cards">
				<view 
					v-for="(address, index) in addressList" 
					:key="address.id || index"
					class="address-card"
					:class="{ 'address-card--default': address.isDefault }"
					@click="onAddressClick(address, index)"
				>
					<!-- 默认标签 -->
					<view v-if="address.isDefault" class="default-tag">
						<text class="default-text">默认</text>
					</view>
					
					<!-- 地址信息 -->
					<view class="address-info">
						<view class="user-info">
							<text class="user-name">{{ address.consigneeName }}</text>
							<text class="user-phone">{{ address.phone }}</text>
						</view>
						<view class="address-detail">
							<text class="address-text">
								{{ address.province }}{{ address.city }}{{ address.district }}{{ address.detailAddress }}
							</text>
						</view>
					</view>
					
					<!-- 操作按钮 -->
					<view class="address-actions">
						<button 
							class="action-btn edit-btn" 
							@click.stop="editAddress(address, index)"
						>
							编辑
						</button>
						<button 
							class="action-btn delete-btn" 
							@click.stop="deleteAddress(address, index)"
						>
							删除
						</button>
						<button 
							v-if="!address.isDefault"
							class="action-btn default-btn" 
							@click.stop="setDefaultAddress(address, index)"
						>
							设为默认
						</button>
					</view>
				</view>
				
				<!-- 空状态 -->
				<view v-if="addressList.length === 0" class="empty-state">
					<view class="empty-icon">📍</view>
					<text class="empty-text">暂无收货地址</text>
					<button class="empty-add-btn" @click="showAddAddress">添加地址</button>
				</view>
			</view>
		</view>
		
		<!-- 地址编辑表单 -->
		<view class="address-form" v-if="showEditForm">
			<view class="form-header">
				<button class="back-btn" @click="hideEditForm">
					<text class="back-text">‹</text>
				</button>
				<text class="form-title">{{ editingAddress.id ? '编辑地址' : '新增地址' }}</text>
				<view class="header-placeholder"></view>
			</view>
			
			<view class="form-content">
				<!-- 收货人信息 -->
				<view class="form-section">
					<view class="form-item">
						<text class="form-label">收货人</text>
						<input 
							class="form-input" 
							v-model="editingAddress.consigneeName"
							placeholder="请输入收货人姓名"
							maxlength="20"
						/>
					</view>
					<view class="form-item">
						<text class="form-label">手机号</text>
						<input 
							class="form-input" 
							v-model="editingAddress.phone"
							placeholder="请输入手机号"
							type="number"
							maxlength="11"
						/>
					</view>
				</view>				
				<!-- 地区选择 -->
				<view class="form-section">
					<view class="form-item" @click="showRegionPicker">
						<text class="form-label">所在地区</text>
						<view class="region-selector">
							<text class="region-text" v-if="regionText">{{ regionText }}</text>
							<text class="region-placeholder" v-else>请选择省市区</text>
							<text class="region-arrow">›</text>
						</view>
					</view>
				</view>
				
				<!-- 详细地址 -->
				<view class="form-section">
					<view class="form-item">
						<text class="form-label">详细地址</text>
						<textarea 
							class="form-textarea" 
							v-model="editingAddress.detailAddress"
							placeholder="请输入详细地址（如道路、门牌号、小区、楼栋号、单元等）"
							maxlength="200"
						/>
					</view>
				</view>
				
				<!-- 默认地址开关 -->
				<view class="form-section">
					<view class="form-item">
						<text class="form-label">设为默认地址</text>
						<switch 
							:checked="editingAddress.isDefault" 
							@change="onDefaultChange"
							color="#007AFF"
						/>
					</view>
				</view>
			</view>
			
			<!-- 保存按钮 -->
			<view class="form-footer">
				<button class="save-btn" @click="saveAddress">保存地址</button>
			</view>
		</view>
		
		<!-- 地区选择器弹窗 -->
		<view v-if="showRegionModal" class="region-modal" @click="hideRegionPicker">
			<view class="region-popup" @click.stop>
				<view class="region-header">
					<button class="region-cancel" @click="hideRegionPicker">取消</button>
					<text class="region-title">选择地区</text>
					<button class="region-confirm" @click="confirmRegion">确定</button>
				</view>
				<view class="region-content">
					<picker-view 
						:value="regionPickerValue" 
						@change="onRegionChange"
						class="region-picker"
					>
						<picker-view-column>
							<view v-for="(province, index) in provinces" :key="index" class="picker-item">
								{{ province.name }}
							</view>
						</picker-view-column>
						<picker-view-column>
							<view v-for="(city, index) in cities" :key="index" class="picker-item">
								{{ city.name }}
							</view>
						</picker-view-column>
						<picker-view-column>
							<view v-for="(district, index) in districts" :key="index" class="picker-item">
								{{ district.name }}
							</view>
						</picker-view-column>
					</picker-view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * AddressManager 收货地址管理组件
	 * @description 完整的收货地址管理功能，包含地址列表、新增、编辑、删除、设置默认等
	 * @property {Array} addressList 地址列表数据
	 * @property {Boolean} allowSelect 是否允许选择地址模式，默认false
	 * @event {Function} select 选择地址时触发（allowSelect为true时）
	 * @event {Function} add 新增地址时触发
	 * @event {Function} edit 编辑地址时触发
	 * @event {Function} delete 删除地址时触发
	 * @event {Function} setDefault 设置默认地址时触发
	 */
	export default {
		name: 'AddressManager',
		emits: ['select', 'add', 'edit', 'delete', 'setDefault'],
		props: {
			// 地址列表
			addressList: {
				type: Array,
				default: () => []
			},
			// 是否允许选择地址模式
			allowSelect: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				showEditForm: false,
				showRegionModal: false,
				editingAddress: {},
				editingIndex: -1,
				
				// 地区选择相关
				provinces: [
					{
						name: '北京市',
						children: [
							{
								name: '北京市',
								children: [
									{ name: '东城区' },
									{ name: '西城区' },
									{ name: '朝阳区' },
									{ name: '丰台区' },
									{ name: '石景山区' },
									{ name: '海淀区' },
									{ name: '门头沟区' },
									{ name: '房山区' },
									{ name: '通州区' },
									{ name: '顺义区' },
									{ name: '昌平区' },
									{ name: '大兴区' },
									{ name: '怀柔区' },
									{ name: '平谷区' },
									{ name: '密云区' },
									{ name: '延庆区' }
								]
							}
						]
					},
					{
						name: '上海市',
						children: [
							{
								name: '上海市',
								children: [
									{ name: '黄浦区' },
									{ name: '徐汇区' },
									{ name: '长宁区' },
									{ name: '静安区' },
									{ name: '普陀区' },
									{ name: '虹口区' },
									{ name: '杨浦区' },
									{ name: '闵行区' },
									{ name: '宝山区' },
									{ name: '嘉定区' },
									{ name: '浦东新区' },
									{ name: '金山区' },
									{ name: '松江区' },
									{ name: '青浦区' },
									{ name: '奉贤区' },
									{ name: '崇明区' }
								]
							}
						]
					},
					{
						name: '广东省',
						children: [
							{
								name: '广州市',
								children: [
									{ name: '荔湾区' },
									{ name: '越秀区' },
									{ name: '海珠区' },
									{ name: '天河区' },
									{ name: '白云区' },
									{ name: '黄埔区' },
									{ name: '番禺区' },
									{ name: '花都区' },
									{ name: '南沙区' },
									{ name: '从化区' },
									{ name: '增城区' }
								]
							},
							{
								name: '深圳市',
								children: [
									{ name: '福田区' },
									{ name: '罗湖区' },
									{ name: '南山区' },
									{ name: '宝安区' },
									{ name: '龙岗区' },
									{ name: '盐田区' },
									{ name: '龙华区' },
									{ name: '坪山区' },
									{ name: '光明区' },
									{ name: '大鹏新区' }
								]
							}
						]
					},
					{
						name: '浙江省',
						children: [
							{
								name: '杭州市',
								children: [
									{ name: '上城区' },
									{ name: '下城区' },
									{ name: '江干区' },
									{ name: '拱墅区' },
									{ name: '西湖区' },
									{ name: '滨江区' },
									{ name: '萧山区' },
									{ name: '余杭区' },
									{ name: '富阳区' },
									{ name: '临安区' }
								]
							}
						]
					}
				],
				cities: [],
				districts: [],
				regionPickerValue: [0, 0, 0],
				selectedRegion: {
					province: '',
					city: '',
					district: ''
				}
			}
		},
		computed: {
			regionText() {
				const { province, city, district } = this.editingAddress;
				if (province && city && district) {
					return `${province} ${city} ${district}`;
				}
				return '';
			}
		},
		watch: {
			regionPickerValue: {
				handler(newVal) {
					this.updateCitiesAndDistricts(newVal[0]);
					this.updateDistricts(newVal[1]);
				},
				immediate: true
			}
		},
		methods: {
			// 显示新增地址表单
			showAddAddress() {
				this.editingAddress = {
					consigneeName: '',
					phone: '',
					province: '',
					city: '',
					district: '',
					detailAddress: '',
					isDefault: false
				};
				this.editingIndex = -1;
				this.showEditForm = true;
			},
			
			// 编辑地址
			editAddress(address, index) {
				this.editingAddress = { ...address };
				this.editingIndex = index;
				this.showEditForm = true;
			},
			
			// 隐藏编辑表单
			hideEditForm() {
				this.showEditForm = false;
				this.editingAddress = {};
				this.editingIndex = -1;
			},
			
			// 删除地址
			deleteAddress(address, index) {
				uni.showModal({
					title: '删除地址',
					content: '确定要删除这个地址吗？',
					success: (res) => {
						if (res.confirm) {
							this.$emit('delete', { address, index });
						}
					}
				});
			},
			
			// 设置默认地址
			setDefaultAddress(address, index) {
				this.$emit('setDefault', { address, index });
			},
			
			// 点击地址卡片
			onAddressClick(address, index) {
				if (this.allowSelect) {
					this.$emit('select', { address, index });
				}
			},
			
			// 保存地址
			saveAddress() {
				if (!this.validateAddress()) {
					return;
				}
				
				const addressData = { ...this.editingAddress };
				
				if (this.editingIndex >= 0) {
					// 编辑模式
					this.$emit('edit', { 
						address: addressData, 
						index: this.editingIndex 
					});
				} else {
					// 新增模式
					this.$emit('add', { address: addressData });
				}
				
				this.hideEditForm();
			},
			
			// 地址验证
			validateAddress() {
				const { consigneeName, phone, province, city, district, detailAddress } = this.editingAddress;
				
				if (!consigneeName.trim()) {
					uni.showToast({ title: '请输入收货人姓名', icon: 'none' });
					return false;
				}
				
				if (!phone.trim()) {
					uni.showToast({ title: '请输入手机号', icon: 'none' });
					return false;
				}
				
				if (!/^1[3-9]\d{9}$/.test(phone)) {
					uni.showToast({ title: '请输入正确的手机号', icon: 'none' });
					return false;
				}
				
				if (!province || !city || !district) {
					uni.showToast({ title: '请选择省市区', icon: 'none' });
					return false;
				}
				
				if (!detailAddress.trim()) {
					uni.showToast({ title: '请输入详细地址', icon: 'none' });
					return false;
				}
				
				return true;
			},
			
			// 默认地址开关变化
			onDefaultChange(e) {
				this.editingAddress.isDefault = e.detail.value;
			},
			
			// 显示地区选择器
			showRegionPicker() {
				this.initRegionPicker();
				this.showRegionModal = true;
			},
			
			// 隐藏地区选择器
			hideRegionPicker() {
				this.showRegionModal = false;
			},
			
			// 初始化地区选择器
			initRegionPicker() {
				if (this.editingAddress.province) {
					// 如果已有选择，定位到对应位置
					const provinceIndex = this.provinces.findIndex(p => p.name === this.editingAddress.province);
					if (provinceIndex >= 0) {
						this.regionPickerValue[0] = provinceIndex;
						this.updateCitiesAndDistricts(provinceIndex);
						
						const cityIndex = this.cities.findIndex(c => c.name === this.editingAddress.city);
						if (cityIndex >= 0) {
							this.regionPickerValue[1] = cityIndex;
							this.updateDistricts(cityIndex);
							
							const districtIndex = this.districts.findIndex(d => d.name === this.editingAddress.district);
							if (districtIndex >= 0) {
								this.regionPickerValue[2] = districtIndex;
							}
						}
					}
				} else {
					// 默认选择第一个
					this.regionPickerValue = [0, 0, 0];
					this.updateCitiesAndDistricts(0);
					this.updateDistricts(0);
				}
			},
			
			// 地区选择变化
			onRegionChange(e) {
				this.regionPickerValue = e.detail.value;
			},
			
			// 确认地区选择
			confirmRegion() {
				const [provinceIndex, cityIndex, districtIndex] = this.regionPickerValue;
				
				this.editingAddress.province = (this.provinces[provinceIndex] && this.provinces[provinceIndex].name) || '';
				this.editingAddress.city = (this.cities[cityIndex] && this.cities[cityIndex].name) || '';
				this.editingAddress.district = (this.districts[districtIndex] && this.districts[districtIndex].name) || '';
				
				this.hideRegionPicker();
			},
			
			// 更新城市和区县
			updateCitiesAndDistricts(provinceIndex) {
				const province = this.provinces[provinceIndex];
				this.cities = province ? province.children || [] : [];
				this.updateDistricts(0);
			},
			
			// 更新区县
			updateDistricts(cityIndex) {
				const city = this.cities[cityIndex];
				this.districts = city ? city.children || [] : [];
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 变量定义
	$primary-color: #007AFF;
	$success-color: #34C759;
	$warning-color: #FF9500;
	$danger-color: #FF3B30;
	$text-color: #333333;
	$text-color-light: #666666;
	$text-color-lighter: #999999;
	$border-color: #EBEEF5;
	$background-color: #FFFFFF;
	$background-light: #F8F9FA;
	
	.address-manager {
		background-color: $background-light;
		min-height: 100vh;
	}
	
	// 地址列表
	.address-list {
		padding: 20rpx;
	}
	
	.list-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30rpx;
	}
	
	.header-title {
		font-size: 32rpx;
		font-weight: 600;
		color: $text-color;
	}
	
	.add-btn {
		display: flex;
		align-items: center;
		background-color: $primary-color;
		color: #FFFFFF;
		border: none;
		border-radius: 24rpx;
		padding: 12rpx 24rpx;
		font-size: 26rpx;
	}
	
	.add-icon {
		font-size: 28rpx;
		color: #FFFFFF;
		margin-right: 8rpx;
	}
	
	.add-text {
		color: #FFFFFF;
	}
	
	// 地址卡片
	.address-cards {
		display: flex;
		flex-direction: column;
		gap: 24rpx;
	}
	
	.address-card {
		position: relative;
		background-color: $background-color;
		border-radius: 16rpx;
		padding: 32rpx;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
		
		&--default {
			border: 2rpx solid $primary-color;
		}
	}
	
	.default-tag {
		position: absolute;
		top: 0;
		right: 32rpx;
		background-color: $primary-color;
		border-radius: 0 0 12rpx 12rpx;
		padding: 8rpx 16rpx;
	}
	
	.default-text {
		font-size: 22rpx;
		color: #FFFFFF;
	}
	
	.address-info {
		margin-bottom: 24rpx;
	}
	
	.user-info {
		display: flex;
		align-items: center;
		margin-bottom: 16rpx;
	}
	
	.user-name {
		font-size: 28rpx;
		font-weight: 600;
		color: $text-color;
		margin-right: 24rpx;
	}
	
	.user-phone {
		font-size: 26rpx;
		color: $text-color-light;
	}
	
	.address-detail {
		line-height: 1.5;
	}
	
	.address-text {
		font-size: 26rpx;
		color: $text-color-light;
	}
	
	.address-actions {
		display: flex;
		gap: 16rpx;
		justify-content: flex-end;
	}
	
	.action-btn {
		padding: 8rpx 20rpx;
		border-radius: 20rpx;
		font-size: 24rpx;
		border: 1rpx solid $border-color;
		background-color: $background-color;
		
		&.edit-btn {
			color: $primary-color;
			border-color: $primary-color;
		}
		
		&.delete-btn {
			color: $danger-color;
			border-color: $danger-color;
		}
		
		&.default-btn {
			color: $text-color-light;
		}
	}	
	// 空状态
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 120rpx 40rpx;
		text-align: center;
	}
	
	.empty-icon {
		font-size: 80rpx;
		margin-bottom: 24rpx;
	}
	
	.empty-text {
		font-size: 28rpx;
		color: $text-color-lighter;
		margin-bottom: 40rpx;
	}
	
	.empty-add-btn {
		background-color: $primary-color;
		color: #FFFFFF;
		border: none;
		border-radius: 24rpx;
		padding: 16rpx 32rpx;
		font-size: 26rpx;
	}
	
	// 地址表单
	.address-form {
		background-color: $background-color;
		min-height: 100vh;
	}
	
	.form-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 32rpx;
		border-bottom: 1rpx solid $border-color;
		background-color: $background-color;
	}
	
	.back-btn {
		padding: 8rpx;
		background-color: transparent;
		border: none;
	}
	
	.back-text {
		font-size: 36rpx;
		color: $text-color-light;
	}
	
	.form-title {
		font-size: 32rpx;
		font-weight: 600;
		color: $text-color;
	}
	
	.header-placeholder {
		width: 60rpx;
	}
	
	.form-content {
		padding: 32rpx;
	}
	
	.form-section {
		margin-bottom: 40rpx;
		
		&:last-child {
			margin-bottom: 0;
		}
	}
	
	.form-item {
		display: flex;
		align-items: center;
		margin-bottom: 32rpx;
		
		&:last-child {
			margin-bottom: 0;
		}
	}
	
	.form-label {
		width: 160rpx;
		font-size: 28rpx;
		color: $text-color;
		flex-shrink: 0;
	}
	
	.form-input {
		flex: 1;
		padding: 16rpx 20rpx;
		border: 1rpx solid $border-color;
		border-radius: 8rpx;
		font-size: 28rpx;
		background-color: $background-color;
	}
	
	.form-textarea {
		flex: 1;
		padding: 16rpx 20rpx;
		border: 1rpx solid $border-color;
		border-radius: 8rpx;
		font-size: 28rpx;
		min-height: 120rpx;
		background-color: $background-color;
	}
	
	.region-selector {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 16rpx 20rpx;
		border: 1rpx solid $border-color;
		border-radius: 8rpx;
		background-color: $background-color;
	}
	
	.region-text {
		font-size: 28rpx;
		color: $text-color;
	}
	
	.region-placeholder {
		font-size: 28rpx;
		color: $text-color-lighter;
	}
	
	.region-arrow {
		font-size: 24rpx;
		color: $text-color-lighter;
	}
	
	.form-footer {
		padding: 32rpx;
		border-top: 1rpx solid $border-color;
	}
	
	.save-btn {
		width: 100%;
		background-color: $primary-color;
		color: #FFFFFF;
		border: none;
		border-radius: 12rpx;
		padding: 24rpx;
		font-size: 30rpx;
		font-weight: 600;
	}	
	// 地区选择器弹窗
	.region-modal {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 1000;
		display: flex;
		align-items: flex-end;
	}
	
	.region-popup {
		width: 100%;
		background-color: $background-color;
		border-radius: 20rpx 20rpx 0 0;
		max-height: 80vh;
	}
	
	.region-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 32rpx;
		border-bottom: 1rpx solid $border-color;
	}
	
	.region-cancel, .region-confirm {
		font-size: 28rpx;
		background-color: transparent;
		border: none;
		padding: 0;
	}
	
	.region-cancel {
		color: $text-color-light;
	}
	
	.region-confirm {
		color: $primary-color;
	}
	
	.region-title {
		font-size: 30rpx;
		font-weight: 600;
		color: $text-color;
	}
	
	.region-content {
		height: 500rpx;
	}
	
	.region-picker {
		height: 100%;
	}
	
	.picker-item {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 80rpx;
		font-size: 28rpx;
		color: $text-color;
	}
</style>