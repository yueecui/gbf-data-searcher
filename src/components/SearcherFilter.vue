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
                <n-form-item label="武器分类">
                    <n-dropdown trigger="click" :options="weaponCategoryOptions" @select="changeWeaponCategory">
                        <n-button class="min-w-[15rem]">{{ getWeaponTypeName(filterConfig.weaponCategory) }}</n-button>
                    </n-dropdown>
                </n-form-item>
                <n-form-item label="武器技能">
                    <n-button color="#31bbd7" :ghost="!skillFilterActive" @click="toggleSkillFilter">
                        <template v-if="skillFilterActive"> 收起</template><template v-else> 展开</template>
                    </n-button>
                </n-form-item>
            </n-space>
            <n-collapse-transition :show="skillFilterActive">
                <n-form-item label="加成类型">
                    <n-space size="small">
                        <n-button
                            class="min-w-[4rem]"
                            size="tiny"
                            color="#31bbd7"
                            :ghost="filterConfig.skillCategory !== category.key"
                            v-for="category in skillCategoryOptions"
                            :key="category.key"
                            @click="changeSkillCategory(category.key)"
                        >
                            {{ category.label }}
                        </n-button>
                    </n-space>
                </n-form-item>
            </n-collapse-transition>
            <n-space>
                <n-button type="primary">重置</n-button>
            </n-space>
        </n-space>
    </n-form>
</template>

<script setup lang="ts">
import { NButton, NCollapseTransition, NDropdown, NForm, NFormItem, NInput, NSpace } from 'naive-ui';
import { computed, inject, ref } from 'vue';
import { ElementTypeNameMap, RarityTypeNameMap, WeaponTypeNameMap } from '../enums/constant';
import { generateSkillCategoryFilter, getWeaponFilterConfig, getWeaponTypeName } from '../module/getData';
import type { FilterConfig } from '../types/filter';

const filterConfig = inject('filterConfig') as FilterConfig;

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
const skillFilterActive = ref(false);
function toggleSkillFilter() {
    skillFilterActive.value = !skillFilterActive.value;
}

const skillCategoryOptions = computed(() => [
    {
        label: '全部',
        key: 0,
    },
    ...generateSkillCategoryFilter(),
]);

function changeSkillCategory(key: number) {
    filterConfig.skillCategory = key;
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
