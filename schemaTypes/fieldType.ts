import {defineField, defineType} from 'sanity'
import fieldConfig from './fieldConfigType'

export default defineType({
  name: 'field',
  title: 'Campos',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre del Campo',
      type: 'string',
      validation: (rule) => rule.required().error('El nombre del campo es obligatorio'),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'string',
      description: 'Descripción opcional del campo',
    }),
    defineField({
      name: 'saveOnRequest',
      title: 'Guardar bajo petición',
      type: 'boolean',
    }),
    defineField({
      name: 'configurations',
      title: 'Configuraciones',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Configuración',
          fields: fieldConfig.fields,
        },
      ],
      validation: (rule) => rule.unique().error('No puedes repetir la misma configuración'),
    }),
  ],
})
