<template>
  <div id="app">
    <router-view class="view"></router-view>
    <router-view class="view" name="subject"></router-view>
    <router-view class="view" name="search"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="stylus">
@import 'common/stylus/rest.styl'
</style>
