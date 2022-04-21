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
            class="item"
            v-for="(destination, index) in destinations"
            :key="destination.id"
            :class="{ active: index === activeIndex }"
            @click="select(index)"
        >
            <img :src="destination.image" class="img"/>
            <div style="font-size: 20px; font-weight: bold;">{{ destination.name }}</div>
        </div>
    </div>
</template>

<style scoped>
.img {
    width: 270px;
    height: 200px;
}

.item {
    float: left;
    width: 33.33333%;
    margin: 16px -8px 48px -8px;
}
.item :hover {
    opacity: 0.8;
    cursor: pointer;
}
.item:hover div {
    color: red;
}
</style>