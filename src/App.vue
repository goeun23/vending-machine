<script>
import HelloWorld from './components/HelloWorld.vue'
import TheVendingMachine from "./components/TheVendingMachine.vue"
import TheWallet from "./components/TheWallet.vue"
import TheStockStatus from "./components/TheStockStatus.vue"
import {mapActions} from 'vuex'

export default{
  components:{
    TheVendingMachine, 
    TheWallet, 
    TheStockStatus
  },
  data(){
    return{
      total : 0,
    }
  }, 
}
</script>

<template>
    <div class="
      grid grid-rows-1 gap-4 w-full h-full max-w-[85rem] 
      sm:px-6 
      sm:grid-cols-none
      sm:mx-auto
      sm:px-10
      sm:py-10
      md:grid-cols-none 
      md:p-10
      lg:px-24 
      lg:py-20 
      lg:px-8 mx-auto 
      lg:grid-cols-2">
      <!--자판기 -->  
      <the-vending-machine/>

      <!--지갑 -->  
      <div class="grid grid-cols-1 gap-4 ">
        <the-stock-status/>
        <the-wallet/>
      </div>
    </div>
        
</template>
