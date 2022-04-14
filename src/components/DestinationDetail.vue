<script>
export default {
    props: {
        contact: { type: Object, required: true },
    },
};
</script>

<template>
    <div>
        <div class="p-1">
            <strong>Tên:</strong>
            {{ contact.name }}
        </div>
        <div class="p-1">
            <strong>Vị trí:</strong>
            {{ contact.location }}
        </div>
        <div class="p-1">
            <strong>Mô tả:</strong>
            {{ contact.description }}
        </div>
        <div class="p-1">
            <strong>Ảnh:</strong>
            {{ contact.image }}
        </div>
        <div class="p-1">
            <strong>Địa điểm nổi bật:&nbsp;</strong>
            <i v-if="contact.trend" class="fas fa-check"></i>
            <i v-else class="fas fa-times"></i>
        </div>
    </div>
</template>