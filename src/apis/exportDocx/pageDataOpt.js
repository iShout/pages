import _ from "lodash";
class HandleData {
  constructor(origin) {
    this.originalData = origin;
  }

  //  转换成地图适用数据
  toMapType() {
    const mapdata = new Map();
    for (const data of this.originalData) {
      if (mapdata.has(data.area)) {
        mapdata.set(data.area, mapdata.get(data.area) + 1);
      } else {
        mapdata.set(data.area, 1);
      }
    }
    return [...mapdata].map((item) => {
      return { name: item[0], value: item[1] };
    });
  }

  // 转换成服务量占比适用数据
  toServicePropo() {
    const attriName = new Map([
      ["dzcf", "电子处方"],
      ["wlzx", "网络咨询"],
      ["wlfz", "网络复诊"],
    ]);
    const sumData = new Map([
      ["电子处方", 0],
      ["网络咨询", 0],
      ["网络复诊", 0],
    ]);
    for (const data of this.originalData) {
      sumData.set(
        attriName.get("dzcf"),
        sumData.get(attriName.get("dzcf")) + data.dzcf
      );
      sumData.set(
        attriName.get("wlzx"),
        sumData.get(attriName.get("wlzx")) + data.wlzx
      );
      sumData.set(
        attriName.get("wlfz"),
        sumData.get(attriName.get("wlfz")) + data.wlfz
      );
    }
    const res = [...sumData];
    const total = _.flatten(res)
      .filter((elem) => typeof elem === "number")
      .reduce((a, b) => a + b);
    return {
      title: "互联网医疗服务量占比",
      legend: res.map((data) => data[0]),
      data: res.map((data) => {
        return { name: data[0], value: data[1] };
      }),
      propo: {
        dzcf: (sumData.get("电子处方") / total).toFixed(3),
        wlzx: (sumData.get("网络咨询") / total).toFixed(3),
        wlfz: (sumData.get("网络复诊") / total).toFixed(3),
      },
      total: total,
    };
  }

  // 转换成网络复诊适用数据
  sortByWLFZ() {
    return this.convertBarVertical("wlfz", "网络复诊服务量");
  }

  // 转换成网络咨询适用数据
  sortByWLZX() {
    return this.convertBarVertical("wlzx", "网络咨询服务量");
  }

  //  互联网医院开展较好TOP10(指标是网络复诊)
  wlfzTop10 = () =>
    this.originalData.sort((a, b) => -(a.wlfz - b.wlfz)).slice(0, 10);

  //  转换成排名Top10适用数据（从大到小）
  toTop10() {
    const needHandle = _.cloneDeep(this.originalData);
    needHandle.data.sort((pre, cur) => -(pre.value - cur.value));
    const handleDone = _.cloneDeep(needHandle);
    return {
      title: handleDone.title,
      axis: handleDone.data.map((data) => data.name),
      data: handleDone.data.map((data) => data.value),
    };
  }

  //  转换成占比饼状图适用数据
  toPropo() {
    const needHandle = _.cloneDeep(this.originalData);
    const legend = needHandle.data.map((data) => data.name);
    return Object.assign(needHandle, { legend: legend });
  }

  // 转换成电子签名异常排名适用数据
  toSignOnError() {
    return this.convertBarVertical("signatrueOnError", "电子签名异常");
  }

  // 转换成复诊异常排名适用数据
  toFZOnError() {
    return this.convertBarVertical("FZOnError", "复诊异常");
  }

  // 转换成医生备案异常排名适用数据
  toNotOnFile() {
    return this.convertBarVertical("notOnFile", "医务人员未备案");
  }

  // 转换成低龄儿童异常排名适用数据
  toErrorOnChild() {
    return this.convertBarVertical("errorOnChild", "低龄儿童异常");
  }

  // 转换成互联网医院未上传数据的医院名单
  listNotUploaded() {
    return this.originalData
      .filter((data) => data.uploadedData === false)
      .map((data) => data.name);
  }

  // 转换成复诊诊断不全排名适用数据
  toFZDiagnoseError() {
    return this.convertBarVertical("FZDiagnoseError", "复诊诊断不全");
  }

  //  转换成诊后评价异常适用数据
  toErrorOnReview() {
    return this.convertBarVertical("errorOnReview", "诊后评价异常");
  }

  // 纵向柱状图处理数据函数
  convertBarVertical(prop, title) {
    const needHandle = _.cloneDeep(this.originalData);
    const handleDone = needHandle
      .sort((a, b) => -(a[prop] - b[prop]))
      .slice(0, 10);
    return {
      title: title,
      axis: handleDone.map((data) => data.name),
      data: handleDone.map((data) => data[prop]),
    };
  }
}
export { HandleData };
