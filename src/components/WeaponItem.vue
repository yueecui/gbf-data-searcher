<template>
    <div class="item px-[3px] pt-[3px] pb-[6px]" :data-master-id="data.id">
        <a :href="`/wiki/Weapon/${data.id}`" :title="data.nj" target="_blank">
            <img :src="getImageUrl(`M_${data.id}.jpg`)" class="max-w-full" />
            <div
                class="item-rarity flex justify-center items-center h-[26px] pt-[2px] mt-[-6px] relative before:z-[-1] before:inset-0 before:absolute"
            >
                <div class="star-y"></div>
                <div class="star-y"></div>
                <div class="star-y"></div>
            </div>
        </a>
    </div>
</template>

<script setup lang="ts">
import { getImageUrl } from '../module/getImageUrl';

defineProps<{
    data: any;
}>();
</script>

<style scoped lang="less">
.item {
    &:hover {
        .item-rarity::before {
            border-image: url('@{ImageUrl}/gbf/uploads/3/37/Character-star-bg3.png') 0 20 fill round;
        }
    }
}
.item-rarity {
    // @apply flex items-center justify-center relative;
    &::before {
        border-image: url('@{ImageUrl}/gbf/uploads/f/f3/Character-star-bg.png') 0 20 fill round;
        border-width: 0 10px;
        border-style: solid;
        content: '';
    }
}

.star-y {
    display: inline-block;
    background: url('@{ImageUrl}/gbf/uploads/1/11/Evolution-star-2.png') no-repeat 0 -685px;
    width: 20px;
    height: 20px;
    transform: scale(0.7);
    margin: 0 -3px;
}

.star-b {
    display: inline-block;
    background: url('@{ImageUrl}/gbf/uploads/1/11/Evolution-star-2.png') no-repeat 0 -789px;
    width: 20px;
    height: 20px;
    transform: scale(0.7);
    margin: 0 -3px;
}
</style>
