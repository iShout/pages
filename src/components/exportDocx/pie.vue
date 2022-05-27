<template>
  <div ref="pie" />
</template>

<script>
export default {
  name: "pie",
  props: {
    datas: {
      type: Object,
      default: () => {
        return {
          title: "饼状图标题",
          legend: ["初始化数据", "init data2"],
          data: [
            {
              name: "初始化数据",
              value: 19,
            },
            {
              name: "init data2",
              value: 23,
            },
          ],
        };
      },
    },
  },
  data() {
    const opts = {
      title: {
        text: this.datas.title,
        left: "center",
        top: 20,
        textStyle: {
          color: "#000",
          fontSize: 14,
          fontWeight: "normal",
        },
      },
      legend: {
        data: this.datas.legend,
        orient: "vertical",
        right: 0,
        top: "middle",
        itemWidth: 10,
        itemHeight: 10,
      },
      series: [
        {
          type: "pie",
          radius: "55%",
          center: ["30%", "50%"],
          data: this.datas.data,
          label: {
            show: true,
            position: "inside",
            formatter: "{d}%",
          },
          animationType: "scale",
          animationEasing: "elasticOut",
          animationDelay: function () {
            return Math.random() * 200;
          },
        },
      ],
    };
    return {
      opts,
    };
  },
  mounted() {
    this.makePie();
  },
  methods: {
    makePie() {
      this.echarts.init(this.$refs.pie).setOption(this.opts);
    },
  },
};
</script>

<style lang="less" scoped></style>
