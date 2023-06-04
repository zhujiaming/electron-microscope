<template>
  <div style="display: flex; width: 100%; padding: 20px">
    <!-- 左侧操作台 -->
    <div style="width: fit-content; margin-right: 30px">
      <div>
        <img src="../assets/side1.jpg" width="200px" height="200px" />
        <a-button type="primary" class="button-cus" @click="clickShowImg1"
          >check</a-button
        >
      </div>
      <div style="width: fit-content; float: left; margin: 10px 0 0 0">
        <img
          style="float: left"
          src="../assets/side2.jpg"
          width="180px"
          height="180px"
        />
        <a-button
          type="primary"
          style="float: left; margin: 3px 0 0 0"
          class="button-cus"
          @click="clickShowImg2"
          >check</a-button
        >
      </div>
    </div>
    <!-- 图片显示区 -->
    <div style="background: #000000; position: relative; height: 430px">
      <ImageStage></ImageStage>
      <!-- <canvas
        id="img_canva"
        width="500px"
        height="{imgHeight}px"
        style="margin: 0 20px; position: absolute"
      ></canvas> -->
      <!-- 扫描线 -->
      <div
        style="height: 1px; width: 100%; background: white; position: absolute"
        :style="styleScanLine"
      ></div>
    </div>
    <!-- 图片操作台 -->
    <div style="width: 100%; padding-left: 50px; padding-right: 30px">
      <div>
        <a-button type="primary" shape="circle" class="button-knob"
          >放缩</a-button
        >
        <a-slider
          :default-value="0"
          :max="20"
          @afterChange="onAfterMagnificationChange"
          :step="10"
          :marks="marksMagnification"
          :tooltipVisible="false"
          v-model="mm"
          :disabled="disabled"
        />
      </div>
      <div>
        <a-button type="primary" shape="circle" class="button-knob"
          >聚焦</a-button
        >
        <a-slider
          :default-value="0"
          :max="20"
          @afterChange="onAfterFocusChange"
          :step="10"
          :marks="marksFocus"
          :tooltipVisible="false"
          v-model="ff"
          :disabled="disabled"
        />
      </div>

      <div>
        <a-button type="primary" shape="circle" class="button-knob"
          >亮度</a-button
        ><a-slider :default-value="0" />
      </div>

      <div>
        <a-button type="primary" shape="circle" class="button-knob"
          >对比度</a-button
        ><a-slider :default-value="0" />
      </div>
    </div>
  </div>
</template>
<script>
import "ant-design-vue/dist/antd";
import ImageStage from "./ImageStage.vue";
// import * as StackBlur from "stackblur-canvas";
// import Viewer from "viewerjs";

var scanInterval;

var magnificationPVArray = [0, 10, 20];
var magnificationVArray = [50, 500, 1000];
var magnificationPSArray = ["50px", "500px", "1000px"];

var focusPVArray = [0, 10, 20];
var focusVArray = ["xl", "xm", "xs"];
var focusPSArray = ["低焦", "清晰", "过焦"];

export default {
  name: "SideView",
  data() {
    return {
      // images: [
      //   "https://img1.baidu.com/it/u=3715687718,3093898249&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
      // ],
      disabled:true,
      isFocusMode: false,
      imgHeight: 400,
      marksMagnification: {
        0: magnificationPSArray[0],
        10: magnificationPSArray[1],
        20: magnificationPSArray[2],
      },
      marksFocus: {
        0: focusPSArray[0],
        10: focusPSArray[1],
        20: focusPSArray[2],
      },
      styleScanLine: {
        top: "0px",
        // transition: 'top 2s linear'
      },

      mm: 0,
      ff: 0,
      mm_old: 0,
      ff_old: 0,
      // m: 50,
      // f: "xl",
    };
  },
  mounted: function () {
    this.$parent.$on("onScanClick", (v) => {
      console.log("sacn:", v, scanInterval);
      this.startScan(v);
    });
  },
  methods: {
    // 扫描
    startScan(interval) {
      var period = 50;
      var distance = Math.round(this.imgHeight / (interval / period));
      console.log("distance=>", distance);
      if (distance == 0) {
        distance = 1;
        period = 100;
      }
      scanInterval && clearInterval(scanInterval);
      scanInterval = setInterval(() => {
        var topNew =
          Number.parseInt(this.styleScanLine.top.replace("px", "")) + distance;
        if (topNew > this.imgHeight) {
          topNew = 0;
        }
        this.styleScanLine = { top: `${topNew}px` };
        console.log("topNew=>", topNew);
      }, period);
    },
    onAfterMagnificationChange(value) {
      var index_old = magnificationPVArray.indexOf(this.mm_old);
      var index = magnificationPVArray.indexOf(value);

      //倍数从低往高，清晰度要重置成低焦，倍数从高往低，清晰度重置成清晰
      if (index_old > index) {
        this.ff = focusPVArray[1];
      } else {
        this.ff = focusPVArray[0];
      }

      console.log(`Magnificatio change ${value}`, index, this.mm);

      this.mm_old = value;

      this.$parent.$emit("onMagnificationChange", {
        m: magnificationVArray[index],
        f: focusVArray[focusPVArray.indexOf(this.ff)],
      });
    },
    onAfterFocusChange(value) {
  
      var index = focusPVArray.indexOf(value);

      this.ff = focusPVArray[index]
      console.log(`focus change ${value}`, index);

      this.$parent.$emit("onMagnificationChange", {
        m: magnificationVArray[magnificationPVArray.indexOf(this.mm)],
        f: focusVArray[index],
      });
    },
    clickShowImg1() {
      console.log("show img1");
      this.$parent.$emit("onShowImg1Click", "");
      this.mm = 0;
      this.ff = 0;
      this.disabled = true;
    },
    clickShowImg2() {
      console.log("show img2");
      this.$parent.$emit("onShowImg2Click", { m: 50, f: "xl" });
      this.mm = 0;
      this.ff = 0;
      this.disabled = false;
    },
  },
  components: { ImageStage },
};
</script>
<style>
.button-knob {
  width: 50px;
  height: 50px !important;
  color: #171815 !important;
}
.button-cus {
  float: left;
  margin: 3px 0 0 0;
  color: #171815 !important;
}
</style>