import { get as GetStatus } from '@/utils/api/status'

export const useStatusBadgeColor = (statusId: number) : string => {
   let color = ''

   switch (statusId) {
      case 1:
         color = 'gray'
         break
      case 2:
         color = 'sky'
         break
      case 3:
         color = 'green'
         break
      default:
         break
   }

   return color
}

export const useStatusFilter = async () : Promise <Model.Status[]> => {
   const result = await GetStatus()
   result.push({ id: null, name: 'All' })
   return result
}