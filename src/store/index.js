import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        counter : 0,
        binData : [],
        email:localStorage.getItem('email'),
        userLoggedIn : false,
        token : null
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
        },
        updateBinData(state,payload){
          state.binData = payload.updatedData;
        },
        setUser(state,payload){
          state.userLoggedIn = true;
          localStorage.setItem('email',payload.email);
          state.email = payload.email
        },

        updateLog(state,payload){
          state.userLoggedIn = payload.isLoggedIn;
        },

        // All auth storage tokens will be reseted and as a
        // result there will be no tokens either in localStorage 
        // nor in store's state
        signOut(state){
          state.token = null;
          localStorage.removeItem('token');
          state.userLoggedIn = false;
          localStorage.setItem('email',null);
        },
    },
});