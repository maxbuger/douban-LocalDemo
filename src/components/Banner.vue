<template>
  <div class="banner">
  <!-- AD banner -->
    <template v-if="adImg">
      <div class="banner-bg ad" v-if="adImg">
        <img alt="" :src="adImg">
        <span>广告</span>
      </div>
    </template>
    <!-- Universal banner -->
    <template v-else>
      <div class="banner-bg">
        <img src="../assets/promotion_bg.jpg" alt="">
      </div>
      <div class="content">
        <span class="title">{{title}}</span>
        <div class="button-wrapper">
          <span class="download">极速下载</span>
          <span class="open">打开</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  export default{
    name: 'banner',
    data () {
      return {}
    },
    props: {
      // Banner title
      title: {
        type: String,
        required: false,
        default: '打开App，浏览更多'
      },
      adImg: {
        type: String,
        required: false
      }
    }
  }
</script>

<style lang="stylus" scoped>
.banner
  position relative
  width 100%
  height 8rem
  img
    max-width 100%
  .banner-bg
    position absolute
  .ad>span
      position absolute
      right 0
      bottom 0.2rem
      padding 0.4rem
      font-size 1.2rem
      color rgb(255,255,255);
      background-color rgba(0, 0, 0, 0.3)
  .content
    position absolute
    right 1rem
    left 1.8rem
    display flex
    height 8rem
    justify-content space-between
    align-items center
    .title
      padding-left 1.8rem
      font-size 1.4rem
      font-weight normal
      line-height 2.2rem
      color #2CA532
    .button-wrapper
      .download, .open
        display inline-block
        width auto
        padding 0 1.4rem
        font-size 1.3rem
        font-weight bold
        line-height 2
        border 0.1rem solid #42bd56
        border-radius 0.3rem
      .download
        color #fff
        background #42bd56
        &:active
          color #42bd56
          background none
      .open
        color #42bd56
        &:active
          color #fff
          background #42bd56
</style>