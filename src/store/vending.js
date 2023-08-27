
const state = () => ({
  isShowSpinner : false,
  items: [],
  checkoutStatus: null, 
    paymentMethod : "",
    showWallet :false,
    drinkList : [
        {
           key:"coffee", name : "커피", price : 900, count:19, active : false
        },
        {
            key:"coke", name : "콜라", price : 1000, count:10, active : false
        },
        {
            key:"water", name : "물", price : 900, count:4, active : false
        }
    ], 
    machineTotalPrice : 0, 
    restoreMachineToWalletObj : {}, 
    outputMessage:""
})

// getters
const getters = {
//   cartProducts: (state, getters, rootState) => {
//     return state.items.map(({ id, quantity }) => {
//       const product = rootState.products.all.find(product => product.id === id)
//       return {
//         id: product.id,
//         title: product.title,
//         price: product.price,
//         quantity
//       }
//     })
//   },

//   cartTotalPrice: (state, getters) => {
//     return getters.cartProducts.reduce((total, product) => {
//       return total + product.price * product.quantity
//     }, 0)
//   }, 
  drinkList:(state) => {
    return state.drinkList;
  },

  paymentMethod:(state) => {
    return state.paymentMethod;
  },

  showWallet:(state) => {
    return state.showWallet;
  },

  machineTotalPrice:(state) => {
    return state.machineTotalPrice;
  },

  restoreMachineToWalletObj:(state) => {
    return state.restoreMachineToWalletObj;
  },

  outputMessage:(state) => {
    return state.outputMessage;
  }
//   spinnerStatus:(state) => {
//     return state.isShowSpinner;
//   }
}

