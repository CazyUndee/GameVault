"use client"

import type React from "react"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitSuccess(false)
    setSubmitError("")

    try {
      // In a real app, this would be an API call to your backend
      // For demo purposes, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

      setSubmitSuccess(true)
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitError("An error occurred while submitting your message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

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
                  <p className="text-zinc-600 dark:text-zinc-400">contact@gamevaultx.com</p>
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
              {submitSuccess ? (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
                  <h3 className="text-xl font-medium text-green-800 dark:text-green-200 mb-2">Message Sent!</h3>
                  <p className="text-green-700 dark:text-green-300 mb-4">
                    Thank you for contacting us. We'll get back to you as soon as possible.
                  </p>
                  <Button
                    onClick={() => setSubmitSuccess(false)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  {submitError && (
                    <div className="p-3 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-md text-sm">
                      {submitError}
                    </div>
                  )}

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-transparent"
                      required
                      disabled={isSubmitting}
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
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message"
                      rows={5}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

