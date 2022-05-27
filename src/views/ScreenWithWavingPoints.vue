<template>
  <div style="width: 100%; height: 100%">
    <div
      ref="canvasContainer"
      id="canvasContainer"
      style="width: 100%; height: 100%"
      class="absolute"
      @mousemove="pointMove"
    >
      <section class="main-page absolute">
        <header class="top-title">
          <p style="font-size: 32px; color: #52afe9; text-align: center">
            这里本来是一个title,但是涉及到项目名称所以删掉了
          </p>
        </header>
        <section class="tabs-container">
          <div
            v-for="(tab, index) in shownTabs"
            :key="tab.title"
            @mouseenter="hoverCard(true, index)"
            @mouseleave="hoverCard(false, index)"
            class="hvr-float"
            @click="goLink(tab.link)"
          >
            <tab-card class="tab" :index="index" :hovering="tabsHover[index]">
              <template slot="image">
                <img
                  :src="
                    require('@/assets/screenWithWavingPoints/' +
                      tab[tabsHover[index] ? 'imageHover' : 'imageNormal'])
                  "
                  alt="icon"
                />
              </template>
              <p
                slot="title"
                class="title"
                :style="{ color: tabsHover[index] ? '#ffa200' : '#1ed2ff' }"
              >
                {{ tab.title }}
              </p>
              <p class="text" slot="text">
                {{ tab.description }}
              </p>
            </tab-card>
          </div>
          <div
            class="arrows hvr-pulse"
            v-for="(arrow, index) in arrows"
            :key="arrow.id"
            :style="index === 0 ? leftArrow : rightArrow"
            @click="clickArrow(index === 0 ? 'prev' : 'next')"
          >
            <img :src="arrow.hover" style="width: 100%; height: 100%" alt="" />
          </div>
        </section>
        <section class="buttons">
          <section
            style="height: 100%; margin: 0 auto"
            :style="{ width: 216 + (allPages.length - 1) * 248 + 'px' }"
          >
            <div
              class="button relative hvr-bob"
              v-for="(button, index) in allPages"
              :key="button.name"
              :style="{
                marginRight: index === allPages.length - 1 ? '0' : '32px',
              }"
              @click="clickBtn(index)"
            >
              <img
                :src="btnClick[index] ? buttonSel : buttonNor"
                alt="选择按钮"
                style="width: 100%; height: 100%; left: 0; top: 0"
                class="absolute"
              />
              <span
                class="absolute btn-text"
                :style="{ color: btnClick[index] ? '#ffa200' : '#1ed2ff' }"
                >{{ button.name }}</span
              >
            </div>
          </section>
        </section>
      </section>
    </div>
  </div>
</template>

<script>
import points from "@/components/screenWithWavingPoints/functions/wavingPoints.js";
import TabCard from "@/components/screenWithWavingPoints/card.vue";
import _ from "lodash";

