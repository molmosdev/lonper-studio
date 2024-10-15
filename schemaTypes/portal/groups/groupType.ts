import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'group',
  title: 'Grupos',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (rule) => rule.required().error('El nombre del grupo es obligatorio'),
    }),
    defineField({
      name: 'fields',
      title: 'Campos',
      type: 'array',
      of: [{type: 'reference', to: {type: 'field'}}],
    }),
    defineField({
      name: 'orderRank',
      title: 'Order Rank',
      type: 'string',
      hidden: true, // Ocultar este campo en el editor
    }),
  ],
})
