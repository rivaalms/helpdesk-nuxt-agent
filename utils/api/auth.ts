export async function login (payload: API.Request.Login) : Promise<Store.Auth.State> {
   const result = await $fetch <API.ResponseAPI <Store.Auth.State> > ('/login', {
      method: 'POST',
      body: payload,
   })
   return result.data!
}

export async function logout (id: string | number) : Promise<boolean> {
   const result = await $fetch <API.ResponseAPI <unknown>> ('/logout', {
      method: 'POST',
      body: {
         id
      }
   })
   return result.success
}