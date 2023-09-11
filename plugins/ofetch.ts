import { ofetch } from 'ofetch'

export default defineNuxtPlugin((nuxtApp) => {
   const authStore = useAuthStore()
   const config = useRuntimeConfig()

   globalThis.$fetch = ofetch.create({
      baseURL: `${config.public.apiUrlBase}${config.public.apiUrlPrefix}`,
      
      async onRequest({request, options, error}) {
         if (authStore.isAuthenticated) {
            options.headers = {
               Authorization: `Bearer ${authStore.getAuthToken}`,
               Accept: 'application/json',
               UserableType: authStore.user.userable_type!
            }
         } else {
            console.log('Plugin: Unauthenticated')
            options.headers = {
               UserableType: "App\\Models\\Agent"
            }
         }

         if (error) throw error
      },

      async onRequestError({ request, options, error }) {
         throw error
      },

      async onResponse({ request, response, options, error }) {
         if (error) throw error
         return response._data
      },

      onResponseError({ request, response, options, error }) {
         if ((response.status === 401) && (response._data.data === 'Unauthenticated')) {
            authStore.$reset()
            if (localStorage.getItem('user')) localStorage.removeItem('user')
            if (localStorage.getItem('api-token')) localStorage.removeItem('api-token')
            navigateTo('/login')
         }
      }
   })
})