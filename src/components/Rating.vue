<template>
  <div class="rating" v-if="rating">
    <div v-if="full === 0">
      <span>暂无评分</span>
    </div>
    <div v-else>
      <span v-for="n in full">
        <span class="star-full star-common"></span>
      </span>
      <span v-for="n in half">
        <span class="star-half star-common"></span>
      </span>
      <span v-for="n in gray">
        <span class="star-gray star-common"></span>
      </span>
      <span class="average">{{rating.average}}</span>
    </div>
    <slot name="ratingsCount"></slot>
  </div>
</template>
<script>
  export default{
    name: 'rating',
    props: {
      rating: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        full: 0,
        half: 0,
        gray: 0
      }
    },
    created () {
      let average = this.rating.average
      this.full = parseInt(average / 2)
      this.half = average % 2 === 0 ? 0 : 1
      this.gray = 5 - this.full - this.half
    }
  }
</script>
<style lang="stylus" scoped>
.rating
  margin-top 0.4rem
  font-size 1.4rem
  color #aaa
  .star-full
    background-image url('../assets/star_full.png')
  .star-gray
    background-image url('../assets/star_gray.png')
  .star-half
    background-image url('../assets/star_half.png')
  .star-common
    display inline-block
    width 1.3rem
    height 1.3rem
    background-size cover
  .average
    padding-right 0.8rem
</style>