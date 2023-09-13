import { get as GetCategories } from '@/utils/api/categories'

export const useCategoryFilter = async () : Promise <Model.Category[]> => {
   const result = await GetCategories()
   result.push({ id: null, name: 'All' })
   return result
}