<template>
   <app-data-table
      :header="useTicketTableHeader"
      :data="tickets?.data"
      :last-page="tickets?.last_page"
      :page="tickets?.current_page"
      :per-page="tickets?.per_page"
      :from="tickets?.from"
      :to="tickets?.to"
      :total="tickets?.total"
      :loading="loading"
      @fetch-data="(payload) => fetchTickets(payload)"
   >
      <template #filters>
         <div class="grid grid-cols-3 gap-2">
            <u-form-group
               label="Status"
            >
               <u-select-menu
                  v-model="filter.status"
                  :options="statusOptions"
                  option-attribute="name"
                  @update:model-value="fetchTickets()"
               >
                  <template #label>
                     {{ filter.status?.name }}
                  </template>
               </u-select-menu>
            </u-form-group>
   
            <u-form-group
               label="Priority"
            >
               <u-select-menu
                  v-model="filter.priority"
                  :options="priorityOptions"
                  option-attribute="name"
                  @update:model-value="fetchTickets()"
               >
                  <template #label>
                     {{ filter.priority?.name }}
                  </template>
               </u-select-menu>
            </u-form-group>

            <u-form-group
               label="Category"
            >
               <u-select-menu
                  v-model="filter.category"
                  :options="categoryOptions"
                  option-attribute="name"
                  @update:model-value="fetchTickets()"
               >
                  <template #label>
                     {{ filter.category?.name }}
                  </template>
               </u-select-menu>
            </u-form-group>
         </div>
      </template>
   </app-data-table>
</template>

<script setup lang="ts">
import { get as GetTickets } from '@/utils/api/tickets'

const store = useAppStore()
const authStore = useAuthStore()

store.title = 'Tickets'
useHead({ title: store.getTitle })

const loading : Ref <boolean> = ref(false)
const tickets : Ref <any> = ref(null)

const statusOptions : Ref <Model.Status[]> = ref(await useStatusFilter())
const priorityOptions : Ref <Model.Priority[]> = ref(await usePriorityFilter())
const categoryOptions : Ref <Model.Category[]> = ref(await useCategoryFilter())

const filter : Ref <Filter> = ref({
   status: statusOptions.value.at(0),
   priority: priorityOptions.value.at(-1),
   category: categoryOptions.value.at(-1)
})

onBeforeMount(async () => {
   await fetchTickets({ per_page: 10 })
})

const fetchTickets = async (payload?: API.Request.GetTicket) => {
   loading.value = true
   const queryFilter = {
      ...payload,
      per_page: payload?.per_page || 10,
      status: filter.value.status!.id!,
      priority: filter.value.priority!.id!,
      category: filter.value.category!.id!,
      assignee: authStore.getUser.id!,
   }

   await GetTickets(queryFilter)
      .then((resp) => {
         tickets.value = resp
      })
      .catch((error) => {
         console.log(error.data.message)
      })
      .finally(() => {
         loading.value = false
      })
}

type Filter = {
   status?: Model.Status
   priority?: Model.Priority
   category?: Model.Category
}
</script>