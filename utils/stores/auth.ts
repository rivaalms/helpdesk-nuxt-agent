import { defineStore } from 'pinia'
import { login as APILogin, logout as APILogout } from '@/utils/api/auth'
import { Base64 } from 'js-base64'

export const useAuthStore = defineStore({
   id: 'auth',
   persist: true,

   state: () : Store.Auth.State => ({
      user: {
         id: null,
         name: null,
         email: null,
         userable_type: null,
         userable_id: null,
         created_at: null,
         updated_at: null,
         userable: null
      },
      token: null
   }),

   getters: {
      getUser: (state) : Model.User => state.user,
      getAuthToken: (state) : Model.User.Token => state.token,
      isAuthenticated: (state) : boolean => state.token ? true : false
   },

   actions: {
      async login(payload: API.Request.Login) {
         await APILogin(payload)
            .then((resp) => {
               this.user = resp.user
               this.token = resp.token
               localStorage.setItem('user', JSON.stringify(resp.user))
               localStorage.setItem('api-token', JSON.stringify(resp.token))
            })
      },

      async logout() {
         const userId = Base64.encode(this.getUser.id!.toString(), true)

         await APILogout(userId)
            .then(() => {
               this.$reset()
               localStorage.removeItem('user')
               localStorage.removeItem('api-token')
            })
      }
   }
})