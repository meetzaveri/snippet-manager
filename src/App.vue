<template>
  <div id="app" style="margin-top: 0.5rem;">
    <b-btn variant="custom" class="home" style="background:transparent"><router-link class="custom-text-class" to="/">🛠️ Snippet Manager</router-link></b-btn>
    
    <!-- In case if user is logged in -->
    <div v-if="isLoggedIn">
      <b-nav class="custom-b-nav">
        
        <b-nav-item v-for="(nav,id) in navList" :key="id" :class="nav.nav_class" :to="nav.home_uri">{{nav.home_title}}</b-nav-item>
        

        <b-btn class="sign-out" variant="danger" @click="signOut()">Sign Out</b-btn>
      </b-nav>

      <hr />
      
      <b-row class="custom-row">
        <b-col cols="2" class="sidebar">
          <div class="sidebar-feature">
            <h3>User Details</h3>
            <div class="sidebar-item">
              <span class="item-text">{{email}}</span>
            </div>
          </div>
          <hr />
          <div class="sidebar-feature">
            <h3>Features</h3>
            
            <div class="sidebar-item">
              <router-link class="item-text" to="/code-book">
                 <span > Code Book </span>
              </router-link>
            </div>
          
            <div class="sidebar-item">
              <router-link  class="item-text" to="/run-code">
                 <span > Run Code</span>
              </router-link>
            </div>

            <div class="sidebar-item">
              <router-link  class="item-text" to="/markdown-preview">
                 <span > Markdown Preview</span>
              </router-link>
            </div>

          </div>
        </b-col>

        <b-col cols="8" class="right-container" style="margin-top: 4.5rem;">
          <router-view/>
        </b-col>
      </b-row>
        
    </div>

    <!-- In case if user is not logged in -->
    <div v-else>
      <b-nav  class="custom-b-nav">
        <b-nav-item v-for="(nav,id) in beforeLoginNav" :key="id" :class="nav.nav_class" @click="changeClass(id)" :to="nav.home_uri">{{nav.home_title}}</b-nav-item>
        
      </b-nav>
      <hr />
      <div>
        <div class="" style="margin-top: 4.5rem;">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'App',
  data (){
    return{
      isLoggedIn : this.$store.state.userLoggedIn,
      email : this.$store.state.email,
      navList : [
        {home_uri:'/new-snippet',home_title:'Create new snippet',nav_class : 'custom-nav'},],
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
    console.log('Date',moment().format('L'));
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
  border : 2px solid  rgb(0, 123, 255);
  font-size: 23px;
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
  margin-top: 20px;
  font-size: 28px;
  text-decoration: none
}

.flex-box{
  display: flex;
  align-items: center;
  justify-content: center;
}
pre {
  overflow-x: auto;
    display: block;
    margin: 0 0 10px;
    font-size: 13px;
    line-height: 1.42857143;
    color: #333;
    word-break: break-all;
    word-wrap: break-word;
    background: #f8f8f8;
    border: 1px solid #ccc;
    border-radius: 4px;
}

</style>
