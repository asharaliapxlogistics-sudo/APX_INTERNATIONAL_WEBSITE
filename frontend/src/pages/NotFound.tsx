import { Link } from 'react-router-dom'
import { PackageX } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink-900 px-4 text-center text-white">
      <div className="grid-bg absolute inset-0" />
      <div className="relative">
        <PackageX className="mx-auto h-16 w-16 text-accent-500 animate-float" />
        <h1 className="mt-6 text-7xl font-extrabold">404</h1>
        <p className="mt-3 text-slate-300">Looks like this page got lost in transit.</p>
        <Link to="/" className="mt-8 inline-block rounded-full bg-accent-500 px-7 py-3.5 font-bold hover:bg-accent-600">
          Back to home
        </Link>
      </div>
    </section>
  )
}
