import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        counter : 0
    },

   // Does modifies state and perfect mechanism to also mutate it
   mutations :{
       increment : (state, payload) =>{
           state.counter += payload;
       },
       decrement : (state,payload)=>{
           state.counter -= payload;
       }
   },
});