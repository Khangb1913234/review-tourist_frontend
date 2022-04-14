<script>
export default {
    props: {
        collaborators: { type: Array, default: [] },
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
            v-for="(collaborator, index) in collaborators"
            :key="collaborator.id"
            :class="{ active: index === activeIndex }"
            @click="select(index)"
        >
            {{ collaborator.name }}
        </li>
    </ul>
</template>