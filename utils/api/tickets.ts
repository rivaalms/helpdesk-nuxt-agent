export async function get (payload?: API.Request.GetTicket) : Promise <API.PaginatedData <Model.Ticket[]>> {
   const response = await $fetch <API.ResponseAPI <API.PaginatedData <Model.Ticket[]>>> (`/tickets`, {
      method: 'GET',
      query: payload
   })

   return response.data!
}

export async function getDetails (ticket_id: string) : Promise <Model.Ticket> {
   const response = await $fetch <API.ResponseAPI <Model.Ticket>> (`/tickets/${ticket_id}`, {
      method: 'GET'
   })

   return response.data!
}

export async function getStats (agentId: string) : Promise <any> {
   const response = await $fetch <API.ResponseAPI <any>> (`/tickets/agent-statistics/${agentId}`, {
      method: 'GET'
   })

   return response.data!
}

export async function updateInfo (ticketId: string, payload: UpdateInfoPayload) : Promise <string> {
   const response = await $fetch <API.ResponseAPI <string>> (`/ticket/update-info/${ticketId}`, {
      method: 'PUT',
      body: payload
   })

   return response.message!
}

type UpdateInfoPayload = {
   status_id: number
   priority_id: number
   category_id: number
}