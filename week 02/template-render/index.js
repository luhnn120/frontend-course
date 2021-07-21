let tmpl =`
    <div class="newslist">
      <div class="img" v-if="info.showImage">
        <img src="{{image}}"/>
      </div>
      <div class="date" v-if="info.showDate">{{info.date}}</div>
      <div class="name">{{info.name}}</div>
    </div>`;
    
new Template().mounted(document.querySelector('#app')).render(tmpl, {
  image: "./geek.png", 
  info: {
    showImage: true, 
    showDate: false, 
    name: "Geek Time",
    date: new Date()
  }
})