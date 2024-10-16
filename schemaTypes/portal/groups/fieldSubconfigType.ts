import {defineField, defineType} from 'sanity'

const fieldTypeOptions = [
  {title: 'Casilla de verificación', value: 'CHECKBOX'},
  {title: 'Selector', value: 'SELECT'},
  {title: 'Selector de base de datos', value: 'DB_SELECT'},
  {title: 'Texto', value: 'TEXT'},
  {title: 'Número', value: 'NUMBER'},
]

export default defineType({
  name: 'fieldSubconfig',
  title: 'Subconfiguración',
  type: 'object',
  fields: [
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'string',
      description: 'Descripción opcional de la subconfiguración',
    }),
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
              name: 'hasValue',
              title: 'Tiene valor',
              type: 'boolean',
              initialValue: false,
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  if (value) {
                    const subconfig = context.parent as {linkedValue?: string}
                    if (subconfig.linkedValue) {
                      subconfig.linkedValue = undefined
                    }
                  }
                  return true
                }),
            },
            {
              name: 'linkedValue',
              title: 'Valor vinculado',
              type: 'string',
              hidden: ({parent}) => parent.hasValue,
            },
          ],
          preview: {
            select: {
              linkedFieldName: 'linkedField.name',
              linkedValue: 'linkedValue',
              hasValue: 'hasValue',
            },
            prepare({linkedFieldName, linkedValue, hasValue}) {
              return {
                title: linkedFieldName,
                subtitle: hasValue ? 'Tiene valor' : linkedValue,
              }
            },
          },
        },
      ],
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
      initialValue: true,
    }),
    defineField({
      name: 'showName',
      title: 'Mostrar nombre',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'size',
      title: 'Ancho de campo',
      type: 'string',
      options: {
        list: ['1/3', '1/5', '2/3', '1'],
      },
      validation: (rule) => rule.required().error('El ancho de campo es obligatorio'),
    }),
    defineField({
      name: 'hoverText',
      title: 'Texto al pasar por encima',
      type: 'string',
    }),
    defineField({
      name: 'type',
      title: 'Tipo de campo',
      type: 'string',
      options: {
        list: fieldTypeOptions,
      },
      validation: (rule) => rule.required().error('El tipo de campo es obligatorio'),
    }),
    defineField({
      name: 'selectOptions',
      title: 'Opciones de selección',
      type: 'array',
      of: [{type: 'string'}],
      hidden: ({parent}) => parent?.type !== 'SELECT',
    }),
    defineField({
      name: 'dbSelectOptions',
      title: 'Opciones del selector de base de datos',
      type: 'object',
      fields: [
        {
          name: 'withSearch',
          title: 'Con búsqueda',
          type: 'boolean',
          initialValue: true,
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
                  name: 'linked',
                  title: 'Enlazado',
                  type: 'boolean',
                  initialValue: false,
                },
                {
                  name: 'column',
                  title: 'Columna',
                  type: 'string',
                },
                {
                  name: 'equal',
                  title: 'Igual',
                  type: 'boolean',
                  initialValue: true,
                },
                {
                  name: 'value',
                  title: 'Valor',
                  type: 'string',
                  hidden: ({parent}) => parent.linked,
                },
                {
                  name: 'linkedField',
                  title: 'Campo enlazado',
                  type: 'reference',
                  to: [{type: 'field'}],
                  hidden: ({parent}) => !parent.linked,
                },
              ],
              preview: {
                select: {
                  column: 'column',
                  linkedFieldValue: 'linkedField.name',
                  value: 'value',
                  equal: 'equal',
                },
                prepare({column, linkedFieldValue, value, equal}) {
                  const finalValue = value || linkedFieldValue
                  const subtitle = equal ? `Igual a ${finalValue}` : `Diferente a ${finalValue}`
                  return {
                    title: column,
                    subtitle,
                  }
                },
              },
            },
          ],
        },
      ],
      hidden: ({parent}) => parent?.type !== 'DB_SELECT',
    }),
    defineField({
      name: 'value',
      title: 'Valor por defecto',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      type: 'type',
      dataUnit: 'dataUnit',
      description: 'description',
    },
    prepare(selection) {
      const {type, dataUnit, description} = selection
      const selectedType = fieldTypeOptions.find((option) => option.value === type)
      const title = selectedType
        ? `${selectedType.title}${dataUnit ? ` (${dataUnit})` : ''}`
        : 'Sin tipo'
      const subtitle = description || ''
      return {
        title: title,
        subtitle: subtitle,
      }
    },
  },
})
