<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

  <scroll class="content"
          ref="scroll"
          :probe-type="3"
          @scroll="contentScroll"
          :pull-up-load="true"
          @pullingUp="loadMore">
<!--          @pullingUp="loadMore"-->

    <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"></tab-control>
    <goods-list :goods="showGoods"></goods-list>
  </scroll>
<!--    组件监听原生事件-->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>
  import HomeSwiper from "views/home/childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import GoodsListItem from "components/content/goods/GoodsListItem";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

  import {
    getHomeMultidata,
    getHomeGoods
  } from "network/home";
  // import {debounce} from "common/utils";
  // import Swiper from "components/common/swiper/Swiper";
  // import SwiperItem from "components/common/swiper/SwiperItem";
  import {Swiper,SwiperItem} from 'components/common/swiper'

  export default {
    name: "Home",
    data(){
      return{
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0, list: []},
          'new': {page:0, list: []},
          'sell': {page:0, list: []},
        },
        //默认当前类型
        currentType:'pop',
        isShowBackTop:false,
        tabOffsetTop:0
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    components:{
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      GoodsListItem,
      Scroll,
      BackTop
    },
    //生命周期
    created() {
      //1.请求多个数据，异步操作
     this.getHomeMultidata()
      //2.请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted(){
      //图片加载完成的事件监听
      const refresh = this.debounce(this.$refs.scroll.refresh, 200)
      // const refresh = this.debounce(this.$refs.scroll.refresh, 500)
      //3.监听item中的图片加载完成
      this.$bus.$on('itemImageLoad', () => {
        refresh()
      })
      //获取tabControl的offsetTop
      console.log(this.$refs.tabControl.$el.offsetTop);
    },
    methods:{
      debounce(func, delay){
        let timer = null;

        return function (...args) {
          //清除
          if (timer) clearTimeout(timer)
          //重新计时
          timer = setTimeout(() => {
            func.apply(this,args)
          },delay)
        }
      },
    /**
      * 事件监听相关方法
      */
    tabClick(index){
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },
      // swiperImageLoad(){
      //   console.log(this.$refs.tabControl.$el.offsetTop);
      //   // this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
      // },
    /**
     * 网络请求相关方法
     */
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          // console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // console.log(res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          //上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      },
      backClick(){
        console.log('backClick');
        this.$refs.scroll.scroll.scrollTo(0, 0, 500);
        // console.log(this.$refs.scroll.message);
      },
      contentScroll(position){
        // console.log(position);
        this.isShowBackTop = (-position.y) > 1000
      },
      //监听下加载更多
      loadMore(){
        console.log('loadmore');
        this.getHomeGoods(this.currentType)
      }

    }
  }
</script>

<style scoped>
  #home {
    position: relative;
    padding-top: 44px;
    height: 100vh;
  }
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10;
}
  /*.tab-control{*/
  /*  position: sticky;*/
  /*  top: 44px;*/
  /*  z-index: 10;*/
  /*}*/
  .content{
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    /*margin-top: 44px;*/
    /*height: calc(100% - 93px);*/
    overflow: hidden;
  }
</style>