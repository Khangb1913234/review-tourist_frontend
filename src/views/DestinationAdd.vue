<template>
    <div v-if="destination" class="page">
        <h4>Hiệu chỉnh Liên hệ</h4>
        <DestinationForm
            :destination="destination"
            @submit:destination="createDestination"
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
    data() {
        return {
            destination: {},
            message: "",
        };
    },
    methods: {

        async createDestination(data) {
            try {
                await DestinationService.create(data);
                this.message = "Địa điểm được thêm thành công.";
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>