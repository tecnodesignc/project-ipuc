<template>
	<q-layout view="lHh LpR lFr" v-if="$store.state.app.active">


		<!-- === HEADER === -->


		<!-- ============= ROUTER VIEW ======================= -->
		<q-page-container>
			<router-view/>
		</q-page-container>
	</q-layout>
</template>

<script>
	export default {
		meta() {
			return {title: env('PROJECT_NAME')}
		},
		components: {},
		mounted() {
			this.$nextTick(function () {
			})
		},
		data() {
			return {
				userData: this.$store.state.auth.userData,
			}
		},
		computed: {
			getImageUrl() {
				return config('apiRoutes.api.base_url') + '/' + this.userData.smallImage;
			}
		},
		methods: {
		}
	}
</script>

<style lang="stylus">
	@import "~variables";


</style>
