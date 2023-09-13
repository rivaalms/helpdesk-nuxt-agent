<template>
<!-- eslint-disable -->
<u-card>
   <div class="mb-4 flex justify-between gap-4">
      <div class="flex-1 flex">
         <u-input
            v-model="search"
            placeholder="Search..."
            class="flex-grow flex items-end"
            :ui="searchUI"
            @keydown.enter="fetchData"
         ></u-input>
            <u-button
               class="self-end rounded-l-none"
               icon="i-heroicons-magnifying-glass"
               @click.stop="fetchData"
            >
            </u-button>
      </div>

      <div class="flex-1">
         <slot name="filters"/>
      </div>

      <div class="flex justify-end flex-1">
         <slot name="action-button"/>
      </div>
   </div>
   
   <u-table
      :columns="props.header"
      :rows="props.data"
      :loading="props.loading"
   >
      <template #status.name-data="{ row }">
         <u-badge
            :color="useStatusBadgeColor(row.status_id)"
            variant="subtle"
            :label="row.status.name"
         ></u-badge>
      </template>

      <template #priority.name-data="{ row }">
            <u-badge
               :color="usePriorityBadgeColor(row.priority_id)"
               variant="subtle"
               :label="row.priority.name"
            ></u-badge>
      </template>

      <template #created_at-data="{ row }">
         {{ humanizeDate(row.created_at) }}
      </template>

      <template #actions-data="{ row }">
         <div class="flex">
            <u-tooltip text="Details">
               <u-button
                  icon="i-heroicons-eye"
                  variant="ghost"
                  :ui="actionsBtnUI"
               ></u-button>
            </u-tooltip>

            <u-popover>
               <u-tooltip text="Update status">
                  <u-button
                        icon="i-heroicons-tag"
                        variant="ghost"
                        color="green"
                        :ui="actionsBtnUI"
                     ></u-button>
               </u-tooltip>

                  <template #panel>
                     <div class="px-4 py-2">
                        <u-radio
                           v-for="option in statusOptions"
                           :key="option.value"
                           v-model="status"
                           v-bind="option"
                           :disabled="option.value === row.status_id"
                           @update:model-value="(value) => updateStatus(value, row)"
                        ></u-radio>
                     </div>
                  </template>
            </u-popover>
         </div>
      </template>
   </u-table>

   <div class="flex justify-between mt-6">
      <span class="text-xs text-gray-400">
         {{ props.from }}-{{ props.to }} of {{ props.total }}
      </span>
      
      <u-pagination
         v-model="currentPage"
         :page-count="perPage"
         :total="props.total"
         @update:model-value="fetchData"
      ></u-pagination>
   </div>

</u-card>
</template>

<script setup lang="ts">
import { get as GetStatus } from '@/utils/api/status'
import { updateInfo } from '@/utils/api/tickets'
import { Base64 } from 'js-base64'
import moment from 'moment'

const props = defineProps([
   'data',
   'header',
   'loading',
   'lastPage',
   'page',
   'perPage',
   'from',
   'to',
   'total',
])

const emit = defineEmits(['fetch-data'])

const currentPage : Ref <number> = ref(props.page)
const perPage : Ref <number> = ref(props.perPage)

const search : Ref <string> = ref('')
const status : Ref <any> = ref(null)
const statusOptions : Ref <any> = ref([])

const searchUI = ref({
   rounded: "rounded-md rounded-r-none"
})

const actionsBtnUI = ref({
   rounded: "rounded-full"
})

watch(() => props.page, () => {
   currentPage.value = props.page
})

watch(() => props.perPage, () => {
   perPage.value = props.perPage
})

onBeforeMount(async () => {
   await GetStatus()
      .then((resp) => {
         const dropdownItems : any[] = []
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

const fetchData = () => {
   const payload = {
      page: currentPage.value,
      per_page: perPage.value,
      search: search.value
   }
   emit('fetch-data', payload)
}

const updateStatus = async (statusId: number, ticket: Model.Ticket) : Promise <void> => {
   const ticketId = Base64.encode(ticket.id!.toString(), true)
   const payload = {
      status_id: statusId,
      priority_id: ticket.priority_id,
      category_id: ticket.category_id
   }

   await updateInfo(ticketId, payload)
      .then(resp => {
         console.log(resp)
      })
      .finally(() => {
         status.value = null
         fetchData()
      })
}
</script>