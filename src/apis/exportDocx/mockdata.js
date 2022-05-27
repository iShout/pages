import Mock, { Random } from "mockjs";

function createHospitalMock() {
  Random.extend({
    areas: function () {
      const areaData = [
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
      ];
      return this.pick(areaData);
    },
  });
  const datas = Mock.mock("http://localhost:8080/mock/getHospital", {
    "array|165": [
      {
        // 医院名称
        name: /随机生成医院[a-z]*[A-z]/,
        // 所属行政区域
        area: "@areas",
        // 公立还是民营
        "establishedBy|1": ["公立", "民营"],
        // 所属行政级别
        "belongsTo|1": [
          "中央",
          "省",
          "市",
          "市",
          "市",
          "市",
          "县",
          "县",
          "县",
          "县",
          "县",
          "县",
          "县",
          "县",
          "县",
          "县",
        ],
        // 医院等级
        "level|1": ["其他", "二级", "三级"],
        // 电子处方数量
        "dzcf|10000-200000": 0,
        // 网络咨询数量
        "wlzx|50000-170000": 0,
        // 网络复诊数量
        "wlfz|10000-100000": 0,
        // 电子签名异常数量
        "signatrueOnError|50000-150000": 0,
        // 复诊异常数量
        "FZOnError|10000-80000": 0,
        // 未备案医生数量
        "notOnFile|10000-80000": 0,
        // 低龄儿童信息不完善数量
        "errorOnChild|5000-20000": 0,
        // 互联网医院是否上传了数据（Boolean）
        "uploadedData|1": true,
        // 复诊诊断异常
        "FZDiagnoseError|500-5000": 0,
        // 诊后评价异常数量
        "errorOnReview|10000-100000": 0,
      },
    ],
  });
  return datas;
}

function createTop10s(type) {
  let template = {};
  switch (type) {
    case "wlfz":
      template = {
        title: "网络复诊科室排名",
        "data|10": [
          {
            "name|+1": [
              "内科",
              "外科",
              "儿科",
              "妇科",
              "全科、便民门诊",
              "五官科",
              "中医科",
              "肿瘤科",
              "精神科、心理科",
              "皮肤科",
            ],
            "value|20000-100000": 0,
          },
        ],
      };
      break;
    case "wlzx":
      template = {
        title: "网络咨询科室排名",
        "data|10": [
          {
            "name|+1": [
              "内科",
              "外科",
              "儿科",
              "妇科",
              "全科、便民门诊",
              "五官科",
              "中医科",
              "肿瘤科",
              "精神科、心理科",
              "皮肤科",
            ],
            "value|20000-100000": 0,
          },
        ],
      };
      break;
    case "fzzd":
      template = {
        title: "复诊诊断排名",
        "data|10": [
          {
            "name|+1": [
              "男性勃起障碍",
              "高血压病",
              "急性扁桃体炎",
              "急性咽炎",
              "支气管炎",
              "癫痫",
              "慢性乙肝",
              "急性咽喉炎",
              "结膜炎",
              "上呼吸道感染",
            ],
            "value|1000-5000": 0,
          },
        ],
      };
      break;
    case "medicines":
      template = {
        title: "药品种类排名（按药品通用名排名）",
        "data|10": [
          {
            "name|+1": [
              "恩替卡韦分散片(0.5mg*21)",
              "富马酸替诺福韦二吡味酯片(300mg× 30片)",
              "[金划]枸梅敢西地那非片50mg*1片*1板",
              "夏方倍他米松乳育(27g/盒)",
              "阿莫西林胶素 0.25g*10片/板*4板盒",
              "济济蒲地蓝消炎口服液10ml*10支",
              "优甲乐(50ug*100)",
              "黄体酮达克罗宁乳育(27g/盒)",
              "来益(100mg (天然型）*60粒",
              "[万艾可]拘梅敢西地那非片0.1g*1片盒",
            ],
            "value|500-2000": 0,
          },
        ],
      };
      break;
    default:
      break;
  }
  const datas = Mock.mock("http://localhost:8080/mock/" + type, {
    ...template,
  });
  return datas;
}

