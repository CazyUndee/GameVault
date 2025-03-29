import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 md:px-6 py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="mb-8">Contact Us</h1>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="mb-6">
                Have questions, suggestions, or feedback about our game catalog? We'd love to hear from you!
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-1">Email</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">contact@gamevault.com</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-1">Suggest a Game</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Know a great game that should be in our catalog? Let us know through the form.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-1">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                    >
                      Twitter
                    </a>
                    <a
                      href="https://discord.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                    >
                      Discord
                    </a>
                    <a
                      href="https://reddit.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                    >
                      Reddit
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Name
                  </label>
                  <Input id="name" name="name" placeholder="Your name" required />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <Input id="email" name="email" type="email" placeholder="your.email@example.com" required />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-transparent"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="suggestion">Game Suggestion</option>
                    <option value="correction">Information Correction</option>
                    <option value="feedback">General Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <Textarea id="message" name="message" placeholder="Your message" rows={5} required />
                </div>

                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

