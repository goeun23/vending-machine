import { createStore } from 'vuex'
import vending from './vending'
import wallet from './wallet'

export default createStore({
    modules: {
        vending, 
        wallet
    }
})