// actions
const actions = {
     /*
     * 결제 수단 저장
     * card : 카드결제
     * money : 현금결제
     */
    savePaymentMethod({commit}, paymentMethod){
        commit("savePaymentMethod", paymentMethod);
    },

    /*
     * 지갑의 노출 여부 결정
     */
    setWalletStatus({commit}, payload){
        commit("setWalletStatus", payload);
    }, 

    /*
     * 결제 수단 초기화(처음으로)
     */
    resetPaymentMethod({commit, dispatch}, paymentMethod){
      commit("savePaymentMethod", "");

      // 모든 음료 선택 불가능 하도록 초기화
      dispatch("updateDrinkStatus");
    }, 
    
    /*
     * 음료 재고 현황에서 음료를 추가, 삭제 작업 이벤트 핸들러
     * payload : {
        * key
        * method : 'add' 추가 , 'sub' 삭제
      }
     */
    updateDrinkCount({commit, state, dispatch}, payload){
      const {key, method} = payload;
      const drinkList = state.drinkList;
      const drinkIndex = drinkList.findIndex(x=> x.key == key);

      // 재고 삭제의 경우, 남은 음료의 갯수가 0 이상인 경우에만 가능
      if(method == 'sub' && drinkList[drinkIndex].count > 0){
          drinkList[drinkIndex].count -= 1;
      }else{
        drinkList[drinkIndex].count += 1;
      }

      // 음료 재고 현황 저장
      commit('saveDrinkList', drinkList);


      // 재고, 투입된 가격으로 선택 가능한 음료 업데이트
      dispatch("updateDrinkStatus");
    },
    
     
    /*
     * (지갑) 지갑 -> 자판기로 돈 투입 
     */
    addMoneytoMachine({commit, state, dispatch}, money){
      const paymentMethod = state.paymentMethod;
      let machineTotalPrice = state.machineTotalPrice;
      if(paymentMethod == 'card') return;
        machineTotalPrice += money;
      
      // 총 금액 저장
      commit("saveMachineTotalPrice", machineTotalPrice);

      // 재고, 투입된 가격으로 선택 가능한 음료 업데이트
      dispatch("updateDrinkStatus");
    },

    /*
     * (재고현황) 재고, 금액으로 선택 가능한 음료 상태 업데이트
     * 카드결제 : 재고만 고려
     * 현금결제 : 재고, 금액 고려
     */
    updateDrinkStatus({commit, state, dispatch}){
      // 결제방식
      const {paymentMethod, machineTotalPrice } = state;
      let { drinkList } = state;
      let availableDrinkList = []

      if(paymentMethod == 'card'){
        // 카드결제
        availableDrinkList = drinkList.map(x => { 
            if(x.count > 0){
              x.active = true;
            }else{
              x.active = false;
            }
            return x;
          })
      }else{
        // 현금 결제
        availableDrinkList = drinkList.map((x=> {
          if(machineTotalPrice - x.price >= 0 && x.count > 0){
            x.active = true
          }else{
            x.active = false
          }
          return x;
        }))

      }

      // 음료 재고 현황 저장
      commit('saveDrinkList', availableDrinkList);
      

      // 총 금액 저장
      commit("saveMachineTotalPrice", machineTotalPrice);

    },

    // (자판기) 선택한 음료 내보내기
    drinkDispenseHandler({commit, state, dispatch}, drink){
      
      // 선택한 음료의 정보
      const {count, price, key, name} = drink;
      
      // 자판기에 투입된 총 금액, 결제방법
      const {paymentMethod, drinkList} = state;


      let {machineTotalPrice : totalprice} = state;


      // 음료 out 메세지 초기화
      dispatch("resetOutputMessage");
    


      if(paymentMethod == 'money' && totalprice == 0){
        return dispatch("setOutputMessage","금액을 투입해주세요.");
      }

      //(공통) 음료 재고 -1 
      dispatch("updateDrinkCount", {key, method:'sub'});
      
      // 음료 out 메세지
      dispatch("setOutputMessage",`${name}을 받으세요.`);
      
      // 잔액 계산 
      
      // 카드결제 > 돈 계산하지 않고 음료 out 
      if(paymentMethod == 'card'){
        return;
      }
      
      // 현금결제 > 잔액 계산, 업데이트
      totalprice = totalprice - price;
      commit("saveMachineTotalPrice", totalprice);

      // 현금결제 > 잔액이 0원 -> 반환레버 이벤트 발생
      if(totalprice == 0){
        return dispatch("restoreMoneytoWallet")
      }

      // 잔액 & 음료 상태로 자판기 업데이트
      dispatch("updateDrinkStatus");

    },

    /*
    * 출력 메세지 세팅 핸들러
     */
    setOutputMessage({commit, state, dispatch}, message){
      let { outputMessage } = state;
      commit("setOutputMessage", outputMessage.concat("<br/>"+message));

      // todo 아마 여기서 초기화 ? 
    },

    /*
    * 출력 메세지 초기화 핸들러
     */
    resetOutputMessage({commit}, message){
      commit("setOutputMessage", '');
    },


    /*
      * (자판기) 반환레버 동작 이벤트 핸들러
     */
    restoreMoneytoWallet({commit, state, dispatch}, money){
      // 자판기에 투입된 총 금액
      const {paymentMethod} = state;
      let {machineTotalPrice:totalprice} = state;
      
      // 거스름돈 반환 객체
      let restoreMachineToWalletObj = state.restoreMachineToWalletObj;

      if(paymentMethod == 'card'){
        // 카드 반환 레버 선택시 로직 
      }else{
        const walletList = [10000, 5000, 1000, 500, 100];
        for(let i = 0; i< walletList.length; i++){
          const money = walletList[i];
          const restore = parseInt(totalprice/money)
          if(restore > 0){
            restoreMachineToWalletObj[money] = restore;// 몫 저장
            totalprice = totalprice % money; // 잔액 = 몫으로 나눈 나머지
          }
        }
      }
      
      // 거스름돈 반환 객체 저장
      commit("saveMachineToWalletObject", restoreMachineToWalletObj);

      dispatch("setOutputMessage", JSON.stringify(restoreMachineToWalletObj));

      // 남은 잔액 반환 후 자판기에 남은 금액을 0으로 초기화
      commit("saveMachineTotalPrice", 0);

      // 모든 음료 선택 불가능 하도록 초기화
      dispatch("updateDrinkStatus");
    }



//   gotoSearchResult({state, commit}, productSearchItem){
//     // 상품 검색 목록 저장
//     commit('setProductSearchItem', productSearchItem);
//     // 상품 검색 결과로 리다이렉팅
//   }, 

//   updateSpinnerStatus({state, commit}, spinnerStatus){
//     // 상품 검색 목록 저장
//     commit('updateSpinnerStatus', spinnerStatus);
//     // 상품 검색 결과로 리다이렉팅
//   }, 

  
}

// mutations
const mutations = {
    savePaymentMethod(state, payload){
        state.paymentMethod = payload;
    },

    setWalletStatus(state, payload){
        state.showWallet = payload;
    },

    saveDrinkList(state, payload){
        state.drinkList = payload;
    },

    saveMachineTotalPrice(state, payload){
      state.machineTotalPrice = payload;
    }, 

    saveMachineToWalletObject(state, payload){
      state.restoreMachineToWalletObj = {...payload};
    },

    setOutputMessage(state, payload){
      state.outputMessage = payload;
    }



//   setProductSearchItem(state, payload){
//     state.productSearchItem = {...payload};
//   },
//   updateSpinnerStatus(state, payload){
//     state.isShowSpinner = payload;
//   }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}