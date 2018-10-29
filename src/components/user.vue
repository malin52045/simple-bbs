<template>
  <section class="user">
    <div class="user-bgi">
      <img src="/img/helloworld.png" alt="">      
    </div>
    <h2>他发的帖子：</h2>
    <ul class="list-group">
      <li v-for='post in posts' :key='post.id' class="list-group-item">
        <router-link :to="'/post/' + post.id">{{post.title}}</router-link>
        <span>{{getTime(post.timestamp)}}</span>
      </li>
    </ul>
    <div class="split-line"></div>
    <h2>他最近的评论：</h2>
    <ul class="list-group">
      <li v-for='comment in comments' :key='comment.id' class="list-group-item">
        <router-link :to="'/post/' + comment.postId">{{comment.content}}</router-link>
        <span>{{getTime(comment.timestamp)}}</span>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name:'user',
  data(){
    return {
      user:{},
      posts:[],
      comments:[],
    }
  },
  async created(){
    let res = await this.axios.get('/api/user/' + this.$route.params.userId)
    this.user = res.data.user
    this.posts = res.data.userPosts
    this.comments = res.data.userComments
  },
  methods:{
    getTime(timestamp){
      return this.toLocaleString(timestamp)
    }
  }
}
</script>


<style>
  section.user div.user-bgi{
    height: 10rem;
    margin:0 -1rem;
  }
  section.user div.user-bgi img{
    max-height: 100%;
    max-width: 100%;
  }
  
  section.user ul.list-group{

  }

  section.user ul.list-group > li.list-group-item{
    border-left:none;
    border-right:none;
    padding: 0.5rem 1rem;
  }
  section.user ul.list-group > li.list-group-item > a{
    color: #000000
  }
  section.user ul.list-group > li.list-group-item > span{
    float: right;
    font-size:0.7rem;
    color: #ccc;
    line-height: 1.5rem;
  }
  section.user div.split-line{
    height: 1rem;
    background-color: #f0f0f0;
    margin: 0 -1rem;
  }
</style>
