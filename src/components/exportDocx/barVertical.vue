<template>
  <div ref="bar" />
</template>

<script>
export default {
  name: "barVertical",
  props: {
    datas: {
      type: Object,
      default: () => {
        return {
          title: "",
          data: [],
          axis: [],
        };
      },
    },
  },
  data() {
    const mock = [];
    const opt = {
      legend: {
        show: false,
      },
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
      yAxis: {
        show: false,
        min: this.datas.data[this.datas.data.length - 1],
      },
      xAxis: {
        type: "category",
        data: this.datas.axis,
        axisTick: {
          show: false,
        },
        axisLabel: {
          rotate: 45,
          fontSize: 10,
        },
      },
      grid: {
        bottom: "30%",
        left: "13%",
        right: 0,
      },
      series: [
        {
          data: this.datas.data,
          type: "bar",
          barWidth: "40%",
          itemStyle: {
            normal: {
              color: "rgb(80,127,189)",
              label: {
                show: true,
                position: "top",
                color: "#000",
                fontSize: 10,
              },
            },
          },
        },
      ],
    };
    return {
      opt,
      mock,
    };
  },
  mounted() {
    this.makeBar();
  },
  methods: {
    makeBar() {
      this.echarts.init(this.$refs.bar).setOption(this.opt);
    },
  },
};
</script>

<style lang="less" scoped></style>
