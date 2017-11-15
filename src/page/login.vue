<template>
  	<div class="login_page fillcontain">
	  	<transition name="form-fade" mode="in-out">
	  		<section class="form_contianer" v-show="showLogin">
		  		<div class="manage_tip">
		  			<p>小说后台管理系统</p>
		  		</div>
		    	<el-form>
					<el-form-item prop="username">
                    <el-input v-model="username" placeholder="用户名"><span>dsfsf</span></el-input>
                </el-form-item>
					<el-form-item prop="password">
						<el-input type="password" placeholder="密码" v-model="password"></el-input>
					</el-form-item>
					<el-form-item>
				    	<el-button type="primary" @click="login" class="submit_btn">登录</el-button>
				  	</el-form-item>
				</el-form>
	  		</section>
	  	</transition>
  	</div>
</template>

<script>
    import Vue from 'vue'
    import md5 from 'js-md5';
	export default {
	    data(){
			return {
                username: '',
                password: '',
                showLogin: true
			}
		},
		mounted(){
            this.$router.push('login')
		},
		computed: {

		},
		methods: {
            login: function () {
                this.$store.dispatch('login', {loginIdorEmail: this.username, hashedPassword: md5(this.password)}).then(
                    () => {
                        this.$router.push('manage')
                    }
                ).catch(

                )
            }
		},
		watch: {
     			adminInfo: function (newValue){
     				if (newValue.id) {
     					this.$message({
                             type: 'success',
                             message: '检测到您之前登录过，将自动登录'
                         });
     					this.$router.push('manage')
                }
     			}
     	}
     }
</script>

<style lang="less" scoped>
	@import '../style/mixin';
	.login_page{
		background-color: #324057;
	}
	.manage_tip{
		position: absolute;
		width: 100%;
		top: -100px;
		left: 0;
		p{
			font-size: 34px;
			color: #fff;
		}
	}
	.form_contianer{
		.wh(320px, 210px);
		.ctp(320px, 210px);
		padding: 25px;
		border-radius: 5px;
		text-align: center;
		background-color: #fff;
		.submit_btn{
			width: 100%;
			font-size: 16px;
		}
	}
	.tip{
		font-size: 12px;
		color: red;
	}
	.form-fade-enter-active, .form-fade-leave-active {
	  	transition: all 1s;
	}
	.form-fade-enter, .form-fade-leave-active {
	  	transform: translate3d(0, -50px, 0);
	  	opacity: 0;
	}
</style>
