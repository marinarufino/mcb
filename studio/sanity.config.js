import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { structure } from './structure'

// O texto de abertura da página de Oficinas é um documento ÚNICO: não pode ser
// criado pelo botão "Criar novo" nem excluído/duplicado, para não voltar a
// existir mais de um (foi assim que duas oficinas foram parar no tipo errado).
const DOC_UNICO = 'paginaOficinas'
const ACOES_BLOQUEADAS = ['delete', 'duplicate', 'unpublish']

export default defineConfig({
  name: 'default',
  title: 'Memória do Cavaquinho — Conteúdo',

  projectId: 'h8odpb0f',
  dataset: 'production',

  plugins: [structureTool({ structure }), visionTool()],

  document: {
    actions: (prev, { schemaType }) =>
      schemaType === DOC_UNICO
        ? prev.filter(action => !ACOES_BLOQUEADAS.includes(action.action))
        : prev,
    newDocumentOptions: prev => prev.filter(template => template.templateId !== DOC_UNICO),
  },

  schema: {
    types: schemaTypes,
  },
})
