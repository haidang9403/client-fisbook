<script setup>

defineProps({
    icon: String,
})

</script>

<template>
    <div class="w-full min-w-60 flex items-center p-4 gap-4 bg-white rounded-lg my-12">
        <div class="bg-gray-200 rounded-xl size-12 grid place-items-center text-gray-700">
            <i :class="icon"></i>
        </div>
        <div class="flex flex-col justify-between flex-1">
            <h4 class=" font-bold">
                <slot>

                </slot>
            </h4>
            <p class="text-xs">
                <slot name="subtitle">

                </slot>
            </p>
        </div>
    </div>
</template>