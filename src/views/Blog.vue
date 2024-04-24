<script setup>
import { onMounted, ref } from 'vue';
import { format, parseISO } from 'date-fns';

const posts = ref([]);

const getPosts = () => {
  fetch(`${import.meta.env.VITE_HOST_API}/blog`)
    .then(response => response.json())
    .then(data => {
      posts.value = data.map(post => ({
        ...post,
        formattedDate: formatDate(post.createdAt)
      }));
    })
    .catch(error => console.error("Failed to fetch posts", error));
};

const formatDate = (dateString) => {
  return format(parseISO(dateString), 'PPPP');
};

getPosts();
</script>

<template>
  <div class="blog">
    <div class="page">
      <h1>What's up?</h1>
      <div v-for="post in posts" :key="post.id">
        <div class="posts">
          <article>
            <h2>{{ post.title }}</h2>
            <p class="date">{{ post.formattedDate }}</p>
            <div v-html="post.extract" v-if="post.extract" class="postText"></div>
            <div v-html="post.content" v-else class="postText"></div>
            <RouterLink :to="'blog/'+post.title">Read more</RouterLink>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped >
@media (min-width: 1024px) {
  .blog {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

.page {
  justify-content: start;
}
article {
  background: #1f1e24;
  padding: 15px;
  margin: 2em 0;
  h2 {
    font-size: 1.1rem;
    font-weight: bold;
  }
}
</style>
