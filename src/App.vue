<template>
    <n-config-provider
        :theme-overrides="ThemeOverrides"
        :inline-theme-disabled="true"
        :abstract="true"
        :locale="zhCN"
        :date-locale="dateZhCN"
    >
        <searcher-filter :reset-filter="resetFilter" />
        <search-result :showData="showData" :page="page" :total="total" :totalPage="totalPage" />
        <n-pagination v-model:page="page" :page-count="totalPage" class="justify-center" />
    </n-config-provider>
</template>

<script setup lang="ts">
import { dateZhCN, NConfigProvider, NPagination, zhCN } from 'naive-ui';
import { computed, provide, reactive, ref } from 'vue';
import ThemeOverrides from './assets/naive-ui-theme-overrides.json';
import SearcherFilter from './components/SearcherFilter.vue';
import SearchResult from './components/SearchResult.vue';
import { SortType } from './enums/constant';
import { generateAvailableSkillTypeList, getWeaponData } from './module/getData';
import type { FilterConfig } from './types/filter';

const allWeaponData = getWeaponData();

const filterConfigDefault: FilterConfig = {
    name: '',
    element: 0,
    rarity: 0,
    uncap: 0,
    weaponType: 0,
    weaponCategory: 0,
    skillFilter: {
        category: 0,
        tag: '',
        skill: 0,
    },
    sort: 0,
};

const filterConfig = reactive<FilterConfig>(JSON.parse(JSON.stringify(filterConfigDefault)));
provide('filterConfig', filterConfig);

function resetFilter() {
    const newConfig = JSON.parse(JSON.stringify(filterConfigDefault));
    for (const key in newConfig) {
        filterConfig[key] = newConfig[key];
    }
}

const filteredData = computed(() => {
    const filteredData = allWeaponData.filter((weapon) => {
        if (!weapon.findKeyword(filterConfig.name)) {
            return false;
        }
        if (!weapon.isElement(filterConfig.element)) {
            return false;
        }
        if (!weapon.isRarity(filterConfig.rarity)) {
            return false;
        }
        if (!weapon.hasUncap(filterConfig.uncap)) {
            return false;
        }
        if (!weapon.isType(filterConfig.weaponType)) {
            return false;
        }
        if (!weapon.isCategory(filterConfig.weaponCategory)) {
            return false;
        }
        if (!weapon.hasSkillCategory(filterConfig.skillFilter.category)) {
            return false;
        }
        if (filterConfig.skillFilter.tag !== '' || filterConfig.skillFilter.skill !== 0) {
            const availableSkill =
                filterConfig.skillFilter.skill === 0
                    ? generateAvailableSkillTypeList(filterConfig.skillFilter.tag)
                    : [filterConfig.skillFilter.skill];
            if (!weapon.hasSkillType(availableSkill)) {
                return false;
            }
        }
        return true;
    });

    filteredData.sort((a, b) => {
        switch (filterConfig.sort) {
            case SortType.RELEASE_DATE_DESC:
                if (a.releaseTimestamp !== b.releaseTimestamp) {
                    return b.releaseTimestamp - a.releaseTimestamp;
                } else {
                    // ID大的靠前
                    return b.index - a.index;
                }
            case SortType.UPDATE_DATA_DESC:
                if (a.updateTimestamp !== b.updateTimestamp) {
                    return b.updateTimestamp - a.updateTimestamp;
                } else if (a.releaseTimestamp !== b.releaseTimestamp) {
                    return b.releaseTimestamp - a.releaseTimestamp;
                } else {
                    return b.index - a.index;
                }
            case SortType.ELEMENT:
                if (a.element !== b.element) {
                    return a.element - b.element;
                } else if (a.releaseTimestamp !== b.releaseTimestamp) {
                    return b.releaseTimestamp - a.releaseTimestamp;
                } else {
                    return b.index - a.index;
                }
            case SortType.TYPE:
                if (a.weaponType !== b.weaponType) {
                    return a.weaponType - b.weaponType;
                } else if (a.releaseTimestamp !== b.releaseTimestamp) {
                    return b.releaseTimestamp - a.releaseTimestamp;
                } else {
                    return b.index - a.index;
                }
        }
    });
    return filteredData;
});

// ====================================================================================
// STATUS
// ====================================================================================
const page = ref<number>(1);
const pageSize = ref<number>(50);
const total = computed(() => filteredData.value.length);
const totalPage = computed(() => Math.ceil(total.value / pageSize.value));

const showData = computed(() => {
    return filteredData.value.slice((page.value - 1) * pageSize.value, page.value * pageSize.value);
});
</script>

<style lang="less"></style>
