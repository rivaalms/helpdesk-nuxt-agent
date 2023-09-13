export async function get () : Promise <Array <Model.Priority>> {
   const response = await $fetch <API.ResponseAPI <Array <Model.Priority>>> ('/priorities', {
      method: 'GET'
   })

   return response.data!
}