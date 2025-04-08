import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Database, Search, Bot, PenToolIcon as Tool } from "lucide-react"

export const metadata: Metadata = {
  title: "GameVaultX Ecosystem",
  description: "Explore the GameVaultX ecosystem of tools and features",
}

export default function EcosystemPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">GameVaultX Ecosystem</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {/* GCatalog Card */}
        <Link href="/ecosystem/gcatalog" className="group">
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 h-full transition-all duration-300 hover:shadow-md hover:border-purple-500 dark:hover:border-purple-500">
            <div className="flex items-center mb-4">
              <Database className="h-8 w-8 text-purple-600 mr-3" />
              <h2 className="text-2xl font-bold">GCatalog</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Comprehensive game database with detailed metadata, tagging system, and community-driven mod
              recommendations.
            </p>
            <ul className="space-y-2 mb-6 text-sm">
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>Detailed game metadata and developer insights</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>Advanced tagging system for precise categorization</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>Custom user lists for organization</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>Community-driven mod recommendations</span>
              </li>
            </ul>
            <div className="flex items-center text-purple-600 font-medium group-hover:text-purple-700">
              Explore GCatalog
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </Link>

        {/* Vault Search Card */}
        <Link href="/ecosystem/vault-search" className="group">
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 h-full transition-all duration-300 hover:shadow-md hover:border-purple-500 dark:hover:border-purple-500">
            <div className="flex items-center mb-4">
              <Search className="h-8 w-8 text-purple-600 mr-3" />
              <h2 className="text-2xl font-bold">Vault Search</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              AI-powered game discovery engine with cross-platform tracking and specialized filters for niche
              categories.
            </p>
            <ul className="space-y-2 mb-6 text-sm">
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>AI-powered recommendations based on play history</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>Cross-platform game availability tracking</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>Niche category filters for specialized discovery</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>System compatibility matching</span>
              </li>
            </ul>
            <div className="flex items-center text-purple-600 font-medium group-hover:text-purple-700">
              Explore Vault Search
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </Link>

        {/* Vault AI Card */}
        <Link href="/ecosystem/vault-ai" className="group">
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 h-full transition-all duration-300 hover:shadow-md hover:border-purple-500 dark:hover:border-purple-500">
            <div className="flex items-center mb-4">
              <Bot className="h-8 w-8 text-purple-600 mr-3" />
              <h2 className="text-2xl font-bold">Vault AI</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Experimental AI sandbox for NPC behavior modeling, lore generation, and procedural content creation.
            </p>
            <ul className="space-y-2 mb-6 text-sm">
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>AI-driven NPC behavior models</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>Chatbot-powered lore generators</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>Procedural generation tools</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>AI response optimization</span>
              </li>
            </ul>
            <div className="flex items-center text-purple-600 font-medium group-hover:text-purple-700">
              Explore Vault AI
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </Link>

        {/* Vault Tools Card */}
        <Link href="/ecosystem/vault-tools" className="group">
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 h-full transition-all duration-300 hover:shadow-md hover:border-purple-500 dark:hover:border-purple-500">
            <div className="flex items-center mb-4">
              <Tool className="h-8 w-8 text-purple-600 mr-3" />
              <h2 className="text-2xl font-bold">Vault Tools</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Performance benchmarking, modding frameworks, and hardware optimization tools for gamers.
            </p>
            <ul className="space-y-2 mb-6 text-sm">
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>Performance benchmarking tools</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>Modding frameworks for game customization</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>Hardware efficiency calculator</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                <span>Game save editors and progression tools</span>
              </li>
            </ul>
            <div className="flex items-center text-purple-600 font-medium group-hover:text-purple-700">
              Explore Vault Tools
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
