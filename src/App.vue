<template>
  <div id="app" style="margin-top: 0.5rem;">
    
    <b-nav v-if="isLoggedIn" class="custom-b-nav">
      
      <b-btn variant="custom" class="home"><router-link to="/"> Dashboard</router-link></b-btn>
      <b-nav-item v-for="(nav,id) in navList" :key="id" :class="nav.nav_class" :to="nav.home_uri">{{nav.home_title}}</b-nav-item>
      <b-btn class="sign-out" variant="danger" @click="signOut()">Sign Out</b-btn>
    </b-nav>

    <b-nav v-else class="custom-b-nav">
      <b-nav-item v-for="(nav,id) in beforeLoginNav" :key="id" :class="nav.nav_class" @click="changeClass(id)" :to="nav.home_uri">{{nav.home_title}}</b-nav-item>
    </b-nav>
    
    <hr />
    <div class="" style="margin-top: 4.5rem;">
     <router-view/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data (){
    return{
      isLoggedIn : this.$store.state.userLoggedIn,
      navList : [
        {home_uri:'/new-snippet',home_title:'New Snippet',nav_class : 'custom-nav'},
        {home_uri:'/code-book',home_title:'Code Book',nav_class : 'custom-nav' },
        {home_uri:'/run-code',home_title:'Run code',nav_class : 'custom-nav' },],
      beforeLoginNav : [
        {home_uri:'/register',home_title:'Sign Up',nav_class : 'custom-nav' },
        ],
    }
  },
  created(){
    var token = localStorage.getItem('token');
    if(token){
      this.$store.commit('updateLog',{isLoggedIn:true});
      this.isLoggedIn = true;
    } else{
      this.isLoggedIn = false;
    }
  },
  updated(){
    var token = localStorage.getItem('token');
    if(token){
      this.$store.commit('updateLog',{isLoggedIn:true});
      this.isLoggedIn = true;
    } else{
      this.isLoggedIn = false;
    }
  },
  methods:{
    changeClass(id){
      this.navList.map((item,index) =>{
        if(index === id){
          item.nav_class = item.nav_class + ' active';
        }
        else{
          item.nav_class = 'custom-nav';
        }
        return item;
      })
    },
    signOut(){
      this.$store.commit('signOut');
      this.$router.push('/login');
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Fira+Sans');
#app {
  font-family: 'Fira Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.custom-b-nav{
  justify-content: center;
  margin: 25px 0;
}
.custom-nav{
  border-bottom : 2px solid  rgb(0, 123, 255);
  margin : 0px 10px;
}
.custom-nav .active{
  color: rgb(0, 123, 255);
  background-color: rgba(0, 123, 255,0.1);
}
.custom-nav:hover{
  background-color: rgba(0, 123, 255,0.1);
  transition: all 0.4s ease;
}
.sign-out{
  position: absolute;
  top:2px;
  right: 10px;
  margin-top: 25px;
}
.home{
  position: absolute;
  top:2px;
  left: 10px;
  margin-top: 25px;
}
</style>
