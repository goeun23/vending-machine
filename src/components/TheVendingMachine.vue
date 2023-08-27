<template>
<div class="m-auto px-8 py-8 grid grid-cols-1 gap-4 rounded-lg" style="background-color:lightblue;">
          <!--vending machine -->
          <div>
            vending machine 
          </div>

          <div class="grid grid-cols-1 grid-rows-1 gap-4">
              <div v-if="paymentMethod == ''" class="flex gap-4">
                <button class="rounded-lg p-4 bg-white" @click="setPaymentMethod('card')">
                  카드로 결제하기</button>
                <button class="rounded-lg p-4 bg-white" @click="setPaymentMethod('money')">
                  현금으로 결제하기</button>
              </div>
              <div class="w-full flex gap-4" v-else>
                <div class="w-3/4 rounded-lg p-4 bg-white">
                  <button @click="resetPaymentMethod()">처음으로 돌아가기</button>
                </div>
                <div class="w-1/4 rounded-lg p-4 bg-white ">
                  <span class="underline">{{paymentMethod == "card" ? "카드":"현금"}} 결제</span>
                </div>
              </div>
          </div>

          <template v-if="paymentMethod !== ''">
          
          <div class="flex w-full gap-4">
              <div class="w-3/6 bg-white rounded-lg p-4">
                <span v-if="paymentMethod == 'money'">잔액(투입금액) : {{machineTotalPrice}} </span>
                <span v-else>{{isPaymentCardInput ? "카드가 투입되었습니다." : "카드를 투입해주세요."}}</span>
              </div>
              <div class="w-2/6 bg-white rounded-lg p-4">
                <span>남은 시간⏳ : {{availablePaymentTime}}</span>
              </div>
              <div class="w-1/6 bg-white rounded-lg p-4">
                <button @click="restorePaymentoWallet()">반환↩️</button>
              </div>
          </div>


          <div class="grid gap-4 
            lg:grid-cols-4 
            lg:grid-rows-1 
            sm:grid-cols-none 
            md:grid-cols-none" >
              <div 
                v-for="(drink, index) in drinkList" :key="index" 
                :class="drink.active? activeDrinkCalss:''" 
                class="rounded-lg gap-4 p-4 bg-white" >
                <a @click="drinkDispenseHandler(drink)">
                  <img :src="`/${drink.key}.png`" class="m-auto" style="height:150px;"/> 
                  <div class="m-auto text-center grid">
                    <span>{{drink.name}}</span>
                    <span>{{drink.price}}</span>
                  </div>
                </a>
              </div>
              
          </div>

          <div class="grid grid-cols-1 grid-rows-1 gap-4">
              <div class="rounded-lg p-4 bg-white">out
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
            'drinkList', 
            'paymentMethod', 
            'machineTotalPrice', 
            'restoreMachineToWalletObj',
            'outputMessage', 
            'isPaymentCardInput',
            'availablePaymentTime'
        ]), 
        ...mapGetters('vending', ['showWallet']), 
    },
    methods: {
        ...mapActions('vending', 
          [
            'savePaymentMethod', 
            'resetPaymentMethod', 
            'restorePaymentoWallet', 
            'drinkDispenseHandler', 
          ]),

        ...mapActions('wallet', ['setWalletStatus']), 
    
        setPaymentMethod(paymentMethod){
            this.savePaymentMethod(paymentMethod);
            this.setWalletStatus(true);
        }, 
        
    }
}
</script>