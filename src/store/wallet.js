
const state = () => ({ 
//  drinkList : []
//   [
//             {
//             name : "커피", imgsrc : "/coffee.png", price : 900, count:19
//             },
//             {
//             name : "콜라", imgsrc : "/coke.png", price : 900, count:10
//             },
//             {
//             name : "물", imgsrc : "/water.png", price : 900, count:4
//             }
//         ],

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
//   productSearchItem:(state) => {
//       return state.productSearchItem;
//   },
//   spinnerStatus:(state) => {
//     return state.isShowSpinner;
//   }
}

// actions
const actions = {


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