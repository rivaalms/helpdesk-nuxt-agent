declare namespace Model {
   interface User {
      id: number | null
      name: string | null
      email: string | null
      userable_type: "App\\Models\\Agent" | null
      userable_id: number | null
      created_at?: string | null
      updated_at?: string | null
      userable?: Model.User.Userable | null
   }

   module User {
      interface Userable {
         id: number | null
         rating: number | string | null
      }
      
      type Token = string | null
   }
}