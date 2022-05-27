import htmlDocx from "html-docx-js/dist/html-docx";
import saverFile from "file-saver";
/**
 * @class
 * @classdesc 用于将页面生成一个word文档
 * @param {dom} dom - 需要被转换成为word文档的DOM
 * @param {String} className - echarts的div的类名，echarts转换成图片之后，用于寻找图片的位置。
 * @param {Array[]} imgsSize - 生成图片的宽高，默认300*300,元素格式{@width:String,@height:String}
 */

class ToWord {
  constructor(dom, className, imgsSize) {
    this.dom = dom;
    this.className = className;
    this.imgsSize = imgsSize || [];
  }

  exportFile() {
    const htmls = this.dom; // 获取需要导出的标签
    this.allDomObj = htmls.cloneNode(true);
    this.loadImg(); // 添加echarts图片
    // this.loadTable()// 处理表单
    this.exec(this.allDomObj.innerHTML.toString()); // 导出的方法
  }

  exec(htmls) {
    const page =
      `<!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="utf-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width,initial-scale=1.0">
                <link rel="icon" href="<%= BASE_URL %>favicon.ico">
                <title><%= htmlWebpackPlugin.options.title %></title>
                <style>
                p{
                  text-indent: 2em;
                }
                .img-title{
                  text-align:center
                }
                </style>
              </head>
              <body>
                <div id="app"> ` +
      htmls +
      ` </div>
              </body>
          </html>
          `;
    const converted = htmlDocx.asBlob(page);
    saverFile(converted, "互联网医院服务分析报告.docx");
  }

  loadImg() {
    const canv = document.getElementsByTagName("canvas");
    const baseArr = [];
    // 将canvas转为图片
    for (let i = 0; i < canv.length; i++) {
      baseArr.push({
        index: i + 1,
        url: canv[i].toDataURL("image/png"),
      });
    }
    // 获取canvas 每个echarts图的位置
    const canvas11 = this.allDomObj.getElementsByClassName(this.className); // 此处是上面添加的class
    // 循环将echarts 改变成图片
    for (let i = 0; i < canvas11.length; i++) {
      const imgnode = document.createElement("img");
      imgnode.setAttribute("src", baseArr[i].url);
      console.log(this.imgsSize[i]);
      imgnode.setAttribute(
        "width",
        this.imgsSize[i] ? this.imgsSize[i].width : "300"
      ); // 具体大小需要根据导出的结果进行跳转
      imgnode.setAttribute(
        "height",
        this.imgsSize[i] ? this.imgsSize[i].height : "300"
      ); // 具体大小需要根据导出的结果进行跳转
      const oldnode = canvas11[i];
      oldnode.parentNode.insertBefore(imgnode, oldnode);
      // const imgTitle = document.createElement('p')
      // imgTitle.innerHTML = '图' + (i + 1) + ':第一张图片'
      // imgTitle.setAttribute('class', 'img-title')
      // imgnode.parentNode.appendChild(imgTitle)
    }
  }
}
export { ToWord };
