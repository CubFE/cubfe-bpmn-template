import { defineStore } from 'pinia';
import { ref } from 'vue';
import i18n from '@/core/plugins/i18n';

type layoutType = 'sidebar' | 'sideblock' | 'navbar';
type widthModeType = 'fluid' | 'boxed';
export const useSysStore = defineStore('system', () => {
    const language = ref(localStorage.getItem('language') || 'en');
    const layout = ref((localStorage.getItem('layout') || 'sidebar').trim() as layoutType);
    const widthMode = ref((localStorage.getItem('widthMode') || 'fluid').trim() as widthModeType);
    const sidebarOpen = ref(JSON.parse(localStorage.getItem('sidebarOpen') || 'true'));

    // Set language
    const setLanguage = (newValue: string) => {
        language.value = newValue;
        localStorage.setItem('language', newValue);

        // Update i18n instance
        i18n.global.locale.value = newValue;
    };

    const setLayout = (newValue: layoutType) => {
        layout.value = newValue;
        localStorage.setItem('layout', newValue);
    }

    const setWidthMode = (newValue: widthModeType) => {
        widthMode.value = newValue;
        localStorage.setItem('widthMode', newValue);
    }

    const setSidebarOpen = (newValue: boolean) => {
        sidebarOpen.value = newValue;
        localStorage.setItem('sidebarOpen',  JSON.stringify(newValue));
    }
    return {
        language,
        setLanguage,
        layout,
        setLayout,
        widthMode,
        setWidthMode,
        sidebarOpen,
        setSidebarOpen
    };
});