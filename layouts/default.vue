<template>
<div class="relative h-screen dark:bg-gray-800 overflow-y-hidden">
   <app-header class="aboslute left-0 top-0 border-b-[1px] dark:border-b-gray-800"></app-header>

   <div class="flex h-[calc(100dvh-64px)] overflow-hidden">
      <aside class="absolute left-0 top-0 z-50 h-[calc(100dvh-64px)] lg:static lg:translate-x-0 w-60 px-2 py-2 border-r-[1px] dark:border-r-gray-800 dark:bg-gray-900">
         <app-sidebar></app-sidebar>
      </aside>

      <div class="flex-1 overflow-y-scroll p-2 bg-gray-100 dark:bg-gray-900">
         <slot/>
      </div>
      
   </div>
</div>
</template>

<script setup lang="ts">

</script>