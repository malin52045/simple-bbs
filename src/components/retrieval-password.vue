<template>
  <section class="retrieval-password">
    <form>
      <div class="form-group">
        <label for="formGroupExampleInput">username</label>
        <input required type="text" class="form-control" id="formGroupExampleInput" placeholder="Enter username" v-model='name'>
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <span class="password-conflict" v-if='isEmailView'>邮箱格式错误</span>
        <input type="email" @blur="isEmail" @focus='isEmailView=false' class="form-control" id="exampleInputEmail1"  placeholder="Enter email" aria-describedby="emailHelp" v-model='emailAddress'>
        <small id="emailHelp" class="form-text text-muted">We'll sends a secure link which is then used for resetting the password.</small>
        <span class="button" @click='rePassword'>提交</span>
      </div>
    </form>

  </section>
</template>


<script>
  export default {
    name:'retrievalPassword',
    data(){
      return {
        name:'',
        emailAddress:'',
        isEmailView:false        
      }
    },
    methods:{
      isEmail(){
        // console.log(11)
        var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
        this.isEmailView = !pattern.test(this.emailAddress)
      },
      async rePassword(){
        // console.log(11)
        if(!this.name && !this.isEmail) return 
        try{
          let res = await this.axios.post('/api/retrieval-password',{
            username:this.name,
            emailAddress:this.emailAddress
          })  
        }catch(e){
          alert('用户名与邮箱不匹配')        
        }
      }
    }
  }
</script>

<style>
  section.retrieval-password{
    padding-bottom: 0.5rem;
  }
  section.retrieval-password #emailHelp{
    display: inline-block;
  }
  section.retrieval-password span.password-conflict{
    display: inline-block;
    margin-left: 2rem;
    font-size: 0.8rem;
    transform: translateY(0.5rem);
    background-color: coral;
    border-radius: 10%;
  }

  section.retrieval-password span.button{
    box-shadow: 0 0 1px 1px;
    border-radius: 5%;
    cursor: pointer;
    padding: 0.1rem 0.8rem;
    margin-top:0.5rem;
    float: right;
  }
  section.retrieval-password span.button:hover{
    background-color: #d3d6db94;
  }
</style>
