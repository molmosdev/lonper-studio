import {defineField, defineType} from 'sanity'
import fieldSubconfig from './fieldSubconfigType'

export default defineType({
  name: 'fieldConfig',
  title: 'Configuración de campo',
  type: 'object',
  fields: [
    defineField({
      name: 'configName',
      title: 'Nombre de Configuración',
      type: 'string',
      hidden: true,
      initialValue: async (context) => {
        const parent = await context.parent
        const index = parent ? parent.length : 0
        return `Configuración ${index + 1}`
      },
    }),
    defineField({
      name: 'subconfigurations',
      title: 'Subconfiguraciones',
      type: 'array',
      of: [{type: 'object', fields: fieldSubconfig.fields}],
    }),
  ],
})
