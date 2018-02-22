<template>
  <div class="login-view">
    <h1>
      <a href="javascript:history.go(-1)">取消登录</a>
    </h1>
    <form method="get" @submit.prevent="onsubmit()">
      <p v-if="error" class="tip error">{{error}}</p>
      <div class="form-user">
          <strong>邮箱：</strong>
          <input type="email" v-model="email" name="email" @input="updateData" placeholder="邮箱">
      </div>
      <div class="form-pwd">
          <strong>密码：</strong>
          <template v-if="passType === 'password'">
            <input type="password" v-model="token" name="token" @input="updateData" placeholder="Token">
          </template>
          <template v-if="passType === 'text'">
            <input type="text" v-model="token" name="token" @input="updateData" placeholder="Token">
          </template>
          <span class="show-pwd" :class="{show: isShow}" @click="showPwd()"></span>
      </div>
      <div class="submit-btn">
        <button class="submit" type="submit" :disabled="isDisabled" :class="{disabled: isDisabled}">{{loginState}}</button>
      </div>
    </form>
    <div class="footer">
      <div class="more-login">使用其他方式登录 &amp; 找回密码</div>
      <div class="btns">
        <router-link :to="{name: 'RegisterView'}">注册豆瓣帐户</router-link>
        <a href="#">下载豆瓣App</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

  export default{
    name: 'login-view',
    data () {
      return {
        loginState: '登录',
        isDisabled: false, // Disabled submit button
        isShow: 0, // Show pwd
        passType: 'password',
        error: '' // Verification results
      }
    },
    computed: {
      // Getting Vuex State from store/modules/user
      ...mapState({
        email: state => state.user.temp_email,
        token: state => state.user.temp_token
      })
    },
    methods: {
      showPwd: function(){
        this.isShow = this.isShow ? 0 : 1
        this.isShow ? this.passType = 'text' : this.passType = 'password'
      },
      updateData:function (e) {
        // v-model Form handling
        this.$store.commit({
          type: 'updateData',
          name: e.target.name,
          value: e.target.value
        })
      },
      beforeSubmit: function () {
        // console.log('Submiting...')
        this.isDisabled = true
        this.loginState = '正在登录...'
      },
      onSuccess: function (res) {
        // console.log('complete!')
        this.$router.push({name: 'StatesView'})
      },
      onError: function (err) {
        this.error = err.body.error
        this.loginState = '登录'
        this.isDisabled = false
      },
      onSubmit: function () {
        // Disabled submit button
        this.beforeSubmit();
        // Login...
        this.$state.dispathch({
          type: 'login',
          email: this.email,
          token: this.token
        }).then( res => {
          this.onSuccess(res)
        }, err => {
          // Error handle
          this.onError(err)
        })
      }
    },
    beforeRouterEnterb(to, from, next){
      next(vm => {
        if(vm.$state.getters.currentUser.email){
          vm.$router.push({name: 'StatesView'})
        }else{
          next()
        }
      })
    },
    created () {
      // Getting local user automatic filling
      if (localStorage.getItem('email')) {
        this.$state.commit({
          type: 'getLocalUser'
        })
      }
    }
  }

</script>

<style lang="stylus" scoped>
.login-view
  h1
    height 4.5rem
    margin 0 0 1rem 0
    padding 0 1.8rem
    line-height 4.5rem
    background #fff
    border-bottom 0.1rem solid #eee
    text-align center
    font-size 1.8rem
    font-weight bold
    a
      position absolute
      left 1.8rem
      top 0
      color #42bd56
      font-size 1.5rem
      font-weight normal
  form
    padding 2rem 1.5rem
    text-align center
    .form-user
      position relative
      strong
        font-size 1.5rem
        color #222
        margin-bottom 0.5rem
      input
        display inline-block
        height 3.0rem
        padding 0 0.8rem
        box-sizing border-box
        font-size 1.5rem
        background #fff
        border 0.1rem solid #ccc
        border-radius 0.3rem
        outline 0
        poadding-right 4rem
    .form-pwd
      position relative
      margin-top 2rem
      strong
        font-size 1.5rem
        color #222
        margin-bottom 0.5rem
      input
        display inline-block
        height 3.0rem
        padding 0 0.8rem
        box-sizing border-box
        font-size 1.5rem
        background #fff
        border 0.1rem solid #ccc
        border-radius 0.3rem
        outline 0
        poadding-right 4rem
      .show-pwd
        position absolute
        right: 4.2rem;
        top: 0.18rem;
        display block
        height 100%
        width 3.2rem
        background-image url('../assets/icon_hide.png')
        background-repeat no-repeat
        background-position center center
        background-size 2.2rem
        z-index 3
      .show-pwd.show
        background-image url('../assets/icon_show.png')    
    .submit-btn
      text-align center
      .submit
        cursor pointer
        width 50%
        padding 1.0rem 2.6rem
        margin-top 2rem
        font-size 1.7rem
        text-align center
        color #fff
        background #17AA52
        border 0.1rem solid #17AA52
        border-radius 0.3rem
        .disabled
          cursor not-allowed
          background #eee
          border none
        .tip
          font-size 1.4rem
          color #aaa
        .error
          color #ff0000
        
  .footer
    .more-login
      font-size 1.5rem
      color #aaa
      text-align center
    .btns
      margin-top 4rem
      text-align center
      font-size 1.5rem
      a
        color #42bd56
        margin-right 1.5rem
        
</style>