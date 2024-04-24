<script setup>
import Dropdown from './Dropdown.vue';
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';

const emit = defineEmits(['getValue']);
defineProps({
    id: String
})


const route = useRoute();

const dropdownLabel = ref(null);
const valueSort = computed(() => route.query.sort || 'default');


const handleClick = (value, label) => {
    dropdownLabel.value = label;
    emit('getValue', value)
}

const sorts = computed(() =>
    
    [
        {
            label: 'Mặc định',
            value: 'default',
            active: valueSort.value === 'default'
        },
        {
            label: 'Mới nhất',
            icon: 'fa-regular fa-clock',
            value: 'newest',
            active: valueSort.value === 'newest'
        },
        {
            label: 'Cũ nhất',
            icon: 'fa-solid fa-clock',
            value: 'oldest',
            active: valueSort.value === 'oldest'
        },
        {
            label: 'Giá cao → thấp',
            icon: 'fa-solid fa-arrow-down-9-1',
            value: 'price,down',
            active: valueSort.value === 'price,down'
        },
        {
            label: 'Giá thấp → cao',
            icon: 'fa-solid fa-arrow-down-1-9',
            value: 'price,up',
            active: valueSort.value === 'price,up'
        }
    ]
) 

watch(sorts,() => {
    dropdownLabel.value = sorts.value.filter((sort) => sort.active)[0].label
});

</script>

<template>
    <Dropdown :id="id" transparent icon="fa-solid fa-arrow-down-wide-short" :label="dropdownLabel" default-label="Mặc định">
        <div
            v-for="(sort,index) in sorts" 
            @click="() => handleClick(sort.value, sort.label)"
            :key="index"
            class="flex gap-4 items-center text-sm py-2 px-4 cursor-pointer hover:bg-gray-100"
            :class="{
                'pointer-events-none text-blue-500': sort.active
            }"
        >
            <i :class="sort.icon"></i>
            {{ sort.label }}
        </div>
    </Dropdown>
</template>