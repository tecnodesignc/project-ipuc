<template>
  <div>
    <div v-if="noactive" class="texto">
      <b>Finalizada</b>
    </div>
    <ul class="count-down" v-else>
      <li>
        <span class="digit">{{ days }}</span>
      </li>
      <li>
        <span class="digit">{{ hours }}</span>
      </li>
      <li>
        <span class="digit">{{ minutes }}</span>
      </li>
      <li>
        <span class="digit">{{ seconds }}</span>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  name: 'Countdown',
  props: ['deadline'],
  data () {
    return {
      hours:0,
      days: 0,
      minutes: 0,
      seconds:0,
      datend: '2019-11-28T09:00:00',
      noactive: true
    }
  },
  mounted(){
    setInterval(this.updateCounter,1000)
  },
  methods: {
    updateCounter(){
      let now = new Date();
      let end = new Date(this.deadline);
      let distance = end - now;
      if(distance > 0){
        this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
        this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
        this.noactive = false;
      }else{
        this.hours = 0;
        this.minutes = 0;
        this.days = 0;
        this.seconds = 0;
        this.noactive = true;
      }
    },
  }
}
</script>

<style>
  .count-down{
    padding:0;
    margin:0
  }
  .count-down li{
      display:inline-block;
      margin:0 8px;
      text-align:center;
      position:relative
  }
  .count-down li p{
      margin:0
  }
  .count-down li:after{
      content:":";
      position:absolute;
      top:0;
      right:-13px;
      font-size:32px
  }
  .count-down li:first-of-type{
      margin-left:0
  }
  .count-down li:last-of-type{
      margin-right:0
  }
  .count-down li:last-of-type:after{
      content:""
  }
  .count-down .digit{
      font-size:25px;
      font-weight:500;
      line-height:1.4;
      margin-bottom:0
  }
  .count-down .text{
      text-transform:uppercase;
      margin-bottom:0;
      font-size:10px
  }
</style>
