export async function get () : Promise <Model.Category[]> {
   const response = await $fetch <API.ResponseAPI <Model.Category[]>> ('/categories', {
      method: 'GET'
   })
   return response.data!
}