<template>
    <div v-if="collaborator" class="page">
        <h4>Hiệu chỉnh Liên hệ</h4>
        <CollaboratorForm
            :collaborator="collaborator"
            @submit:collaborator="createCollaborator"
        />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import CollaboratorForm from "@/components/CollaboratorForm.vue";
import CollaboratorService from "@/services/collaborator.service";

export default {
    components: {
        CollaboratorForm,
    },
    data() {
        return {
            collaborator: {},
            message: "",
        };
    },
    methods: {

        async createCollaborator(data) {
            try {
                await CollaboratorService.create(data);
                this.message = "Cộng tác viên được thêm thành công.";
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>