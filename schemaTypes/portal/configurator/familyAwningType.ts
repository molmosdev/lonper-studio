import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'familyAwning',
  title: 'Familia de Toldos',
  type: 'document',
  fields: [
    defineField({
      name: 'identifier',
      title: 'Identificador',
      type: 'number',
      validation: (rule) => rule.required().error('El identificador de la familia es obligatorio'),
    }),
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (rule) => rule.required().error('El nombre de la familia es obligatorio'),
    }),
    defineField({
      name: 'subfamilies',
      title: 'Subfamilias',
      type: 'array',
      of: [{type: 'reference', to: {type: 'subfamilyAwning'}}],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'identifier',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: title,
        subtitle: subtitle,
      }
    },
  },
  orderings: [
    {
      title: 'Identificador Ascendente',
      name: 'identifierAsc',
      by: [{field: 'identifier', direction: 'asc'}],
    },
    {
      title: 'Identificador Descendente',
      name: 'identifierDesc',
      by: [{field: 'identifier', direction: 'desc'}],
    },
  ],
})
