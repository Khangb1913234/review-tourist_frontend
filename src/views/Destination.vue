<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-md-12">
            <h4>
                Địa điểm du lịch
                <i class="fas fa-map"></i>
                <span v-if="activeDestination" style="margin-left: 50px; position: fixed;">
                    <router-link
                        :to="{
                            name: 'destination.info',
                            params: { id: activeDestination.id },
                        }"
                    >
                        <button class="btn btn-sm btn-primary" style="width: 80px">Xem chi tiết</button>
                    </router-link>
                </span>
            </h4>   
            <div style="margin-top: 30px;">
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
            <DestinationList
                v-if="filteredDestinationsCount > 0"
                :destinations="filteredDestinations"
                v-model:activeIndex="activeIndex"
                @click="gotoInfo"
            />
            <p v-else>Không có địa điểm nào.</p>
        </div>
    </div>

</template>

<script>
import InputSearch from "@/components/InputSearch.vue";
import DestinationList from "@/components/DestinationList.vue";
import DestinationService from "@/services/destination.service";

export default {
    components: {
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
            if (confirm("Bạn muốn xóa tất cả địa điểm?")) {
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
    max-width:1140px;
}


.btn {
    margin-right: 15px;
}
</style>