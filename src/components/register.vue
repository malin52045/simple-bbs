<template>
  <section class="register">
  <!--   <form>
      <div class="form-group">
        <label for="formGroupExampleInput">username</label>
        <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Enter username" v-model='name'>
      </div>
      <div class="form-group">
        <label for="formGroupExampleInput2">password</label>
        <input type="password" class="form-control" id="formGroupExampleInput2" placeholder="Enter password">
      </div>
      <div class="form-group">
        <label for="formGroupExampleInput3">password</label>
        <input type="password" class="form-control" id="formGroupExampleInput3" placeholder="Confirm password">
      </div>
    </form> -->





    <form>
      <div class="form-group">
        <label for="formGroupExampleInput">Username</label>
        <input required type="text" class="form-control" id="formGroupExampleInput" placeholder="Enter username" v-model='name'>
      </div>
      <div class="form-group">
        <label for="formGroupExampleInput2">Password</label>
        <input required type="password" class="form-control" id="formGroupExampleInput2" placeholder="Enter password" v-model='password'>
      </div>
      <div class="form-group">
        <label for="formGroupExampleInput3">Confirm password</label>
        <span class="password-conflict">{{password != password2 && password2 ? '密码不一致' : ''}}</span>
        <input required type="password" class="form-control" id="formGroupExampleInput3" placeholder="Confirm password" v-model='password2'>
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <span class="password-conflict" v-if='isEmailView'>邮箱格式错误</span>
        <input type="email" @blur="isEmail" @focus='isEmailView=false' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model='emailAddress'>
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>



      <!-- <input required type="text" v-model='name' placeholder='enter username' />
      <input required type="password" v-model='password' placeholder='enter password' />
      <input required type="password" v-model='password2' placeholder='confirm password' /> -->
      <!-- //<span>{{password == password2 ? '' : '密码冲突'}}</span> -->
      <label>
        <span class="choice-avatar">
          选择头像          
        </span>
        <span>
          :不选则默认头像
        </span>
        <input type="file" hidden @change='getFile' />
        
      </label>
      <img ref='register-avatar'>
      <span class="button" @click='register'>提交</span>
    </form>
    <div class="enjoy">
      <img src="/img/enjoy.jpg" alt="">      
    </div>
  </section>
</template>

<script>
export default {
  name:'regiser',
  data(){
    return {
      name:'',
      password:'',
      password2:'',
      emailAddress:'',
      isEmailView:false,
      avatar:''
    }
  },
  methods:{
    isEmail(){
      // console.log(11)
      var pattern = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
      this.isEmailView = !pattern.test(this.emailAddress)
    },
    getFile(e){
      this.avatar = e.target.files[0] 
      // console.log(this.avatar)
      let imgURL = URL.createObjectURL(this.avatar) 

      //this.$refs['register-avatar'].url = imgURL  
     // setTimeout(() => {
        this.$refs['register-avatar'].setAttribute('src',imgURL)
        
      //},1000)  
      // console.log(this.$refs['register-avatar'],imgURL)        
    },
    async register(){
      if(!(this.name && this.password)) return 
      if(this.password !== this.password2) return 
      if(!this.isEmail) return 
      let formData = new FormData()
      formData.append('name',this.name)
      formData.append('password',this.password)
      formData.append('emailAddress',this.emailAddress)
      formData.append('avatar',this.avatar)
      try{
        await this.axios.post('/api/register',formData,{
          headers:{'Content-Type':'multipart/form-data'}
        })
        this.$router.push('/login')
      }catch(e){
        alert('该用户已存在')
      }
    }
  }
}
</script>


<style>
  section.register{
    position: relative;
  }
  section.register > div.enjoy{
    position: absolute;
    right:1rem;
    top:1rem;
  }
  section.register > form{
    width: 50%;
    padding-bottom: 0.8rem
  }
  section.register > form img{
    width: 2rem;
    max-height: 1.5rem;
  }
  section.register label > span:first-child{
    xborder:1px solid #a9a9a9;
  }
  section.register label > span:nth-child(2){
    color:#ccc;
    font-size: 0.7rem;
  }

  section.register span.password-conflict{
    display: inline-block;
    margin-left: 2rem;
    font-size: 0.8rem;
    transform: translateY(0.5rem);
    background-color: coral;
    border-radius: 10%;
  }

  section.register span.button{
    box-shadow: 0 0 1px 1px;
    border-radius: 5%;
    cursor: pointer;
    padding: 0.1rem 0.8rem;
    float: right;
  }
  section.register span.button:hover{
    background-color: #d3d6db94;
  }

  section.register span.choice-avatar{
    background-color: #41274a0a;
    border-radius: 5%;    
    display: inline-block; 
    padding: 0.1rem 0.5rem;
  }
  section.register span.choice-avatar:hover{       
    background-color: #d3d6db94;
  }

  @media screen and (max-device-width:960px) {
    section.register > div.enjoy{
      display: none;
    }
    section.register > form{
      width: 100%;

    }
  }
</style>
