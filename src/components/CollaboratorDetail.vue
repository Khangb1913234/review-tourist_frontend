<script>
export default {
    props: {
        collaborator: { type: Object, required: true },
    },
};
</script>

<template>
    <div>
        <div class="p-1">
            <strong>Tên:</strong>
            {{ collaborator.name }}
        </div>
        <div class="p-1">
            <strong>Địa chỉ:</strong>
            {{ collaborator.address }}
        </div>
        <div class="p-1">
            <strong>SDT:</strong>
            {{ collaborator.phone }}
        </div>
        <div class="p-1">
            <strong>Website: </strong>
            <a :href="collaborator.website" target="blank" style="text-decoration:none;">{{ collaborator.website }}</a>
        </div>
    </div>
</template>
