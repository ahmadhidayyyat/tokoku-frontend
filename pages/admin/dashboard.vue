<template>
  <div>
    <h1>dashboard admin</h1>

    <h1>Daftar User</h1>

    <div v-for="user in data.data">
      <h1>{{ user.name }}</h1>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});

const { data, pending, refresh } = useFetch("/api/user", {
  lazy: true,
});
</script>
