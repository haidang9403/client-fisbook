<script setup>
import { useRouter, useRoute } from 'vue-router';
import LayoutItem from './LayoutItem.vue';
import { computed } from 'vue';
import Sort from './Sort.vue';

const props = defineProps({
    labelHeaders: Object,
    search: String
})

const emits = defineEmits(['onRemove', 'onRemoveAll'])

const checkEmptyLabel = () => {
    for(let key in props.labelHeaders){
        if(Array.isArray(props.labelHeaders[key]) && props.labelHeaders[key].length >  0){
            return true
        }
    }

    return false
}

const route = useRoute();
const router = useRouter();

const query = computed(() => router.currentRoute.value.query)
const path = computed(() => router.currentRoute.value.path)

const handleSort = (sort) => {
    router.push({
        path: path.value,
        query: {
            ...query.value,
            sort
        }
    })
}

const handleClick = (layout) => {
    router.push({
        path: path.value,
        query: {
            ...query.value,
            layout
        }
    })
}

const layouts = computed(() => 
    [   
        {
            icon: 'fa-solid fa-table-cells',
            layout: 'y',
            active: !route.query.layout ||  route.query.layout === 'y'
        },
        {
            icon: 'fa-solid fa-table-cells-large',
            layout: 'x',
            active: route.query.layout === 'x'
        }
    ]
)

</script>

<template>
    <div 
        class="w-full border bg-white border-gray-200 rounded-lg overflow-hidden flex"
        :class="{
            'justify-end': !checkEmptyLabel()
        }"
    >
        <div @click="emits('onRemoveAll', Object.keys(labelHeaders))" v-if="checkEmptyLabel()" class="flex text-sm pl-4 gap-2 py-2 px-4 cursor-pointer items-center text-red-600 hover:text-red-400 rounded-lg">
            <i class="fa-regular fa-trash-can"></i>
            Xóa tất cả
        </div>
        <div class=""></div>

        <div v-if="checkEmptyLabel()" class="flex flex-1 overflow-y-auto py-3 items-center gap-2 text-sm">
            <div v-for="(items, key) in labelHeaders"  :key="key" class="flex gap-2">
                <div v-for="item in items" :key="item._id" class="rounded-full text-xs px-4 py-1 flex items-center border gap-2 border-blue-600 bg-blue-100 text-blue-600">
                    <p class="line-clamp-1 truncate">{{ item.label }}</p>
                    <div @click="emits('onRemove', item._id, key)" class="text-sm cursor-pointer hover:text-blue-400">
                        <i class="fa-solid fa-circle-xmark"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex items-center">
            <div class="p-2 flex gap-1">
                <LayoutItem 
                    v-for="(layout, index) in layouts"
                    :key="index"
                    :icon="layout.icon"
                    :layout="layout.layout"
                    :active="layout.active"
                    @on-click="handleClick"
                />
            </div>
            <div class="border-l border-gray-200 rounded-r-lg flex items-center mx-2">
                <Sort
                    id="sort"
                    @get-value="handleSort"
                />
            </div>
        </div>
    </div>
</template>