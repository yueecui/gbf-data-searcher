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
import { computed, onMounted, provide, reactive, ref, watch } from 'vue';
import ThemeOverrides from './assets/naive-ui-theme-overrides.json';
import SearcherFilter from './components/SearcherFilter.vue';
import SearchResult from './components/SearchResult.vue';
import { screenMap, sizeEnum } from './enums/breakpointEnum';
import { SortType } from './enums/constant';
import { generateAvailableSkillTypeList, getWeaponData } from './module/getData';
import type { FilterConfig } from './types/filter';

// ====================================================================================
// FILTER
// ====================================================================================
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
watch(filterConfig, () => {
    page.value = 1;
});

// ====================================================================================
// STATUS
// ====================================================================================
const page = ref<number>(1);
const pageSize = ref<number>(50);
watch(pageSize, () => {
    page.value = 1;
});
const total = computed(() => filteredData.value.length);
const totalPage = computed(() => Math.ceil(total.value / pageSize.value));
const screenSize = ref<sizeEnum>();

// ====================================================================================
// METHOD
// ====================================================================================
onMounted(() => {
    resizeFn();
    window.addEventListener('resize', resizeFn);
});

function resetFilter() {
    const newConfig = JSON.parse(JSON.stringify(filterConfigDefault));
    for (const key in newConfig) {
        filterConfig[key] = newConfig[key];
    }
    page.value = 1;
}

function resizeFn() {
    const findScreebSize = () => {
        const width = window.innerWidth;
        for (const [key, value] of screenMap.entries()) {
            if (width < value) {
                return key;
            }
        }
        return sizeEnum.XXXL;
    };
    screenSize.value = findScreebSize();

    const getPageSize = () => {
        switch (screenSize.value) {
            case sizeEnum.SM:
            case sizeEnum.MD:
                return 20;
            case sizeEnum.LG:
                return 30;
            case sizeEnum.XL:
                return 40;
            case sizeEnum.XXL:
            default:
                return 50;
        }
    };
    pageSize.value = getPageSize();
}

// ====================================================================================
// DATA
// ====================================================================================
const allWeaponData = getWeaponData();

const filteredData = computed(() => {
    const availableSkillTypes =
        filterConfig.skillFilter.skill === 0
            ? generateAvailableSkillTypeList(filterConfig.skillFilter.tag)
            : [filterConfig.skillFilter.skill];

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
        if (
            filterConfig.skillFilter.category === 0 &&
            filterConfig.skillFilter.tag === '' &&
            filterConfig.skillFilter.skill === 0
        ) {
            return true;
        } else {
            if (!weapon.hasSkill(filterConfig.skillFilter.category, availableSkillTypes)) {
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
/** 当前显示的数据 */
const showData = computed(() => {
    return filteredData.value.slice((page.value - 1) * pageSize.value, page.value * pageSize.value);
});
</script>

<style lang="less"></style>
