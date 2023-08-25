<script>
import HelloWorld from './components/HelloWorld.vue'

export default{
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
 
    <h1 class="text-3xl font-bold underline">
      Hello world!
    </h1>

    <div class="p-28 grid grid-cols-2 grid-rows-1 gap-4">
      <div class="m-auto px-8 py-8 grid grid-cols-1 gap-4 rounded-lg" style="background-color:lightblue;">
          <!--vending machine -->
          <div>
            vending machine 
          </div>

          <div class="grid grid-cols-1 grid-rows-1 gap-4">
              <div class="rounded-lg p-4" style="background-color:white;">
                <button @click="setPaymentMethod()">여기를 눌러 결제수단을 선택해주세요.</button>
              </div>
          </div>

          <!-- <div class="grid grid-cols-2 grid-rows-1 gap-4"> -->
          <div style="width:100%; display: flex; gap:10px">
              <div style="width:60%; background-color:white;" class="rounded-lg p-4" >잔액(투입금액) 
                <span>{{paymentMethod == "card" ? "-" : total}}</span>
              </div>
              <div style="width:25%; background-color:white;" class="rounded-lg p-4">
                <span v-if="paymentMethod !== ''">{{paymentMethod == "card" ? "카드":"현금"}} 결제</span>
              </div>
              <div style="width:15%; background-color:white;" class="rounded-lg p-4">반환</div>
          </div>


          <div class="grid grid-cols-3 grid-rows-1 gap-4" >
              <div class="rounded-lg gap-4 p-4" v-for="(drink, index) in drinkList" :key="index" style="background-color:white;" > 
                
                  <img :src="drink.imgsrc"/> 
                
                {{drink.name}} 
                {{drink.price}}
              </div>
              
          </div>

          <div class="grid grid-cols-1 grid-rows-1 gap-4">
              <div class="rounded-lg p-4" style="background-color:white;">out</div>
          </div>
      </div>

      <div class="grid grid-cols-1 gap-4 ">
      
          <div class="m-auto px-8 py-8 gap-4 rounded-lg" style="background-color: lightsteelblue;">
              음료수 재고(수량 조정 가능)
              <div class="grid grid-cols-3">
                <div class="rounded-lg m-2 p-2" v-for="(drink, index) in drinkList" :key="index"  style="background-color: white;"> 
                  {{drink.name}} 
                  <div >
                    <input style="width:100%;" type="number" v-model="drink.count"/>
                  </div>
                </div>
              </div>
          </div>
          <div v-if="showWallet" class="m-auto px-8 py-8 grid grid-cols-1 gap-4 rounded-lg" style="background-color:lightgray;">
         
          wallet section 
            
          <div v-if="paymentMethod == 'card'">
            card
           <div class="rounded-lg gap-4 p-4" style="background-color:white;" > 
              <img :src="imgcard" style="width: 100px; height: 100px; margin: auto;"/> 
            </div>
          </div>
          <div v-else>
            money
            <div class="grid grid-cols-3 gap-4 p-4">
              <div class="rounded-lg gap-4 p-4" style="background-color:white;" > 
                  10,000
              </div>
              <div class="rounded-lg gap-4 p-4" style="background-color:white;" > 
                  5,000
              </div>
              <div class="rounded-lg gap-4 p-4" style="background-color:white;" > 
                  1,000
              </div>
             
            </div>
            <div class="grid grid-cols-2 grid-rows-1 gap-4 p-4">
               <div class="rounded-lg gap-4 p-4" style="background-color:white;" > 
                  500
              </div>
               <div class="rounded-lg gap-4 p-4" style="background-color:white;" > 
                  100
              </div>
            </div>
          </div>
      
      </div>
      </div>
    </div>

<!--wallet -->      
    
 
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>
