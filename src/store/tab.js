export default {
    state:{
        iscollapse:false
    },
    mutations:{
        collapse(state){
            state.iscollapse = !state.iscollapse
        }
    }
}