<template>
  <section class="home">
    <ul class="list-group outer-comment">
      <li v-for='post in posts' :key='post.id' class="list-group-item">

          <div class="post-comment">
            <div class="aside-info">
              <img class="avatar" :src="'/avatar/' + post.avatar" alt="" />
            </div>
            <div class="comment-main">
              <div>
                <router-link :to="'/post/' + post.id">
                  {{post.title}}
                </router-link>
              </div>
              <div class="comment-footer">
                <router-link :to="'/user/' + post.userId">            
                  <span class="comment-name">
                    {{post.name}}              
                  </span>
                </router-link>
                <span class="post-time">
                  {{'发表于：' + getPostTime(post) + ' 回复(' + post.count + ')'}}                             
                </span>
              </div>
            </div>
          </div>


  <!-- 
        <h3>
          <router-link :to="'/post/' + post.id">{{post.title}}</router-link> by {{post.name}} {{getPostTime(post)}}
        </h3>
        <p>{{post.content}}</p>   -->      
      </li>
    </ul>
    
  </section>
</template>



<script>
export default {
  name: 'home',
  data(){
    return {
      posts:{},
    }
  },
  methods:{
    getPostTime(post){
      return this.toLocaleString(post.timestamp)
    }
  },
  async created(){
    let res = await this.axios.get('/api/posts')
    this.posts = res.data
  }
}
</script>

<style>
  section.home ul.list-group.outer-comment > li.list-group-item{    
    margin-left: -1rem;
    margin-right: -1rem;
    border-left: none;
    border-right:none; 
    padding:0.5rem 1rem;
  }
  section.home div.post-comment{
    display: flex; 
  }
  section.home div.aside-info{
    width: 3rem;
    margin-right: 1rem;
    flex-grow: 0;
  }
  section.home img.avatar{
    border-radius: 0.5rem 0.5rem;
    width: 3rem;
    height: 3rem
  }
  section.home span.comment-name{
    xwidth: 2rem;  
    display: inline-block;
    padding-right: 0.2rem;
    margin-right: 1rem;
  }  
  section.home div.comment-main{
    width: auto;
    flex-grow: 1;
  }
  section.home div.comment-main > :first-child{
    min-height: 1.6rem;
  }
  section.home div.comment-main > :first-child *{    
    color: black;
  }
 section.home  div.comment-main > :nth-child(2){
    font-size: 1rem;
    xfloat:right;
  }

  section.home div.comment-footer *{
    font-size: 0.7rem;
  }

  section.home div.comment-footer span.post-time{
    color: #ccc
  }

  section.home div.comment-footer a:hover{
    text-decoration: none;
    font-weight: bold;
  }
</style>
