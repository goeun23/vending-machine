<template>
<div class="rounded-lg m-2 p-2 custom-number-input w-32 bg-white" >
    <label for="custom-input-number" class="w-full text-gray-700 text-sm font-semibold">{{drink.name}}</label>
    <div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
        <button @click="$emit('updateDrinkCount', {key: drink.key, method : 'sub'})" data-action="decrement" class=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
            <span class="m-auto text-2xl font-thin">−</span>
        </button>
        <input v-model="drink.count" readonly type="number" class="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none" name="custom-input-number"/>
        <button @click="$emit('updateDrinkCount',{key: drink.key, method : 'add'})" data-action="increment" class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
            <span class="m-auto text-2xl font-thin">+</span>
        </button>
    </div>
</div>
</template>

<script setup>
const props = defineProps({
    drink: Object
})
const emit = defineEmits(['updateDrinkCount'])
</script>

<style scope>

  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .custom-number-input input:focus {
    outline: none !important;
  }

  .custom-number-input button:focus {
    outline: none !important;
  }

</style>