import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'fieldConfig',
  title: 'Configuración de campo',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre de la Configuración',
      type: 'string',
      initialValue: 'Configuración',
      hidden: true,
    }),
    defineField({
      name: 'subconfigurations',
      title: 'Subconfiguraciones',
      type: 'array',
      of: [{type: 'fieldSubconfig'}],
    }),
  ],
})
