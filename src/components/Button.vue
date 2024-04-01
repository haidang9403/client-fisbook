<script setup>

defineProps({
    type: String,
    secondary: Boolean,
    warning: Boolean,
    danger: Boolean,
    shadow: Boolean,
    disabled: Boolean,
})

const emit = defineEmits(['onClick']);

</script>

<template>
    <button :type="type" class="flex font-semibold gap-2 items-center justify-center focus:ring-2 rounded-lg text-sm px-5 py-2.5 focus:outline-none"
        :class="{
                'text-black border border-gray-200 bg-white  hover:bg-gray-100 focus:ring-gray-100': secondary,
                'text-white bg-red-700 hover:bg-red-800 focus:ring-red-300': danger,
                'text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-300': warning,
                'text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 ': !secondary && !danger && !warning,
                'shadow-lg shadow-blue-300': shadow && !secondary && !danger && !warning,
                'shadow-lg shadow-red-200': shadow && danger,
                'shadow-lg shadow-yellow-100': shadow && warning,
                'shadow-lg shadow-gray-50': shadow && secondary
            }" 
        @click="emit('onClick')"
        :disabled="disabled"
        >
        <slot>

        </slot>
    </button>

</template>