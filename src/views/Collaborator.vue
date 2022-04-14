<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-md-6">
            <h4>
                Cộng tác viên
                <i class="fas fa-map"></i>
            </h4>
            <CollaboratorList
                v-if="filteredCollaboratorsCount > 0"
                :collaborators="filteredCollaborators"
                v-model:activeIndex="activeIndex"
            />
            <p v-else>Không có cộng tác viên nào.</p>

            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>

                <button class="btn btn-sm btn-success" @click="goToAddCollaborator">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>

                <button
                    class="btn btn-sm btn-danger"
                    @click="removeAllCollaborators"
                >
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeCollaborator">
                <h4>
                    Thông tin về cộng tác viên
                    <i class="fas fa-map"></i>
                </h4>
                <CollaboratorDetail :collaborator="activeCollaborator" />
                <router-link
                    :to="{
                        name: 'destination.edit',
                        params: { id: activeCollaborator.id },
                    }"
                >
                    <span class="mt-2 badge badge-warning">
                        <i class="fas fa-edit"></i> Hiệu chỉnh</span
                    >
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import CollaboratorDetail from "@/components/CollaboratorDetail.vue";
import InputSearch from "@/components/InputSearch.vue";
import CollaboratorList from "@/components/CollaboratorList.vue";
import CollaboratorService from "@/services/collaborator.service";

export default {
    components: {
        CollaboratorDetail,
        InputSearch,
        CollaboratorList,
    },
    data() {
        return {
            collaborators: [],
            activeIndex: -1,
            searchText: "",
        };
    },
    watch: {
        // Giám sát các thay đổi của biến searchText.
        //  Bỏ chọn phần tử đang được chọn trong danh sách.
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        // Chuyển các đối tượng collaborator thành chuỗi để tiện cho tìm kiếm.
        collaboratorStrings() {
            return this.collaborators.map((collaborator) => {
                const { name, location, description, image } = collaborator;
                return [name, location, description, image].join("");
            });
        },
        // Trả về các collaborator có chứa thông tin cần tìm kiếm.
        filteredCollaborators() {
            if (!this.searchText) return this.collaborators;
            return this.collaborators.filter((collaborator, index) =>
                this.collaboratorStrings[index].includes(this.searchText)
            );
        },
        activeCollaborator() {
            if (this.activeIndex < 0) return null;
            return this.filteredCollaborators[this.activeIndex];
        },
        filteredCollaboratorsCount() {
            return this.filteredCollaborators.length;
        },
    },
    methods: {
        async retrieveCollaborators() {
            try {
                this.collaborators = await CollaboratorService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        refreshList() {
            this.retrieveCollaborators();
            this.activeIndex = -1;
        },

        async removeAllCollaborators() {
            if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
                try {
                    await CollaboratorService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },

        goToAddCollaborator() {
            this.$router.push({ name: "destination.add" });
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>

<style scoped>
.page {
    text-align: left;
    max-width:750px;
}

</style>