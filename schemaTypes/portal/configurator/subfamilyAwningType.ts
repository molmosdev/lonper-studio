import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'subfamilyAwning',
  title: 'Subfamilia de Toldos',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (rule) => rule.required().error('El nombre de la subfamilia es obligatorio'),
    }),
    defineField({
      name: 'awnings',
      title: 'Toldos',
      type: 'array',
      of: [{type: 'reference', to: {type: 'awning'}}],
    }),
  ],
})
