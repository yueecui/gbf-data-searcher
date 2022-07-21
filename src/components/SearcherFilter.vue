<template>
    <n-form>
        <n-form-item label="名称">
            <n-input v-model:value="name" />
        </n-form-item>
        <n-form-item label="属性">
            <n-dropdown trigger="hover" :options="elementOptions" @select="changeElement">
                <n-button>{{ ElementTypeNameMap[filterConfig.element] }}</n-button>
            </n-dropdown>
        </n-form-item>
        <n-form-item label="稀有度">
            <n-dropdown trigger="hover" :options="rarityOptions" @select="changeRarity">
                <n-button>{{ RarityTypeNameMap[filterConfig.rarity] }}</n-button>
            </n-dropdown>
        </n-form-item>
        <n-form-item label="类型">
            <n-dropdown trigger="hover" :options="weaponOptions" @select="changeWeaponType">
                <n-button>{{ WeaponTypeNameMap[filterConfig.weaponType] }}</n-button>
            </n-dropdown>
        </n-form-item>
    </n-form>
</template>

<script setup lang="ts">
import { NButton, NDropdown, NForm, NFormItem, NInput } from 'naive-ui';
import { computed, inject, ref } from 'vue';
import { ElementTypeNameMap, RarityTypeNameMap, WeaponTypeNameMap } from '../enums/constant';
import type { FilterConfig } from '../types/filter';

const filterConfig = inject('filterConfig') as FilterConfig;
const name = ref('');

const elementOptions = computed(() => [
    ...Object.keys(ElementTypeNameMap).map((key) => ({
        label: ElementTypeNameMap[key],
        key: Number(key),
    })),
]);

function changeElement(key: number) {
    filterConfig.element = key;
}

const rarityOptions = computed(() => [
    ...Object.keys(RarityTypeNameMap).map((key) => ({
        label: RarityTypeNameMap[key],
        key: Number(key),
    })),
]);

function changeRarity(key: number) {
    filterConfig.rarity = key;
}

const weaponOptions = computed(() => [
    ...Object.keys(WeaponTypeNameMap).map((key) => ({
        label: WeaponTypeNameMap[key],
        key: Number(key),
    })),
]);

function changeWeaponType(key: number) {
    filterConfig.weaponType = key;
}
</script>
