<template>
  <div>
    <ul>
      <li 
        v-for="item in newsList" 
        :key="item.key"
        @click="showDetail(item)"
      >
        <img :src="item.image" alt="" srcset="">
        <div>
          <p class="title">{{item.title}}</p>
          <p class="time">{{item.passtime}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
  created(){
    axios.post('https://api.apiopen.top/getWangYiNews', {
      page: 1,
      count: 20,
    })
    .then(res => {
      this.newsList = res.data.result.map(el => {
        let key;
        el.path.replace(/(.*)\/([^.]*).html/gm, (match, p0, p1) => {
          key = p1
        })
        el.key = key;
        return el;
      })
      this.showDetail(this.newsList[0])
    }).catch(err => {
      throw new Error(err)
    })
  },
  methods:{
    showDetail(item){
      history.pushState({
        path: item.path
      }, item.title, `/#/title/${item.key}`)
      this.setGlobalState({
        path: item.path
      })
    }
  },
  data(){
    return{
      newsList: [],
    }
  },
}
</script>

<style scoped>
* {
  margin: unset;
  padding: unset;
}
ul, li{
  list-style: none;
}
ul{
  height: 85vh;
  overflow-y: scroll;
}
li {
  cursor: pointer;
  display: flex;
  padding: 10px 8px;
}
li *{
  display: inline-block;
}
li img{
  width: 30%;
  height: 30%;
}
li div{
  display: flex;
  margin-left: 5%;
  flex-direction: column;
  text-align: left;
}
li div .title{
  font-size: 20px;
  font-weight: bolder;
}
li div .time{
  margin-top: 6px;
  font-size: 16px;
  color: grey;
}
</style>
