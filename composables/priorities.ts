import { get as GetPriorities } from '@/utils/api/priorities'

export const usePriorityBadgeColor = (priorityId: number) : string => {
   let color = ''

   switch (priorityId) {
      case 1:
         color = 'green'
         break
      case 2:
         color = 'amber'
         break
      case 3:
         color = 'red'
         break
      default:
         break
   }
   
   return color
}

export const usePriorityFilter = async () : Promise<Model.Priority[]> => {
   const result = await GetPriorities()
   result.push({ id: null, name: 'All' })
   return result
}