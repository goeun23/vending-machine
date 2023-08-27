<template>
    <div class="m-auto px-8 py-8 gap-4 rounded-lg" style="background-color: lightsteelblue;">
        음료수 재고(수량 조정 가능)
        <div class="grid grid-cols-4" >
            <vendingStockButton 
                v-for="(drink, index) in drinkList" :key="index" 
                :drink="drink"
                @updateDrinkCount="updateDrinkCount"
            />
        </div>
    </div>
</template>


<script>
import { mapActions, mapGetters } from 'vuex'
import vendingStockButton from '@/components/vendingMachine/vendingStockButton.vue'
export default {
    components: {
        vendingStockButton
    },
    computed :{
        ...mapGetters('vending', ['drinkList']), 
    },
    methods: {
        ...mapActions('vending', ['updateDrinkCount']), 
    }
}
</script>

