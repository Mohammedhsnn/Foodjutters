'use client'

import {
  Button,
  Card,
  createTheme,
  NavLink,
  PasswordInput,
  Select,
  Table,
  TextInput,
} from '@mantine/core'
import { IconEye, IconEyeOff } from '@tabler/icons-react'
import { TABLER_STROKE } from '@/lib/admin/tabler'

const cardShadow = '0 4px 18px rgb(27 67 100 / 6%)'

/** FoodJutters brand — aligned with site CSS variables */
export const adminTheme = createTheme({
  primaryColor: 'brand',
  primaryShade: { light: 5, dark: 4 },
  fontFamily: 'var(--font-lato), Lato, sans-serif',
  headings: {
    fontFamily: 'var(--font-gestard), sans-serif',
    fontWeight: '400',
    textTransform: 'uppercase',
    sizes: {
      h1: { fontSize: 'clamp(1.5rem, 4vw, 1.85rem)', lineHeight: '1.1' },
      h2: { fontSize: 'clamp(1.2rem, 3vw, 1.45rem)', lineHeight: '1.15' },
      h3: { fontSize: '1.05rem', lineHeight: '1.25' },
      h4: { fontSize: '0.95rem', lineHeight: '1.3' },
    },
  },
  defaultRadius: 'md',
  spacing: { md: '16px', lg: '24px', xl: '32px' },
  shadows: {
    sm: cardShadow,
    md: '0 8px 28px rgb(27 67 100 / 9%)',
  },
  colors: {
    brand: [
      '#e8f4fb',
      '#d8f0fc',
      '#c5e3f3',
      '#89cff0',
      '#5ebde8',
      '#29abe2',
      '#1e8fc4',
      '#1b4364',
      '#153550',
      '#0f283d',
    ],
    navy: [
      '#e8f0f6',
      '#c5d4e3',
      '#9bb3cc',
      '#6d8fb0',
      '#4a6d8a',
      '#1b4364',
      '#173a56',
      '#123048',
      '#0d263a',
      '#081c2c',
    ],
  },
  other: {
    bodyBg: '#f4fafd',
    sidebarBg: '#d8f0fc',
    borderSoft: '#c5e3f3',
  },
  components: {
    NavLink: NavLink.extend({
      defaultProps: {
        chevron: null,
        className: 'admin-nav-link',
      },
    }),
    Card: Card.extend({
      defaultProps: {
        radius: 'lg',
        withBorder: true,
        shadow: 'sm',
      },
    }),
    Button: Button.extend({
      defaultProps: {
        radius: 'xl',
      },
    }),
    TextInput: TextInput.extend({
      defaultProps: {
        radius: 'md',
      },
    }),
    Table: Table.extend({
      defaultProps: {
        highlightOnHover: true,
        striped: true,
        verticalSpacing: 'sm',
      },
    }),
    PasswordInput: PasswordInput.extend({
      defaultProps: {
        visibilityToggleIcon: ({ reveal }) =>
          reveal ? (
            <IconEyeOff size={16} stroke={TABLER_STROKE} />
          ) : (
            <IconEye size={16} stroke={TABLER_STROKE} />
          ),
        radius: 'md',
      },
    }),
    Select: Select.extend({
      defaultProps: {
        radius: 'md',
      },
    }),
  },
})
