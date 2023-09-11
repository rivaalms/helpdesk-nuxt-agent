declare namespace Store {
   module App {
      interface State {
         title: string | null
         alert: Component.Alert
         dialog: Component.Dialog
         snackbar: Component.Snackbar
      }
   }
}