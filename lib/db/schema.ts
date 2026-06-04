import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core'
import type { ContentMeta } from '@/lib/admin/types'

export const siteSettings = pgTable('site_settings', {
  key: text('key').primaryKey(),
  value: text('value').notNull(),
})

export const contentPages = pgTable('content_pages', {
  slug: text('slug').primaryKey(),
  name: text('name').notNull(),
  path: text('path').notNull(),
  heroEyebrow: text('hero_eyebrow').notNull(),
  heroTitle: text('hero_title').notNull(),
  heroSubtitle: text('hero_subtitle').notNull(),
  heroMeta: jsonb('hero_meta').$type<ContentMeta[]>().notNull().default([]),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

export const contentBlocks = pgTable('content_blocks', {
  id: text('id').primaryKey(),
  pageSlug: text('page_slug')
    .notNull()
    .references(() => contentPages.slug, { onDelete: 'cascade' }),
  key: text('key').notNull(),
  label: text('label').notNull(),
  type: text('type').notNull(),
  value: text('value').notNull().default(''),
})

export const menuSections = pgTable('menu_sections', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  subtitle: text('subtitle').notNull().default(''),
  sortOrder: integer('sort_order').notNull().default(0),
})

export const menuItems = pgTable('menu_items', {
  id: text('id').primaryKey(),
  sectionId: text('section_id')
    .notNull()
    .references(() => menuSections.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description').notNull().default(''),
  price: text('price').notNull(),
  available: boolean('available').notNull().default(true),
  sortOrder: integer('sort_order').notNull().default(0),
})

export const reservations = pgTable('reservations', {
  id: text('id').primaryKey(),
  date: text('date').notNull(),
  time: text('time').notNull(),
  guests: text('guests').notNull(),
  name: text('name').notNull(),
  email: text('email').notNull().default(''),
  phone: text('phone').notNull().default(''),
  notes: text('notes').notNull().default(''),
  status: text('status').notNull().default('pending'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})
