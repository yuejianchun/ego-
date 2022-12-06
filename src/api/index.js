import axios from 'axios'
import base from './base'
import qs from "qs"
const api = {
    getLogin(params){
        return axios.post(base.login,qs.stringify(params))
    },
    getGoodsList(params){
        return axios.get(base.goodslist,{
            params
        })
    },
    getSearch(params){
        return axios.get(base.search,{
            params
        })
    },
    getselectCategory(params){
        return axios.get(base.selectCategory,{
            params
        })
    },
    addgoods(params){
        return axios.get(base.addgoods,{
            params
        })
    },
    deleteGoods(params){
        return axios.get(base.deletegoods,{
            params
        })
    },
    updateGoods(params){
        return axios.get(base.updategoods,{
            params
        })
    },
    getParams(params){
        return axios.get(base.param,{
            params
        })
    },
    getinsertItemParam(params){
        return axios.get(base.insertItemParam,{
            params
        })
    },
}
export default api