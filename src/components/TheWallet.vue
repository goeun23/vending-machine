<template>
<div v-if="showWallet" class="m-auto px-8 py-8 grid grid-cols-1 gap-4 rounded-lg bg-gray-200">
    <span>내 지갑 👛</span> 
    <wallet-card
        v-if="paymentMethod == 'card'" 
        @setCardtoMachine="setCardtoMachine"
    />
    <div v-else>
        <div class="grid grid-cols-5 gap-4 p-4">
            <wallet-money 
                v-for="(money, index) in moneyList" :key="index"
                :money="money"
                @addMoneytoMachine="addMoneytoMachine"
            />
        </div>
    </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import walletMoney from "@/components/wallet/walletMoney.vue"
import walletCard from "@/components/wallet/walletCard.vue"
export default {
    components:{
        walletMoney, 
        walletCard
    },
    computed :{
        ...mapGetters('vending', ['paymentMethod']), 
        ...mapGetters('wallet', ['showWallet', 'moneyList']), 

    },
    methods :{
        ...mapActions('wallet', ['addMoneytoMachine', 'setCardtoMachine'])
    },
}
</script>