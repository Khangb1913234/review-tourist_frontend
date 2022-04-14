<template>
    <div v-if="destination" class="page">
        <h4>Hiệu chỉnh địa điểm</h4>
        <DestinationForm
            :destination="destination"
            @submit:destination="updateDestination"
            @delete:destination="deleteDestination"
        />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import DestinationForm from "@/components/DestinationForm.vue";
import DestinationService from "@/services/destination.service";

export default {
    components: {
        DestinationForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            destination: null,
            message: "",
        };
    },
    methods: {
        async getDestination(id) {
            try {
                this.destination = await DestinationService.get(id);
            } catch (error) {
                console.log(error);
                // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },

        async updateDestination(data) {
            try {
                await DestinationService.update(this.destination.id, data);
                this.message = "Địa điểm được cập nhật thành công.";
            } catch (error) {
                console.log(error);
            }
        },

        async deleteDestination() {
            if (confirm("Bạn muốn xóa địa điểm này?")) {
                try {
                    await DestinationService.delete(this.destination.id);
                    this.$router.push({ name: "destination" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getDestination(this.id);
        this.message = "";
    },
};
</script>