<template>
	<div class="home-view has-header">
		<sub-nav mold="quickNav"></sub-nav>
		<list mold="thumbnail" :items="events"></list>
		<infinite-loading @infinite="infiniteHandler">
			<loading slot="spinner"></loading>
		</infinite-loading>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import InfiniteLoading from 'vue-infinite-loading'
import SubNav from '../components/SubNav'
import List from '../components/List'
import Loading from '../components/Loading'

	export default{
		name: 'home-view',
		components: { SubNav, List, InfiniteLoading, Loading },
		data () {
			return {}
		},
		computed: {
			// Getting Vuex State from store/modules/activities
			...mapState({
				events: state => state.activities.events
			})
		},
		methods:{
			// Using vue-infinite-loading
			infiniteHandler ($state) {
				setTimeout(() => {
        	$state.loaded()
				},1000)
				this.loadMore()
			},
			// Dispatching Actions
			...mapActions([
					'loadMore'
				])
		}
	}

</script>

<style lang="stylus" scoped>
.sub-nav
	margin 0 1.8rem
	padding-top 0.2rem
</style>