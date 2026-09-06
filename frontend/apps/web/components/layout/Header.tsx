'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState, type FormEvent } from 'react';
import {
  ShoppingCart, Search, User, Menu, X, Heart, ChevronDown, Store,
} from 'lucide-react';
import { useUIStore } from '@/store/ui';
import { useAuthStore } from '@/store/auth';
import { APP_NAME, ROUTES } from '@zavora/config';
import { useCart, useCategories } from '@/hooks/useQueries';

export function Header() {
  const router = useRouter();
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu, openCart } = useUIStore();
  const { user } = useAuthStore();
  const { data: cart } = useCart();
  const { data: categories } = useCategories();
  const [searchQuery, setSearchQuery] = useState('');
  const [catMenuOpen, setCatMenuOpen] = useState(false);
  const catRef = useRef<HTMLDivElement>(null);

  const itemCount = cart?.itemCount ?? 0;

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`${ROUTES.search}?q=${encodeURIComponent(searchQuery.trim())}`);
      closeMobileMenu();
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top bar */}
      <div className="bg-orange-500 px-4 py-1 text-center text-xs text-white hidden sm:block">
        Free delivery on orders over ₦50,000 &nbsp;·&nbsp;
        <Link href={ROUTES.sellerRegister} className="underline font-medium">Become a Seller</Link>
      </div>

      {/* Main header */}
      <div className="border-b border-slate-200">
        <div className="container-page flex h-16 items-center gap-4">
          {/* Logo */}
          <Link
            href={ROUTES.home}
            onClick={closeMobileMenu}
            className="shrink-0 text-xl font-extrabold text-orange-500 tracking-tight"
          >
            {APP_NAME}
          </Link>

          {/* Search — desktop */}
          <form onSubmit={handleSearch} className="hidden flex-1 md:flex">
            <div className="flex w-full max-w-2xl overflow-hidden rounded-lg border border-slate-300 focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products, brands and more..."
                className="flex-1 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="bg-orange-500 px-4 text-white hover:bg-orange-600 transition-colors"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>

          {/* Desktop actions */}
          <div className="ml-auto flex items-center gap-1">
            {/* Seller link — desktop */}
            <Link
              href={ROUTES.sellerRegister}
              className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 lg:flex"
            >
              <Store className="h-4 w-4" />
              Sell
            </Link>

            {/* Wishlist */}
            <Link
              href={ROUTES.wishlist}
              className="hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100 sm:block"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
            </Link>

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative rounded-lg p-2 text-slate-600 hover:bg-slate-100"
              aria-label="Open cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </button>

            {/* Mobile: hamburger — right side */}
            <button
              onClick={toggleMobileMenu}
              className="rounded-lg p-2 hover:bg-slate-100 md:hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {/* Account */}
            {user ? (
              <Link
                href={ROUTES.profile}
                className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 sm:flex"
              >
                <User className="h-4 w-4" />
                Account
              </Link>
            ) : (
              <div className="hidden items-center gap-1 sm:flex">
                <Link
                  href={ROUTES.login}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  Sign In
                </Link>
                <Link
                  href={ROUTES.register}
                  className="rounded-lg bg-orange-500 px-3 py-2 text-sm font-medium text-white hover:bg-orange-600"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Category nav — desktop */}
      <div className="hidden border-b border-slate-100 bg-white md:block">
        <div className="container-page flex items-center gap-1 py-1">
          {/* All categories dropdown */}
          <div ref={catRef} className="relative">
            <button
              onMouseEnter={() => setCatMenuOpen(true)}
              onMouseLeave={() => setCatMenuOpen(false)}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              <Menu className="h-4 w-4" />
              All Categories
              <ChevronDown className="h-3 w-3" />
            </button>
            {catMenuOpen && (
              <div
                onMouseEnter={() => setCatMenuOpen(true)}
                onMouseLeave={() => setCatMenuOpen(false)}
                className="absolute left-0 top-full z-50 w-56 rounded-xl border border-slate-200 bg-white py-2 shadow-lg"
              >
                {[
                  { label: 'Health & Beauty', href: ROUTES.healthBeauty },
                  { label: 'Fashion', href: ROUTES.fashion },
                  { label: 'Phones & Tablets', href: ROUTES.phonesTablets },
                  { label: 'Electronics', href: ROUTES.electronics },
                  { label: 'Home Appliances', href: ROUTES.homeAppliances },
                  { label: 'Computing', href: ROUTES.computing },
                  { label: 'Baby Products', href: ROUTES.babyProducts },
                ].map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-600"
                    onClick={() => setCatMenuOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
                <div className="mx-4 my-1 border-t border-slate-100" />
                <Link
                  href="/categories"
                  className="block px-4 py-2 text-sm font-medium text-orange-500 hover:bg-orange-50"
                  onClick={() => setCatMenuOpen(false)}
                >
                  View All Categories →
                </Link>
              </div>
            )}
          </div>

          {/* Quick category links */}
          {[
            { label: 'Health & Beauty', href: ROUTES.healthBeauty },
            { label: 'Fashion', href: ROUTES.fashion },
            { label: 'Phones & Tablets', href: ROUTES.phonesTablets },
            { label: 'Electronics', href: ROUTES.electronics },
            { label: 'Home Appliances', href: ROUTES.homeAppliances },
            { label: 'Computing', href: ROUTES.computing },
            { label: 'Baby Products', href: ROUTES.babyProducts },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-orange-500 whitespace-nowrap"
            >
              {label}
            </Link>
          ))}


        </div>
      </div>

      {/* Mobile search bar */}
      <div className="border-b border-slate-100 bg-white px-4 py-2 md:hidden">
        <form onSubmit={handleSearch} className="flex overflow-hidden rounded-lg border border-slate-300 focus-within:border-orange-500">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products, brands and more..."
            className="flex-1 bg-white px-3 py-2 text-sm outline-none placeholder:text-slate-400"
          />
          <button type="submit" className="bg-orange-500 px-3 text-white" aria-label="Search">
            <Search className="h-4 w-4" />
          </button>
        </form>
      </div>

      {/* Mobile menu — right side drawer */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={closeMobileMenu}
          />
          {/* Drawer */}
          <nav className="fixed right-0 top-0 z-50 h-full w-72 overflow-y-auto bg-white shadow-2xl md:hidden">
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">
              <span className="text-base font-extrabold text-orange-500">{APP_NAME}</span>
              <button onClick={closeMobileMenu} className="rounded-lg p-1.5 hover:bg-slate-100">
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="flex flex-col gap-0.5 p-3">
              {[
                { href: ROUTES.home, label: 'Home' },
                { href: '/categories', label: 'All Categories' },
                { href: ROUTES.healthBeauty, label: 'Health & Beauty' },
                { href: ROUTES.fashion, label: 'Fashion' },
                { href: ROUTES.phonesTablets, label: 'Phones & Tablets' },
                { href: ROUTES.electronics, label: 'Electronics' },
                { href: ROUTES.homeAppliances, label: 'Home Appliances' },
                { href: ROUTES.computing, label: 'Computing' },
                { href: ROUTES.babyProducts, label: 'Baby Products' },
                { href: ROUTES.orders, label: 'My Orders' },
                { href: ROUTES.wishlist, label: 'Wishlist' },
                { href: ROUTES.sellerRegister, label: 'Become a Seller' },
                ...(!user ? [{ href: ROUTES.login, label: 'Sign In' }, { href: ROUTES.register, label: 'Register' }] : [{ href: ROUTES.profile, label: 'My Account' }]),
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={closeMobileMenu}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-orange-50 hover:text-orange-500"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </header>
  );
}
