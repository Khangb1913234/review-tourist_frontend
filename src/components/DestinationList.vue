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
    <ul class="list-group">
        <li
            class="list-group-item"
            v-for="(destination, index) in destinations"
            :key="destination.id"
            :class="{ active: index === activeIndex }"
            @click="select(index)"
        >
            {{ destination.name }}
        </li>
    </ul>
</template>