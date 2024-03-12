<template>
    <div class="gbf-item px-[3px] pt-[3px] pb-[6px]" :data-master-id="data.id">
        <a :href="`/wiki/Weapon/${data.id}`" :title="data.name" target="_blank">
            <img :src="getImageUrl(`M_${data.id}.jpg`)" class="max-w-full" />
            <div
                class="item-rarity flex justify-center items-center h-[26px] pt-[2px] mt-[-6px] relative before:z-[-1] before:inset-0 before:absolute"
            >
                <div
                    v-for="(color, index) in data.getStarConfig()"
                    :key="index"
                    :class="`star ${color} scale-[.7] 2xl:scale-[.8]`"
                ></div>
            </div>
        </a>
    </div>
</template>

<script setup lang="ts">
import { getImageUrl } from '../module/getImageUrl';
import type { Weapon } from '../objects/Weapon';

defineProps<{
    data: Weapon;
}>();
</script>

<style scoped lang="less">
.gbf-item {
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

.star {
    display: inline-block;
    background: url('@{ImageUrl}/gbf/uploads/1/11/Evolution-star-2.png') no-repeat;
    width: 20px;
    height: 20px;
    margin: 0 -3px;

    &.yellow {
        background-position: 0 -685px;
    }
    &.blue {
        background-position: 0 -789px;
    }
    &.red {
        background-position: 0 -711px;
    }
    &.purple {
        background-position: 0 -545px;
    }
}
</style>
