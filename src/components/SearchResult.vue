<template>
    <div class="search-result-list m-8">
        <div class="text-with-shadow absolute top-[12px] left-[18px] leading-none">符合条件的武器数: {{ total }}个</div>
        <div class="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
            <weapon-item v-for="data in showData" :key="data.id" :data="data" :display="display" />
        </div>
        <div class="absolute bottom-[12px] left-0 w-full">
            <div class="total-paging text-with-shadow italic text-center leading-none">{{ page }}/{{ totalPage }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Weapon } from '../objects/Weapon';
import type { DisplayType } from '../enums/constant';
import WeaponItem from './WeaponItem.vue';

defineProps<{
    showData: Weapon[];
    page: number;
    total: number;
    totalPage: number;
    display: DisplayType;
}>();
</script>

<style lang="less">
.search-result-list {
    @apply mx-auto my-8 relative z-10 before:inset-0 before:absolute before:z-[-1];
    padding: 45px 20px 40px;
    min-height: 170px;

    &::before {
        border-image: url('@{ImageUrl}/gbf/uploads/2/2f/Bg_enhancement.png') 80 40 fill round;
        border-width: 40px 20px;
        border-style: solid;
        content: '';
    }
}

@media (max-width: 767px) {
    .search-result-list {
        margin-left: -10px;
        margin-right: -10px;
        padding-left: 10px;
        padding-right: 10px;
    }
}

.total-paging {
    &::before {
        background: url('@{ImageUrl}/gbf/uploads/f/f7/Pager-control.png') no-repeat 0 -2776px;
        width: 52px;
        height: 16px;
        display: inline-block;
        margin-right: 10px;
        vertical-align: middle;
        content: '';
        transform: scale(0.9);
    }

    &::after {
        background: url('@{ImageUrl}/gbf/uploads/f/f7/Pager-control.png') no-repeat 0 -2798px;
        width: 52px;
        height: 16px;
        display: inline-block;
        margin-left: 10px;
        vertical-align: middle;
        content: '';
        transform: scale(0.9);
    }
}
</style>
