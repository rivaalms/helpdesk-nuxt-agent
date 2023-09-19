declare namespace API {
   module Request {
      interface Login {
         email: string
         password: string
      }

      interface GetTicket {
         assignee?: number
         page?: number
         per_page?: number
         search?: string
         status?: number
         priority?: number
         category?: number
      }
   }
}