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
    propName: {
      type: String,
      default: "medicines",
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
      yAxis: [
        {
          type: "category",
          data: this.axis,
          inverse: true,
          gridIndex: 0,
          axisLabel: {
            color: "#333",
            fontSize: 10,
          },
          axisLine: {
            lineStyle: {
              color: "#e7e7e7",
            },
          },
          axisTick: {
            lineStyle: {
              color: "#e7e7e7",
            },
          },
        },
        {
          type: "category",
          gridIndex: 1,
          axisLine: { show: false },
          axisLabel: { show: false },
          axisTick: { show: false },
        },
      ],
      xAxis: [
        {
          show: false,
          type: "value",
          gridIndex: 0,
          axisLabel: {
            color: "#333",
          },
          splitLine: {
            lineStyle: {
              type: "dashed",
            },
          },
          axisLine: {
            lineStyle: {
              color: "#ccc",
            },
          },
          axisTick: {
            lineStyle: {
              color: "#ccc",
            },
          },
        },
        {
          type: "value",
          gridIndex: 1,
          axisLabel: { show: false },
          axisLine: { show: false },
          splitLine: { show: false },
          axisTick: { show: false },
        },
      ],
      grid: [
        {
          top: 10,
          left: 60,
          right: "30%",
        },
        {
          top: 10,
          left: 0,
          width: 60,
          tooltip: { show: false },
        },
      ],
      series: [
        {
          data: this.optData,
          type: "bar",
          barWidth: 20,
          barGap: 0.3,
          itemStyle: {
            normal: {
              color: (params) => this.colorBg(params.dataIndex),
              label: {
                formatter: (params) => this.toLabel(params),
                offset: [-32, 0],
                show: true,
                position: "right",
                color: "#000",
                fontSize: 10,
              },
            },
          },
          xAxisIndex: 0,
          yAxisIndex: 0,
        },
      ],
    };
    return {
      opt,
      axis: [],
      optData: [],
      dLength: 0,
    };
  },
  watch: {
    datas: {
      handler(newval) {
        this.getData(newval)
          .then((data) => {
            this.dLength = data
              .map((item) => item[this.propName].length)
              .reduce((n, m) => n + m); // x轴数据总长度
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
        data: [
          {
            name: "",
            value: 1,
          },
        ],
        label: {
          show: true,
          position: "inside",
          formatter: "{b}",
          offset: [0, 10],
          textStyle: {
            color: "#666",
          },
        },
        type: "bar",
        barGap: 0,
        barWidth: "",
        itemStyle: {
          color: "",
          opacity: 0.8,
        },
        animationEasing: "bounceOut",
        xAxisIndex: 1,
        yAxisIndex: 1,
      };
      const copyData = this._.cloneDeep(data);
      // 对拿到的数据进行排序
      copyData.forEach((data) => {
        data[this.propName].sort((pre, cur) => -(pre.value - cur.value));
      });

      copyData.forEach((data, index) => {
        const pObj = this._.cloneDeep(template);
        pObj.data[0].name = data.hosGrade;
        pObj.barWidth = (data[this.propName].length / this.dLength) * 100 + "%";
        pObj.itemStyle.color = this.colorBg(index);
        this.opt.series.push(pObj);
        data[this.propName].forEach((med) => {
          this.axis.push({ pName: data.hosGrade, value: med.name });
          this.optData.push(med.value);
        });
      });
      this.updateData();
      this.makeBar();
    },
    updateData() {
      this.opt.yAxis.data = this.axis;
      this.opt.series[0].data = this.optData;
    },
    colorBg(index) {
      const colors = [
        "#51688a",
        "#88b8cc",
        "#c9def1",
        "#FFE4B5",
        "#f1e3dd",
        "#51688a",
        "#88b8cc",
        "#c9def1",
        "#FFE4B5",
        "#f1e3dd",
        "#51688a",
        "#88b8cc",
        "#c9def1",
        "#FFE4B5",
        "#f1e3dd",
      ];
      return colors[index];
    },
    toLabel(param) {
      const dataCopy = this._.cloneDeep(this.datas);
      const medicines = this._.flattenDeep(
        dataCopy.map((data) => data[this.propName])
      );
      return param.value + "   " + medicines[param.dataIndex].name;
    },
  },
};
</script>

<style lang="less" scoped></style>
