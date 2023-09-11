declare namespace Component {
   interface Alert {
      type: 'success' | 'error' | 'warning' | 'info' | null
      text: string | null
      show: boolean
   }
}