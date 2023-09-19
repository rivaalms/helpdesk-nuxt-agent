<template>
<header>
   <div class="py-4 px-4 flex justify-between">
      <span>
         Helpdesk
      </span>
      <div class="flex items-center gap-2">
         <u-tooltip text="Color mode">
            <u-button
               :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
               color="gray"
               variant="ghost"
               aria-label="Theme"
               @click="isDark = !isDark"
            ></u-button>
         </u-tooltip>

         <u-dropdown
            :items="menu"
         >
            <u-button
               color="gray"
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
   </div>
</header>
</template>

<script setup lang="ts">
const authStore = useAuthStore()

const user = authStore.getUser
const colorMode = useColorMode()
const isDark = computed({
   get () {
      return colorMode.value === 'dark'
   },
   set () {
      colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
   }
})

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