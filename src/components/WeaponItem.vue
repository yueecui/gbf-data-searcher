<template>
    <div class="gbf-item px-[3px] pt-[3px] pb-[6px]" :data-master-id="data.id">
        <a :href="`/wiki/Weapon/${data.id}`" :title="data.name" target="_blank">
            <div class="relative">
                <img :src="getImageUrl(`M_${data.id}.jpg`)" class="max-w-full" />
                <img v-if="data.awaken" :src="getImageUrl(`${getWeaponAwakenIcon(data.awaken)}.png`)"
                    class="weapon-awaken-icon" />
                <img v-if="data.exSkill" :src="getImageUrl(`${getWeaponExSkillIcon(data.exSkill)}.png`)"
                    class="weapon-awaken-icon" />
            </div>
            <div v-if="display != displayType.NONE"
                class="item-rarity flex justify-center items-center h-[26px] pt-[2px] mt-[-6px] relative before:z-[-1] before:inset-0 before:absolute">
                <div v-if="display == displayType.UNCAP" v-for="(color, index) in data.getStarConfig()" :key="index"
                    :class="`star ${color} scale-[.7] 2xl:scale-[.8]`"></div>
                <div v-if="display == displayType.CH_NAME"> {{ data.chname }} </div>
                <div v-if="display == displayType.JP_NAME"> {{ data.jpname }} </div>
                <div v-if="display == displayType.EN_NAME"> {{ data.enname }} </div>
                <div v-if="display == displayType.RELEASE_DATE"> {{ formatDate(data.releaseTimestamp) }} </div>
                <div v-if="display == displayType.UPDATE_DATE"> {{ formatDate(data.updateTimestamp) }} </div>
                <div v-if="display == displayType.TYPE">
                    <div :class="['icon-weapon', `weapon-${data.weaponType}`]"></div>{{
                        WeaponTypeNameMap[data.weaponType] }}
                </div>
                <div v-if="display == displayType.ID"> {{ data.id }} </div>
            </div>
        </a>
    </div>
</template>

<script setup lang="ts">
import { getImageUrl } from '../module/getImageUrl';
import type { Weapon } from '../objects/Weapon';
import { DisplayType as DisplayType, WeaponTypeNameMap as WeaponTypeNameMap } from '../enums/constant';
import { getWeaponAwakenIcon, getWeaponExSkillIcon } from '../module/getData';

defineProps<{
    data: Weapon;
    display: DisplayType;
}>();

function formatDate(timestamp: number) {
    const date = new Date(timestamp);
    if (timestamp === 0) {
        return '';
    }
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

const displayType = DisplayType;
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
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    color: #f2eee2;
    font-size: 13px;
    overflow: hidden;
    white-space: nowrap;

    // @apply flex items-center justify-center relative;
    &::before {
        border-image: url('@{ImageUrl}/gbf/uploads/f/f3/Character-star-bg.png') 0 20 fill round;
        border-width: 0 10px;
        border-style: solid;
        content: '';
    }

    >div {
        margin-top: 6px;
        max-width: 100%;
        min-height: 100%;
        text-align: left;
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

.weapon-awaken-icon {
    position: absolute;
    top: 10%;
    left: -4.28%;
    width: 31.428%;
    pointer-events: none;
    user-select: none;
}
</style>
