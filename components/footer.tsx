export default function Footer() {
  return (
    <footer className="py-8 px-4 md:px-6 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          © {new Date().getFullYear()} GameVault. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

