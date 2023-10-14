<template>
  <div>
    <h1>文件上传测试</h1>
    <input type="file" ref="fileInput" @change="handleFileChange" />
    <button @click="uploadFile">上传文件</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'TestFileTransfer',
  data() {
    return {
      selectedFile: null,
      fileInfo:{
      },
      selectedStoragePath: "D://tempFile",
    };
  },
  methods: {
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
    },

    part(fileSize,chunkSize,chunkCount,currentChunk){

    },
    uploadFile() {
      if (this.selectedFile) {
        //初始化
        const formData = new FormData();
        formData.append("file", this.selectedFile);
        this.$store.dispatch('fileStart',formData).then((res) => {
          // console.log(11)
          this.fileInfo = res.file;

          const fileSize = this.selectedFile.size;
          const chunkSize = 102400; // 100KB 每个块的大小
          const chunkCount = Math.ceil(fileSize / chunkSize);
          let currentChunk = 0;

          const uploadNextChunk = () => {
            if (currentChunk < chunkCount) {
              const start = currentChunk * chunkSize;
              const end = Math.min(start + chunkSize, fileSize);
              const chunk = this.selectedFile.raw.slice(start, end);
              console.log("start:")
              console.log(start)
              console.log("end:")
              console.log(end)
              console.log("fileSize:")
              console.log(fileSize)
              const formData = new FormData();
              formData.append("file", chunk);
              console.log(currentChunk)

              // 上传当前块
              this.$store.dispatch("uploadFilePart",{
                fileId:this.fileInfo.fileId,
                storagePath:this.selectedStoragePath,
                chunkNumber: currentChunk + 1,
                file:formData.get("file")
              }).then((res) => {
                this.fileInfo = res.file;
                currentChunk++;
                uploadNextChunk(); // 上传下一个块
              });
            }
          };

          uploadNextChunk();
        });

      }
    }
  }
};
</script>
