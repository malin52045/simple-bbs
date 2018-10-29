<template>
  <ul class="list-group inner-comment">
    <li class="list-group-item" v-for="deepComment in deepComments" :key='deepComment.id'>
      <div>
        <router-link :to="'/user/' + deepComment.userId">
          <img width=15 height=15  :src="'/avatar/' + deepComment.avatar" alt="" />
          {{deepComment.name}}
        </router-link>
        {{'@' + deepComment.toUserName + ': '+ deepComment.content}}
        <div class="deep-comment-time">
          {{getDeepCommentTime(deepComment.timestamp)}}
          <a @click='toUserName = deepComment.name' href="javascript:;">回复</a>          
        </div>
      </div>
    </li>
    <!--<div v-if='toUserName' class="input-group mb-3"> -->
    <div class="input-group mb-3">
      <input class="form-control" v-model='yourDeepComment' type="text" :placeholder="$root.$children[0].user ? '@' + toUserName:'未登录，请登陆后再评论'" />
      <div class="input-group-append">
        <span class="input-group-text" id="basic-addon2"  @click='addDeepComment'>评论</span>
      </div>
      <!-- <button @click='addDeepComment'>评论</button> -->
    </div>
  </ul> 
</template>

<script>
  export default {
    name:'comment',
    props:['commentid'],
    data(){
      return {
        deepComments:[],
        toUserName:'',
        yourDeepComment:'',                  
        deepCommentIndex:-1,
       }
    },
    async created(){
      let res = await this.axios.get('/api/deepComments/' + this.commentid)
      this.deepComments = res.data
    },
    methods:{
      getDeepCommentTime(timestamp){
        return this.toLocaleString(timestamp)
      },
      async addDeepComment(){
        if(!this.yourDeepComment || !this.$root.$children[0].user){
          this.yourDeepComment = ''
          return 
        } 
        let res = await this.axios.post('/api/addDeepComment',{
          commentId:this.commentid,
          userId:this.$root.$children[0].user.id,
          toUserName:this.toUserName,
          content:this.yourDeepComment
        })
        this.deepComments.push(res.data)
        this.yourDeepComment = ''
      }
    }
  }
</script>


<style>
  ul.list-group.inner-comment > li.list-group-item {
    padding:0.4rem 0.6rem;
    border-bottom: none;
    font-size: 0.8rem;
  }
  div.deep-comment-time{
    float: right;
    font-size: 0.7rem;
  }
  div.input-group.mb-3{
    xmargin-top: 0.5rem;
    height: 1.8rem;
  }
  input.form-control:focus{
    border-color: #ccc;
    box-shadow: none;
  }
  input.form-control{
    height: 100%;
  }
</style>
