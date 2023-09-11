declare namespace Component {
   interface Snackbar {
      text: string | null
      type: 'success' | 'warning' | 'error' | 'info' | null
      show: boolean
   }
}