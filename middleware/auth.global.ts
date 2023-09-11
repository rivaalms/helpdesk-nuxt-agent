import { ofetch } from 'ofetch'

export default defineNuxtRouteMiddleware(async (to, from) => {
   const authStore = useAuthStore()
   const config = useRuntimeConfig()

   if (to.path !== '/login' && authStore.isAuthenticated) {
      globalThis.$fetch = ofetch.create({
         baseURL: `${config.public.apiUrlBase}${config.public.apiUrlPrefix}`,

         onRequest({ request, options, error }) {
            if (authStore.isAuthenticated) {
               options.headers = {
                  Authorization: `Bearer ${authStore.getAuthToken}`,
                  Accept: 'application/json',
                  UserableType: authStore.user.userable_type!
               }
            } else {
               console.log('Unauthenticated')
               options.headers = {
                  UserableType: "App\\Models\\Agent"
               }
            }

            if (error) throw error
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
   }
})