import { createWebHistory, createRouter } from "vue-router";
import Destination from "@/views/Destination.vue";

const routes = [
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
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;