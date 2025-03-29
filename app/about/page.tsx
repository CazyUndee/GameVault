import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 md:px-6 py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="mb-8">About GameVault</h1>

          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <p>
              GameVault is a minimalist game catalog designed to help you discover and explore games across all
              platforms and genres. Our mission is to provide a clean, distraction-free browsing experience that focuses
              on what matters most: the games themselves.
            </p>

            <h2>Our Approach</h2>
            <p>
              In a world of flashy, overwhelming game stores and catalogs, GameVault takes a different approach. We
              believe in:
            </p>

            <ul>
              <li>
                <strong>Simplicity</strong> - A clean interface that puts games front and center
              </li>
              <li>
                <strong>Curation</strong> - Thoughtfully selected games rather than an endless catalog
              </li>
              <li>
                <strong>Information</strong> - Concise, useful details about each game without the noise
              </li>
              <li>
                <strong>Accessibility</strong> - A responsive design that works well on any device
              </li>
            </ul>

            <h2>How We Select Games</h2>
            <p>Our catalog includes games that meet our quality standards across various criteria:</p>

            <ul>
              <li>Gameplay innovation and execution</li>
              <li>Artistic and technical achievement</li>
              <li>Narrative and world-building</li>
              <li>Cultural and historical significance</li>
            </ul>

            <p>We regularly update our catalog with new releases and rediscovered classics that deserve attention.</p>

            <h2>Get Involved</h2>
            <p>
              Have suggestions for games we should include? Found an error in our information? We welcome your feedback
              and contributions. Please reach out through our contact page.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

