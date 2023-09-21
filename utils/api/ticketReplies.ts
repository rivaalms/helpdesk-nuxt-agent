export async function get (ticketId: string) : Promise <any> {
   const response = await $fetch <any> (`/ticket-replies/${ticketId}`, {
      method: 'GET'
   })

   return response.data!
}

export async function create (payload: CreateTicketReply) : Promise <string> {
   const response = await $fetch <API.ResponseAPI <string>> (`ticket-replies/create`, {
      method: 'POST',
      body: payload
   })

   return response.message!
}

type CreateTicketReply = {
   user_id: number
   ticket_id: number
   text: string | number
}