declare namespace API {
   interface ResponseAPI <T> {
      success: boolean
      data?: T
      message?: string
   }

   interface PaginatedData <T> {
      data: Array <T>
      current_page?: number
      first_page_url?: string | null
      from?: number
      last_page?: number
      last_page_url?: string | null
      links?: Array
      next_page_url?: string | null
      path?: string
      per_page?: number
      prev_page_url?: string | null
      to?: number
      total?: number
   }
}