<template>
    <n-collapse-transition :show="show">
        <n-space vertical>
            <n-form-item label="加成类型">
                <n-space size="small">
                    <n-button
                        class="min-w-[4rem]"
                        size="tiny"
                        color="#31bbd7"
                        v-for="category in skillCategoryOptions"
                        :ghost="skillFilter.category !== category.key"
                        :key="category.key"
                        @click="changeFilter('category', category.key)"
                    >
                        {{ category.label }}
                    </n-button>
                </n-space>
            </n-form-item>
            <n-form-item label="属性过滤">
                <n-space size="small">
                    <n-button
                        class="min-w-[4rem]"
                        size="tiny"
                        color="#31bbd7"
                        v-for="tag in skillTagOptions"
                        :ghost="skillFilter.tag !== tag.key"
                        :key="tag.key"
                        @click="changeFilter('tag', tag.key)"
                    >
                        {{ tag.label }}
                    </n-button>
                </n-space>
            </n-form-item>
            <n-form-item label="技能过滤">
                <n-space size="small">
                    <n-button
                        class="min-w-[4rem]"
                        size="tiny"
                        color="#31bbd7"
                        v-for="skill in skillTypeOptions"
                        :ghost="skillFilter.skill !== skill.key"
                        :key="skill.key"
                        @click="changeFilter('skill', skill.key)"
                    >
                        {{ skill.label }}
                    </n-button>
                </n-space>
            </n-form-item>
        </n-space>
    </n-collapse-transition>
</template>

<script setup lang="ts">
import { NButton, NCollapseTransition, NFormItem, NSpace } from 'naive-ui';
import { computed } from 'vue';
import { generateSkillCategoryFilter, generateSkillTagFilter, generateSkillTypeFilter } from '../module/getData';
import type { FilterConfig } from '../types/filter';

const props = defineProps<{
    skillFilter: FilterConfig['skillFilter'];
    show: boolean;
    changeFilter: (key: keyof FilterConfig['skillFilter'], value: any) => void;
}>();

const skillCategoryOptions = computed(() => [
    {
        label: '全部',
        key: 0,
    },
    ...generateSkillCategoryFilter(),
]);

const skillTagOptions = computed(() => [
    {
        label: '全部',
        key: '',
    },
    ...generateSkillTagFilter(),
]);

const skillTypeOptions = computed(() => [
    {
        label: '全部',
        key: 0,
    },
    ...generateSkillTypeFilter(props.skillFilter.tag),
]);
</script>
