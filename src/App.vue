<template>
  <div id="app" style="margin-top: 0.5rem;">
    <b-nav  class="custom-b-nav">
      <b-nav-item v-for="(nav,id) in navList" :key="id" :class="nav.nav_class" @click="changeClass(id)" :to="nav.home_uri">{{nav.home_title}}</b-nav-item>
    </b-nav>
    
    <b-row class="justify-content-md-center" style="margin-top: 0.5rem;">
      
     <router-view/>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'App',
  data (){
    return{
      navList : [{home_uri:'/',home_title:'Home',nav_class : 'custom-nav' },
      {home_uri:'/new-snippet',home_title:'New Snippet',nav_class : 'custom-nav'},
      {home_uri:'/code-book',home_title:'Code Book',nav_class : 'custom-nav' },
      {home_uri:'/run-code',home_title:'Run code',nav_class : 'custom-nav' },],
    }
  },
  methods:{
    changeClass(id){
      this.navList.map((item,index) =>{
        if(index === id){
          item.nav_class = item.nav_class + ' active';
        }
        else{
          item.nav_class = item.nav_class;
        }
        return item;
      })
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Jua');
#app {
  font-family: 'Jua', sans-serif;
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
  background-color: rgba(0, 123, 255,0.1);
}
.custom-nav:hover{
  background-color: rgba(0, 123, 255,0.1);
  transition: all 0.4s ease;
}
</style>
