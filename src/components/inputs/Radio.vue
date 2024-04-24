<script setup>

defineProps({
    label: String,
    type: String,
    id: String,
    errors: {
        type: Object,
        default(){
            return {}
        }
    },
    disabled: Boolean,
    required: Boolean,
    data: Array
})

const emits = defineEmits(['inFocus'])

const model = defineModel()
</script>

<template>
    <div class="flex flex-col">
        <div class="flex gap-8">
            <h4 class="text-sm">{{  label }}</h4>
            <div class="flex item">
                <div v-for="(item,index) in data" :key="index" data class="flex items-center me-4">
                    <input @click="emits('inFocus')" :id="item.value + '-radio'" type="radio" :value="item.value" v-model="model" class="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 focus:ring-transparent">
                    <label :for="item.value + '-radio'" class="ms-2 text-sm font-medium text-gray-900 cursor-pointer ">{{  item.label }}</label>
                </div>
            </div>
        </div>
        <p v-if="errors[id]" class="mt-2 text-sm text-red-600">{{ errors[id] }}</p>
    </div>
</template>