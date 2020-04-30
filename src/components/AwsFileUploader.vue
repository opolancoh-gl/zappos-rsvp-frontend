<template>
  <div>
    <input type="file" @change="onFileChange" />
    <button v-if="file" @click="uploadFile">Upload</button>
  </div>
</template>

<script>
import http from 'axios';
import awsService from '@/services/aws-service';

export default {
  name: 'AwsFileUploader',
  data() {
    return {
      file: null,
    };
  },
  methods: {
    onFileChange(e) {
      [this.file] = e.target.files;
    },
    async uploadFile() {
      try {
        const presignedUrlResult = await awsService.getPresignedUrl({
          fileName: this.file.name,
          fileType: this.file.type,
        });
        const { data } = presignedUrlResult.data;

        await http.put(data.url, this.file, {
          headers: { 'Content-Type': this.file.type },
        });
        this.$emit('on-upload', { success: true, file: this.file });
      } catch (err) {
        this.$emit('on-upload', { success: false, error: err });
      }
    },
  },
};
</script>
