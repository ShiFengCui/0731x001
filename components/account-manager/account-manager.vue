<template>
	<view class="account-manager">
		<!-- 个人信息管理 -->
		<view class="section">
			<view class="section-title">
				<text class="title-text">个人信息管理</text>
			</view>
			
			<view class="profile-section">
				<!-- 头像设置 -->
				<view class="profile-item" @click="onChangeAvatar">
					<view class="item-label">
						<uni-icons type="person" size="24" color="#606266"></uni-icons>
						<text class="label-text">头像</text>
					</view>
					<view class="item-value">
						<image :src="accountData.avatar || '/static/logo.png'" class="avatar-preview"></image>
						<uni-icons type="right" size="16" color="#C0C4CC"></uni-icons>
					</view>
				</view>
				
				<!-- 昵称设置 -->
				<view class="profile-item" @click="onChangeNickname">
					<view class="item-label">
						<uni-icons type="contact" size="24" color="#606266"></uni-icons>
						<text class="label-text">昵称</text>
					</view>
					<view class="item-value">
						<text class="value-text">{{ accountData.nickname || '未设置' }}</text>
						<uni-icons type="right" size="16" color="#C0C4CC"></uni-icons>
					</view>
				</view>
				
				<!-- 手机号码 -->
				<view class="profile-item" @click="onChangePhone">
					<view class="item-label">
						<uni-icons type="phone" size="24" color="#606266"></uni-icons>
						<text class="label-text">手机号码</text>
					</view>
					<view class="item-value">
						<text class="value-text">{{ accountData.phone || '未绑定' }}</text>
						<uni-icons type="right" size="16" color="#C0C4CC"></uni-icons>
					</view>
				</view>
				
				<!-- 邮箱 -->
				<view class="profile-item" @click="onChangeEmail">
					<view class="item-label">
						<uni-icons type="email" size="24" color="#606266"></uni-icons>
						<text class="label-text">邮箱</text>
					</view>
					<view class="item-value">
						<text class="value-text">{{ accountData.email || '未绑定' }}</text>
						<uni-icons type="right" size="16" color="#C0C4CC"></uni-icons>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 密码管理 -->
		<view class="section">
			<view class="section-title">
				<text class="title-text">密码管理</text>
			</view>
			
			<view class="password-section">
				<!-- 登录密码 -->
				<view class="password-item" @click="onChangeLoginPassword">
					<view class="item-label">
						<uni-icons type="locked" size="24" color="#F56C6C"></uni-icons>
						<text class="label-text">登录密码</text>
					</view>
					<view class="item-value">
						<text class="value-text">{{ accountData.hasLoginPassword ? '已设置' : '未设置' }}</text>
						<uni-icons type="right" size="16" color="#C0C4CC"></uni-icons>
					</view>
				</view>
				
				<!-- 支付密码 -->
				<view class="password-item" @click="onChangePayPassword">
					<view class="item-label">
						<uni-icons type="wallet" size="24" color="#67C23A"></uni-icons>
						<text class="label-text">支付密码</text>
					</view>
					<view class="item-value">
						<text class="value-text">{{ accountData.hasPayPassword ? '已设置' : '未设置' }}</text>
						<uni-icons type="right" size="16" color="#C0C4CC"></uni-icons>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 安全设置 -->
		<view class="section">
			<view class="section-title">
				<text class="title-text">安全设置</text>
			</view>
			
			<view class="security-section">
				<!-- 指纹/面容解锁 -->
				<view class="security-item">
					<view class="item-label">
						<uni-icons type="scan" size="24" color="#409EFF"></uni-icons>
						<text class="label-text">生物识别</text>
						<text class="label-desc">指纹/面容解锁</text>
					</view>
					<view class="item-value">
						<switch :checked="accountData.biometricEnabled" @change="onToggleBiometric" />
					</view>
				</view>
				
				<!-- 设备登录管理 -->
				<view class="security-item" @click="onDeviceManagement">
					<view class="item-label">
						<uni-icons type="gear" size="24" color="#606266"></uni-icons>
						<text class="label-text">设备管理</text>
						<text class="label-desc">管理登录设备</text>
					</view>
					<view class="item-value">
						<text class="device-count">{{ accountData.deviceCount }}台设备</text>
						<uni-icons type="right" size="16" color="#C0C4CC"></uni-icons>
					</view>
				</view>
				
				<!-- 登录日志 -->
				<view class="security-item" @click="onLoginLog">
					<view class="item-label">
						<uni-icons type="list" size="24" color="#606266"></uni-icons>
						<text class="label-text">登录日志</text>
						<text class="label-desc">查看登录记录</text>
					</view>
					<view class="item-value">
						<uni-icons type="right" size="16" color="#C0C4CC"></uni-icons>
					</view>
				</view>
				
				<!-- 账号注销 -->
				<view class="security-item danger" @click="onDeleteAccount">
					<view class="item-label">
						<uni-icons type="trash" size="24" color="#F56C6C"></uni-icons>
						<text class="label-text danger-text">账号注销</text>
					</view>
					<view class="item-value">
						<uni-icons type="right" size="16" color="#C0C4CC"></uni-icons>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 昵称修改弹窗 -->
		<uni-popup ref="nicknamePopup" type="center">
			<view class="popup-content">
				<view class="popup-title">修改昵称</view>
				<view class="popup-form">
					<input 
						class="popup-input" 
						v-model="tempNickname" 
						placeholder="请输入新昵称" 
						maxlength="20"
						:focus="nicknameInputFocus"
					/>
					<view class="input-tip">
						<text class="tip-text">昵称长度不能超过20个字符</text>
					</view>
				</view>
				<view class="popup-actions">
					<button class="popup-btn cancel" @click="onCancelNickname">取消</button>
					<button class="popup-btn confirm" @click="onConfirmNickname">确定</button>
				</view>
			</view>
		</uni-popup>
		
		<!-- 密码修改弹窗 -->
		<uni-popup ref="passwordPopup" type="center">
			<view class="popup-content">
				<view class="popup-title">{{ passwordType === 'login' ? '修改登录密码' : '修改支付密码' }}</view>
				<view class="popup-form">
					<view class="form-item">
						<text class="form-label">当前密码</text>
						<input 
							class="popup-input" 
							v-model="currentPassword" 
							placeholder="请输入当前密码" 
							type="password"
							maxlength="20"
						/>
					</view>
					<view class="form-item">
						<text class="form-label">新密码</text>
						<input 
							class="popup-input" 
							v-model="newPassword" 
							placeholder="请输入新密码" 
							type="password"
							maxlength="20"
						/>
					</view>
					<view class="form-item">
						<text class="form-label">确认新密码</text>
						<input 
							class="popup-input" 
							v-model="confirmPassword" 
							placeholder="请再次输入新密码" 
							type="password"
							maxlength="20"
						/>
					</view>
					<view class="input-tip">
						<text class="tip-text">密码长度6-20位，建议包含字母、数字</text>
					</view>
				</view>
				<view class="popup-actions">
					<button class="popup-btn cancel" @click="onCancelPassword">取消</button>
					<button class="popup-btn confirm" @click="onConfirmPassword">确定</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name: 'AccountManager',
		props: {
			// 账户数据
			accountData: {
				type: Object,
				default: () => ({
					nickname: '用户昵称',
					avatar: '/static/logo.png',
					phone: '138****5678',
					email: 'user@example.com',
					hasLoginPassword: true,
					hasPayPassword: false,
					biometricEnabled: false,
					deviceCount: 2
				})
			}
		},
		data() {
			return {
				// 临时昵称
				tempNickname: '',
				nicknameInputFocus: false,
				
				// 密码修改相关
				passwordType: 'login', // login | pay
				currentPassword: '',
				newPassword: '',
				confirmPassword: ''
			};
		},
		methods: {
			// 修改头像
			onChangeAvatar() {
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success: (res) => {
						const tempFilePaths = res.tempFilePaths;
						if (tempFilePaths && tempFilePaths.length > 0) {
							// 这里可以上传图片到服务器
							this.$emit('avatarChange', tempFilePaths[0]);
							uni.showToast({
								title: '头像更新成功',
								icon: 'success'
							});
						}
					},
					fail: () => {
						uni.showToast({
							title: '选择图片失败',
							icon: 'error'
						});
					}
				});
			},
			
			// 修改昵称
			onChangeNickname() {
				this.tempNickname = this.accountData.nickname || '';
				this.nicknameInputFocus = true;
				this.$refs.nicknamePopup.open();
			},
			
			// 取消修改昵称
			onCancelNickname() {
				this.tempNickname = '';
				this.nicknameInputFocus = false;
				this.$refs.nicknamePopup.close();
			},
			
			// 确认修改昵称
			onConfirmNickname() {
				if (!this.tempNickname.trim()) {
					uni.showToast({
						title: '昵称不能为空',
						icon: 'error'
					});
					return;
				}
				
				if (this.tempNickname.length > 20) {
					uni.showToast({
						title: '昵称长度不能超过20个字符',
						icon: 'error'
					});
					return;
				}
				
				this.$emit('nicknameChange', this.tempNickname);
				this.onCancelNickname();
				
				uni.showToast({
					title: '昵称修改成功',
					icon: 'success'
				});
			},
			
			// 修改手机号
			onChangePhone() {
				this.$emit('phoneChange');
				uni.showToast({
					title: '跳转到手机号修改页面',
					icon: 'none'
				});
			},
			
			// 修改邮箱
			onChangeEmail() {
				this.$emit('emailChange');
				uni.showToast({
					title: '跳转到邮箱修改页面',
					icon: 'none'
				});
			},
			
			// 修改登录密码
			onChangeLoginPassword() {
				this.passwordType = 'login';
				this.resetPasswordForm();
				this.$refs.passwordPopup.open();
			},
			
			// 修改支付密码
			onChangePayPassword() {
				this.passwordType = 'pay';
				this.resetPasswordForm();
				this.$refs.passwordPopup.open();
			},
			
			// 重置密码表单
			resetPasswordForm() {
				this.currentPassword = '';
				this.newPassword = '';
				this.confirmPassword = '';
			},
			
			// 取消密码修改
			onCancelPassword() {
				this.resetPasswordForm();
				this.$refs.passwordPopup.close();
			},
			
			// 确认密码修改
			onConfirmPassword() {
				if (!this.currentPassword) {
					uni.showToast({
						title: '请输入当前密码',
						icon: 'error'
					});
					return;
				}
				
				if (!this.newPassword) {
					uni.showToast({
						title: '请输入新密码',
						icon: 'error'
					});
					return;
				}
				
				if (this.newPassword.length < 6 || this.newPassword.length > 20) {
					uni.showToast({
						title: '密码长度必须为6-20位',
						icon: 'error'
					});
					return;
				}
				
				if (this.newPassword !== this.confirmPassword) {
					uni.showToast({
						title: '两次输入的密码不一致',
						icon: 'error'
					});
					return;
				}
				
				if (this.newPassword === this.currentPassword) {
					uni.showToast({
						title: '新密码不能与当前密码相同',
						icon: 'error'
					});
					return;
				}
				
				this.$emit('passwordChange', {
					type: this.passwordType,
					currentPassword: this.currentPassword,
					newPassword: this.newPassword
				});
				
				this.onCancelPassword();
				
				uni.showToast({
					title: `${this.passwordType === 'login' ? '登录' : '支付'}密码修改成功`,
					icon: 'success'
				});
			},
			
			// 切换生物识别
			onToggleBiometric(event) {
				const enabled = event.detail.value;
				this.$emit('biometricToggle', enabled);
				
				uni.showToast({
					title: enabled ? '生物识别已开启' : '生物识别已关闭',
					icon: 'success'
				});
			},
			
			// 设备管理
			onDeviceManagement() {
				this.$emit('deviceManagement');
				uni.showToast({
					title: '跳转到设备管理页面',
					icon: 'none'
				});
			},
			
			// 登录日志
			onLoginLog() {
				this.$emit('loginLog');
				uni.showToast({
					title: '跳转到登录日志页面',
					icon: 'none'
				});
			},
			
			// 账号注销
			onDeleteAccount() {
				uni.showModal({
					title: '账号注销',
					content: '注销后将无法恢复账号数据，确定要继续吗？',
					confirmText: '确定注销',
					cancelText: '取消',
					confirmColor: '#F56C6C',
					success: (res) => {
						if (res.confirm) {
							this.$emit('accountDelete');
							uni.showToast({
								title: '账号注销申请已提交',
								icon: 'success'
							});
						}
					}
				});
			}
		}
	};
