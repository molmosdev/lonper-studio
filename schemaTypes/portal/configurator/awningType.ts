import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'awning',
  title: 'Toldo',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (rule) => rule.required().error('El nombre de la subfamilia es obligatorio'),
    }),
    defineField({
      name: 'model',
      title: 'Modelo',
      type: 'string',
      validation: (rule) => rule.required().error('El nombre de la subfamilia es obligatorio'),
    }),
    defineField({
      name: 'coeficiente',
      title: 'Coeficiente',
      type: 'number',
      validation: (rule) => rule.required().error('El nombre de la subfamilia es obligatorio'),
    }),
    defineField({
      name: 'configs',
      title: 'Configuraciones',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: {type: 'fieldConfig'},
        },
      ],
    }),
  ],
})
