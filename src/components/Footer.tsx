export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background py-6">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} DathirddNetwork. All rights reserved.</p>
        <div className="flex gap-4 mt-2 sm:mt-0">
          <a href="/privacy" className="hover:underline underline-offset-4">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:underline underline-offset-4">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  )
}
