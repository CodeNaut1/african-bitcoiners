import type { CollectionConfig } from 'payload'

export const EXPORT_LIST_MENU_ITEM = '@/components/admin/ExportButton#default'

/** Adds the Export button to a collection's list view menu (Payload built-in list UI). */
export function withListExport<T extends CollectionConfig>(config: T): T {
  const existing = config.admin?.components?.listMenuItems ?? []

  return {
    ...config,
    admin: {
      ...config.admin,
      components: {
        ...config.admin?.components,
        listMenuItems: [...existing, EXPORT_LIST_MENU_ITEM],
      },
    },
  }
}

/** Default list columns for date filtering via Payload's Filters panel. */
export const withCreatedAtColumns = (
  columns: string[],
): string[] => {
  const next = [...columns]
  if (!next.includes('createdAt')) next.push('createdAt')
  if (!next.includes('updatedAt')) next.push('updatedAt')
  return next
}
