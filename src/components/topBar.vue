<template>
  <div class="topBar">
    <div class="tagList" v-for="(item, index) in tag" :key="index">
      <div
        class="tag"
        @click="clickBar(index)"
        :class="{ active: index === clickIndex }"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from "../main";
export default {
  name: "TopBar",
  data() {
    return {
      tag: [
        "爱情",
        "剧情",
        "动画",
        "动作",
        "经典",
        "科幻",
        "恐怖",
        "冷门佳片",
        "喜剧",
        "悬疑",
        "华语",
        "韩国",
        "欧美",
        "日本",
      ],
      clickIndex: 0,
    };
  },
  computed: {},
  methods: {
    clickBar(index) {
      EventBus.$emit("getMoviesByTag", this.tag[index]);
      this.clickIndex = index;
      // console.log('点击',this.tag[index]);
    },
  },
};
</script>
<style scoped>
.topBar {
  width: 100%;
  height: 50px;
  background-color: #51598E;
  display: flex;
  position: fixed;
  top: 0;
  z-index: 10;
}
.tagList {
  flex: 1;
  text-align: center;
}
.tagList div {
  height: 50px;
  line-height: 50px;
}

.active {
  background-color: #979FC9;
  color: white;
}

</style>