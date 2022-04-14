import { createWebHistory, createRouter } from "vue-router";
import Destination from "@/views/Destination.vue";
import Collaborator from "@/views/Collaborator.vue"

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
        path: "/collaborator",
        name: "collaborator",
        component: Collaborator,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;