function createPropo(type) {
  let template = {};
  switch (type) {
    case "replyAvg":
      template = {
        title: "问诊平均回复时间",
        "data|4": [
          {
            "name|+1": [
              "10分钟以内",
              "10分钟-30分钟",
              "30分钟到-60分钟",
              "60分钟以上",
            ],
            "value|200-700": 0,
          },
        ],
      };
      break;
    case "onlineAvg":
      template = {
        title: "医务人员平均在线时长",
        "data|3": [
          {
            "name|+1": ["10分钟以内", "10分钟-30分钟", "30分钟以上"],
            "value|200-700": 0,
          },
        ],
      };
      break;
    case "doneRate":
      template = {
        title: "是否能及时找到想要线上的科室和医生",
        "data|2": [
          {
            "name|+1": ["是", "否"],
            "value|200-700": 0,
          },
        ],
      };
      break;
    case "appealCase":
      template = {
        title: "平台投诉主要内容",
        "data|5": [
          {
            "name|+1": ["无", "功能问题", "服务问题", "收费问题", "其他"],
            "value|200-700": 0,
          },
        ],
      };
      break;
    case "satisfaction":
      template = {
        title: "患者满意度",
        "data|2": [
          {
            "name|+1": ["满意", "不满意"],
            "value|200-700": 0,
          },
        ],
      };
      break;
    case "age":
      template = {
        title: "网络复诊服务年龄情况",
        "data|7": [
          {
            "name|+1": [
              "10岁及以下",
              "11岁-20岁",
              "21岁-30岁",
              "31岁-40岁",
              "41岁-50岁",
              "51岁-60岁",
              "60岁及以上",
            ],
            "value|20000-15000": 0,
          },
        ],
      };
      break;
    default:
      break;
  }
  const datas = Mock.mock("http://localhost:8080/mock/" + type, {
    ...template,
  });
  return datas;
}
function createMedicinesRank() {
  let template = {};
  const medicines = [
    "恩替卡韦分散片(0.5mg*21)",
    "富马酸替诺福韦二吡味酯片(300mg× 30片)",
    "[金划]枸梅敢西地那非片50mg*1片*1板",
    "夏方倍他米松乳育(27g/盒)",
    "阿莫西林胶素 0.25g*10片/板*4板盒",
    "济济蒲地蓝消炎口服液10ml*10支",
    "优甲乐(50ug*100)",
    "黄体酮达克罗宁乳育(27g/盒)",
    "来益(100mg (天然型）*60粒",
    "[万艾可]拘梅敢西地那非片0.1g*1片盒",
  ];
  template = {
    "data|21": [
      {
        "district|+1": [
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
          "阿坝藏族羌族自治州",
          "甘孜藏族自治州",
          "凉山彝族自治州",
          "内江市",
          "广安市",
        ],
        data: [
          { name: "全部药品", "value|5000-10000": 0 },
          { "name|1": medicines, "value|2000-4000": 0 },
          { "name|1": medicines, "value|1000-2000": 0 },
          { "name|1": medicines, "value|500-1000": 0 },
        ],
      },
    ],
  };

  const datas = Mock.mock("http://localhost:8080/mock/medicinesRank", {
    ...template,
  });
  return datas;
}
function createMedByHosgrade() {
  let template = {};
  const medicines = [
    "恩替卡韦分散片(0.5mg*21)",
    "富马酸替诺福韦二吡味酯片(300mg× 30片)",
    "[金划]枸梅敢西地那非片50mg*1片*1板",
    "夏方倍他米松乳育(27g/盒)",
    "阿莫西林胶素 0.25g*10片/板*4板盒",
    "济济蒲地蓝消炎口服液10ml*10支",
    "优甲乐(50ug*100)",
    "黄体酮达克罗宁乳育(27g/盒)",
    "来益(100mg (天然型）*60粒",
    "[万艾可]拘梅敢西地那非片0.1g*1片盒",
  ];
  const disease = [
    "男性勃起障碍",
    "高血压病",
    "急性扁桃体炎",
    "急性咽炎",
    "支气管炎",
    "癫痫",
    "慢性乙肝",
    "急性咽喉炎",
    "结膜炎",
    "上呼吸道感染",
  ];
  template = {
    "data|3": [
      {
        "hosGrade|+1": ["三级甲等", "三级乙等", "三级丙等"],
        "medicines|5": [
          {
            "name|1": medicines,
            "value|1000-5000": 0,
          },
        ],
        "diagnose|5": [
          {
            "name|1": disease,
            "value|1000-5000": 0,
          },
        ],
      },
    ],
  };

  const datas = Mock.mock("http://localhost:8080/mock/MedByHosgrade", {
    ...template,
  });
  return datas;
}

function createDiagnoseRank() {
  let template = {};
  const disease = [
    "男性勃起障碍",
    "高血压病",
    "急性扁桃体炎",
    "急性咽炎",
    "支气管炎",
    "癫痫",
    "慢性乙肝",
    "急性咽喉炎",
    "结膜炎",
    "上呼吸道感染",
  ];
  template = {
    "data|21": [
      {
        "district|+1": [
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
          "阿坝藏族羌族自治州",
          "甘孜藏族自治州",
          "凉山彝族自治州",
          "内江市",
          "广安市",
        ],
        data: [
          { name: "全部病例", "value|5000-10000": 0 },
          { "name|1": disease, "value|2000-4000": 0 },
          { "name|1": disease, "value|1000-2000": 0 },
          { "name|1": disease, "value|500-1000": 0 },
        ],
      },
    ],
  };

  const datas = Mock.mock("http://localhost:8080/mock/diagnoseRank", {
    ...template,
  });
  return datas;
}

function createReplyTime() {
  const citys = [
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
    "阿坝藏族羌族自治州",
    "甘孜藏族自治州",
    "凉山彝族自治州",
    "内江市",
    "广安市",
  ];
  const template = {
    "byDistrict|21": [
      { "name|+1": citys, "value|10-60": 0, "samePeriod|-5-5": 0 },
    ],
    "byHosGrade|3": [
      {
        "name|+1": ["三级甲等", "三级乙等", "三级丙等"],
        "value|10-60": 0,
        "samePeriod|-5-5": 0,
      },
    ],
  };

  const datas = Mock.mock("http://localhost:8080/mock/replyTime", {
    ...template,
  });
  return datas;
}
export default {
  createHospitalMock,
  createTop10s,
  createPropo,
  createDiagnoseRank,
  createMedicinesRank,
  createMedByHosgrade,
  createReplyTime,
};
