<template>
  <div class="relative">
    <svg
      :id="'frame' + index"
      style="width: 100%; height: 100%; left: 0; top: 0"
      class="frame absolute"
    ></svg>
    <section class="absolute content" style="left: 0; top: 0">
      <slot name="image" class="image"></slot>
      <slot name="title" class="title"></slot>
      <transition
        enter-active-class="animate__fadeInUp"
        leave-active-class="animate__fadeOutDown"
        mode="out-in"
      >
        <div class="text animate__animated animate__faster" v-if="hovering">
          <slot name="text"></slot>
        </div>
      </transition>
    </section>
  </div>
</template>

<script>
import Snap from "imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js";

export default {
  name: "card",
  data() {
    return {
      cardFrame: null,
    };
  },
  props: {
    index: {
      type: Number,
    },
    hovering: {
      type: Boolean,
      default: false,
    },
    showDescription: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    hovering: {
      handler(newval) {
        this.hoverAnimate(newval);
      },
    },
  },
  mounted() {
    this.makeSvg();
  },
  methods: {
    makeSvg() {
      const svgStyle = window.getComputedStyle(
        document.getElementsByClassName("frame")[this.index]
      );
      const width = parseInt(svgStyle.width);
      const height = parseInt(svgStyle.height);
      const cardSvg = Snap("#frame" + this.index);

      const border = cardSvg.paper.rect(2, 2, width - 4, height - 4).attr({
        fill: "transparent",
        strokeWidth: 2,
      });
      const leftTopV = cardSvg.paper.path("M0 30V0Z");
      const leftTopH = cardSvg.paper.path("M0 0H30Z");
      const rightTopH = cardSvg.paper.path("M" + (width - 30) + " 0H" + width);
      const rightTopV = cardSvg.paper.line(width, 0, width, 30);
      const leftBottomV = cardSvg.paper.line(0, height, 0, height - 30);
      const leftBottomH = cardSvg.paper.line(0, height, 30, height);
      const rightBottomV = cardSvg.paper.line(
        width,
        height,
        width - 30,
        height
      );
      const rightBottomH = cardSvg.paper.line(
        width,
        height,
        width,
        height - 30
      );
      const corner = cardSvg.paper
        .g(
          leftTopV,
          leftTopH,
          rightTopH,
          rightTopV,
          leftBottomV,
          leftBottomH,
          rightBottomV,
          rightBottomH
        )
        .attr({ strokeWidth: 8 });
      this.cardFrame = cardSvg.paper.g(border, corner).attr({
        stroke: "#52AFE9",
      });
    },
    hoverAnimate(hovering) {
      this.cardFrame.animate({ stroke: hovering ? "#ffa200" : "#52AFE9" }, 300);
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
.content {
  width: 100%;
  height: 100%;
  padding: 40px;
  text-align: center;
  .image {
    width: 318px;
    height: 278px;
    margin-bottom: 24px;
  }
}
</style>
