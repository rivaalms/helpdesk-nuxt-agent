<template>
   <div class="grid grid-cols-3 gap-2">
      <u-card class="col-span-2">
         <div class="mb-8">
            <u-button
               variant="ghost"
               icon="i-heroicons-arrow-left-circle"
               class="mb-6"
               to="/tickets"
            >
               Return to ticket list
            </u-button>
            <div class="border p-4 rounded-t bg-gray-50">
               <div class="flex justify-between">
                  <p class="text-lg">
                     {{ ticket?.user!.name }}
                  </p>
                  <p class="text-sm opacity-50">
                     {{ ticket ? moment(ticket.created_at).format('MMM DD Y') : '' }}
                  </p>
               </div>
            </div>
            <div class="border border-t-0 p-4 rounded-b">
               <p class="font-semibold pb-6">
                  {{ ticket?.subject }}
               </p>
               <p class="">
                  {{ ticket?.description }}
               </p>
            </div>
         </div>
         <div
            v-if="replies"
            class="flex flex-col gap-4"
         >
            <template
               v-for="reply in replies"
               :key="reply.id"
            >
               <div
                  class="w-[75%] border rounded p-4"
                  :class="reply.user_id === authStore.getUser.id ? 'self-end' : ''"
               >
                  <div class="flex justify-between mb-2">
                     <span class="flex">
                        <p class="font-semibold">
                           {{ reply.user.name }}
                        </p>
                        <u-badge
                           v-if="reply.user.id === ticket?.user_id"
                           color="primary"
                           variant="subtle"
                           size="xs"
                           class="ms-2"
                        >
                           Author
                        </u-badge>

                        <u-badge
                           v-if="reply.user.userable_type === userable.admin"
                           color="green"
                           variant="subtle"
                           size="xs"
                           class="ms-2"
                        >
                           Admin
                        </u-badge>

                        <u-badge
                           v-if="reply.user.userable_type === userable.agent"
                           color="amber"
                           variant="subtle"
                           size="xs"
                           class="ms-2"
                        >
                           Agent
                        </u-badge>
                     </span>
                     <p class="text-sm opacity-50">
                        {{ humanizeDate(reply.created_at.toString()) }}
                     </p>
                  </div>
                  <p>
                     {{ reply.text }}
                  </p>
               </div>
            </template>

            <div
               v-if="ticket?.status_id !== 3"
               class="pt-4"
            >
               <u-textarea
                  v-model="reply"
                  placeholder="Write a reply..."
                  autoresize
                  :rows="4"
                  size="xl"
               ></u-textarea>
               <div class="flex justify-end gap-2 pt-2">
                  <u-button
                     color="white"
                     :disabled="reply.length < 1"
                     @click.stop="submitReply(true)"
                  >
                     Send & mark as Done
                  </u-button>
                  <u-button
                     :disabled="reply.length < 1"
                     @click.stop="submitReply(false)"
                  >
                     Send reply
                  </u-button>
               </div>
            </div>
         </div>
      </u-card>

      <div>
         <u-card>
            <div class="mb-4">
               <p class="text-lg font-semibold">Ticket info</p>
               <div class="grid grid-cols-2 gap-2 py-4 text-sm">
                  <p class="opacity-75 font-semibold">
                     Ticket ID
                  </p>
                  <p class="">
                     #{{ ticket?.id }}
                  </p>
                  <p class="opacity-75 font-semibold">
                     Created at
                  </p>
                  <p class="">
                     {{ ticket ? moment(ticket.created_at).format('MMM DD YYYY h:mm A') : '' }}
                  </p>
                  <p class="opacity-75 font-semibold">
                     Category
                  </p>
                  <p class="">
                     {{ ticket?.category!.name }}
                  </p>
                  <p class="opacity-75 font-semibold">
                     Priority
                  </p>
                  <span>
                     <u-popover
                        :items="priorityOptions"
                     >
                        <u-badge
                           variant="subtle"
                           :color="usePriorityBadgeColor(ticket?.priority_id || 0)"
                        >
                           {{ ticket?.priority!.name }}
                           <u-icon
                              name="i-heroicons-chevron-down"
                              class="ms-2"
                           ></u-icon>
                        </u-badge>

                        <template #panel>
                           <div class="px-4 py-2">
                              <u-radio
                              v-for="option in priorityOptions"
                              :key="option.value"
                              v-model="priority"
                              v-bind="option"
                              :disabled="option.value === ticket?.priority_id"
                              @update:model-value="(value) => updateTicket(value, ticket?.status_id!)"
                              ></u-radio>
                           </div>
                        </template>
                     </u-popover>
                  </span>
                  <p class="opacity-75 font-semibold">
                     Status
                  </p>
                  <span>
                     <u-popover>
                        <u-badge
                           variant="subtle"
                           :color="useStatusBadgeColor(ticket?.status_id || 0)"
                        >
                           {{ ticket?.status!.name }}
                           <u-icon
                              name="i-heroicons-chevron-down"
                              class="ms-2"
                           ></u-icon>
                        </u-badge>

                        <template #panel>
                           <div class="px-4 py-2">
                              <u-radio
                              v-for="option in statusOptions"
                              :key="option.value"
                              v-model="status"
                              v-bind="option"
                              :disabled="option.value === ticket?.status_id"
                              @update:model-value="(value) => updateTicket(ticket?.priority_id!, value)"
                              ></u-radio>
                           </div>
                        </template>
                     </u-popover>
                  </span>
                  <template v-if="ticket?.closed_at">
                     <p class="opacity-75 font-semibold">
                        Closed at
                     </p>
                     <p class="">
                        {{ ticket ? moment(ticket.closed_at).format('MMM DD YYYY H:mm A') : '' }}
                     </p>
                  </template>
               </div>
            </div>
   
            <div class="mb-4">
               <p class="text-lg font-semibold">Requester</p>
               <div class="flex pt-4">
                  <u-avatar
                     src="https://api.dicebear.com/7.x/pixel-art/svg"
                     size="xl"
                     class="me-2"
                  ></u-avatar>
                  <div class="flex flex-col justify-center text-sm">
                     <p class="font-semibold">{{ ticket?.user!.name }}</p>
                     <p>{{ ticket?.user!.userable!.departement?.name || 'Agent' }}</p>
                  </div>
               </div>
            </div>
         </u-card>
      </div>
   </div>
