<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" class="navbar-brand">Web giới thiệu địa điểm du lịch</a>
        <div class="mr-auto navbar-nav">
            <li class="nav-item">
                <router-link :to="{ name: 'destination' }" class="nav-link">
                    Trang chủ
                    <i class="fas fa-map"></i>
                </router-link>
            </li>
        </div>
    </nav>
</template>