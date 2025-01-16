import { ref } from 'vue';

export const dialogState = () => {
    const isOpen = ref(false);
    function closeDialog(callback: () => void) {
        isOpen.value = false;
        callback()
    }

    return [isOpen, closeDialog];
};
