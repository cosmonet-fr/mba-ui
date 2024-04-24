<script setup>
import { onMounted, ref } from 'vue';
import { format, parseISO } from 'date-fns';
import { RouterLink, RouterView, useRoute } from 'vue-router'
const route = useRoute(); 

const post = ref([]);
const date = ref(null)

const getpost = () => {
  fetch(`${import.meta.env.VITE_HOST_API}/blog/${route.params.title}`)
    .then(response => response.json())
    .then(data => {
      post.value = data;
      date.value = formatDate(data.createdAt)
    })
    .catch(error => console.error("Failed to fetch post", error));
};

const formatDate = (dateString) => {
  return format(parseISO(dateString), 'PPPP');
};

onMounted(getpost);
</script>

<template>
  <div class="blog">
    <div class="page">
      <h1>{{ post.title }}</h1>
      <div class="post">
        <p class="date">{{ date }}</p>
        <article>
          <div v-html="post.content" class="postText" ></div>
        </article>
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
