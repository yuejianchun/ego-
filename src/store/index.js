import Vue from "vue";
import Vuex from "vuex"
import tab from "./tab"
import loginmodule from "./loginmodule"
Vue.use(Vuex)
export default new Vuex.Store({
    modules:{
        tab,
        loginmodule
    }
})