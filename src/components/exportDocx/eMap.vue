<template>
  <div ref="emap" />
</template>

<script>
import sichuan from "../../assets/exportDocx/json/sichuan.json";
export default {
  name: "emap",
  props: {
    datas: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    const opts = {
      legend: {
        show: false,
      },
      geo: {
        map: "sichuan",
        label: {
          show: true,
          color: "#000",
          fontSize: 8,
        },
        itemStyle: {
          color: "#fff",
        },
      },
      visualMap: {
        type: "piecewise",
        orient: "vertical",
        maxOpen: true,
        itemWidth: 10,
        itemHeight: 10,
        showLabel: true,
        seriesIndex: [0],
        pieces: [
          { min: 0, max: 0, label: "=0家" },
          { min: 1, max: 1, label: "=1家" },
          { min: 2, max: 2, label: "=2家" },
          { min: 3, max: 109, label: ">=3家" },
          { min: 109, label: ">110家" },
        ],
        min: 0,
        max: 110,
        inRange: {
          color: ["#fff", "#FD9707", "#9F2511"],
        },
        textStyle: {
          color: "#7B93A7",
        },
        bottom: 30,
        left: "left",
      },
      series: [
        {
          name: "mapSer",
          type: "map",
          roam: false,
          geoIndex: 0,
          label: {
            show: false,
          },
          data: this.datas,
        },
      ],
    };
    return {
      opts,
    };
  },
  beforeMount() {
    this.echarts.registerMap("sichuan", sichuan);
  },
  mounted() {
    this.makeMap();
  },
  methods: {
    makeMap() {
      this.echarts.init(this.$refs.emap).setOption(this.opts);
    },
  },
};
</script>

<style></style>