</script>

<style lang="scss">
	.account-manager {
		background-color: #f5f5f5;
		padding-bottom: 40rpx;
		
		.section {
			margin-bottom: 40rpx;
			
			.section-title {
				padding: 40rpx 30rpx 20rpx;
				
				.title-text {
					font-size: 32rpx;
					font-weight: 600;
					color: #303133;
				}
			}
		}
		
		.profile-section,
		.password-section,
		.security-section {
			background: white;
			margin: 0 30rpx;
			border-radius: 20rpx;
			overflow: hidden;
		}
		
		.profile-item,
		.password-item,
		.security-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 30rpx;
			border-bottom: 1rpx solid #f0f0f0;
			
			&:last-child {
				border-bottom: none;
			}
			
			&.danger {
				background-color: rgba(245, 108, 108, 0.05);
				
				.danger-text {
					color: #F56C6C;
				}
			}
			
			.item-label {
				display: flex;
				align-items: center;
				flex: 1;
				
				.label-text {
					font-size: 30rpx;
					color: #303133;
					margin-left: 20rpx;
				}
				
				.label-desc {
					font-size: 24rpx;
					color: #909399;
					margin-left: 12rpx;
				}
			}
			
			.item-value {
				display: flex;
				align-items: center;
				
				.value-text {
					font-size: 28rpx;
					color: #606266;
					margin-right: 12rpx;
				}
				
				.device-count {
					font-size: 26rpx;
					color: #909399;
					margin-right: 12rpx;
				}
				
				.avatar-preview {
					width: 60rpx;
					height: 60rpx;
					border-radius: 30rpx;
					margin-right: 12rpx;
				}
			}
		}
		
		// 弹窗样式
		.popup-content {
			width: 600rpx;
			background: white;
			border-radius: 20rpx;
			overflow: hidden;
			
			.popup-title {
				text-align: center;
				font-size: 32rpx;
				font-weight: 600;
				color: #303133;
				padding: 40rpx 30rpx 20rpx;
			}
			
			.popup-form {
				padding: 0 30rpx 20rpx;
				
				.form-item {
					margin-bottom: 30rpx;
					
					.form-label {
						display: block;
						font-size: 28rpx;
						color: #606266;
						margin-bottom: 12rpx;
					}
				}
				
				.popup-input {
					width: 100%;
					height: 80rpx;
					padding: 0 20rpx;
					border: 1rpx solid #DCDFE6;
					border-radius: 12rpx;
					font-size: 28rpx;
					color: #303133;
					background: #FAFAFA;
					
					&:focus {
						border-color: #409EFF;
						background: white;
					}
				}
				
				.input-tip {
					margin-top: 12rpx;
					
					.tip-text {
						font-size: 24rpx;
						color: #909399;
					}
				}
			}
			
			.popup-actions {
				display: flex;
				border-top: 1rpx solid #EBEEF5;
				
				.popup-btn {
					flex: 1;
					height: 88rpx;
					border: none;
					background: transparent;
					font-size: 30rpx;
					
					&.cancel {
						color: #606266;
						border-right: 1rpx solid #EBEEF5;
					}
					
					&.confirm {
						color: #409EFF;
						font-weight: 600;
					}
				}
			}
		}
	}
</style>