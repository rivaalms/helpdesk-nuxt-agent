declare namespace Store {
   module Auth {
      interface State {
         user: Model.User
         token: Model.User.Token
      }
   }
}