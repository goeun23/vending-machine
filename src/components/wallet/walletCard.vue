<template>
    <div>
        <div class="rounded-lg gap-4 p-4" style="background-color:white;" > 
        나의 카드💳
            <img 
                @click="setCardtoMachine(true)" 
                src="/card.png" 
                style="width: 100px; height: 100px; margin: auto;"/> 
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['setCardtoMachine'])
</script>