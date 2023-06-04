<template>
  <div
    style="position: relative; width: 500px; height: 400px"
    class="imgdiv"
    v-viewer="{
      inline: true,
      navbar: false,
      title: false,
      toolbar: false,
      button: false,
      moveable: false,
      tooltip: false,
      loading: false,
      zoomOut: 4,
    }"
  >
    <!-- <img
          id="img"
          ref="target_img"
          src="../assets/image/载物台.jpg"
          width="500px"
          height="{imgHeight}px"
          style="margin: 0 20px"
        /> -->
    <img
      id="img"
      width="0"
      height="{imgHeight}px"
      ref="target_img"
      :src="imgSrc"
      style="margin: 0 20px"
    />
  </div>
</template>
<script>
import "viewerjs/dist/viewer.css";
// import VueViewer from "v-viewer";
import { directive as viewer } from "v-viewer";
import { ipcRenderer } from "electron";
// import html2canvas from "html2canvas";
import path from "path";
export default {
  name: "ImageStage",
  directives: {
    viewer: viewer({
      debug: true,
    }),
  },
  mounted: function () {
    //  设置十字箭头
    this.setCrossArrow();

    this.$parent.$parent.$on("onShowImg1Click", () => {
      console.log("onShowImg1Click");
      this.imgSrc = `static/image/载物台.jpg`;
      this.m = -1;
      console.log("src:", this.imgSrc);
    });

    this.$parent.$parent.$on("onShowImg2Click", (data) => {
      console.log("onShowImg2Click");
      this.m = data.m;
      this.f = data.f;
      this.updateSrcImg();
    });

    this.$parent.$parent.$on("onMagnificationChange", (d) => {
      console.log("onMagnificationChange", d);
      if (this.m == -1) {
        return;
      }

      this.m = d.m;
      this.f = d.f;
      this.updateSrcImg();
    });

    // this.$parent.$parent.$on("onAfterFocusChange", (f) => {
    //   console.log("onAfterFocusChange", f);
    //   if (this.m == -1) {
    //     return;
    //   }
    //   this.f = f;
    //   this.updateSrcImg();
    // });

    this.$parent.$parent.$on("saveFile", () => {
      console.log("save file", ipcRenderer);

      var image = new Image();
      image.setAttribute("crossOrigin", "anonymous");
      var _src = this.imgSrc;
      image.onload = function () {
        var canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;

        var context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        var url = canvas.toDataURL("image/jpg");

        // console.log("url==>", url);

        var reader = new FileReader();
        reader.onload = function () {
          var buffer = new Buffer(reader.result);
          // //temp文件夹应已存在
          ipcRenderer.send("saveFile", {
            data: buffer,
            fileName: path.basename(_src),
          });
        };
        reader.readAsArrayBuffer(dataURLtoFile(url)); //假设blob已定义\
      };

      image.src = this.imgSrc;
      // html2canvas(this.$refs.target_img, {
      //   backgroundColor: null, //画出来的图片有白色的边框,不要可设置背景为透明色（null）
      //   useCORS: true, //支持图片跨域
      //   scale: 1, //设置放大的倍数
      // }).then((canvas) => {
      //   let url = canvas.toDataURL("image/jpg");
      //   console.log("url", url);

      // });

      // var reader = new FileReader();
      // reader.onload = function () {
      //   console.log('ref',this.result)

      // };
      // reader.readAsDataURL(new File([],this.imgSrc));
    });
  },
  data() {
    return {
      imgHeight: 400,
      imgSrc: "static/image/载物台.jpg",
      m: -1,
      f: "",
    };
  },
  methods: {
    setCrossArrow() {
      setTimeout(() => {
        var t = document.getElementsByClassName(
          "viewer-move viewer-transition"
        )[0];
        t.style.cursor = "crosshair";
        // const viewer = this.$el.querySelector(".imgdiv").$viewer;
        // this.viewer = viewer;
      }, 1200);
    },
    updateSrcImg() {
      var name = Number.parseInt(this.m) + "" + this.f;
      this.imgSrc = `static/image/${name}.jpg`;
      console.log('img src=>',this.imgSrc)
      this.setCrossArrow();
    },
  },
};

function dataURLtoFile(dataurl) {
  // 生成Blob
  var arr = dataurl.split(",");
  var mime = arr[0].match(/:(.*?);/)[1];
  var bstr = atob(arr[1]);
  var n = bstr.length;
  var u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
</script>