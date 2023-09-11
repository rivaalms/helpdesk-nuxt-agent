<template>
   <u-vertical-navigation
      :links="routes"
      :ui="ui"
   ></u-vertical-navigation>
</template>

<script setup lang="ts">
const routes = [
   {
      label: 'Dashboard',
      to: '/',
      icon: 'i-heroicons-rectangle-group',
      iconClass: 'text-inherit'
   },
   {
      label: 'Tickets',
      to: '/tickets',
      icon: 'i-heroicons-ticket',
   }
]

const ui = {
   active: 'text-primary-700 dark:text-white before:bg-primary-100 dark:before:bg-primary-800',
}
</script>