<template>
<div class="m-auto px-8 py-8 gap-4 rounded-lg" style="background-color: lightsteelblue;">
    음료수 재고(수량 조정 가능)
    <div class="grid grid-cols-3">
    <div class="rounded-lg m-2 p-2" v-for="(drink, index) in drinkList" :key="index"  style="background-color: white;"> 
        <span class="">{{drink.name}} </span>
        <div class="m-auto flex ">
            <button class="p-2" @click="updateDrinkCount({key: drink.key, method : 'sub'})"><span>-</span></button>
            <input style="width:100%;" readonly type="number" v-model="drink.count"/>
            <button class="p-2" @click="updateDrinkCount({key: drink.key, method : 'add'})"><span>+</span></button>
        </div>
    </div>
    </div>
</div>
</template>


<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    computed :{
        ...mapGetters('vending', ['drinkList']), 
    },
    methods: {
        ...mapActions('vending', ['updateDrinkCount']), 
    }
}
</script>