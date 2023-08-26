<template>
<div class="m-auto px-8 py-8 grid grid-cols-1 gap-4 rounded-lg" style="background-color:lightgray;">
         
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
</template>