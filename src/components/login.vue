<template>
  <section class="login">
    <form>
      <div class="form-group">
        <label for="formGroupExampleInput">username</label>
        <input required type="text" class="form-control" id="formGroupExampleInput" placeholder="Enter username" v-model='name'>
      </div>
      <div class="form-group">
        <label for="formGroupExampleInput2">password</label>
        <input required type="password" class="form-control" id="formGroupExampleInput2" placeholder="Enter password" v-model='password'>
      </div>
     <!--  <div class="form-group component-captha">
        <label for="formGroupExampleInput3" >captha</label>
        <input required type="text" class="form-control" id="formGroupExampleInput3" placeholder="Enter verification information" v-model='captcha'>
        <img ref='img' src="http://localhost:3002/captcha/1" alt="" />
      </div> -->


      <label for="formGroupExampleInput3" class="labal-captha">captha</label>
      <div class="form-row">
        <div class="col">
          <input required type="text" class="form-control" id="formGroupExampleInput3" placeholder="Enter captcha" v-model='captcha'>          
        </div>
        <div class="col">
          <img class="avatar-img" ref='img' src="/captcha/1" alt="" />          
        </div>
      </div>
      <span class="button" @click='login'>login</span>
      <!-- <a @click='toRePassword' href="javascript:;">忘记密码?</a> -->  

    </form>
    <div class="enjoy">
      <img src="/img/enjoy.jpg" alt="">   
    </div>
  </section>





</template>

<script>
  export default {
    name:'login',
    data(){
      return {
        name:'',
        password:'',
        captcha:''
      }
    },
    methods:{
      // toRePassword(){
      //   this.$router.push('/retrieval-password')
      // }, //找回密码nodemailer 发送邮件被退回(暂时不做)
      async login(){
        if(!(this.name && this.password && this.captcha)){
          this.$refs.img.src = '/captcha/' + Math.random()
          return 
        } 
        //console.log('login')
        try{
          var res = await this.axios.post('/api/login',{
            name:this.name,
            password:this.password,
            captcha:this.captcha
          })   
          this.$root.$children[0].user = res.data
          this.$router.push('/')
        }catch(e){
          this.$refs.img.src = '/captcha/' + Math.random()
          alert('账户名或密码或验证码错误')  
        }
      },
      // refreshCaptcha(){
      //   this.$refs.img.src = '/captcha/' + Math.random()
      // }
    }   
  }

</script>

<style>
  section.login{
    padding-bottom: 1rem;
    position: relative;
  }

  section.login span.button{
    box-shadow: 0 0 1px 1px;
    border-radius: 5%;
    cursor: pointer;
    padding: 0.2rem 0.8rem;
    display: inline-block;
    margin-top:1rem;
    /*float: right;*/
    /*margin-top: 1rem;*/
  }
  section.login span.button:hover{
    background-color: #d3d6db94;
  }
  section.login > div.enjoy{
    position: absolute;
    right:1rem;
    top:1rem;
  }
  section.login input#formGroupExampleInput3{
    height: calc(2.25rem + 2px);
  }

  section.login form{
    width: 50%;
    padding-bottom: 1rem;
  }

  section.login img.avatar-img{
    transform: translateY(-0.5rem);

  }

  @media screen and (max-device-width:960px) {
    section.login > div.enjoy{
      display: none;
    }
    section.login > form{
      width: 100%;

    }
  }
</style>
