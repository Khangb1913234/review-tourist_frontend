import { createWebHistory, createRouter } from "vue-router";
import Destination from "@/views/Destination.vue";
import Collaborator from "@/views/Collaborator.vue"
import UserLogin from "@/views/UserLogin.vue";
import { useAuthStore } from "@/stores/auth.store";

const redirectIfLoggedIn = (_to, _from) => {
	if (useAuthStore().isUserLoggedIn) {
		return {
			name: "profile",
		};
	}
};
const routes = [
    {
		path: "/login",
		name: "login",
		component: UserLogin,
		meta: {
			publicPage: true,
		},
		beforeEnter: redirectIfLoggedIn,
	},
	{
		path: "/register",
		name: "register",
		component: () => import("@/views/UserRegister.vue"),
		meta: {
			publicPage: true,
		},
		beforeEnter: redirectIfLoggedIn,
	},
	{
		path: "/profile",
		name: "profile",
		component: () => import("@/views/UserProfile.vue"),
	},
    {
        path: "/",
        name: "destination",
        component: Destination,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
    {
        path: "/destination/info/:id",
        name: "destination.info",
        component: () => import("@/views/DestinationInfo.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/destination/:id",
        name: "destination.edit",
        component: () => import("@/views/DestinationEdit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/destination/add",
        name: "destination.add",
        component: () => import("@/views/DestinationAdd.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/collaborator/",
        name: "collaborator",
        component: Collaborator,
    },
    {
        path: "/collaborator/:id",
        name: "collaborator.edit",
        component: () => import("@/views/CollaboratorEdit.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/collaborator/add",
        name: "collaborator.add",
        component: () => import("@/views/CollaboratorAdd.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, _from) => {
	const authRequired = !to.meta.publicPage;
	const auth = useAuthStore();

	if (authRequired && !auth.isUserLoggedIn) {
		const query = to.fullPath === "/" ? {} : { redirect: to.fullPath };
		return {
			name: "login",
			query,
		};
	}
});

export default router;