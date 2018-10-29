<template>
  <section class="post">
    <div class="post-title">
      <h3>{{post.title}}</h3>
      <div>
        <router-link :to="'/user/' + post.userId">
          {{post.name}}
          <!-- <img class="mr-3" width:30 height=30  :src="'/avatar/' + post.avatar" alt="" /> -->
        </router-link>
        发布于{{getPostTime()}}
      </div>
      <p>{{post.content}}</p>
    </div>
    <!-- <div class="d-flex flex-column-reverse bd-highlight mb-3"> -->
    <ul class="list-group outer-comment">
      <div class="split-line"></div>
      <div class="comment-title">评论：</div>
      <!-- <div class="p-2 bd-highlight" v-for="comment in comments" :key='comment.id'> -->
      <li v-for="comment in comments" :key='comment.id' class="list-group-item">
        <div class="post-comment">
          <div class="aside-info">
            <img class="avatar" :src="'/avatar/' + comment.avatar" alt="" />
            <router-link :to="'/user/' + comment.userId">            
              <div class="comment-name">
                {{comment.name}}              
              </div>
            </router-link>
          </div>
          <div class="comment-main">
            <div>
              {{comment.content}}
            </div>
            <div class="comment-footer">
              <div>
                {{getCommentTime(comment.timestamp)}}
                <!-- <a @click='commentIndex = comment.id' href="javascript:;">回复</a> -->
                <a  @click='commentFlatIds[comment.id] ? $set(commentFlatIds,comment.id,false) : $set(commentFlatIds,comment.id,true)' href="javascript:;">{{commentFlatIds[comment.id] ? '收起评论' : '评论(' + comment.count + ')'}}</a>                              
              </div>
            </div>
          </div>
        </div>
          <!-- <transition name="slide-out-down"> -->
        <div class="comment-comment" v-if='commentFlatIds[comment.id]'>
            <!-- <div v-if='commentFlatIds[comment.id]'> -->
              <deep-comments :ref="'deepComments' + comment.id" :commentid='comment.id' ></deep-comments> 
            <!-- </div>           -->
<!--           <div v-if='commentIndex == comment.id' class="input-group mb-3">
            <input class="form-control" v-model='yourDeepComment' type="text" :placeholder="$root.$children[0].user ? '':'未登录，请登陆后再评论'" />
              <div class="input-group-append">
                <span class="input-group-text" id="basic-addon2"  @click='addDeepComment(comment)'>评论</span>
              </div>
          </div>  -->         
        </div>
          <!-- </transition> -->
      </li>
      <!-- </div> -->
    </ul>
    <!-- </div> -->
    <textarea class="post-addComment"   name="" id=""  rows="3" v-model='yourComment' :placeholder="$root.$children[0].user ? '':'未登录，请登陆后再评论'"></textarea>
    <button @click='addComment'>提交评论</button>
  </section>
</template>


<script>
import comment from './comment.vue'

export default {
  name:'post',
  components:{
    deepComments:comment
  },
  data(){
    return {
      post:{},
      comments:[],
      yourComment:'',
      commentFlatIds:{},
    }
  },
  async created(){
    let res = await this.axios.get('/api/post/' + this.$route.params.postId)
    this.post = res.data.post
    this.comments = res.data.postComments.reverse()
  },
  methods:{
    getPostTime(){
      // return new Date(this.post.timestamp).toLocaleString()
      return this.toLocaleString(this.post.timestamp)
    },
    getCommentTime(timestamp){
      return this.toLocaleString(timestamp)
    },
    async addComment(){
      if(!this.$root.$children[0].user || !this.yourComment){
        this.yourComment = ''
        return 
      }
        let res = await this.axios.post('/api/addComment',{
        content:this.yourComment,
        postId:this.$route.params.postId,
        userId:this.$root.$children[0].user.id
      })
      res.data.count = 0
      this.comments.push(res.data)
      this.yourComment = ''
    },
  }
}

</script>


<style>
  section.post{
    margin-bottom: 2rem;
    padding-bottom: 1rem 
  }

  section.post div.card.bg-light.mb-3{
    min-height: 25rem;
  }

  section.post ul.list-group.outer-comment > li.list-group-item{    
    margin-left: -1rem;
    margin-right: -1rem;
    border-left: none;
    border-right:none; 
    padding-bottom: 0;
  }
  section.post div.post-comment{
    display: flex; 
  }
  section.post div.aside-info{
    width: 3rem;
    margin-right: 1rem;
    flex-grow: 0;
  }
  section.post img.avatar{
    border-radius: 0.5rem 0.5rem;
    width: 3rem;
    height: 3rem
  }
  section.post div.comment-name{
    margin: 0.2rem auto;
    width: 3rem;
    text-align: center;
  }  
  section.post div.comment-main{
    width: auto;
    flex-grow: 1;
  }
  section.post div.comment-main > :first-child{
    min-height: 3rem;
  }
  section.post  div.comment-main > :nth-child(2){
    font-size: 1rem;
    float:right;
  }
  section.post div.comment-comment{
    margin-left: 4rem;
  }
  section.post div.comment-footer *{
    font-size: 0.7rem;
  }

  section.post div.comment-footer a{
    display: inline-block;
    width: 3rem;
  }
  
  section.post > div.post-title > h3{
    padding: 1rem 0;
  }
  
  section.post > div.post-title > div{
    border-bottom: 0.5px solid #e2e2e2;
    font-size: 0.7rem;
  }

  section.post > div.post-title > p{
    padding-top: 1rem; 
  }

  section.post div.split-line{
    height: 1rem;
    background-color: #f0f0f0;
    margin: 0 -1rem;
  }
  
  section.post div.comment-title{
    margin: 0 -1rem;
    padding:0 1.25rem;
  }

  section.post textarea.post-addComment{
    margin-top: 1rem;
    width: 100%;
    resize: none; 
    xoverflow:hidden;
  }
</style>
