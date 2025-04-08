import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"

export default function TermsOfService() {
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

          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <p className="lead">
              Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>

            <h2>1. Introduction</h2>
            <p>
              Welcome to Vaultican. These terms and conditions outline the rules and regulations for the use of our
              website.
            </p>
            <p>
              By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use
              Vaultican if you do not accept all of the terms and conditions stated on this page.
            </p>

            <h2>2. License</h2>
            <p>
              Unless otherwise stated, Vaultican and/or its licensors own the intellectual property rights for all
              material on Vaultican. All intellectual property rights are reserved. You may view and/or print pages from
              vaultican.com for your own personal use subject to restrictions set in these terms and conditions.
            </p>
            <p>You must not:</p>
            <ul>
              <li>Republish material from vaultican.com</li>
              <li>Sell, rent or sub-license material from vaultican.com</li>
              <li>Reproduce, duplicate or copy material from vaultican.com</li>
              <li>Redistribute content from Vaultican (unless content is specifically made for redistribution)</li>
            </ul>

            <h2>3. User Content</h2>
            <p>
              In these terms and conditions, "User Content" shall mean any audio, video, text, images or other material
              you choose to display on this website. By displaying your User Content, you grant Vaultican a
              non-exclusive, worldwide, irrevocable, royalty-free, sublicensable license to use, reproduce, adapt,
              publish, translate and distribute it in any and all media.
            </p>
            <p>
              Your User Content must be your own and must not be infringing on any third party's rights. Vaultican
              reserves the right to remove any of your content from this website at any time without notice.
            </p>

            <h2>4. No Warranties</h2>
            <p>
              This website is provided "as is," with all faults, and Vaultican makes no express or implied
              representations or warranties, of any kind related to this website or the materials contained on this
              website.
            </p>

            <h2>5. Limitation of Liability</h2>
            <p>
              In no event shall Vaultican, nor any of its officers, directors and employees, be liable to you for
              anything arising out of or in any way connected with your use of this website, whether such liability is
              under contract, tort or otherwise.
            </p>

            <h2>6. Indemnification</h2>
            <p>
              You hereby indemnify to the fullest extent Vaultican from and against any and all liabilities, costs,
              demands, causes of action, damages and expenses (including reasonable attorney's fees) arising out of or
              in any way related to your breach of any of the provisions of these terms.
            </p>

            <h2>7. Severability</h2>
            <p>
              If any provision of these terms is found to be unenforceable or invalid under any applicable law, such
              unenforceability or invalidity shall not render these terms unenforceable or invalid as a whole, and such
              provisions shall be deleted without affecting the remaining provisions herein.
            </p>

            <h2>8. Variation of Terms</h2>
            <p>
              Vaultican is permitted to revise these terms at any time as it sees fit, and by using this website you are
              expected to review such terms on a regular basis to ensure you understand all terms and conditions
              governing use of this website.
            </p>

            <h2>9. Governing Law & Jurisdiction</h2>
            <p>
              These terms will be governed by and construed in accordance with the laws of the jurisdiction in which
              Vaultican operates, and you submit to the non-exclusive jurisdiction of the courts located in that
              jurisdiction for the resolution of any disputes.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
