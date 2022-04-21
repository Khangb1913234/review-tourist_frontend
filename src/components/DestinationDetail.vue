<script>
export default {
    props: {
        destination: { type: Object, required: true },
    },
    methods: {
        myFunction() {
            /* Get the text field */
            var card = document.getElementById("myInput");

            var copyText = card.innerHTML;

            console.log("Đây là"+copyText)
            /* Select the text field */
            copyText.select();
            copyText.setSelectionRange(0, 99999); /* For mobile devices */

            /* Copy the text inside the text field */
            navigator.clipboard.writeText(copyText.value);

            /* Alert the copied text */
            alert("Copied the text: " + copyText.value);
        }
    }
};
</script>

<template>
    <div>
        <div class="p-1"> 
            <img :src="destination.image" class="imgdes"/>
        </div>
        <div class="p-1">
            <strong>Tên:</strong>
            {{ destination.name }}
        </div>
        <div class="p-1">
            <strong>Vị trí:</strong>
            {{ destination.location }}
        </div>
        <div class="p-1">
            <strong>Mô tả:</strong>
            {{ destination.description }}
        </div>
        <div class="p-1">
            <strong>Cộng tác viên:</strong>
            {{ destination.collaborator_tour }}
            <router-link to="/collaborator">
                <button class="btn-primary">Tìm cộng tác viên <i class="fas fa-person"></i></button>                 
            </router-link>          
        </div>
        <div class="p-1">
            <strong>Địa điểm nổi bật:&nbsp;</strong>
            <i v-if="destination.trend" class="fas fa-check"></i>
            <i v-else class="fas fa-times"></i>
        </div>
    </div>
</template>

<style scoped>
.imgdes {
    width: 500px;
    height: 400px;
}
</style>