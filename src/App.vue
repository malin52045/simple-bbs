<template>
  <section class="app">
    <div class="navbar">
      <div class="btn-group-sm " role="group" aria-label="Basic example">
        <router-link to='/'><button type="button" class="btn btn-secondary">首页</button></router-link>
        <router-link v-if="!user" to='/register'><button type="button" class="btn btn-secondary">注册</button></router-link>
        <router-link v-if="!user" to='/login'><button type="button" class="btn btn-secondary">登录</button></router-link>
        <router-link v-if="user" to='/publish'><button type="button" class="btn btn-secondary">发布</button></router-link>
        <a v-if="user" href="javascript:;" @click='logout'><button type="button" class="btn btn-secondary">登出</button></a>      
      </div>      
    </div>
    <div class="app-main container">
      <router-view></router-view>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import home from './components/home.vue'
import post from './components/post.vue'
import login from './components/login.vue'
import publish from './components/publish.vue'
import register from './components/register.vue'
import user from './components/user.vue'
// import retrievalPassword from './components/retrieval-password.vue'

Vue.use(VueRouter)

let router = new VueRouter({
  routes:[{
    path:'/',
    component:home
  },{
    path:'/post/:postId',
    component:post
  },{
    path:'/login',
    component:login
  },{
    path:'/publish',
    component:publish
  },{
    path:'/register',
    component:register
  },{
    path:'/user/:userId',
    component:user
  }
  // ,{
  //   path:'/retrieval-password',
  //   component:retrievalPassword
  // }
  ]
})

export default {
  name: 'app',
  // components: {
  //   home,post,comment,login,publish,register,user
  // },
  data(){
    return {
      user:null      
    }
  },
  async created(){
      let res = await this.axios.get('/isLogin')          
      this.user = res.data
  },
  methods:{
    logout(){
      this.user = null
      this.$router.push('/')
      document.cookie = 'userId=;path=/;Expires='+new Date(0).toGMTString()
   }
  },
  router
}
</script>

<style>

/*@media screen and (min-width: 100px) {
  html {
    font-size: 100px;
  }
}*/
/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}*/
  /*section.app{
    margin-bottom: -2rem
  }*/

  section.app div.navbar{
    background-color: #969da4;
    padding:0.2rem; 
    margin-bottom: 0.5rem;
  }

  section.app div.navbar > div{
    margin: 0 auto;
    width: 60%;
    min-width: 40rem;
  }

  section.app div.app-main{
    min-width: 40rem;
    background-color: white;
    width: 60%;
    xmin-height: 60vh
  }

  section.app div.navbar button.btn.btn-secondary{
    padding: 0.5rem 1.5rem;
    margin-right: 1rem
  }


  @media screen and (max-device-width:960px) {
  /*  section.app div.navbar{
      background-color: #969da4;
      padding:0.2rem; 
      margin-bottom: 0.5rem;
    }*/

    section.app div.navbar > div{
      margin: 0 auto;
      width: 100%;
      min-width: 0;
    }

    section.app div.app-main{
      min-width: 0;
      background-color: white;
      width: 100%;
    }

    section.app div.navbar button.btn.btn-secondary{
      padding: 0.5rem 1.5rem;
      margin-right: 0.2rem;
      background-color: #969da4;
      border:none;
    }
  }



</style>
