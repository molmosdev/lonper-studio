import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {Logo} from './components/Logo'

// Placeholder function to get the current user's role
// Replace this with your actual logic to get the current user's role
const getCurrentUserRole = (): string => {
  return 'administrator' // Example: return 'administrator' or 'editor'
}

export default defineConfig({
  name: 'default',
  title: 'Lonper',
  projectId: '2bbq4lus',
  dataset: 'production',
  plugins: [
    structureTool(),
    ...(getCurrentUserRole() === 'administrator' ? [visionTool()] : []), // Conditionally include visionTool
  ],
  schema: {
    types: schemaTypes,
  },
  icon: Logo,
})
