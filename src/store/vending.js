
const state = () => ({
  paymentMethod : "",// 결제수단 

  drinkList : [
      {
          key:"coffee", name : "커피", price : 900, count:9, active : false
      },
      {
          key:"coke", name : "콜라", price : 1000, count:5, active : false
      },
      {
          key:"water", name : "물", price : 900, count:4, active : false
      }, 
      {
          key:"potion", name : "힐링포션", price : 100000000, count:1, active : false
      }
  ], 
  machineTotalPrice : 0,          // 자판기 투입 금액
  restoreMachineToWalletObj : {}, // (현금) 반환 금액 객체
  isPaymentCardInput : false,     // (카드) 카드 투입 여부
  outputMessage:"",               // 결과 메세지
  messageInterval : null,          // 결과 메세지 타이머
  availablePaymentTime : 0,        // 결제 가능 시간
  availablePaymentInterval : null // 결제 가능 시간 타이머
})

// getters
const getters = {
  drinkList:(state) => {
    return state.drinkList;
  },

  paymentMethod:(state) => {
    return state.paymentMethod;
  },

  machineTotalPrice:(state) => {
    return state.machineTotalPrice;
  },

  restoreMachineToWalletObj:(state) => {
    return state.restoreMachineToWalletObj;
  },

  outputMessage:(state) => {
    return state.outputMessage;
  }, 
  
  isPaymentCardInput:(state) => {
    return state.isPaymentCardInput;
  },

  availablePaymentTime:(state) => {
    return state.availablePaymentTime;
  }
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
    * 결제 가능 시간을 ${payload}초로 세팅
    */
    setAvailablePaymentTimer({commit}, payload){
        commit("setAvailablePaymentTimer", payload);
    },

    

    /*
     * 결제 수단 초기화(처음으로)
     */
    resetPaymentMethod({commit, dispatch}, paymentMethod){
      commit("savePaymentMethod", "");

      // 모든 음료 선택 불가능 하도록 초기화
      dispatch("updateDrinkStatus");

      // (지갑) 비활성화
      dispatch("wallet/setWalletStatus", false,{root:true});

      // 투입금액 초기화
      dispatch("saveMachineTotalPrice", 0)

      // 메세지 인터벌 초기화
      dispatch("resetOutputMessage")
    }, 
    
    /*
     * 음료 재고 현황 > 음료 추가, 삭제 이벤트 핸들러
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
      if(method == 'add'){
        drinkList[drinkIndex].count += 1;
      }
      if(method == 'sub' && drinkList[drinkIndex].count > 0){
        drinkList[drinkIndex].count -= 1;
      }

      // 음료 재고 현황 저장
      commit('saveDrinkList', drinkList);


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
      const {paymentMethod, machineTotalPrice, isPaymentCardInput } = state;
      let { drinkList } = state;
      let availableDrinkList = []

      if(paymentMethod == 'card' && isPaymentCardInput){
        // 카드결제, 재고가 있는 모든 제품 활성화
        availableDrinkList = drinkList.map(x => { 
            x.active = x.count > 0 ? true: false;
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

    },

    // (자판기) 선택한 음료 내보내기
    drinkDispenseHandler({commit, state, dispatch}, drink){
      
      // 선택한 음료의 정보
      const {count, price, key, name} = drink;
      
      // 결제방법, 자판기에 투입된 총 금액
      const {paymentMethod, drinkList, isPaymentCardInput} = state;


      let {machineTotalPrice : totalprice} = state;

      // 메세지 출력 초기화
      dispatch("resetOutputMessage");

      try {
        
        if(count <= 0){
          // error exception : 재고가 없을 경우
          throw new Error(`${name}의 재고가 없습니다.`) ;
        }
        
        if(paymentMethod == 'money' && totalprice <= 0){
          // error exception : (현금) 투입된 금액이 없을 경우
          throw new Error("금액을 투입해주세요.");
        }

        if(paymentMethod == 'card' && !isPaymentCardInput){
          // error exception : (카드) 카드가 투입되지 않은 경우
          throw new Error("결제할 카드를 투입해주세요.");
        }

        if(totalprice - price < 0){
          // error exception : (현금) 잔액이 부족하거나, (카드) 한도 초과된 상품의 경우
          throw paymentMethod == 'card'?
            new Error("한도가 초과된 상품입니다.")
            :new Error("잔액이 부족합니다.")
        }

        //(공통) 음료 재고 -1 
        dispatch("updateDrinkCount", {key, method:'sub'});
        
        // 음료 out 메세지
        dispatch("setOutputMessage",`${name}을(를) 받으세요.`);
        
        // 잔액 계산, 업데이트
        totalprice = totalprice - price;
        commit("saveMachineTotalPrice", totalprice);

        // 잔액 & 음료 상태로 자판기 업데이트
        dispatch("updateDrinkStatus");
        
        // 잔액이 0원, 카드결제 -> 반환레버 이벤트 발생
        if(totalprice == 0){
          return dispatch("restorePaymentoWallet")
        }

      } catch (error) { // error message throw
        return dispatch("setOutputMessage",error.message);
      }
    },

    /*
    * 출력 메세지 세팅 핸들러
     */
    setOutputMessage({commit, state, dispatch}, message){
      let { outputMessage, messageInterval } = state;

      // 출력메세지 세팅
      commit("setOutputMessage", outputMessage.concat("<br/>"+message));

      // 타임아웃 스택 초기화
      commit("clearInterval", 'messageInterval');

      // 2초 후 메세지가 사라지도록 타임아웃 세팅 
      commit("setMessageInterval");
      
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
    restorePaymentoWallet({commit, state, dispatch}, money){
      // 자판기에 투입된 총 금액
      const { paymentMethod, isPaymentCardInput } = state;
      let { machineTotalPrice:totalprice } = state;
      let outputMessage = "";
      
      // 안내메세지 노출 영역 초기화
      dispatch("resetOutputMessage");
      
      if(paymentMethod == 'card'){
        // 카드 반환
        if(isPaymentCardInput){
          commit("setCardPaymentInput", false);
          outputMessage = "카드가 반환되었습니다."
        }
      }else{
        const walletList = [10000, 5000, 1000, 500, 100];
        // 거스름돈 반환 객체
        let restoreMachineToWalletObj = {};

        for(let i = 0; i< walletList.length; i++){
          const money = walletList[i];
          const restore = parseInt(totalprice/money) // 금액 몫 저장
          if(restore > 0){
            restoreMachineToWalletObj[money] = restore;
            totalprice = totalprice % money; // 잔액 = 몫으로 나눈 나머지
          }
        }
        outputMessage = `잔액 ${JSON.stringify(restoreMachineToWalletObj)}를 받으세요.`
      }
      
      // 반환 메세지 노출
      dispatch("setOutputMessage", outputMessage);

      // 남은 잔액 반환 후 자판기에 남은 금액을 0으로 초기화
      commit("saveMachineTotalPrice", 0);

      // 모든 음료 선택 불가능 하도록 초기화
      dispatch("updateDrinkStatus");

      // 결제 가능 시간 인터벌 초기화
      commit("clearInterval", 'availablePaymentInterval');
    }
    
}

// mutations
const mutations = {
    savePaymentMethod(state, payload){
        // 결제수단 저장
        state.paymentMethod = payload;
    },

    saveDrinkList(state, payload){
      // 음료 재고, 수량 저장
      state.drinkList = payload;
    },

    saveMachineTotalPrice(state, payload){
      // 자판기에 투입된 금액 저장
      state.machineTotalPrice = payload;
    }, 

    setOutputMessage(state, payload){
      // 노출 메세지 세팅
      state.outputMessage = payload;
    },

    setMessageInterval(state, payload){
      // 메세지 인터벌 세팅(2초후 사라짐)
      state.messageInterval = setTimeout(() => {
        this.dispatch("vending/resetOutputMessage")
      }, 2000);
    },

    clearInterval(state, payload){
      // 등록된 인터벌 clear
      if(payload == 'availablePaymentInterval'){
        state.availablePaymentTime = 0;
      }
      clearInterval(state[`${payload}`]);
    },

    setCardPaymentInput(state, payload){
      // 자판기-> 카드 투입 여부 상태 세팅
      state.isPaymentCardInput = payload;
    },

    setAvailablePaymentTimer(state, payload){
      console.log('clear', state.availablePaymentInterval)
      state.availablePaymentTime = payload;
      clearInterval(state.availablePaymentInterval)
      
      state.availablePaymentInterval = setInterval(()=> {
        if(state.availablePaymentTime == 0){
          this.dispatch('vending/restorePaymentoWallet')
          return clearInterval(state.availablePaymentInterval);
        }
        state.availablePaymentTime -= 1;
      }, 1000)
    }, 
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}