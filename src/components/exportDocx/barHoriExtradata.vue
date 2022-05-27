<template>
  <div ref="bar" />
</template>

<script>
export default {
  name: "barHorizontal",
  props: {
    datas: {
      default: () => [],
    },
    propName: {
      type: String,
      default: "byDistrict",
    },
  },
  data() {
    const opt = {
      legend: {
        show: false,
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
      yAxis: {
        type: "category",
        data: [],
        inverse: true,
        axisLabel: {
          fontSize: 10,
        },
      },
      xAxis: {
        show: false,
        min: 0,
      },
      grid: {
        bottom: "10%",
        left: "24%",
        right: "12%",
      },
      series: [
        {
          data: [],
          type: "bar",
          barWidth: "40%",
          itemStyle: {
            normal: {
              color: "#c9def1",
              label: {
                offset: [-35, 0],
                formatter: (params) => this.toLabel(params),
                show: true,
                position: "right",
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
      axis: [],
      optData: [],
      title: "",
      sortedData: [],
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
    updateData() {
      this.opt.title.text = this.title;
      this.opt.yAxis.data = this.axis;
      this.opt.series[0].data = this.optData;
      this.makeBar();
    },
    async getData(data) {
      return await new Promise((resolve, reject) =>
        typeof data !== "undefined" ? resolve(data) : reject()
      );
    },
    handleData(data) {
      const copyData = this._.cloneDeep(data[this.propName]).sort(
        (pre, cur) => pre.value - cur.value
      );
      // 把排序之后的数据放入变量里面。 别问为啥要多用一个copyData，因为我懒得改了
      this.sortedData = this._.cloneDeep(copyData);

      this.axis = copyData.map((data) => data.name);
      this.optData = copyData.map((data) => data.value);
      this.title =
        this.propName === "byDistrict" ? "按地市排名" : "按医院等级排名";
      this.updateData();
    },
    toLabel(param) {
      return (
        param.data +
        "min  " +
        "环比:" +
        this.sortedData[param.dataIndex].samePeriod +
        "min "
      );
    },
  },
};
</script>

<style lang="less" scoped></style>
