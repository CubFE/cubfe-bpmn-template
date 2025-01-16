import { ref, onUnmounted } from "vue";
import { createApp } from "vue";
import Loading from "@/components/ui/loading/Loading.vue";

let loadingInstance: any = null; // 保存全局 Loading 实例
const visible = ref(false);

// 初始化 Loading 组件实例
const initGlobalLoading = () => {
    if (!loadingInstance) {
        const app = createApp(Loading, { visible }); // 传递可响应的 visible
        const container = document.createElement("div");
        document.body.appendChild(container);
        loadingInstance = app.mount(container);
    }
};

// 自定义 Hook
export const useLoading = () => {
    const showLoading = () => {
        if (!loadingInstance) initGlobalLoading();
        visible.value = true;
    };

    const hideLoading = () => {
        visible.value = false;
    };

    // 在组件卸载时清除状态
    onUnmounted(() => {
        hideLoading();
    });

    return { showLoading, hideLoading };
};