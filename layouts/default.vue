<template>
<div class="relative h-screen">
   <app-header class="aboslute left-0 top-0 z-50 lg:static shadow-sm"></app-header>

   <div class="flex h-[calc(100dvh-56px)] overflow-hidden">
      <aside class="absolute left-0 top-0 z-50 h-[calc(100dvh-56px)] lg:static lg:translate-x-0 w-60 px-2 py-2 shadow">
         <app-sidebar></app-sidebar>
      </aside>

      <div class="flex-1 overflow-y-scroll p-2">
         <slot/>
      </div>
      
   </div>
</div>
</template>

<script setup lang="ts">

</script>