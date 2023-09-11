import { defineStore } from 'pinia'

export const useAppStore = defineStore({
   id: 'app',
   persist: true,

   state: () : Store.App.State => ({
      title: null,

      alert: {
         type: null,
         text: null,
         show: false
      },

      dialog: {
         type: null,
         data: null,
         show: false
      },

      snackbar: {
         type: null,
         text: null,
         show: false
      }
   }),

   getters: {
      getTitle: (store) : string | null => store.title
   },

   actions: {
      clearDialog() {
         this.dialog.show = false

         setTimeout(() => {
            this.dialog.type = null
            if (this.dialog.data) this.dialog.data = null
         }, 200)
      },

      clearAlert() {
         this.alert.show = false

         setTimeout(() => {
            this.alert.text = null
            this.alert.type = null
         }, 200)
      }
   }
})