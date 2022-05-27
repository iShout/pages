<template>
  <div class="back">
    <div class="a4-size artical-position">
      <el-skeleton :rows="6" animated v-if="!loadDone" />
      <article v-else id="exportToWord">
        <h1 class="word-title" style="text-align: center">
          xxxxxx服务分析报告
        </h1>
        <section>
          <h2 class="sub-title">一、分析资料及方法</h2>
          <p>
            （一）资料、数据：卫生统计数据、省互联医疗服务监管平台信息及数据、问卷调查信息及相关调研数据
          </p>
          <p>
            （二）方法：采用 SPSS 20.0 软件和 Excel 进行数据分析，
            计数资料以百分比表示。
          </p>
        </section>
        <section>
          <h2 class="sub-title">二、互联网医院建设情况</h2>
          <p>
            截至2021年12月，全省已经审批设置（建成）{{
              hospitalDetail.length
            }}家互联网医院，依托公立医疗机构设置的互联网医院{{
              hospitalDetail.filter((elem) => elem.establishedBy === "公立")
                .length
            }}家，依托民营医疗机构设置的互联网医院{{
              hospitalDetail.filter((elem) => elem.establishedBy === "民营")
                .length
            }}家； 中央在川医院{{
              hospitalDetail.filter((elem) => elem.belongsTo === "中央").length
            }}家；省属医院{{
              hospitalDetail.filter((elem) => elem.belongsTo === "省").length
            }}家；市属医院{{
              hospitalDetail.filter((elem) => elem.belongsTo === "市").length
            }}家；县区级以下{{
              hospitalDetail.filter((elem) => elem.belongsTo === "县").length
            }}家； 三级医疗机构{{
              hospitalDetail.filter((elem) => elem.level === "三级").length
            }}家（公立{{
              hospitalDetail.filter(
                (elem) => elem.level === "三级" && elem.establishedBy === "公立"
              ).length
            }}家，民营{{
              hospitalDetail.filter(
                (elem) => elem.level === "三级" && elem.establishedBy === "民营"
              ).length
            }}家）， 二级医疗机构{{
              hospitalDetail.filter((elem) => elem.level === "二级").length
            }}家（公立{{
              hospitalDetail.filter(
                (elem) => elem.level === "二级" && elem.establishedBy === "公立"
              ).length
            }}家，民营{{
              hospitalDetail.filter(
                (elem) => elem.level === "二级" && elem.establishedBy === "民营"
              ).length
            }}家）， 其他医疗机构{{
              hospitalDetail.filter((elem) => elem.level === "其他").length
            }}家（公立{{
              hospitalDetail.filter(
                (elem) => elem.level === "其他" && elem.establishedBy === "公立"
              ).length
            }}家，民营{{
              hospitalDetail.filter(
                (elem) => elem.level === "其他" && elem.establishedBy === "民营"
              ).length
            }}家）。 (数据来源：)
          </p>
          <p>
            目前全省{{ allAreas.length }}个市州已有{{
              _.uniqBy(hospitalDetail, "area").length
            }}个市州建设互联网医院， 其中<span
              v-for="(hospital, index) in _.uniqBy(hospitalDetail, 'area')"
              :key="hospital.name"
              >{{ hospital.area }}({{
                hospitalDetail.filter((elem) => elem.area === hospital.area)
                  .length
              }})家{{
                index === _.uniqBy(hospitalDetail, "area").length - 1
                  ? "。"
                  : "，"
              }}</span
            >
            <span v-if="hasHosAreas.length"
              ><span v-for="area in hasHosAreas" :key="area">{{ area }},</span>
              等{{ hasHosAreas.length }}个地市没有审批设置互联网医院。</span
            >
          </p>
        </section>
        <div>
          <e-map
            class="echarts"
            style="width: 100%; height: 450px"
            :datas="conversionFns.toMapType()"
          />
        </div>
        <section>
          <h2 class="sub-title">三、互联网医院服务开展情况</h2>
          <p>
            目前，我省已建设互联网医院开展服务主要有：在线咨询、报告解读、检验检查开具、在线问诊、电子处方、药品配送、健康教育、专项服务包（护理、孕检）等8大类，同时也提供预约挂号、检查预约、在线缴费等线上便民服务。
          </p>
          <p>
            互联网医院主要开展的三类服务有：网络咨询、网络复诊和电子处方。
            其中，开具电子处方{{
              (
                servicePropoData.data.filter(
                  (elem) => elem.name === "电子处方"
                )[0].value / 10000
              ).toFixed(1)
            }}万单，占比{{ (servicePropoData.propo.dzcf * 100).toFixed(1) }}%；
            网络咨询{{
              (
                servicePropoData.data.filter(
                  (elem) => elem.name === "网络咨询"
                )[0].value / 10000
              ).toFixed(1)
            }}万人次，占比{{
              (servicePropoData.propo.wlzx * 100).toFixed(1)
            }}%； 网络复诊{{
              (
                servicePropoData.data.filter(
                  (elem) => elem.name === "网络复诊"
                )[0].value / 10000
              ).toFixed(1)
            }}万人次，占比{{
              (servicePropoData.propo.wlfz * 100).toFixed(1)
            }}%。
          </p>
          <div>
            <pie
              class="echarts"
              style="width: 300px; height: 300px"
              :datas="conversionFns.toServicePropo()"
            />
          </div>
          <p>
            截至2021年年底，我省已审批开展业务的互联网医院，累计提供网络咨询、网络复诊和电子处方等服务{{
              (servicePropoData.total / 10000).toFixed(1)
            }}万人次。
          </p>
          <div>
            <bar-vertical
              class="echarts"
              style="width: 100%; height: 300px"
              :datas="conversionFns.sortByWLFZ()"
            />
          </div>
          <div>
            <bar-vertical
              class="echarts"
              style="width: 100%; height: 300px"
              :datas="conversionFns.sortByWLZX()"
            />
          </div>
        </section>
        <section>
          <h2 class="sub-title">(一)线上线下服务情况对比：</h2>
          <p>
            1.互联网医院（依托实体医疗机构设置的互联网医院，开展较好的前十，分别是<span
              v-for="data in wlfzTop10"
              :key="data.name"
              >{{ data.name }}、</span
            >
            ） 总诊疗量{{
              (
                wlfzTop10.reduce((pre, cur) => pre + cur.wlfz, 0) / 10000
              ).toFixed(1)
            }}万次,占线下门全年诊量的8.37%。
          </p>
          <p>
            2.目前存在几种不同的互联网医院运行情况，线上服务开展较好的，如四川大学华西医院互联网医院，2021年全年，互联网医院诊疗量156万人次，四川大学华西医院诊量710（预计）万人次，占比21.9%。依托实体医疗机构独立设置互联网医院，如成都成华东升医院富顿互联网医院，成都成华东升医院的线下门诊量2020年全年仅有1万（预计）人次，而线上互联网医疗诊疗量达到16万人次，是线下的16倍。
          </p>
        </section>
        <section>
          <h2 class="sub-title">(二)互联网医疗服务多维度分析：</h2>
          <p>1、科室排名：</p>
          <div>
            <bar-vertical
              class="echarts"
              style="width: 100%; height: 400px"
              :datas="conversionFns.toTop10.call(departInWLZX)"
            />
          </div>
          <div>
            <bar-vertical
              class="echarts"
              style="width: 100%; height: 400px"
              :datas="conversionFns.toTop10.call(departInWLFZ)"
            />
          </div>
          <p>2、处方服务排名（总量、分地域、分医院等级）</p>
          <div>
            <bar-vertical
              class="echarts"
              style="width: 100%; height: 400px"
              :datas="conversionFns.toTop10.call(FZZDTop10)"
            />
          </div>
          <div>
            <bar-multi-dimension
              class="echarts"
              style="width: 100%; height: 2800px"
              :datas="diagnoseByDistrict"
            />
          </div>
          <div>
            <bar-hori-yaxises
              class="echarts"
              prop-name="diagnose"
              style="width: 100%; height: 600px"
              :datas="medByHosGrade"
            />
          </div>
          <p>3、药品服务排名（总量、分地域、分医院等级）</p>
          <div>
            <bar-horizontal
              class="echarts"
              style="width: 100%; height: 400px"
              :datas="conversionFns.toTop10.call(medicinesTop10)"
            />
          </div>
          <div>
            <bar-multi-dimension
              class="echarts"
              style="width: 100%; height: 2800px"
              :datas="medicinesByDistrict"
            />
          </div>
          <div>
            <bar-hori-yaxises
              class="echarts"
              style="width: 100%; height: 600px"
              :datas="medByHosGrade"
            />
          </div>
        </section>
        <section>
          <h1 class="sub-title">(三)互联网医疗服务质量分析</h1>
          <p>响应速度、完成量、投诉情况分类及数量、服务评价情况</p>
          <p>分析内容：</p>
          <p>1、响应速度排名（总量、分地域、分医院等级）：</p>
          <p>
            从医生接受问诊平均回复时间来看，大部分的医生在60分钟以内回复，占比达84%。
          </p>
          <div>
            <pie
              class="echarts"
              style="width: 300px; height: 300px"
              :datas="conversionFns.toPropo.call(replyAvg)"
            />
          </div>
          <div>
            <bar-hori-extradata
              class="echarts"
              style="width: 100%; height: 1000px"
              :datas="replyTime"
            />
            <bar-hori-extradata
              class="echarts"
              style="width: 100%; height: 300px"
              :datas="replyTime"
              prop-name="byHosGrade"
            />
          </div>
          <p>
            从医生每次在线服务时长来看，70%以上的医生每次服务时间在30分钟以内。
          </p>
          <div>
            <pie
              class="echarts"
              style="width: 300px; height: 300px"
              :datas="conversionFns.toPropo.call(onlineAvg)"
            />
          </div>
          <p>2、完成率排名（总量、分地域、分医院等级）：</p>
          <p>
            92%的用户在线上能够及时找到问诊的科室和医生，从侧面能看出互联网问诊的完成率较高，达到92%。
          </p>
          <div>
            <pie
              class="echarts"
              style="width: 300px; height: 300px"
              :datas="conversionFns.toPropo.call(doneRate)"
            />
          </div>
          <p>投诉问题分类及排名（总量、分地域、分医院等级）：</p>
          <p>
            从投诉问题的分类来看，功能问题是最多的，其次是服务问题和收费问题。
          </p>
          <div>
            <bar-vertical
              class="echarts"
              style="width: 100%; height: 400px"
              :datas="conversionFns.toTop10.call(appealCase)"
            />
          </div>
          <p>服务评价好坏比例分析（总量、分地域、分医院等级）：</p>
          <p>患者对线上问诊的满意度是96%。</p>
          <div>
            <pie
              class="echarts"
              style="width: 300px; height: 300px"
              :datas="conversionFns.toPropo.call(satisfaction)"
            />
          </div>
        </section>
        <section>
          <h2 class="sub-title">四、互联网医院建设模式情况</h2>
          <p>监管平台数据质量分析：</p>
          <p>
            （1）电子签名异常较多，部分互联网医院未上传医师签名时间和签名值信息，无法确认医生在线上开处方和药师线上审方是否使用电子签名；
          </p>
          <div>
            <bar-vertical
              class="echarts"
              style="width: 100%; height: 300px"
              :datas="conversionFns.toSignOnError()"
            />
          </div>
          <p>
            （2）复诊异常情况，部分互联网医院首诊时间和复诊时间相差特别短，并且存在首诊机构和首诊诊断为无的情况；
          </p>
          <div>
            <bar-vertical
              class="echarts"
              style="width: 100%; height: 300px"
              :datas="conversionFns.toFZOnError()"
            />
          </div>
          <p>
            （3）部分互联网医院的医生备案情况较差，开展服务较多的互联网医院还有大量的医生未在监管平台进行备案；
          </p>
          <div>
            <bar-vertical
              class="echarts"
              style="width: 100%; height: 300px"
              :datas="conversionFns.toNotOnFile()"
            />
          </div>
          <p>
            （4）有少量互联网医院在针对6岁以下儿童网上问诊时未上传监护人和陪伴医师的信息，无法确认就诊时是否有监护人和医师的陪伴；
          </p>
          <div>
            <bar-vertical
              class="echarts"
              style="width: 100%; height: 300px"
              :datas="conversionFns.toErrorOnChild()"
            />
          </div>
          <p>（5）审批互联网医院后无上传数据</p>
          <p>
            {{ hospitalDetail.length }}家互联网医院共有{{
              conversionFns.listNotUploaded().length
            }}家在审批后未上传相关数据，占一半以上。具体名单如下：
          </p>
          <div class="list">
            <p
              v-for="(data, index) in conversionFns.listNotUploaded()"
              :key="data"
              class="list-item"
            >
              {{ index + 1 }}. {{ data }}
            </p>
          </div>
          <p>
            （6）部分互联网医院存在复诊诊断为空或者医生、患者信息不全的情况。
          </p>
          <div>
            <bar-vertical
              class="echarts"
              style="width: 100%; height: 300px"
              :datas="conversionFns.toFZDiagnoseError()"
            />
          </div>
          <p>（7）诊后评价异常</p>
          <div>
            <bar-vertical
              class="echarts"
              style="width: 100%; height: 300px"
              :datas="conversionFns.toErrorOnReview()"
            />
          </div>
          <div>
            <bar-vertical
              class="echarts"
              style="width: 100%; height: 400px"
              :datas="conversionFns.toTop10.call(age)"
            />
          </div>
          <div>
            <pie
              class="echarts"
              style="width: 300px; height: 300px"
              :datas="conversionFns.toPropo.call(age)"
            />
          </div>
        </section>
      </article>
    </div>
  </div>
