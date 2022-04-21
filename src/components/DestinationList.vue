<script>
export default {
    props: {
        destinations: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        select(index) {
            this.$emit("update:activeIndex", index);
        }
    }
};
</script>

<template>
    <div>
        <div
            class="a"
            v-for="(destination, index) in destinations"
            :key="destination.id"
            :class="{ active: index === activeIndex }"
            @click="select(index)"
        >
            <img :src="destination.image" class="img"/>
        </div>
    </div>
</template>

<style>
.img {
    width: 300px;
    height: 200px;
}
</style>