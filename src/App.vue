<template>
    <n-config-provider
        :theme-overrides="ThemeOverrides"
        :inline-theme-disabled="true"
        :abstract="true"
        :locale="zhCN"
        :date-locale="dateZhCN"
    >
        <n-theme-editor>
            <searcher-filter />
            <search-result :showData="showData" :page="page" :total="total" :totalPage="totalPage" />
            <n-pagination v-model:page="page" :page-count="totalPage" class="justify-center" />
        </n-theme-editor>
    </n-config-provider>
</template>

<script setup lang="ts">
import { dateZhCN, NConfigProvider, NPagination, NThemeEditor, zhCN } from 'naive-ui';
import { computed, provide, reactive, ref } from 'vue';
import ThemeOverrides from './assets/naive-ui-theme-overrides.json';
import SearcherFilter from './components/SearcherFilter.vue';
import SearchResult from './components/SearchResult.vue';
import { getWeaponData } from './module/getData';
import type { FilterConfig } from './types/filter';

const allWeaponData = getWeaponData();

console.log();

const filterConfig = reactive<FilterConfig>({
    name: '',
    element: 0,
    rarity: 0,
    weaponType: 0,
    weaponCategory: 0,
    skillCategory: 0,
});
provide('filterConfig', filterConfig);

const filteredData = computed(() => {
    const filtered = allWeaponData.filter((weapon) => {
        if (!weapon.findKeyword(filterConfig.name)) {
            return false;
        }
        if (!weapon.isElement(filterConfig.element)) {
            return false;
        }
        if (!weapon.isRarity(filterConfig.rarity)) {
            return false;
        }
        if (!weapon.isType(filterConfig.weaponType)) {
            return false;
        }
        if (!weapon.isCategory(filterConfig.weaponCategory)) {
            return false;
        }
        if (!weapon.hasSkill(filterConfig.skillCategory)) {
            return false;
        }
        return true;
    });
    return filtered;
});

// ====================================================================================
// STATUS
// ====================================================================================
const page = ref<number>(1);
const pageSize = ref<number>(40);
const total = computed(() => filteredData.value.length);
const totalPage = computed(() => Math.ceil(total.value / pageSize.value));

const showData = computed(() => {
    return filteredData.value.slice((page.value - 1) * pageSize.value, page.value * pageSize.value);
});
</script>

<style lang="less"></style>
