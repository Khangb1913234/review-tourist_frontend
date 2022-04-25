<template>

    <div class="container">
        <h4>
            Thông tin về địa điểm
            <i class="fas fa-map"></i>
        </h4>
        <DestinationDetail :destination = "destination" />
        <router-link :to="{ name: 'destination' }">
            <button class="btn btn-sm btn-primary">Trở lại</button>
        </router-link>
        <router-link
            :to="{
                name: 'destination.edit',
                params: { id: destination.id },
            }"
        >
            <button class="btn btn-sm btn-warning">
                <i class="fas fa-edit"></i> Cập nhật / Xóa
            </button>
        </router-link>
    </div>

</template>
<script>
    import DestinationDetail from "@/components/DestinationDetail.vue";
    import DestinationService from "@/services/destination.service";
    export default {
        components: {
            DestinationDetail,
        },
        props: {
            id: { type: String, required: true },
        },
        data() {
            return {
                 destination: {},
            };
        },
        methods: {
            async getDestination(id) {
                this.destination = await DestinationService.get(id);
            },
        },
        created() {
            this.getDestination(this.id);
        },
    }
</script>

<style scoped>
    .btn {
        margin-left: 5px;
    }
</style>