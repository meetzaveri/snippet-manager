import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        counter : 0,
        binData : [],
    },

   // Does modifies state and perfect mechanism to also mutate it
   mutations :{
       fillData(state,payload){
           state.binData = payload.codeData;
       },
       deleteItem(state,payload){
           state.binData.forEach((item,index) => {
               if(item.id === payload.id){
                   state.binData.splice(index,1);
               }
           })
       }
   },
});