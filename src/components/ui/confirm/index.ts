import { createApp, h } from 'vue';
import ConfirmDialog from '@/components/ui/confirm/GlobalConfirm.vue';

let instance: any;

export function useConfirm() {
    if (!instance) {
        // 动态创建 Vue 实例并挂载到 body
        const container = document.createElement('div');
        document.body.appendChild(container);
        const app = createApp(ConfirmDialog);
        instance = app.mount(container);
    }
    return instance.openDialog;
}