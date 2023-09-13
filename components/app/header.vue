<template>
<header>
   <div class="py-4 px-4 flex justify-between">
      <span>
         Helpdesk
      </span>
      <u-dropdown
         :items="menu"
      >
         <u-button
            variant="ghost"
            trailing-icon="i-heroicons-chevron-down-20-solid"
         >
            {{ user.name }}
         </u-button>

         <template #logout="{ item }">
            <span class="text-red-500">
               {{ item.label }}
            </span>
         </template>
      </u-dropdown>
   </div>
</header>
</template>

<script setup lang="ts">
const authStore = useAuthStore()

const user = authStore.getUser

const menu = [
   [
      {
      label: 'Profile',
      click: () => { console.log('profile') }
      },
   ],
   [
      {
         label: 'Log out',
         slot: 'logout',
         click: async () => {
            await authStore.logout()
               .then(() => {navigateTo('/login')})
         }
      }
   ]
]
</script>