declare namespace API {
   interface ResponseAPI <T> {
      success: boolean
      data?: T
      message?: string
   }
}