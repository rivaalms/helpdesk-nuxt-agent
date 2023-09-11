export const useCsrfCookie = async () : Promise <void> => {
   const config = useRuntimeConfig()
   await $fetch <API.ResponseAPI<void>> (`${config.public.apiUrlBase}/sanctum/csrf-cookie`, {
      method: 'GET'
   })
}