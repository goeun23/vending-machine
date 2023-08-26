<script>
import HelloWorld from './components/HelloWorld.vue'
import TheVendingMachine from "./components/TheVendingMachine.vue"
import TheWallet from "./components/TheWallet.vue"
import TheStockStatus from "./components/TheStockStatus.vue"
export default{
  components:{
    TheVendingMachine, 
    TheWallet, 
    TheStockStatus
  },
  data(){
    return{
      paymentMethod : "",
      showWallet : false,
      imgcard : "/card.png",
      drinkList : [
        {
          name : "커피", imgsrc : "/coffee.png", price : 900, count:19
        },
        {
          name : "콜라", imgsrc : "/coke.png", price : 900, count:10
        },
        {
          name : "물", imgsrc : "/water.png", price : 900, count:4
        }
      ], 
      total : 0,
      activeDrinkCalss : "border-solid border-2 border-indigo-600"

    }
  }, 
  methods:{
    setPaymentMethod(){
      this.paymentMethod = confirm('카드로 결제하시겠습니까?') ? "card" : "money"
      this.openMyWallet();
    }, 
    openMyWallet(){
      this.showWallet = true;
    },
    closeMyWallet(){
      this.showWallet = false;
    },
  }
}
</script>

<template>
    <div class="px-24 py-20 grid grid-cols-2 grid-rows-1 gap-4">
      <the-vending-machine/>
      <div class="grid grid-cols-1 gap-4 ">
        <the-status-stock/>
        <the-wallet v-if="showWallet"/>
      </div>
    </div>
    <!--wallet -->      
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>
