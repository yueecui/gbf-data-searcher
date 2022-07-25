<template>
    <n-collapse-transition :show="show">
        <n-space vertical>
            <n-form-item label="加成类型">
                <n-space size="small">
                    <n-button
                        class="min-w-[4rem]"
                        size="tiny"
                        color="#066bb3"
                        v-for="category in skillCategoryOptions"
                        :ghost="skillFilter.category !== category.key"
                        :key="category.key"
                        @click="changeFilter('category', category.key)"
                    >
                        {{ category.label }}
                    </n-button>
                </n-space>
            </n-form-item>
            <n-form-item>
                <template #label>
                    <n-tooltip trigger="hover">
                        <template #trigger>
                            <div class="cursor-help">
                                技能标签
                                <i class="fa fa-question-circle" aria-hidden="true"></i>
                            </div>
                        </template>
                        这里过滤的是技能的标签，不是技能实际的效果<br />所以无法过滤非常规的特殊技能中的效果<br />例如：星幽武器的2技能和先祖武器（六龙掉落）的2技能
                    </n-tooltip>
                </template>
                <n-space size="small">
                    <n-button
                        class="min-w-[4rem]"
                        size="tiny"
                        color="#066bb3"
                        v-for="tag in skillTagOptions"
                        :ghost="skillFilter.tag !== tag.key"
                        :key="tag.key"
                        @click="changeFilter('tag', tag.key)"
                    >
                        {{ tag.label }}
                    </n-button>
                </n-space>
            </n-form-item>
            <n-form-item label="技能名称">
                <n-space size="small">
                    <n-button
                        class="min-w-[4rem]"
                        size="tiny"
                        color="#066bb3"
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
import { NButton, NCollapseTransition, NFormItem, NSpace, NTooltip } from 'naive-ui';
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
