<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-md-5">
            <h4>
                Địa điểm du lịch
                <i class="fas fa-map"></i>
            </h4>
            <DestinationList
                v-if="filteredDestinationsCount > 0"
                :destinations="filteredDestinations"
                v-model:activeIndex="activeIndex"
            />
            <p v-else>Không có địa điểm nào.</p>

            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>

                <button class="btn btn-sm btn-success" @click="goToAddDestination">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>

                <button
                    class="btn btn-sm btn-danger"
                    @click="removeAllDestinations"
                >
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-7">
            <div v-if="activeDestination">
                <h4>
                    Thông tin về địa điểm
                    <i class="fas fa-map"></i>
                </h4>
                <DestinationDetail :destination="activeDestination" />
                <router-link
                    :to="{
                        name: 'destination.edit',
                        params: { id: activeDestination.id },
                    }"
                >
                    <button class="btn btn-sm btn-warning">
                        <i class="fas fa-edit"></i> Cập nhật
                    </button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import DestinationDetail from "@/components/DestinationDetail.vue";
import InputSearch from "@/components/InputSearch.vue";
import DestinationList from "@/components/DestinationList.vue";
import DestinationService from "@/services/destination.service";

export default {
    components: {
        DestinationDetail,
        InputSearch,
        DestinationList,
    },
    data() {
        return {
            destinations: [],
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
        // Chuyển các đối tượng destination thành chuỗi để tiện cho tìm kiếm.
        destinationStrings() {
            return this.destinations.map((destination) => {
                const { name, location, description, collaborator_tour, image } = destination;
                return [name, location, description, collaborator_tour, image].join("");
            });
        },
        // Trả về các destination có chứa thông tin cần tìm kiếm.
        filteredDestinations() {
            if (!this.searchText) return this.destinations;
            return this.destinations.filter((destination, index) =>
                this.destinationStrings[index].includes(this.searchText)
            );
        },
        activeDestination() {
            if (this.activeIndex < 0) return null;
            return this.filteredDestinations[this.activeIndex];
        },
        filteredDestinationsCount() {
            return this.filteredDestinations.length;
        },
    },
    methods: {
        async retrieveDestinations() {
            try {
                this.destinations = await DestinationService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        refreshList() {
            this.retrieveDestinations();
            this.activeIndex = -1;
        },

        async removeAllDestinations() {
            if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
                try {
                    await DestinationService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },

        goToAddDestination() {
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
    max-width:970px;
}

</style>