</template>

<script setup lang="ts">
import { getDetails as GetTicketDetails, updateInfo as UpdateTicketInfo } from '@/utils/api/tickets'
import { get as GetReplies, create as CreateReply } from '@/utils/api/ticketReplies'
import { get as GetPriority } from '@/utils/api/priorities'
import { get as GetStatus } from '@/utils/api/status'
import moment from 'moment'

const store = useAppStore()
const authStore = useAuthStore()
const route = useRoute()

store.title = 'Ticket Details'
useHead({ title: store.getTitle })

const ticket : Ref <Model.Ticket | null> = ref(null)
const replies : Ref <any> = ref(null) 
const userable = computed(() => useUserable)
const reply : Ref <string> = ref('')

const priority : Ref <number | null> = ref(null)
const priorityOptions : Ref<any> = ref([])
const status : Ref <number | null> = ref(null)
const statusOptions : Ref <any> = ref([])

onBeforeMount(async () => {
   await GetTicketDetails(route.params.id.toString())
      .then((resp) => {
         ticket.value = resp
      })

   await GetReplies(route.params.id.toString())
      .then((resp) => {
         replies.value = resp
      })

   await GetPriority()
      .then((resp) => {
         resp.forEach(item => {
            priorityOptions.value.push({
               label: item.name,
               name: item.name,
               value: item.id
            })
         })
      })

   await GetStatus()
      .then((resp) => {
         resp.forEach(item => {
            statusOptions.value.push({
               label: item.name,
               name: item.name,
               value: item.id
            })
         })
      })
})

const humanizeDate = (date: string | Date) : any => {
   const now = moment()
   const parsed = moment(date)
   return moment.duration(parsed.diff(now)).humanize(true, { s: 60, m: 60, h: 24, d: 7, w: 4, M: 12 })
}

const submitReply = async (markAsDone: boolean) : Promise<any> => {
   const payload = {
      user_id: authStore.getUser.id!,
      ticket_id: ticket.value!.id!,
      text: reply.value
   }

   await CreateReply(payload)
      .then(async (resp) => {
         if (markAsDone) {
            await UpdateTicketInfo(route.params.id.toString(), {
               status_id: 3,
               priority_id: ticket.value!.priority_id!,
               category_id: ticket.value!.category_id!
            })
               .then(async (resp) => {
                  await GetTicketDetails(route.params.id.toString())
                     .then((resp) => ticket.value = resp)

                  store.showNotification('success', resp)
               })
               .catch((error: any) => store.showNotification('error', error.data.message))
         }

         await GetReplies(route.params.id.toString())
            .then((resp) => {
               replies.value = resp
               reply.value = ""
            })

         store.showNotification('success', resp)
      })
      .catch((error: any) => store.showNotification('error', error.data.message))
}

const updateTicket = async (priority_id: number, status_id: number) => {
   const payload = {
      priority_id,
      status_id,
      category_id: ticket.value!.category_id!
   }

   await UpdateTicketInfo(route.params.id.toString(), payload)
      .then(async (resp) => {
         await GetTicketDetails(route.params.id.toString())
            .then((resp) => {
               ticket.value = resp
            })
         store.showNotification('success', resp)
      })
      .catch((error) => store.showNotification('error', error.data.message))
}
</script>