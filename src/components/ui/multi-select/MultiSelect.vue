<script setup>
import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { TagsInput, TagsInputInput } from '@/components/ui/tags-input';
import { Badge } from '@/components/ui/badge';
import {
  ComboboxAnchor,
  ComboboxContent,
  ComboboxInput,
  ComboboxPortal,
  ComboboxRoot,
} from 'radix-vue';
import { computed, ref } from 'vue';
import { ChevronDownIcon, X, Check } from 'lucide-vue-next';

const props = defineProps({
  placeholder: {
    type: String,
    required: false,
  },
  options: {
    type: Array,
    required: false,
    default: () => [],
  },
  collapseTags: {
    type: Boolean,
    default: true,
  },
  showTagsLimit: {
    type: Number,
    default: 0,
  }
});

const modelValue = defineModel('modelValue');
const open = ref(false);
const searchTerm = ref('');

const filteredOptions = computed(() => {
  return props.options.filter((i) => !modelValue.value.includes(i.value));
});

const findLabelById = (id) => {
  const option = props.options.find((opt) => opt.value === id);
  return option ? option.label : 'Unknown';
};

// Toggle function for the popover
const toggleOpen = () => {
  open.value = !open.value;
};

const handleRemove = (value) => {
  // console.log(label)
  modelValue.value = modelValue.value.filter((i) => i !== value);
};

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div>
    <TagsInput class="px-0 gap-0 w-full cursor-pointer relative" :model-value="modelValue"  >
      <ChevronDownIcon class="cursor-pointer size-4 mr-3 absolute right-0" @click="toggleOpen"/>
      <ComboboxRoot v-model="modelValue" v-model:open="open" v-model:search-term="searchTerm" class="w-full" @update:modelValue="handleChange">
        <ComboboxAnchor as-child>
          <div class="flex items-center w-full" @click="toggleOpen">
            <div class="flex gap-2 flex-wrap items-center px-2">
              <div v-if="modelValue.length>0" class="flex items-center gap-2" v-for="(item, index) in modelValue" :key="item">
                <Badge  v-if="collapseTags && index>showTagsLimit" variant="secondary" class="gap-2 py-1 px-2 text-black rounded">
                  +{{index}}
                </Badge>
                <Badge v-else variant="secondary" class="gap-2 py-1 px-2 text-black rounded">
                  {{ findLabelById(item) }}
                  <!--                  <X class="cursor-pointer size-3" @click="handleRemove(item)" />-->
                </Badge>
              </div>
              <div v-else class="flex items-center gap-2 py-1 opacity-60">请选择</div>
            </div>
          </div>
        </ComboboxAnchor>

        <ComboboxContent>
          <CommandList position="popper"
                       class="w-[--radix-popper-anchor-width] z-[100] rounded-md mt-2 border bg-popover text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
            <CommandEmpty />
            <CommandGroup>
              <CommandItem v-for="option in options" :key="option.value" :value="option.value"
                           @select.prevent="(ev) => {
                                        if (modelValue.includes(ev.detail.value)) {
                                          modelValue.splice(modelValue.indexOf(ev.detail.value), 1);
                                        } else {
                                            modelValue.push(ev.detail.value);
                                        }
                                        emit('update:modelValue', modelValue);
                                    }
                                    ">
                <div class="w-full flex items-center justify-between" :class="modelValue.includes(option.value)?'text-primary':''">
                  {{ option.label }}
                  <Check v-if="modelValue.includes(option.value)" class="w-4 h-4"/>
                </div>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </ComboboxContent>
      </ComboboxRoot>
    </TagsInput>
  </div>
</template>