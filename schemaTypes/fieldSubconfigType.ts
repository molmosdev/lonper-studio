import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'fieldSubconfig',
  title: 'Subconfiguración',
  type: 'object',
  fields: [
    defineField({
      name: 'linkedActiveArray',
      title: 'Vinculaciones por activación',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'linkedField',
              title: 'Campo vinculado',
              type: 'reference',
              to: [{type: 'field'}],
              options: {
                disableNew: true,
              },
            },
            {
              name: 'linkedValue',
              title: 'Valor vinculado',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'subconfigName',
      title: 'Nombre de subconfiguración',
      type: 'string',
      hidden: true,
      initialValue: async (context) => {
        const parent = await context.parent
        const index = parent ? parent.length : 0
        return `Subconfiguración ${index + 1}`
      },
    }),
    defineField({
      name: 'linkedSameOnValidate',
      title: 'Campo vinculado con el mismo valor al validar',
      type: 'reference',
      to: [{type: 'field'}],
      options: {
        disableNew: true,
      },
    }),
    defineField({
      name: 'linkedSameDefaultUntouched',
      title: 'Campo vinculado con el mismo valor por defecto',
      type: 'reference',
      to: [{type: 'field'}],
      options: {
        disableNew: true,
      },
    }),
    defineField({
      name: 'dataUnit',
      title: 'Unidad de datos',
      type: 'string',
    }),
    defineField({
      name: 'required',
      title: 'Requerido',
      type: 'boolean',
    }),
    defineField({
      name: 'showName',
      title: 'Mostrar nombre',
      type: 'boolean',
    }),
    defineField({
      name: 'hoverText',
      title: 'Texto al pasar por encima',
      type: 'string',
    }),
    defineField({
      name: 'size',
      title: 'Ancho de campo',
      type: 'string',
      options: {
        list: ['1/3', '1/5', '2/3', '1'],
      },
    }),
    defineField({
      name: 'value',
      title: 'Valor por defecto',
      type: 'string',
    }),
    defineField({
      name: 'type',
      title: 'Tipo de campo',
      type: 'string',
      options: {
        list: [
          {title: 'Casilla de verificación', value: 'CHECKBOX'},
          {title: 'Selector', value: 'SELECT'},
          {title: 'Selector de base de datos', value: 'DB_SELECT'},
          {title: 'Texto', value: 'TEXT'},
          {title: 'Número', value: 'NUMBER'},
        ],
      },
    }),
    {
      name: 'selectOptions',
      title: 'Opciones de selección',
      type: 'array',
      of: [{type: 'string'}],
      hidden: ({parent}) => parent?.type !== 'SELECT',
    },
    {
      name: 'dbSelectOptions',
      title: 'Opciones del selector de base de datos',
      type: 'object',
      fields: [
        {
          name: 'withSearch',
          title: 'Con búsqueda',
          type: 'boolean',
        },
        {
          name: 'tableName',
          title: 'Nombre tabla',
          type: 'string',
        },
        {
          name: 'noContentText',
          title: 'Texto a mostrar cuando no hay contenido',
          type: 'string',
        },
        {
          name: 'queryColumns',
          title: 'Columnas a consultar',
          type: 'array',
          of: [{type: 'string'}],
        },
        {
          name: 'displayColumns',
          title: 'Columnas a mostrar',
          type: 'array',
          of: [{type: 'string'}],
        },
        {
          name: 'saveColumns',
          title: 'Columnas a guardar',
          type: 'array',
          of: [{type: 'string'}],
        },
        {
          name: 'filters',
          title: 'Filtros',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'column',
                  title: 'Columna',
                  type: 'string',
                },
                {
                  name: 'equal',
                  title: 'Igual',
                  type: 'boolean',
                },
                {
                  name: 'value',
                  title: 'Valor',
                  type: 'string',
                },
              ],
            },
          ],
        },
      ],
      hidden: ({parent}) => parent?.type !== 'DB_SELECT',
    },
  ],
})
