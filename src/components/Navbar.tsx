"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="w-full border-b border-border bg-background">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-lg font-bold">
          DathirddNetwork
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="hover:underline underline-offset-4">
            Home
          </Link>
          <Link href="/pricing" className="hover:underline underline-offset-4">
            Pricing
          </Link>
          <Link href="/dashboard" className="hover:underline underline-offset-4">
            Dashboard
          </Link>

          {/* Sign In CTA */}
          <Button asChild>
            <Link href="/auth/signin">Sign In</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border px-4 py-3 space-y-2">
          <Link
            href="/"
            className="block hover:underline underline-offset-4"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/pricing"
            className="block hover:underline underline-offset-4"
            onClick={() => setIsOpen(false)}
          >
            Pricing
          </Link>
          <Link
            href="/dashboard"
            className="block hover:underline underline-offset-4"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>

          {/* Mobile Sign In CTA */}
          <Button asChild className="w-full mt-2" onClick={() => setIsOpen(false)}>
            <Link href="/auth/signin">Sign In</Link>
          </Button>
        </div>
      )}
    </nav>
  )
}
