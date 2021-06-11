<template>
  <div class="ecahrt">
    <div class="content"></div>
  </div>
</template>
<script>
import * as echarts from "echarts";
export default {
  name: "CollectEchart",
  props: {
    day: Array,
  },
  data() {
    return {};
  },
  mounted() {
    // console.log("day", this.day);
    this.SetEchart();
  },
  watch: {
    day: function () {
      // console.log('i am watching you');
      this.SetEchart();
    },
  },
  methods: {
    SetEchart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.querySelector(".content"));

      let day = this.day;
      function getVirtulData(year) {
        year = year || "2021";
        var date = +echarts.number.parseDate(year + "-01-01");
        var end = +echarts.number.parseDate(+year + 1 + "-01-01");
        var dayTime = 3600 * 24 * 1000;
        var data = [];
        day.forEach((element) => {
          data.push([
            echarts.time.format("yyyy-MM-dd", element.collect_date),
            element.counts,
          ]);
        });
        return data;
      }

      let option = {
        tooltip: {
          position: "top",
        },
        visualMap: {
          show: false,
          min: 0,
          max: 20,
          calculable: true,
          orient: "vertical",
          left: "0",
          top: "center",
          inRange: {
            color: ["#d6fffb", "#09427a"],
          },
        },
        calendar: [
          {
            orient: "vertical",
            range: "2021",
            left: "50",
          },
        ],
        series: {
          type: "heatmap",
          coordinateSystem: "calendar",
          calendarIndex: 0,
          data: getVirtulData(2021),
        },
      };
      myChart.setOption(option);
    },
  },
};
</script>

<style scoped>
.content {
  width: 100%;
  height: 1200px;
  position: fixed;
  top: 0;
}
</style>