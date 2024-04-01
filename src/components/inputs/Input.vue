<template>
    <div class="mb-6">
        <div class="relative">
            <input @focusin="emit('inFocus')" v-model="model" :type="type" :id="id" :disabled="disabled"
                class=" block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border-1 focus:outline-none focus:ring-0 peer"
                :class="{
                    'bg-gray-100 opacity-80 cursor-not-allowed': disabled,
                    ' border-red-500 text-red-900 focus:border-red-600': errors[id],
                    ' text-gray-900 border-gray-300 focus:border-blue-600 ': !errors[id]
                }" 
                placeholder="" 
            />
            <label :for="id"
                class="absolute text-sm bg-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0]  px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                :class="{
                    'text-red-700 peer-focus:text-red-700': errors[id],
                    'text-gray-500 peer-focus:text-blue-600': !errors[id]
                }"
            >
                {{ label }}
            </label>
        </div>
        <p v-if="errors[id]" class="mt-2 text-sm text-red-600">{{ errors[id] }}</p>
    </div>
</template>

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
    placeholder: String
})

const emit = defineEmits(['inFocus'])


const model = defineModel();

</script>