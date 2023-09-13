export async function get () : Promise <Array <Model.Status>> {
   const response = await $fetch <API.ResponseAPI <Array <Model.Status>>> ('/statuses', {
      method: 'GET'
   })

   return response.data!
}