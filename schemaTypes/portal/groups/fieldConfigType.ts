import {defineField, defineType} from 'sanity'
import {createClient} from '@sanity/client'

// Configura el cliente de Sanity
const client = createClient({
  projectId: '2bbq4lus', // Reemplaza con tu ID de proyecto
  dataset: 'production', // Reemplaza con tu dataset
  useCdn: true, // `false` si quieres datos frescos
})

// Función para obtener los documentos de group
async function getGroups() {
  console.log('Fetching groups...')
  const query =
    '*[_type == "group"]{name, fields[]->{name, configurations[]->{_id, name, description}}}'
  const groups = await client.fetch(query)
  return groups
}

const groups = await getGroups()

// Función para obtener la información del grupo
function getGroupInfo(id: string) {
  let configIndex = 0
  let fieldName = ''
  let groupName = ''

  for (const group of groups) {
    for (const field of group.fields) {
      for (let index = 0; index < field.configurations.length; index++) {
        const config = field.configurations[index]
        if (config._id === id) {
          configIndex = index + 1
          groupName = group.name
          fieldName = field.name
          break
        }
      }
      if (fieldName) break
    }
    if (groupName) break
  }

  return {configIndex, fieldName, groupName}
}

export default defineType({
  name: 'fieldConfig',
  title: 'Configuración de campo',
  type: 'document',
  fields: [
    defineField({
      name: 'subconfigurations',
      title: 'Subconfiguraciones',
      type: 'array',
      of: [{type: 'fieldSubconfig'}],
    }),
  ],
  preview: {
    select: {
      subtitle: 'description',
      id: '_id',
    },
    prepare(selection) {
      const {subtitle, id} = selection
      const {configIndex, fieldName, groupName} = getGroupInfo(id)
      return {
        title: `${fieldName} (${configIndex})`,
        subtitle: groupName ? groupName : subtitle,
      }
    },
  },
})
