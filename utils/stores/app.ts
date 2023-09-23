import { defineStore } from 'pinia'

export const useAppStore = defineStore({
   id: 'app',
   persist: true,

   state: () : Store.App.State => ({
      title: null,

      dialog: {
         type: null,
         data: null,
         show: false
      },
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

      showNotification(type: Store.App.NotificationType, description: string) {
         const toast = useToast()
         let title, icon, color = ''

         switch (type) {
            case 'error':
               title = 'Error'
               icon = 'i-heroicon-x-circle'
               color = 'red'
               break
            case 'info':
               title = 'Info'
               icon = 'i-heroicon-exclamation-circle'
               color = 'primary'
               break
            case 'success':
               title = 'Success'
               icon = 'i-heroicon-check-circle'
               color = 'green'
               break
            default:
               break
         }

         toast.add({
            title,
            description,
            timeout: 5000,
            icon,
            color,
         })
      }
   }
})