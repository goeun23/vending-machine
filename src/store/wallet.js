const state = () => ({ 
  //showWallet :false, dev temp
  showWallet :true, // 지갑 노출 트리거
})

// getters
const getters = {
  showWallet:(state) => {
    return state.showWallet;
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
    dispatch("vending/updateDrinkStatus",{},{root:true});

    // (자판기) 결제 가능 시간을 10초로 세팅
    dispatch("vending/setAvailablePaymentTimer", 10, {root:true})
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