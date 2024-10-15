import {defineConfig} from 'sanity'
import {StructureResolver, structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {Logo} from './components/Logo'
import './styles.css'
import {ProjectsIcon, DesktopIcon} from '@sanity/icons'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'

// Placeholder function to get the current user's role
// Replace this with your actual logic to get the current user's role
const getCurrentUserRole = (): string => {
  return 'administrator'
}

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Panel de control')
    .items([
      S.listItem()
        .title('Portal')
        .icon(ProjectsIcon)
        .child(
          S.list()
            .title('Portal')
            .items([
              orderableDocumentListDeskItem({
                type: 'group',
                title: 'Configurador',
                id: 'configurator',
                S,
                context,
                createIntent: true,
              }),
              S.listItem()
                .title('Toldos')
                .schemaType('familyAwning')
                .id('awnings')
                .child(S.documentTypeList('familyAwning').title('Familias')),
            ]),
        ),
      ...S.documentTypeListItems().filter((listItem) => {
        const id = listItem.getId()
        return (
          id &&
          ![
            'group',
            'familyAwning',
            'subfamilyAwning',
            'awning',
            'field',
            'fieldConfig',
            'fieldSubconfig',
          ].includes(id)
        )
      }),
      S.listItem().title('Web').icon(DesktopIcon),
    ])

export default defineConfig({
  name: 'default',
  title: 'Lonper',
  projectId: '2bbq4lus',
  dataset: 'production',
  plugins: [
    structureTool({structure}),
    ...(getCurrentUserRole() === 'administrator' ? [visionTool()] : []), // Conditionally include visionTool
  ],
  schema: {
    types: schemaTypes,
  },
  icon: Logo,
})
