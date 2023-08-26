<template>
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
</template>