export default {
  name: "ScreenWithWavingPoints",
  components: {
    TabCard,
  },
  beforeMount() {
    this.points = new points.WavingPoints();
  },
  mounted() {
    const CONTAINER = this.$refs.canvasContainer;
    this.points.init(CONTAINER);
    // 获取页面数据
    // this.getPageData().then((res) => {
    //   this.allPages = res.bigScreen;
    //   this.handlePageData(this.allPages[this.currentPages].screen);
    // });
    const datas = [
      {
        name: "Tab1",
        screen: [
          {
            title: "testing title1",
            imageNormal: "ssjg-normal.png",
            imageHover: "ssjg-hover.png",
            description: "this is a testing 啦啦啦啦啦",
            link: "",
          },
          {
            title: "testing title2",
            imageNormal: "hlwjg-normal.png",
            imageHover: "hlwjg-hover.png",
            description: "this is a testing 啦啦啦啦啦",
            link: "",
          },
          {
            title: "testing title3",
            imageNormal: "jhbh-normal.png",
            imageHover: "jhbh-hover.png",
            description: "this is a testing 啦啦啦啦啦",
            link: "",
          },
          {
            title: "testing title4",
            imageNormal: "shjg-normal.png",
            imageHover: "shjg-hover.png",
            description: "this is a testing 啦啦啦啦啦",
            link: "",
          },
          {
            title: "testing title5",
            imageNormal: "ssjg-normal.png",
            imageHover: "ssjg-hover.png",
            description: "this is a testing 啦啦啦啦啦",
            link: "",
          },
        ],
      },
      {
        name: "Tab2",
        screen: [
          {
            title: "testing of title2",
            imageNormal: "shjg-normal.png",
            imageHover: "shjg-hover.png",
            description: "哈哈哈哈哈哈哈哈",
            link: "",
          },
        ],
      },
    ];
    this.allPages = datas;
    this.handlePageData(this.allPages[this.currentPages].screen);
  },
  data() {
    const arrows = [
      {
        id: "left",
        normal: require("@/assets/screenWithWavingPoints/arrow-left-normal.png"),
        hover: require("@/assets/screenWithWavingPoints/arrow-left-hover.png"),
      },
      {
        id: "right",
        normal: require("@/assets/screenWithWavingPoints/arrow-right-normal.png"),
        hover: require("@/assets/screenWithWavingPoints/arrow-right-hover.png"),
      },
    ];
    return {
      points: null,
      buttonNor: require("@/assets/screenWithWavingPoints/tab-normal.png"),
      buttonSel: require("@/assets/screenWithWavingPoints/tab-hover.png"),
      btnClick: [true, false],
      tabsHover: [false, false, false, false],
      arrows,
      leftArrow: { left: "32px" },
      rightArrow: { right: "32px" },
      allPages: [],
      allTabs: [],
      shownTabs: [],
      currentPages: 0, // 当前展示的卡片组别
      goBackUrl: "",
    };
  },
  methods: {
    async getPageData() {
      const res = await new Promise((resolve, reject) => {
        if (window.location.search) {
          const decodeStr = window.location.search.split("&")[1].split("=")[1];
          resolve(JSON.parse(decodeURIComponent(decodeStr)));
        } else {
          reject();
        }
      });
      return res;
    },
    clickBtn(index) {
      this.btnClick.fill(false);
      this.$set(this.btnClick, index, true);
      this.currentPages = 0;
      this.handlePageData(this.allPages[index].screen);
    },
    hoverCard(hovering, index) {
      this.$set(this.tabsHover, index, hovering);
    },
    pointMove(e) {
      this.points.onPointerMove(e);
    },
    goLink(link) {
      window.location.href = link;
    },
    handlePageData(selectedList) {
      this.allTabs = _.chunk(selectedList, 4);
      this.shownTabs = this.allTabs[this.currentPages];
    },
    clickArrow(direction) {
      switch (direction) {
        case "next":
          this.currentPages =
            this.allTabs[this.currentPages + 1] !== undefined
              ? this.currentPages + 1
              : 0;
          this.shownTabs = this.allTabs[this.currentPages];
          break;
        case "prev":
          this.currentPages =
            this.currentPages === 0
              ? this.allTabs.length - 1
              : this.currentPages - 1;
          this.shownTabs = this.allTabs[this.currentPages];
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.relative {
  position: relative;
}
.absolute {
  position: absolute;
}
.top-title {
  width: 100%;
  height: 124px;
  // background: url("~@/assets/screenWithWavingPoints/top-title.png") no-repeat
  //   center;
  margin-bottom: 8.52vh;
}
.main-page {
  width: 100%;
  height: 100%;
}
.tabs-container {
  width: 100%;
  height: 567px;
  padding: 0 122px;
  // position: relative;
  display: flex;
  justify-content: space-between;
  .tab {
    width: 376px;
    height: 100%;
    cursor: pointer;
  }
}
.arrows {
  width: 43px;
  height: 78px;
  position: absolute;
  top: 45%;
  cursor: pointer;
}
.title {
  font-size: 32px;
  margin-top: 20px;
}
.text {
  text-align: left;
  font-size: 19px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.4);
}
.buttons {
  width: 100%;
  height: 100px;
  padding: 0 122px;
  margin-top: 8.89vh;
  .button {
    width: 216px;
    height: 91px;
    display: inline-block;
    cursor: pointer;
    .btn-text {
      color: #fff2e9;
      font-size: 20px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
.btn-style {
  top: 32px;
  left: 32px;
  background-image: linear-gradient(0deg, #4285ec 0%, #0bbafb 100%);
  font-size: 14px;
}
</style>
