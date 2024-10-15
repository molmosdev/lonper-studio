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
      initialValue: 'Configuración',
    }),
    defineField({
      name: 'subconfigurations',
      title: 'Subconfiguraciones',
      type: 'array',
      of: [{type: 'object', fields: fieldSubconfig.fields}],
    }),
  ],
})
