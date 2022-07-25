<template>
    <n-form :show-feedback="false">
        <n-space vertical>
            <n-space>
                <n-form-item label="名称">
                    <n-input v-model:value="filterConfig.name" />
                </n-form-item>
                <n-form-item label="属性">
                    <n-dropdown trigger="click" :options="elementOptions" @select="changeElement">
                        <n-button class="w-32">{{ ElementTypeNameMap[filterConfig.element] }}</n-button>
                    </n-dropdown>
                </n-form-item>
                <n-form-item label="稀有度">
                    <n-dropdown trigger="click" :options="rarityOptions" @select="changeRarity">
                        <n-button class="w-32">{{ RarityTypeNameMap[filterConfig.rarity] }}</n-button>
                    </n-dropdown>
                </n-form-item>
                <n-form-item label="类型">
                    <n-dropdown trigger="click" :options="weaponOptions" @select="changeWeaponType">
                        <n-button class="w-32">{{ WeaponTypeNameMap[filterConfig.weaponType] }}</n-button>
                    </n-dropdown>
                </n-form-item>
                <n-form-item label="上限解放">
                    <n-dropdown trigger="click" :options="uncapOptions" @select="changeUncapType">
                        <n-button class="w-32">{{ UncapTypeNameMap[filterConfig.uncap] }}</n-button>
                    </n-dropdown>
                </n-form-item>
                <n-form-item label="武器分类">
                    <n-dropdown trigger="click" :options="weaponCategoryOptions" @select="changeWeaponCategory">
                        <n-button class="min-w-[15rem]">{{ getWeaponTypeName(filterConfig.weaponCategory) }}</n-button>
                    </n-dropdown>
                </n-form-item>
                <n-form-item label="武器技能">
                    <n-button :color="skillFilterShow ? '#afafaf' : '#066bb3'" @click="toggleSkillFilter">
                        <template v-if="skillFilterShow"> 清空</template><template v-else> 展开</template>
                    </n-button>
                </n-form-item>
                <n-form-item label="排序">
                    <n-dropdown trigger="click" :options="sortOptions" @select="changeSortType">
                        <n-button class="w-32">{{ SortTypeNameMap[filterConfig.sort] }}</n-button>
                    </n-dropdown>
                </n-form-item>
                <n-form-item>
                    <n-button color="#961916" @click="resetAllFilter">
                        <div class="flex items-center gap-4">
                            <i class="fa fa-refresh"></i>
                            <span>重置</span>
                        </div>
                    </n-button>
                </n-form-item>
            </n-space>
            <weapon-skill-filter-collapse
                :show="skillFilterShow"
                :change-filter="changeSkillFilter"
                :skill-filter="filterConfig.skillFilter"
            />
        </n-space>
    </n-form>
</template>

<script setup lang="ts">
import { NButton, NDropdown, NForm, NFormItem, NInput, NSpace } from 'naive-ui';
import { computed, inject, ref } from 'vue';
import {
    ElementTypeNameMap,
    RarityTypeNameMap,
    SortTypeNameMap,
    UncapTypeNameMap,
    WeaponTypeNameMap,
} from '../enums/constant';
import { getWeaponFilterConfig, getWeaponTypeName } from '../module/getData';
import type { FilterConfig } from '../types/filter';
import WeaponSkillFilterCollapse from './WeaponSkillFilterCollapse.vue';

const filterConfig = inject('filterConfig') as FilterConfig;

const props = defineProps<{
    resetFilter: () => void;
}>();

// ====================================================================================
// 基础过滤
// ====================================================================================

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

const uncapOptions = computed(() => [
    ...Object.keys(UncapTypeNameMap).map((key) => ({
        label: UncapTypeNameMap[key],
        key: Number(key),
    })),
]);

function changeUncapType(key: number) {
    filterConfig.uncap = key;
}

const sortOptions = computed(() => [
    ...Object.keys(SortTypeNameMap).map((key) => ({
        label: SortTypeNameMap[key],
        key: Number(key),
    })),
]);

function changeSortType(key: number) {
    filterConfig.sort = key;
}

// ====================================================================================
// 分类过滤
// ====================================================================================

const weaponCategoryOptions = computed((): any => [
    {
        label: '全部',
        key: 0,
    },
    ...getWeaponFilterConfig(),
]);

function changeWeaponCategory(key: number) {
    filterConfig.weaponCategory = key;
}

// ====================================================================================
// 技能过滤
// ====================================================================================
// 为了保证展开动画效果，隐藏和激活分成2个控制变量
const skillFilterShow = ref(false);
function toggleSkillFilter() {
    skillFilterShow.value = !skillFilterShow.value;
    // 关闭后清空过滤器
    if (!skillFilterShow.value) {
        filterConfig.skillFilter = {
            category: 0,
            tag: '',
            skill: 0,
        };
    }
}

function changeSkillFilter(key: keyof FilterConfig['skillFilter'], value: any) {
    // 不是很懂这里为什么类型变成never了，只好any一下
    (filterConfig.skillFilter as any)[key] = value;
    if (key === 'tag') {
        filterConfig.skillFilter.skill = 0;
    }
}
// ====================================================================================
// 重置
// ====================================================================================
function resetAllFilter() {
    skillFilterShow.value = false;
    props.resetFilter();
}
</script>
<style lang="less">
.skill-filter {
    height: 0;
    opacity: 0;
    transition: all 0.4s;

    &.active {
        height: auto;
        opacity: 1;
    }
}
</style>
