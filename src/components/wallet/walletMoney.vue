<template>
    <div class="rounded-lg gap-4 p-4" style="background-color:white;" > 
        <button @click="$emit('addMoneytoMachine',money.value)">{{money.text}}</button>
    </div>
</template>

<script setup>
const props = defineProps({
    money: Object
})
const emit = defineEmits(['addMoneytoMachine'])
</script>