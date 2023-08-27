<template>
<div class="m-auto px-8 py-8 grid grid-cols-1 gap-4 rounded-lg" style="background-color:lightblue;">
          <!--vending machine -->
          <div>
            vending machine 
          </div>

          <div class="grid grid-cols-1 grid-rows-1 gap-4">
              <div v-if="paymentMethod !== ''" class="rounded-lg p-4" style="background-color:white;">
                <button  @click="resetPaymentMethod()">처음으로 돌아가기</button>
              </div>
              <div v-else class="flex gap-4">
                <button class="rounded-lg p-4" style="background-color:white;" @click="setPaymentMethod('card')">
                  카드로 결제하기</button>

                <button class="rounded-lg p-4" style="background-color:white;" @click="setPaymentMethod('money')">
                  현금으로 결제하기</button>
              </div>
          </div>

          <template v-if="paymentMethod !== ''">
          
          

          <!-- <div class="grid grid-cols-2 grid-rows-1 gap-4"> -->
          <div style="width:100%; display: flex; gap:10px">
              <div style="width:60%; background-color:white;" class="rounded-lg p-4" >잔액(투입금액) 
                <span>{{paymentMethod == "card" ? "-" : machineTotalPrice}}</span>
              </div>
              <div style="width:25%; background-color:white;" class="rounded-lg p-4">
                <span v-if="paymentMethod !== ''">{{paymentMethod == "card" ? "카드":"현금"}} 결제</span>
              </div>
              <div style="width:15%; background-color:white;" class="rounded-lg p-4">
                <button @click="restoreMoneytoWallet()">반환</button>
              </div>
          </div>


          <div class="grid grid-cols-3 grid-rows-1 gap-4" >
              <div 
                v-for="(drink, index) in drinkList" :key="index" 
                style="background-color:white;" 
                :class="drink.active? activeDrinkCalss:''" 
                class="rounded-lg gap-4 p-4" 
                @click="drinkDispenseHandler(drink)">
                  <img :src="`/${drink.key}.png`" class="m-auto" style="height:150px;"/> 
                <div class="m-auto text-center">
                  <span>{{drink.name}}</span>
                  <span>{{drink.price}}</span>
                </div>
                
              </div>
              
          </div>

          <div class="grid grid-cols-1 grid-rows-1 gap-4">
              <div class="rounded-lg p-4" style="background-color:white;">out
                <span v-html="outputMessage"></span>
              </div>
          </div>

          </template>
      </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default{

  data(){
    return{
      activeDrinkCalss : "border-solid border-2 border-indigo-600",
    }
  },
    
    computed :{
        ...mapGetters('vending', 
          [
            'showWallet', 
            'drinkList', 
            'paymentMethod', 
            'machineTotalPrice', 
            'restoreMachineToWalletObj',
            'outputMessage'
        ]), 
    },
    methods: {
        ...mapActions('vending', 
          [
            'savePaymentMethod', 
            'setWalletStatus', 
            'resetPaymentMethod', 
            'restoreMoneytoWallet', 
            'drinkDispenseHandler'
          ]), 
    
        setPaymentMethod(paymentMethod){
            this.savePaymentMethod(paymentMethod);
            this.setWalletStatus(true);
        }, 
        
    }
}
</script>