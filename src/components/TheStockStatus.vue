<template>
    <div class="m-auto px-8 py-8 gap-4 rounded-lg" style="background-color: lightsteelblue;">
        음료수 재고(수량 조정 가능)
        <div class="grid grid-cols-4" >
            <vending-machine-stock-button 
                v-for="(drink, index) in drinkList" :key="index" 
                :drink="drink"
                @updateDrinkCount="updateDrinkCount"
            />
        </div>
    </div>
</template>


<script>
import { mapActions, mapGetters } from 'vuex'
import vendingMachineStockButton from '@/components/vendingMachine/vendingMachineStockButton.vue'
export default {
    components: {
        vendingMachineStockButton
    },
    computed :{
        ...mapGetters('vending', ['drinkList']), 
    },
    methods: {
        ...mapActions('vending', ['updateDrinkCount']), 
    }
}
</script>

