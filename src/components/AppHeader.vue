<template>
	<nav class="navbar navbar-expand navbar-dark bg-dark">
		<a href="/" class="navbar-brand" style="color: orange">Web giới thiệu địa điểm du lịch</a>

		<div v-if="currentUser" class="mr-auto navbar-nav">
			<li class="nav-item">
				<router-link :to="{ name: 'destination' }" class="nav-link" style="color: orange">
					Địa điểm du lịch
					<i class="fas fa-address-book"></i>
				</router-link>
			</li>
			<li class="nav-item">
				<router-link :to="{ name: 'collaborator' }" class="nav-link" style="color: orange">
					Cộng tác viên
					<i class="fas fa-address-book"></i>
				</router-link>
			</li>
		</div>

		<div v-if="!currentUser" class="navbar-nav ml-auto">
			<li class="nav-item">
				<router-link :to="{ name: 'register' }" class="nav-link" style="color: orange"
					>Đăng ký</router-link
				>
			</li>
			<li class="nav-item">
				<router-link :to="{ name: 'login' }" class="nav-link" style="color: orange"
					>Đăng nhập</router-link
				>
			</li>
		</div>

		<div v-if="currentUser" class="navbar-nav ml-auto">
			<li class="nav-item">
				<router-link :to="{ name: 'profile' }" class="nav-link" style="color: orange">{{
					currentUser.username
				}}</router-link>
			</li>
			<li class="nav-item">
				<a class="nav-link" @click.prevent="handleLogout" style="color: orange; cursor: pointer;">Đăng xuất</a>
			</li>
		</div>
	</nav>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useAuthStore } from "@/stores/auth.store";

export default {
	computed: {
		...mapState(useAuthStore, {
			currentUser: "user",
		}),
	},
	methods: {
		...mapActions(useAuthStore, ["logout", "loadAuthState"]),

		handleLogout() {
			this.logout();
			this.$router.push({ name: "login" });
		},
	},
	created() {
		this.loadAuthState();
	},
};
</script>
<style>
.nav-item :hover {
	opacity: 0.8;
}
</style>