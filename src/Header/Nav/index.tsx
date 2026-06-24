'use client'

import { cn } from '@/utilities/ui'
import { ChevronDown, Menu, Search, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'
import { SearchModal } from '@/components/SearchModal'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

type NavItem = NonNullable<HeaderType['navItems']>[number]

function isActive(pathname: string, item: NavItem): boolean {
  if (item.type === 'link') {
    return item.url ? pathname === item.url || (item.url !== '/' && pathname.startsWith(item.url)) : false
  }
  return item.children?.some((c) => pathname.startsWith(c.url)) ?? false
}

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const pathname = usePathname()
  const navItems = data?.navItems || []
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
    setOpenDropdown(null)
  }, [pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      {/* ── Desktop nav ─────────────────────────────────── */}
      <div className="hidden lg:flex items-center gap-1">
        {navItems.map((item, i) => {
          const active = isActive(pathname, item)

          if (item.type === 'link') {
            return (
              <Link
                key={i}
                href={item.url || '/'}
                className={cn(
                  'px-3 py-2 text-sm font-bold uppercase tracking-wide transition-colors hover:text-brand-primary',
                  active ? 'text-brand-primary' : 'text-brand-secondary',
                )}
              >
                {item.label}
              </Link>
            )
          }

          // Dropdown
          return (
            <div key={i} className="group relative">
              <button
                className={cn(
                  'flex items-center gap-0.5 px-3 py-2 text-sm font-bold uppercase tracking-wide transition-colors hover:text-brand-primary',
                  active ? 'text-brand-primary' : 'text-brand-secondary',
                )}
                aria-haspopup="true"
              >
                {item.label}
                <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
              </button>

              {/* Dropdown panel */}
              {item.children && item.children.length > 0 && (
                <div className="absolute left-0 top-full z-50 hidden group-hover:block">
                  <div className="mt-1 min-w-[220px] rounded-card bg-white py-2 shadow-elevated border border-brand-border-light">
                    {item.children.map((child, j) => (
                      <Link
                        key={j}
                        href={child.url}
                        className={cn(
                          'block px-4 py-2 text-sm transition-colors hover:bg-brand-cream hover:text-brand-primary',
                          pathname === child.url || (child.url !== '/' && pathname.startsWith(child.url))
                            ? 'text-brand-primary font-semibold'
                            : 'text-brand-text-mid',
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}

        {/* Search */}
        <button
          onClick={() => setSearchOpen(true)}
          aria-label="Open search"
          className="ml-2 p-2 text-brand-secondary hover:text-brand-primary transition-colors"
        >
          <Search className="h-5 w-5" />
        </button>

        <LanguageSwitcher className="ml-1" />
      </div>

      {/* ── Mobile controls ──────────────────────────────── */}
      <div className="flex items-center gap-2 lg:hidden">
        <button
          onClick={() => setSearchOpen(true)}
          aria-label="Open search"
          className="p-2 text-brand-secondary"
        >
          <Search className="h-5 w-5" />
        </button>
        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          className="p-2 text-brand-secondary"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* ── Mobile slide-down menu ───────────────────────── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-[72px] overflow-y-auto lg:hidden">
          <nav className="px-4 py-6 flex flex-col gap-1">
            {navItems.map((item, i) => {
              const active = isActive(pathname, item)

              if (item.type === 'link') {
                return (
                  <Link
                    key={i}
                    href={item.url || '/'}
                    className={cn(
                      'block py-3 text-base font-bold uppercase tracking-wide border-b border-brand-border-light',
                      active ? 'text-brand-primary' : 'text-brand-secondary',
                    )}
                  >
                    {item.label}
                  </Link>
                )
              }

              // Mobile accordion dropdown
              const isOpen = openDropdown === String(i)
              return (
                <div key={i} className="border-b border-brand-border-light">
                  <button
                    onClick={() => setOpenDropdown(isOpen ? null : String(i))}
                    className={cn(
                      'flex w-full items-center justify-between py-3 text-base font-bold uppercase tracking-wide',
                      active ? 'text-brand-primary' : 'text-brand-secondary',
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 transition-transform duration-200',
                        isOpen && 'rotate-180',
                      )}
                    />
                  </button>
                  {isOpen && item.children && (
                    <div className="pb-2 pl-4 flex flex-col gap-1">
                      {item.children.map((child, j) => (
                        <Link
                          key={j}
                          href={child.url}
                          className={cn(
                            'block py-2 text-sm transition-colors',
                            pathname === child.url
                              ? 'text-brand-primary font-semibold'
                              : 'text-brand-text-mid',
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}

            <div className="mt-4 pt-4 border-t border-brand-border-light">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}

      {/* ── Search modal ─────────────────────────────────── */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