</template>

<script>
import { ToWord } from "../apis/exportDocx/exportToWord";
import mockdata from "../apis/exportDocx/mockdata";
import { HandleData } from "../apis/exportDocx/pageDataOpt";

import pie from "../components/exportDocx/pie.vue";
import eMap from "../components/exportDocx/eMap.vue";
import barVertical from "../components/exportDocx/barVertical.vue";
import barHorizontal from "../components/exportDocx/barHorizontal.vue";
import barMultiDimension from "../components/exportDocx/BarMultiDimension.vue";
import barHoriYaxises from "../components/exportDocx/barHori2Y.vue";
import barHoriExtradata from "../components/exportDocx/barHoriExtradata.vue";
export default {
  name: "exportDocx",
  components: {
    pie,
    eMap,
    barHorizontal,
    barVertical,
    barMultiDimension,
    barHoriYaxises,
    barHoriExtradata,
  },
  data() {
    return {
      hospitalDetail: [],
      allAreas: [
        "成都市",
        "绵阳市",
        "自贡市",
        "遂宁市",
        "广元市",
        "德阳市",
        "乐山市",
        "攀枝花市",
        "宜宾市",
        "达州市",
        "雅安市",
        "眉山市",
        "资阳市",
        "泸州市",
        "巴中市",
        "南充市",
        "中央在川医疗机构",
        "委直属医疗机构",
        "阿坝藏族羌族自治州",
        "甘孜藏族自治州",
        "凉山彝族自治州",
        "内江市",
        "广安市",
      ],
      hasHosAreas: [],
      conversionFns: Object,
      servicePropoData: Object,
      wlfzTop10: Object,
      departInWLZX: {}, // 网络咨询数据处理对象，以下类似
      departInWLFZ: {},
      FZZDTop10: {},
      medicinesTop10: {},
      replyAvg: {},
      onlineAvg: {},
      doneRate: {},
      appealCase: {},
      satisfaction: {},
      age: {},
      loadDone: false, //  后台所有数据获取完成
      diagnoseByDistrict: [],
      medicinesByDistrict: [],
      medByHosGrade: [],
      replyTime: [],
    };
  },
  beforeMount() {
    mockdata.createHospitalMock(); // 创建mock数据 --对接数据删除
    mockdata.createTop10s("wlzx"); // 创建mock数据 --对接数据删除
    mockdata.createTop10s("wlfz"); // 创建mock数据 --对接数据删除
    mockdata.createTop10s("fzzd"); // 创建mock数据 --对接数据删除
    mockdata.createTop10s("medicines"); // 创建mock数据 --对接数据删除
    mockdata.createPropo("replyAvg"); // 创建mock数据 --对接数据删除
    mockdata.createPropo("onlineAvg"); // 创建mock数据 --对接数据删除
    mockdata.createPropo("doneRate"); // 创建mock数据 --对接数据删除
    mockdata.createPropo("appealCase"); // 创建mock数据 --对接数据删除
    mockdata.createPropo("satisfaction"); // 创建mock数据 --对接数据删除
    mockdata.createPropo("age"); // 创建mock数据 --对接数据删除
    mockdata.createDiagnoseRank(); // 创建mock数据 --对接数据删除
    mockdata.createMedicinesRank(); // 创建mock数据 --对接数据删除
    mockdata.createMedByHosgrade(); // 创建mock数据 --对接数据删除
    mockdata.createReplyTime(); // 创建mock数据 --对接数据删除
  },

  mounted() {
    this.getHospitals().then((res) => {
      this.hasHosAreas = this.getNoHosArea(res);
      this.conversionData(res);
      const loadData = Promise.all([
        this.getTop10s("wlzx"), // 获取网络咨询科室排名
        this.getTop10s("wlfz"), // 获取网络复诊科室排名
        this.getTop10s("fzzd"), // 获取复诊诊断排名
        this.getTop10s("medicines"), // 获取复诊诊断排名
        this.getPropos("replyAvg"), // 获取平均回复事件数据
        this.getPropos("onlineAvg"), // 获取平均回复事件数据
        this.getPropos("doneRate"), // 获取完成率数据
        this.getPropos("appealCase"), // 获取投诉数据
        this.getPropos("satisfaction"), // 获取患者满意度数据
        this.getPropos("age"), // 获取服务年龄数据
        this.getDiagnoseByDistrict(), // 获取诊断数据（行政区划划分）
        this.getMedicinesByDistrict(), // 获药品数据（行政区划划分）
        this.getMedByHosGrade(), // 获取根据医院等级排名的药品数据
        this.getReplyTime(), // 获取平均回复时间
      ]);
      loadData
        .then(() => {
          this.loadDone = true;
          this._.delay(this.popExport, 1000);
        })
        .catch((err) => {
          throw err;
        });
    });
  },
  methods: {
    // 导出docx的功能
    exportFile() {
      const imgSize = [];
      const echartDoms = Array.from(document.getElementsByClassName("echarts"));
      echartDoms.forEach((dom) => {
        const styles = window.getComputedStyle(dom.firstChild);
        imgSize.push({
          width: parseInt(styles.width),
          height: parseInt(styles.height),
        });
      });
      const htmls = document.getElementById("exportToWord"); // 获取需要导出的标签
      const exportDocx = new ToWord(htmls, "echarts", imgSize); // 第二个参数是echarts所在div的类名，用于寻找生成的图片的位置
      exportDocx.exportFile();
    },
    // 获取医院数据
    async getHospitals() {
      let hospital = [];
      await this.axios
        .get("/mock/getHospital")
        .then((data) => {
          hospital = data.data.array;
        })
        .catch((err) => err);
      this.hospitalDetail = hospital;
      return hospital;
    },
    // 获取没有互联网医院的地区
    getNoHosArea(hospitalDetail) {
      const haveHos = [];
      this._.uniqBy(hospitalDetail, "area").forEach((item) =>
        haveHos.push(item.area)
      );
      return this._.difference(this.allAreas, haveHos);
    },
    // 将医院数据转换成echarts可解析的数据
    conversionData(data) {
      this.conversionFns = new HandleData(data);
      this.servicePropoData = this.conversionFns.toServicePropo();
      this.conversionFns.sortByWLFZ();
      this.wlfzTop10 = this.conversionFns.wlfzTop10();
    },
    // 弹出导出视窗
    popExport() {
      // this.$notify({
      //   duration: null,
      //   description: "当前页面可导出为.docx格式文档",
      //   btn: (h) => {
      //     return h(
      //       "el-button",
      //       {
      //         props: {
      //           type: "primary",
      //           size: "small",
      //         },
      //         on: {
      //           click: this._.throttle(this.exportFile, 1000, {
      //             trailing: false,
      //           }),
      //         },
      //       },
      //       "导出为.docx"
      //     );
      //   },
      //   closeIcon: (h) => {
      //     return h(null, {});
      //   },
      // });
      this.$notify({
        showClose: false,
        duration: 0,
        title: "",
        dangerouslyUseHTMLString: true,
        message:
          "<p style='font-size:16px'>当前页面可导出为.docx格式文档</p><br/><p style='font-size:10px'>点击此消息可导出</p>",
        onClick: this.exportFile,
      });
    },
    // 获取网络咨询科室/网络复诊科室/复诊诊断/药物的top10排名
    async getTop10s(type) {
      await this.axios
        .get("/mock/" + type)
        .then((data) => {
          const convertData = new HandleData(data.data);
          switch (type) {
            case "wlzx":
              this.departInWLZX = convertData;
              break;
            case "wlfz":
              this.departInWLFZ = convertData;
              break;
            case "fzzd":
              this.FZZDTop10 = convertData;
              break;
            case "medicines":
              this.medicinesTop10 = convertData;
              break;
            default:
              break;
          }
        })
        .catch((err) => err);
    },

    //  获取问诊回复时间/服务时长/完成率数据/投诉数据
    async getPropos(type) {
      await this.axios.get("/mock/" + type).then((data) => {
        const convertData = new HandleData(data.data);
        this[type] = convertData;
      });
    },

    async getDiagnoseByDistrict() {
      await this.axios.get("/mock/diagnoseRank").then((data) => {
        this.diagnoseByDistrict = this._.cloneDeep(data.data.data);
      });
    },

    async getMedicinesByDistrict() {
      await this.axios.get("/mock/medicinesRank").then((data) => {
        this.medicinesByDistrict = this._.cloneDeep(data.data.data);
      });
    },
    async getMedByHosGrade() {
      await this.axios.get("/mock/MedByHosgrade").then((data) => {
        this.medByHosGrade = this._.cloneDeep(data.data.data);
      });
    },
    async getReplyTime() {
      await this.axios.get("/mock/replyTime").then((data) => {
        this.replyTime = this._.cloneDeep(data.data);
      });
    },
  },
};
</script>

<style scoped type="text/less" lang="less">
p {
  font-size: 14px;
}
.back {
  background: #f5f5f5;
  width: 100%;
  min-height: 100%;
  padding: 48px 0;
}
.a4-size {
  width: 595px;
  min-height: 842px;
  padding: 72px 90px;
  background: #fff;
  background-size: contain;
}
.artical-position {
  margin: 0 auto;
}
.text-center {
  text-align: center;
}
.word-title {
  font-size: 22px;
  font-weight: bold;
}
.sub-title {
  font-size: 16px;
  font-weight: bold;
}
.btn-position {
  position: fixed;
  top: 150px;
  left: 150px;
}
p {
  text-indent: 2em;
}
.echarts {
  margin: 0 auto;
}
.list {
  display: inline-flex;
  flex-wrap: wrap;
  .list-item {
    flex: 0 1 50%;
    font-size: 12px;
  }
}
</style>
