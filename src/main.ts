import './assets/tailwind.css';

import { createApp } from 'vue';
import Package from '../package.json';
import App from './App.vue';

createApp(App).mount('#gbf-data-searcher');

console.log(`${Package.displayName} loaded! author: ${Package.author}. Version: ${Package.version}`);
