<template>
<div class="grid grid-cols-4 gap-2">
   <u-card
      v-for="(item, index) in tickets?.ticket_by_status"
      :key="index"
   >
      <p class="text-sm">{{ index }} Tickets</p>
      <span class="text-2xl">{{ item }}</span>
   </u-card>
</div>
</template>

<script setup lang="ts">
import { getStats as GetTicketStats } from '@/utils/api/tickets'
import { Base64 } from 'js-base64'

const store = useAppStore()
store.title = 'Dashboard'

useHead({ title: store.getTitle })

const tickets : Ref <any> = ref(null)

onBeforeMount(async () => {
   const userId = Base64.encode(useAuthStore().getUser.id!.toString(), true)

   await GetTicketStats(userId)
      .then((resp) => {
         tickets.value = resp
      })
})
</script>