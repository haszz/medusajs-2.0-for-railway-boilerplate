"use server"

export { listCategories } from './categories'
export { listCollections } from './collections'

export async function getCategoriesList(offset = 0, limit = 100) {
  const { listCategories } = await import('./categories')
  const product_categories = await listCategories({ offset, limit })
  return { product_categories }
}

export async function getCollectionsList(offset = 0, limit = 100) {
  const { listCollections } = await import('./collections')
  const { collections } = await listCollections({ 
    offset: String(offset), 
    limit: String(limit) 
  })
  return { collections }
} 