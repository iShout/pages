<template>
  <div ref="bar" />
</template>

<script>
export default {
  name: "barHorizontal",
  props: {
    datas: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    const axis = [];
    const legend = [];
    const optData = [];
    const opt = {
      legend: {
        show: true,
      },
      title: {
        text: "",
        left: "center",
        top: 20,
        textStyle: {
          color: "#000",
          fontSize: 14,
          fontWeight: "normal",
        },
      },
      color: ["#51688a", "#88b8cc", "#c9def1", "#f1e3dd"],
      yAxis: {
        type: "category",
        data: this.axis,
        inverse: true,
        axisLabel: {
          fontSize: 10,
        },
      },
      xAxis: {
        show: false,
      },
      grid: {
        bottom: "2%",
        left: "24%",
        right: "18%",
      },
      series: this.optData,
    };
    return {
      opt,
      axis,
      optData,
      legend,
    };
  },
  watch: {
    datas: {
      handler(newval) {
        this.getData(newval)
          .then((data) => {
            this.handleData(data);
          })
          .catch((err) => {
            return err;
          });
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.makeBar();
  },
  methods: {
    makeBar() {
      this.echarts.init(this.$refs.bar).setOption(this.opt);
    },
    async getData(data) {
      return await new Promise((resolve, reject) =>
        typeof data !== "undefined" ? resolve(data) : reject()
      );
    },
    handleData(data) {
      const template = {
        name: "all",
        data: [],
        type: "bar",
        barWidth: 20,
        barGap: 0.3,
        itemStyle: {
          normal: {
            label: {
              formatter: (param) => this.toLabel(param),
              show: true,
              position: "right",
              color: "#000",
              fontSize: 10,
            },
          },
        },
      };
      const copyData = this._.cloneDeep(data);
      copyData.sort((pre, cur) => -(pre.data[0].value - cur.data[0].value));
      this.axis = copyData.map((item) => item.district);
      this.axis.forEach((data) => this._.truncate(data, { length: 3 }));
      const cases = [];
      for (let i = 0; i < 4; i++) {
        cases.push(copyData.map((data) => data.data[i].value));
      }
      cases.forEach((data, index) => {
        this.optData.push(
          Object.assign(this._.cloneDeep(template), {
            name: index === 0 ? "病例总数" : "占比第" + index,
            data: data,
          })
        );
      });
      this.updateData();
      this.makeBar();
    },
    updateData() {
      this.opt.yAxis.data = this.axis;
      this.opt.series = this.optData;
    },
    toLabel(param) {
      const dataCopy = this._.cloneDeep(this.datas);
      const fullData = dataCopy.filter((data) => data.district === param.name);
      return fullData[0].data[param.seriesIndex].name + " | " + param.value;
    },
  },
};
</script>

<style lang="less" scoped></style>
