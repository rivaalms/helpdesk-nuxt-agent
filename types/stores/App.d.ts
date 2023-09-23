declare namespace Store {
   module App {
      interface State {
         title: string | null
         dialog: Component.Dialog
      }
      
      type NotificationType = 'error' | 'success' | 'info'
   }
}