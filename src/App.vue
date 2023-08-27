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
    <div class="px-24 py-20 grid grid-cols-2 grid-rows-1 gap-4">
      <!--자판기 -->  
      <the-vending-machine/>

      <!--지갑 -->  
      <div class="grid grid-cols-1 gap-4 ">
        <the-stock-status/>
        <the-wallet/>
      </div>
    </div>
        
</template>
