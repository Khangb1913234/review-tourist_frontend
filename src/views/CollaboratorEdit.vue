<template>
    <div v-if="collaborator" class="page">
        <h4>Hiệu chỉnh cộng tác viên</h4>
        <CollaboratorForm
            :collaborator="collaborator"
            @submit:collaborator="updateCollaborator"
            @delete:collaborator="deleteCollaborator"
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
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            collaborator: null,
            message: "",
        };
    },
    methods: {
        async getCollaborator(id) {
            try {
                this.collaborator = await CollaboratorService.get(id);
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

        async updateCollaborator(data) {
            try {
                await CollaboratorService.update(this.collaborator.id, data);
                this.message = "Cộng tác viên được cập nhật thành công.";
            } catch (error) {
                console.log(error);
            }
        },

        async deleteCollaborator() {
            if (confirm("Bạn muốn xóa cộng tác viên này?")) {
                try {
                    await CollaboratorService.delete(this.collaborator.id);
                    this.$router.push({ name: "collaborator" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getCollaborator(this.id);
        this.message = "";
    },
};
</script>