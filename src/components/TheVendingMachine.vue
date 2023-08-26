<template>
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
</template>