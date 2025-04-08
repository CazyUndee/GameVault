import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 md:px-6 py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Link
              href="/"
              className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              ← Back to Home
            </Link>
          </div>

          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <p className="lead">
              Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>

            <h2>1. Introduction</h2>
            <p>
              Welcome to Vaultican. We respect your privacy and are committed to protecting your personal data. This
              privacy policy will inform you about how we look after your personal data when you visit our website and
              tell you about your privacy rights and how the law protects you.
            </p>

            <h2>2. The Data We Collect About You</h2>
            <p>
              Personal data, or personal information, means any information about an individual from which that person
              can be identified. We may collect, use, store and transfer different kinds of personal data about you
              which we have grouped together as follows:
            </p>
            <ul>
              <li>
                <strong>Identity Data</strong> includes first name, last name, username or similar identifier.
              </li>
              <li>
                <strong>Contact Data</strong> includes email address.
              </li>
              <li>
                <strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time
                zone setting and location, browser plug-in types and versions, operating system and platform, and other
                technology on the devices you use to access this website.
              </li>
              <li>
                <strong>Usage Data</strong> includes information about how you use our website, products and services.
              </li>
              <li>
                <strong>Profile Data</strong> includes your username and password, your interests, preferences, feedback
                and survey responses.
              </li>
            </ul>

            <h2>3. How We Use Your Personal Data</h2>
            <p>
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal
              data in the following circumstances:
            </p>
            <ul>
              <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
              <li>
                Where it is necessary for our legitimate interests (or those of a third party) and your interests and
                fundamental rights do not override those interests.
              </li>
              <li>Where we need to comply with a legal obligation.</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally
              lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your
              personal data to those employees, agents, contractors and other third parties who have a business need to
              know.
            </p>

            <h2>5. Data Retention</h2>
            <p>
              We will only retain your personal data for as long as reasonably necessary to fulfill the purposes we
              collected it for, including for the purposes of satisfying any legal, regulatory, tax, accounting or
              reporting requirements.
            </p>

            <h2>6. Your Legal Rights</h2>
            <p>
              Under certain circumstances, you have rights under data protection laws in relation to your personal data,
              including the right to:
            </p>
            <ul>
              <li>Request access to your personal data.</li>
              <li>Request correction of your personal data.</li>
              <li>Request erasure of your personal data.</li>
              <li>Object to processing of your personal data.</li>
              <li>Request restriction of processing your personal data.</li>
              <li>Request transfer of your personal data.</li>
              <li>Right to withdraw consent.</li>
            </ul>

            <h2>7. Contact Us</h2>
            <p>If you have any questions about this privacy policy or our privacy practices, please contact us at:</p>
            <p>
              Email: privacy@vaultican.com
              <br />
              Address: 123 Gaming Street, Digital City, 12345
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
