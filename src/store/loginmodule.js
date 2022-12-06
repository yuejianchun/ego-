export default {
    namespaced:true,
    state:{
        userinfo:{
            user:'',
            token:''
        }
    },
    mutations:{
        setUser(state,payload){
            state.userinfo = payload
        },
        clearUser(state){
            state.userinfo = {
                user:'',
                token:''
            }
        }
    },
    actions:{},
    getters:{}
}