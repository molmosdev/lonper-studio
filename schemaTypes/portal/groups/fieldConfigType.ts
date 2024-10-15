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
      initialValue: 'Configuración Básica', // Valor inicial básico
      hidden: true,
    }),
    defineField({
      name: 'subconfigurations',
      title: 'Subconfiguraciones',
      type: 'array',
      of: [{type: 'reference', to: {type: 'fieldSubconfig'}}],
      validation: (Rule) =>
        Rule.custom((subconfigurations, context) => {
          const {document} = context
          if (subconfigurations && subconfigurations?.length > 1) {
            if (document) document.name = 'Configuración Dinámica'
          } else {
            if (document) document.name = 'Configuración Básica'
          }
          return true
        }),
    }),
  ],
})
