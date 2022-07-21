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
            <search-result :showData="showData" :page="page" :totalPage="totalPage" />
            <n-pagination v-model:page="page" :page-count="totalPage" class="justify-center m-8" />
        </n-theme-editor>
    </n-config-provider>
</template>

<script setup lang="ts">
import { dateZhCN, NConfigProvider, NPagination, NThemeEditor, zhCN } from 'naive-ui';
import { computed, provide, reactive, ref } from 'vue';
import ThemeOverrides from './assets/naive-ui-theme-overrides.json';
import SearcherFilter from './components/SearcherFilter.vue';
import SearchResult from './components/SearchResult.vue';
import { GameDataType, getGbfData } from './module/getData';
import type { FilterConfig } from './types/filter';

const filterConfig = reactive<FilterConfig>({
    name: '',
    element: 0,
    rarity: 0,
    weaponType: 0,
});
provide('filterConfig', filterConfig);

const allData = getGbfData(GameDataType.Weapon);
console.log(allData);

const filteredData = computed(() => {
    const { element, rarity, weaponType } = filterConfig;
    const filtered = allData.filter((data) => {
        if (element && data.e !== element) {
            return false;
        }
        if (rarity && data.s !== rarity) {
            return false;
        }
        if (weaponType && data.k !== weaponType) {
            return false;
        }
        return true;
    });
    return filtered;
});
const page = ref<number>(1);
const pageSize = ref<number>(40);
const total = computed(() => filteredData.value.length);
const totalPage = computed(() => Math.ceil(total.value / pageSize.value));

const showData = computed(() => {
    return filteredData.value.slice((page.value - 1) * pageSize.value, page.value * pageSize.value);
});
</script>

<style lang="less"></style>
