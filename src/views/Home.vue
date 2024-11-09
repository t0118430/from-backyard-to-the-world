<template>
  <div>
    <h1>Posts</h1>
    <div v-for="post in posts" :key="post.id" class="post">
      <h2>title cenas</h2>
      <p>title body</p>
      <img v-if="post.imageUrl" :src="post.imageUrl" alt="Post Image" />
      <video v-if="post.videoUrl" :src="post.videoUrl" controls></video>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { Post } from '../types/Post';

export default defineComponent({
  name: 'Home',
  setup() {
    const posts = ref<Post[]>([]);

    return { posts };
  },
});
</script>