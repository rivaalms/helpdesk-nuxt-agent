declare namespace Model {
   interface Ticket {
      id: number | null
      subject: string
      description: string
      user_id: number
      status_id: number
      priority_id: number
      category_id: number
      assigned_to: number | null
      closed_at: string | null
      created_at?: string
      updated_at?: string
      user?: Model.User
      status?: Model.Status
      priority?: Model.Priority
      category?: Model.Category
      assignee?: Model.User
   }
}