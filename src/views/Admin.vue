<template>
  <div>
    <h2>Create New Post</h2>
    <form @submit.prevent="submitPost">
      <input v-model="title" placeholder="Title" />
      <textarea v-model="content" placeholder="Content"></textarea>
      <input type="file" @change="onFileChange" />
      <input v-model="videoUrl" placeholder="Video URL" />
      <button type="submit">Save Post</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { createPost } from '../firebase/postsService';

export default defineComponent({
  name: 'Admin',
  setup() {
    const title = ref<string>('');
    const content = ref<string>('');
    const imageFile = ref<File | null>(null);
    const videoUrl = ref<string>('');

    const onFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      imageFile.value = target.files ? target.files[0] : null;
    };
/*
    const submitPost = async () => {
      const post = {
        title: title.value,
        content: content.value,
        imageUrl: imageFile.value ? await uploadImage(imageFile.value) : '',
        videoUrl: videoUrl.value,
      };
      await createPost(post);
      alert('Post created successfully!');
      title.value = '';
      content.value = '';
      imageFile.value = null;
      videoUrl.value = '';
    };
*/
    return { title, content, imageFile, videoUrl, onFileChange };
  },
});
</script>