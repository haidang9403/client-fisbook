<script setup>

defineProps({
    active: Boolean,
    icon: String,
    layout: {
        type: String,
        default: 'y',
    }
})

const emit = defineEmits(['onClick'])

</script>

<template>
    <div 
        class="size-10 cursor-pointer hover:bg-gray-200 rounded-lg grid place-items-center"
        :class="{
            'hover:bg-gray-200 hover:text-black text-gray-200': !active,
            'text-blue-400 pointer-events-none': active
        }"
        @click="emit('onClick', layout)"
    >
        <i :class="icon"></i>
    </div>
</template>