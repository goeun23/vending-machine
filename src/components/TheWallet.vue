<template>
<div v-if="showWallet" class="m-auto px-8 py-8 grid grid-cols-1 gap-4 rounded-lg" style="background-color:lightgray;">
         
    wallet section 
    <div v-if="paymentMethod == 'card'">
    card
    <div class="rounded-lg gap-4 p-4" style="background-color:white;" > 
        <img @click="setCardtoMachine(true)" :src="imgcard" style="width: 100px; height: 100px; margin: auto;"/> 
    </div>
    </div>
    <div v-else>
    money
    <div class="grid grid-cols-3 gap-4 p-4">
        <div class="rounded-lg gap-4 p-4" style="background-color:white;" > 
            <button @click="addMoneytoMachine(10000)"> 10,000</button>
        </div>
        <div class="rounded-lg gap-4 p-4" style="background-color:white;" > 
            <button @click="addMoneytoMachine(5000)">5,000</button>
        </div>
        <div class="rounded-lg gap-4 p-4" style="background-color:white;" > 
            <button @click="addMoneytoMachine(1000)">1,000</button>
        </div>
        
    </div>
    <div class="grid grid-cols-2 grid-rows-1 gap-4 p-4">
        <div class="rounded-lg gap-4 p-4" style="background-color:white;" > 
            <button @click="addMoneytoMachine(500)">500</button>
        </div>
        <div class="rounded-lg gap-4 p-4" style="background-color:white;" > 
            <button @click="addMoneytoMachine(100)">100</button>
        </div>
    </div>
    </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    computed :{
        ...mapGetters('vending', ['paymentMethod']), 
        ...mapGetters('wallet', ['showWallet']), 

    },
    methods :{
        ...mapActions('vending', [ 'setCardtoMachine']),
        ...mapActions('wallet', ['addMoneytoMachine', 'setCardtoMachine'])
    },
    data(){
        return {
            imgcard : "/card.png",
        }
    }
}
</script>