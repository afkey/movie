<template>
  <div class="homeWrapper">
    <!-- 电影名称<input type="text" ref="getInput" />
    <button @click="submit">提交</button>
    <button @click="sub">提交1</button>
    <ul class="moviesList">
      <li v-for="(item, index) in moviesList" :key="index">{{ item }}</li>
    </ul> -->
    <div class="moviesWrapper">
      <ul class="moviesList">
        <li
          v-for="(item, index) in moviesList"
          :key="index"
          @click="clickMovieList(index, item, $event)"
          @mouseover="showDetail(index, item, $event)"
          @mouseleave="closeDetail(index, item)"
        >
          <div>{{ item.movie_title }}</div>
          <img
            class="flag"
            src="../assets/img/star2.png"
            alt=""
            v-if="!item.collect"
          />
          <img v-else class="flag" src="../assets/img/star1.png" alt="" />
        </li>
      </ul>
    </div>
    <div class="userData">
      <collect-echart :day="day"></collect-echart>
    </div>
  </div>
</template>

<script>
import { getMovies } from "../network/request";
import { getTest } from "../network/request";
import { updateCollect } from "../network/request";
import { updateHeatmapData } from "../network/request";
import { deleteHeatmapData } from "../network/request";
import { getHeatmapData } from "../network/request";
import collectEchart from "../components/collectEchart.vue";
import { EventBus } from "../main";
export default {
  components: { collectEchart },
  name: "Home",
  data() {
    return {
      moviesList: [],
      movieId: "",
      moviesTag: "",
      isCollect: 0,
      day: [],
      today: "",
      isMouseOver: 0,
    };
  },
  computed: {},
  created() {
    var today = new Date();
    let year = today.getFullYear();
    let mon = parseInt(today.getMonth()) + 1;
    4;
    let day = today.getDate();
    this.today = year + "-" + mon + "-" + day;
  },
  mounted() {
    // console.log(that.moviesTag);
    getTest("爱情").then((res) => {
      this.moviesList = res;
    });
    getHeatmapData().then((res) => {
      this.day = res.data;
    });
    var that = this;
    EventBus.$on("getMoviesByTag", (tag) => {
      // console.log("已监听");
      that.moviesTag = tag;
      // console.log(that.moviesTag);
      getTest(this.moviesTag).then((res) => {
        this.moviesList = res;
      });
    });
  },
  methods: {
    clickMovieList(index, item, $event) {
      console.log(index,item.movie_title);
      this.moviesList[index].collect = !this.moviesList[index].collect;
      if (item.collect) {
        updateCollect(this.moviesTag, item.collect, item.movie_id);
        updateHeatmapData(item.movie_id, item.movie_title, this.today);
        getHeatmapData().then((res) => {
          this.day = res.data;
        });
      } else {
        updateCollect(this.moviesTag, item.collect, item.movie_id);
        deleteHeatmapData(item.movie_id);
        getHeatmapData().then((res) => {
          this.day = res.data;
        });
      }
    },

    showDetail(index, item, e) {
      item.isMouseOver = true;
    },
    closeDetail(index, item) {
      item.isMouseOver = false;
      // console.log(index,item.isMouseOver);
    },

    submit() {
      getMovies().then((res) => {
        this.moviesList = res;
      });
      console.log("submit success");
    },
    sub() {
      this.movieId = this.$refs.getInput.value;
      getTest(this.movieId).then((res) => {
        this.moviesList = res;
      });
    },
  },
};
</script>

<style scoped>
.homeWrapper {
  margin-top: 50px;
}
.moviesWrapper {
  width: 85%;
  background-color: #FBFCFE;
  float: left;
}
.userData {
  width: 15%;
  position: absolute;
  right: 0;
}
.moviesList {
  display: flex;
  flex-wrap: wrap;
}
.moviesList li {
  width: 240px;
  height: 30px;
  border-radius: 5px;
  list-style: none;
  /* text-align: center; */
  line-height: 30px;
  position: relative;
}

.moviesList li:hover{
  background-color:#DBE2FC;
}

.moviesList div {
  width: 200px;
  height: 30px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  /* background-color: linen; */
  margin-left: 5px;
}
.moviesList .flag {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 10px;
  top: 5px;
}


</style>