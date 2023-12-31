const state = () => ({ 
  showWallet :false, // 지갑 노출 트리거
  moneyList: [
    {text:"💵10,000", value:10000},
    {text:"💵5,000", value:5000},
    {text:"💵1,000", value:1000},
    {text:"🪙500", value:500},
    {text:"🪙100", value:100},
  ]
})

// getters
const getters = {
  showWallet:(state) => {
    return state.showWallet;
  },
  moneyList:(state) => {
    return state.moneyList;
  },
}
// actions
const actions = {
  /*
  * 지갑의 노출 여부 결정
  */
  setWalletStatus({commit}, payload){
      commit("setWalletStatus", payload);
  }, 

  /*
  * (지갑) 지갑 -> 자판기로 돈 투입 
  */
  addMoneytoMachine({commit, state, dispatch}, money){
    const paymentMethod = this.state.vending.paymentMethod;
    let machineTotalPrice = this.state.vending.machineTotalPrice;
    machineTotalPrice += money;
    
    // (자판기) 총 금액 저장
    commit("vending/saveMachineTotalPrice", machineTotalPrice, {root:true})

    // (자판기) 재고, 투입된 가격으로 선택 가능한 음료 업데이트
    dispatch("vending/updateDrinkStatus",null,{root:true});

    // (자판기) 결제 가능 시간을 10초로 세팅
    dispatch("vending/setAvailablePaymentTimer", 10, {root:true})
  },

    /*
     * (지갑) 카드 투입 이벤트 핸들러
    */
    setCardtoMachine({commit, dispatch}, isPaymentCardInput){
      commit("vending/setCardPaymentInput", isPaymentCardInput, {root:true});
      
      // 카드의 경우, 금액 한도를 500만원으로 지정
      commit("vending/saveMachineTotalPrice", 5000000, {root:true});

      dispatch("setWalletStatus", true)

      // 재고, 투입된 가격으로 선택 가능한 음료 업데이트
      dispatch("vending/updateDrinkStatus",null,{root:true});

      // 결제 가능 시간을 10초로 세팅
      dispatch("vending/setAvailablePaymentTimer", 10, {root:true});
    },
  
}

// mutations
const mutations = {
  setWalletStatus(state, payload){
      // 지갑 노출 상태 세팅
      state.showWallet = payload;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}