<template>
  <div>
    <div class="uploadDiv">
      <uploader
        ref="uploader"
        :options="uploadOptions"
        :autoStart="true"
        :files="files"
        @file-added="onFileAdded"
        @file-success="onFileSuccess"
        @file-progress="onFileProgress"
        @file-error="onFileError"
        class="uploader-app"
      >
        <uploader-unsupport></uploader-unsupport>
        <uploader-drop>
          <uploader-btn :attrs="attrs">在当前文件夹上传文件</uploader-btn>
        </uploader-drop>
        <uploader-list></uploader-list>
      </uploader>
    </div>
  </div>
</template>

<script>

/* eslint-disable */
import {Message} from "element-ui";

export default {
  props: {
    currentPath: String
  },
  name: "TestFileTransfer",
  data() {
    return {
      files: [],
      uploadOptions: {
        target: "https://gaoyubo.cn/file/chunk",
        chunkSize: 1024 * 1024,
        testChunks: true,
        //失败后最多自动重试上传次数
        maxChunkRetries: 3,
        checkChunkUploadedByResponse: function(chunk, message) {
          let objMessage = JSON.parse(message);
          let chunkNumbers = objMessage.chunkNumbers;
          return (chunkNumbers || []).indexOf(chunk.offset + 1) >= 0;
        },
        query() {},
        categaryMap: {
          image: ["gif", "jpg", "jpeg", "png", "bmp"],
          zip: ["zip"],
          document: ["csv"]
        }
      },
      attrs: {},
      panelShow: false, //选择文件后，展示上传panel
      collapse: false,
    };
  },
  methods: {
    onFileAdded(file) {
      Message({
        message: "选择文件成功",
        type: 'success',
        duration: 5 * 1000
      })
    },
    onFileProgress(rootFile, file, chunk) {},
    onFileSuccess(rootFile, file, response, chunk) {
      let res = JSON.parse(response);
      console.log("------------")
      console.log(response)
      if (res.code !== 205) {
        return;
      }
      if (res.code === 205) {
        const formData = new FormData();
        formData.append("identifier", file.uniqueIdentifier);
        formData.append("filename", file.name);
        console.log("currentPath")
        console.log(this.currentPath)
        formData.append("relativePath",this.currentPath)
        this.$store.dispatch("merge",formData).then((res)=>{
          console.log(res)
        });
      } else {
      }
    },
    onFileError(rootFile, file, response, chunk) {
      Message({
        message: "上传失败",
        type: 'error',
        duration: 5 * 1000
      })
    }
  }
};
</script>
