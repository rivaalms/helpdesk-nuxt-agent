<template>
<header>
   <div class="py-4 px-4 flex justify-between">
      <span>
         Helpdesk
      </span>
      <span>
         {{ user.name }}
      </span>
   </div>
</header>
</template>

<script setup lang="ts">
const authStore = useAuthStore()

const user = authStore.getUser
</script>