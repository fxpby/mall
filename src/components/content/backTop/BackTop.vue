<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
  export default {
    name: "BackTop",
    methods:{
    }
  }
</script>

<style scoped>
  .back-top{
    position: fixed;
    right: -25px;
    bottom: 52px;
  }
  .back-top img{
    width: 60%;
    height: 60%;
  }
</style>