<template>
    <header>
        <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

        <div class="wrapper">
            <HelloWorld msg="You did it!" />
        </div>
    </header>

    <main>
        <TheWelcome />
    </main>

    <div>
        <h3> wiki资源使用 </h3>
        <table class="wikitable test">
            <tr>
                <th> 类型 </th>
                <th> 描述 </th>
            </tr>
            <tr>
                <td> 图片的引用方法 </td>
                <td> <img :src="getImageUrl('M_1040913900.jpg')" /></td>
            </tr>
            <tr>
                <td> 武器数据 </td>
                <td> {{ name }}</td>
            </tr>
        </table>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import TheWelcome from './components/TheWelcome.vue';
import { getGbfData } from './module/getData';
import { getImageUrl } from './module/getImageUrl';

const gameData = getGbfData();

const name = computed(() => {
    return gameData[0].n;
});
</script>

<style lang="less">
// @import '/common';
.test {
    background: url('@{ImageUrl}/gbf/uploads/3/34/M_1040913900.jpg');
}

/*
#app {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;

    font-weight: normal;
}

header {
    line-height: 1.5;
}

.logo {
    display: block;
    margin: 0 auto 2rem;
}

a,
.green {
    text-decoration: none;
    color: hsla(160, 100%, 37%, 1);
    transition: 0.4s;
}

@media (hover: hover) {
    a:hover {
        background-color: hsla(160, 100%, 37%, 0.2);
    }
}

@media (min-width: 1024px) {
    body {
        display: flex;
        place-items: center;
    }

    #app {
        display: grid;
        grid-template-columns: 1fr 1fr;
        padding: 0 2rem;
    }

    header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }

    .logo {
        margin: 0 2rem 0 0;
    }
} */
</style>
