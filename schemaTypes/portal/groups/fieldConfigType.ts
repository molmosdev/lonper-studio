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
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'string',
      description: 'Descripción opcional de la configuración',
    }),
    defineField({
      name: 'subconfigurations',
      title: 'Subconfiguraciones',
      type: 'array',
      of: [{type: 'fieldSubconfig'}],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
    },
  },
})
