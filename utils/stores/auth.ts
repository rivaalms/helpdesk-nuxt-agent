import { defineStore } from 'pinia'

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
   }
})