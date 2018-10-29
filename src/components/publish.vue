<template>
  <section class="publish">
    <div>创建新帖：</div>
    <div>标题：</div>
    <!-- <input type="text" placeholder='please enter title' v-model='title' /> -->
    <textarea class="publish-title" name="" id="" cols="30" rows="3" v-model='title'></textarea>
    <div>内容：</div>
    <textarea class="publish-content" name="" id="" cols="30" rows="10" v-model='content'></textarea>
    <span class="button" @click='addPost'>提交</span>  
  </section>
</template>

<script>
export default {
  name:'publish',
  data(){
    return {
      title:'',
      content:'',
    }
  },
  methods:{
    async addPost(){
      let res = await this.axios.post('/api/addPost',{
        userId:this.$root.$children[0].user.id,
        title:this.title,
        content:this.content,
      })
      this.$router.push('/post/' + res.data)
    }
  }
}
</script>

<style>
  section.publish{
    overflow: hidden;
  }
  section.publish textarea.publish-title{
    display: block;
    width: 100%;
  }
  section.publish textarea.publish-content{
    display: block;
    width: 100%
  }
  xsection.publish span.button{
    display: inline-block;
    float: right;
    margin:0.5rem 3px;
    border-radius: 5%;
    box-shadow: 0 0 1px 1px;
  }

  section.publish span.button{
    float: right;
    box-shadow: 0 0 1px 1px;
    border-radius: 5%;
    cursor: pointer;
    padding: 0.1rem 0.8rem;
    display: inline-block;
    margin:0.5rem 0.15rem;
    /*float: right;*/
    /*margin-top: 1rem;*/
  }
  section.publish span.button:hover{
    background-color: #d3d6db94;
  }
  
</style>
