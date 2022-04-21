<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" class="navbar-brand" style="color: orange">Web giới thiệu địa điểm du lịch</a>
        <div class="mr-auto navbar-nav">
            <li class="nav-item">
                <router-link :to="{ name: 'destination' }" class="nav-link" style="color: orange">
                    Trang chủ
                    <i class="fas fa-map"></i>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link to="/collaborator" class="nav-link" style="color: orange">
                    Cộng tác viên
                    <i class="fas fa-person"></i>
                </router-link>
            </li>
        </div>
    </nav>
</template>
<style scoped>
    .navbar {
        margin-bottom: 10x;
    }
</style>