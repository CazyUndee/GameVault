"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import {
  Cpu,
  Bot,
  BookOpen,
  Map,
  Zap,
  Code,
  Sparkles,
  Brain,
  MessageSquare,
  RefreshCw,
  Save,
  Download,
  Lock,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function VaultAI() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<string>("npc")
  const [npcPrompt, setNpcPrompt] = useState("")
  const [npcResponse, setNpcResponse] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [lorePrompt, setLorePrompt] = useState("")
  const [loreResponse, setLoreResponse] = useState("")
  const [generatedMap, setGeneratedMap] = useState<string | null>(null)
  const [mapSettings, setMapSettings] = useState({
    size: "medium",
    biome: "forest",
    complexity: "medium",
    landmarks: 3,
  })

  // Sample NPC behaviors
  const npcBehaviors = [
    { name: "Shopkeeper", description: "Friendly merchant who sells various items" },
    { name: "Guard", description: "Vigilant protector who watches for threats" },
    { name: "Villager", description: "Local resident with knowledge of the area" },
    { name: "Quest Giver", description: "Character who provides missions and tasks" },
    { name: "Companion", description: "Ally who joins the player on adventures" },
    { name: "Enemy", description: "Hostile character who attacks the player" },
  ]

  // Sample lore templates
  const loreTemplates = [
    "Create a backstory for a forgotten kingdom",
    "Generate the history of a magical artifact",
    "Describe the origins of a mysterious cult",
    "Develop the mythology of an ancient civilization",
    "Create the biography of a legendary hero",
    "Design the ecology of a fantasy creature",
  ]

  // Handle NPC behavior generation
  const generateNPCBehavior = () => {
    if (!npcPrompt.trim()) return

    setIsGenerating(true)
    setNpcResponse("")

    // Simulate AI generation with a delay
    setTimeout(() => {
      // In a real app, this would call an AI model API
      const responses = [
        `# NPC Behavior Model: ${npcPrompt}\n\n## Personality Traits\n- Cautious but curious\n- Values knowledge and information\n- Slightly distrustful of strangers\n- Loyal to allies\n\n## Decision Making\n- Prioritizes self-preservation\n- Weighs risks against potential rewards\n- Considers long-term consequences\n- Adapts strategy based on player actions\n\n## Dialogue Patterns\n- Speaks in short, direct sentences\n- Occasionally uses technical jargon\n- Asks clarifying questions\n- Reveals information gradually\n\n## Combat Behavior\n- Prefers ranged attacks\n- Uses environment for tactical advantage\n- Retreats when health drops below 30%\n- Calls for allies when threatened`,

        `# NPC Behavior Model: ${npcPrompt}\n\n## Core Motivations\n- Seeking redemption for past actions\n- Protecting a hidden secret\n- Gathering resources for survival\n- Uncovering ancient knowledge\n\n## Interaction Patterns\n- Initially suspicious of player\n- Warms up after specific triggers\n- Offers limited assistance\n- May betray player under certain conditions\n\n## Environmental Responses\n- Seeks shelter during storms\n- Avoids dangerous territories\n- Collects useful items when idle\n- Marks territory with distinctive signs\n\n## Learning Mechanisms\n- Remembers player actions across encounters\n- Adapts strategies after defeats\n- Learns player weaknesses\n- Develops new skills over time`,

        `# NPC Behavior Model: ${npcPrompt}\n\n## Social Dynamics\n- Forms alliances with similar NPCs\n- Competes for resources with rivals\n- Establishes hierarchies in groups\n- Shares information with allies\n\n## Emotional Responses\n- Displays anger when threatened\n- Shows gratitude for assistance\n- Expresses fear near powerful enemies\n- Demonstrates curiosity toward novelty\n\n## Daily Routines\n- Follows specific patrol patterns\n- Rests during night hours\n- Performs maintenance activities\n- Engages in social interactions\n\n## Special Abilities\n- Can detect player from increased distance\n- Remembers and avoids previous ambush locations\n- Adapts equipment based on environment\n- Learns from observing other NPCs`,
      ]

      setNpcResponse(responses[Math.floor(Math.random() * responses.length)])
      setIsGenerating(false)
    }, 2000)
  }

  // Handle lore generation
  const generateLore = () => {
    if (!lorePrompt.trim()) return

    setIsGenerating(true)
    setLoreResponse("")

    // Simulate AI generation with a delay
    setTimeout(() => {
      // In a real app, this would call an AI model API
      const responses = [
        `# ${lorePrompt}\n\n## Origins\nIn the twilight era of the Fourth Age, when the stars aligned in the Celestial Concordance, the kingdom of Azurith rose from the mist-shrouded valleys of the northern realms. Founded by the exiled prince Thalion after his legendary journey across the Shattered Sea, Azurith began as a haven for scholars and artisans fleeing the tyranny of the Iron Emperors.\n\n## Golden Age\nFor three centuries, Azurith flourished under the guidance of the Crystal Council, seven sages who channeled the arcane energies flowing from the nearby Aetherium Mountains. Their mastery of crystalline magic allowed them to create architectural wonders that defied conventional understanding - floating spires, bridges of light, and gardens where time flowed differently.\n\n## The Calamity\nThe kingdom's downfall came suddenly during the reign of Queen Elara the Brilliant. Ancient texts speak of a night when the stars vanished, and a shadow emerged from the depths of the royal observatory. The entity, known only as the Void Weaver in fragmented records, corrupted the Crystal Council and turned their powers against the kingdom.\n\n## Legacy\nToday, only ruins remain of Azurith's grandeur, scattered across the misty valleys like broken dreams. Adventurers occasionally discover artifacts of crystalline magic - singing shards that whisper forgotten melodies, timekeeping devices that operate on principles unknown to modern scholars, and mirrors that sometimes reflect places that no longer exist.\n\nThose who spend too long among the ruins report dreams of spires reaching into starless skies and the echoing laughter of the Crystal Council, forever trapped between reality and void.`,

        `# ${lorePrompt}\n\n## Discovery\nThe Orb of Eternity was unearthed during the Great Excavation of Durnhollow, when miners broke through into a previously unknown chamber beneath the ancient city. Unlike the other treasures found in the sealed vault, the Orb appeared to be made of no recognizable material - neither metal nor stone, neither liquid nor solid, but something that shifted between states as observers watched.\n\n## Properties\nScholars from the Arcanum Collegium identified seven distinct properties of the Orb:\n\n1. It maintains a constant temperature regardless of environment\n2. It produces a faint humming sound that changes pitch in the presence of magic\n3. It occasionally displays moving images on its surface, showing places and events unknown to viewers\n4. It cannot be damaged by conventional means\n5. It seems to influence the flow of time in its immediate vicinity\n6. Plants and animals in its presence exhibit accelerated growth and heightened intelligence\n7. Those who touch it directly report vivid dreams of possible futures\n\n## Historical Significance\nThe Orb has changed hands numerous times throughout history, often coinciding with major historical events. The rise and fall of the Seven Kingdoms, the Mage Wars, and the Convergence of Realms all featured the Orb in some capacity. Many rulers sought to harness its power, but few truly understood its purpose.\n\n## Current Status\nThe Orb's current whereabouts are unknown following the Cataclysm of Westmarch. Rumors suggest it was taken by the last surviving member of the Order of the Eternal Eye, a secretive group that had studied the artifact for centuries. Some believe they seek to use it to reverse the Cataclysm, while others fear they may inadvertently trigger an even greater disaster.`,

        `# ${lorePrompt}\n\n## Formation\nThe Crimson Covenant began not as a cult, but as a scholarly circle in the prestigious University of Aldercrest. Founded by Professor Marius Thorne in the year 1247 of the Imperial Calendar, the group initially focused on researching ancient healing practices and blood magic that had been forbidden following the Plague of Whispers.\n\n## Transformation\nThe transformation into a cult occurred after Thorne's expedition to the Abyssal Ruins, where he discovered the Crimson Codex - a text allegedly written in blood by the forgotten god Haemoth. Upon his return, Thorne's research became increasingly secretive and radical. The circle began conducting rituals in the university's abandoned catacombs, believing that blood sacrifices could unlock supernatural healing abilities and eventually, immortality.\n\n## Beliefs and Practices\nMembers of the Crimson Covenant adhere to several core beliefs:\n\n- Blood contains the essence of life and memory\n- Through blood rituals, one can access the collective knowledge of ancestors\n- Haemoth is not a malevolent deity, but a misunderstood healer who was banished by jealous gods\n- Immortality can be achieved through the "Great Transfusion" - a ritual requiring the willing sacrifice of seven individuals with "star-blessed blood"\n\nInitiates progress through seven ranks, each marked by a ritual scar and requiring increasingly disturbing demonstrations of loyalty.\n\n## Current Activities\nThough officially disbanded after the University Purge of 1253, the Covenant continues to operate in shadows. Their agents infiltrate medical institutions and blood banks, searching for individuals with rare blood types that might fulfill the prophecy of the Great Transfusion. Recent disappearances in coastal towns have been linked to their activities, as they believe the time of Haemoth's return is approaching with the coming Red Moon.`,
      ]

      setLoreResponse(responses[Math.floor(Math.random() * responses.length)])
      setIsGenerating(false)
    }, 2000)
  }

  // Handle map generation
  const generateMap = () => {
    setIsGenerating(true)
    setGeneratedMap(null)

    // Simulate AI generation with a delay
    setTimeout(() => {
      // In a real app, this would call an AI model API to generate a map
      // For demo purposes, we'll just set a placeholder image
      setGeneratedMap("/placeholder.svg?height=400&width=600")
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 md:px-6 py-12 md:py-20">
        <div className="content-container-wide mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="mb-2">Vault AI</h1>
              <p className="text-zinc-600 dark:text-zinc-400">
                Experimental AI sandbox for game-related AI models, storytelling, and procedural generation
              </p>
            </div>
            <Link href="/ecosystem" className="text-sm font-medium">
              ← Back to Ecosystem
            </Link>
          </div>

          <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                <Cpu className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold">AI Sandbox Environment</h2>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              Experiment with cutting-edge AI models designed specifically for game development. Our AI sandbox provides
              tools for creating intelligent NPCs, generating rich game lore, and building procedural environments that
              enhance player experiences.
            </p>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-full text-xs">
                <Brain className="w-3 h-3" />
                <span>Neural Networks</span>
              </div>
              <div className="flex items-center gap-1 px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 rounded-full text-xs">
                <Sparkles className="w-3 h-3" />
                <span>Generative AI</span>
              </div>
              <div className="flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-full text-xs">
                <Code className="w-3 h-3" />
                <span>Procedural Generation</span>
              </div>
              <div className="flex items-center gap-1 px-3 py-1 bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 rounded-full text-xs">
                <MessageSquare className="w-3 h-3" />
                <span>Natural Language Processing</span>
              </div>
            </div>
          </div>

          <Tabs defaultValue="npc" onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="npc">NPC Behavior Models</TabsTrigger>
              <TabsTrigger value="lore">Lore Generator</TabsTrigger>
              <TabsTrigger value="procedural">Procedural Generation</TabsTrigger>
            </TabsList>

            {/* NPC Behavior Models Tab */}
            <TabsContent value="npc">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4 mb-6">
                    <h3 className="text-lg font-medium mb-3">NPC Behavior Templates</h3>
                    <div className="space-y-2">
                      {npcBehaviors.map((behavior, index) => (
                        <button
                          key={index}
                          className="w-full text-left p-3 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                          onClick={() =>
                            setNpcPrompt(`Create a behavior model for a ${behavior.name.toLowerCase()} NPC`)
                          }
                        >
                          <div className="font-medium">{behavior.name}</div>
                          <div className="text-sm text-zinc-500 dark:text-zinc-400">{behavior.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
                    <h3 className="text-lg font-medium mb-3">About NPC Behavior Models</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                      Our AI can generate complex behavior patterns for non-player characters in games. These models
                      define:
                    </p>
                    <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                      <li className="flex items-start gap-2">
                        <Bot className="w-4 h-4 mt-0.5 text-blue-500" />
                        <span>Personality traits and decision-making processes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <MessageSquare className="w-4 h-4 mt-0.5 text-blue-500" />
                        <span>Dialogue patterns and conversation styles</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Zap className="w-4 h-4 mt-0.5 text-blue-500" />
                        <span>Combat behaviors and tactical approaches</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <RefreshCw className="w-4 h-4 mt-0.5 text-blue-500" />
                        <span>Learning mechanisms and adaptation</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4 mb-4">
                    <h3 className="text-lg font-medium mb-3">Generate NPC Behavior</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Prompt</label>
                        <Textarea
                          value={npcPrompt}
                          onChange={(e) => setNpcPrompt(e.target.value)}
                          placeholder="Describe the NPC type and behavior you want to generate..."
                          rows={4}
                        />
                      </div>
                      <Button
                        onClick={generateNPCBehavior}
                        disabled={isGenerating || !npcPrompt.trim()}
                        className="w-full"
                      >
                        {isGenerating ? "Generating..." : "Generate NPC Behavior"}
                      </Button>
                    </div>
                  </div>

                  {npcResponse && (
                    <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-medium">Generated NPC Behavior</h3>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Save className="w-4 h-4 mr-1" />
                            Save
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-1" />
                            Export
                          </Button>
                        </div>
                      </div>
                      <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 whitespace-pre-wrap font-mono text-sm">
                        {npcResponse}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Lore Generator Tab */}
            <TabsContent value="lore">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4 mb-6">
                    <h3 className="text-lg font-medium mb-3">Lore Templates</h3>
                    <div className="space-y-2">
                      {loreTemplates.map((template, index) => (
                        <button
                          key={index}
                          className="w-full text-left p-3 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                          onClick={() => setLorePrompt(template)}
                        >
                          <div className="text-sm">{template}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
                    <h3 className="text-lg font-medium mb-3">About Lore Generation</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                      Our AI can create rich, detailed lore for your game worlds, including:
                    </p>
                    <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                      <li className="flex items-start gap-2">
                        <BookOpen className="w-4 h-4 mt-0.5 text-purple-500" />
                        <span>Historical backgrounds and timelines</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <BookOpen className="w-4 h-4 mt-0.5 text-purple-500" />
                        <span>Character backstories and motivations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <BookOpen className="w-4 h-4 mt-0.5 text-purple-500" />
                        <span>Mythologies and religious systems</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <BookOpen className="w-4 h-4 mt-0.5 text-purple-500" />
                        <span>Cultural practices and societal structures</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4 mb-4">
                    <h3 className="text-lg font-medium mb-3">Generate Game Lore</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Prompt</label>
                        <Textarea
                          value={lorePrompt}
                          onChange={(e) => setLorePrompt(e.target.value)}
                          placeholder="Describe the type of lore you want to generate..."
                          rows={4}
                        />
                      </div>
                      <Button onClick={generateLore} disabled={isGenerating || !lorePrompt.trim()} className="w-full">
                        {isGenerating ? "Generating..." : "Generate Lore"}
                      </Button>
                    </div>
                  </div>

                  {loreResponse && (
                    <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-medium">Generated Lore</h3>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Save className="w-4 h-4 mr-1" />
                            Save
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-1" />
                            Export
                          </Button>
                        </div>
                      </div>
                      <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 whitespace-pre-wrap font-mono text-sm">
                        {loreResponse}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Procedural Generation Tab */}
            <TabsContent value="procedural">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4 mb-6">
                    <h3 className="text-lg font-medium mb-3">Map Generation Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Map Size</label>
                        <select
                          value={mapSettings.size}
                          onChange={(e) => setMapSettings({ ...mapSettings, size: e.target.value })}
                          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-transparent"
                        >
                          <option value="small">Small</option>
                          <option value="medium">Medium</option>
                          <option value="large">Large</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Biome Type</label>
                        <select
                          value={mapSettings.biome}
                          onChange={(e) => setMapSettings({ ...mapSettings, biome: e.target.value })}
                          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-transparent"
                        >
                          <option value="forest">Forest</option>
                          <option value="desert">Desert</option>
                          <option value="mountains">Mountains</option>
                          <option value="coastal">Coastal</option>
                          <option value="tundra">Tundra</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Complexity</label>
                        <select
                          value={mapSettings.complexity}
                          onChange={(e) => setMapSettings({ ...mapSettings, complexity: e.target.value })}
                          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-transparent"
                        >
                          <option value="simple">Simple</option>
                          <option value="medium">Medium</option>
                          <option value="complex">Complex</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Number of Landmarks</label>
                        <input
                          type="range"
                          min="0"
                          max="10"
                          value={mapSettings.landmarks}
                          onChange={(e) =>
                            setMapSettings({ ...mapSettings, landmarks: Number.parseInt(e.target.value) })
                          }
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-zinc-500">
                          <span>0</span>
                          <span>{mapSettings.landmarks}</span>
                          <span>10</span>
                        </div>
                      </div>

                      <Button onClick={generateMap} disabled={isGenerating} className="w-full">
                        {isGenerating ? "Generating..." : "Generate Map"}
                      </Button>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
                    <h3 className="text-lg font-medium mb-3">About Procedural Generation</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                      Our AI can create procedurally generated content for games, including:
                    </p>
                    <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                      <li className="flex items-start gap-2">
                        <Map className="w-4 h-4 mt-0.5 text-green-500" />
                        <span>Game maps and level layouts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Map className="w-4 h-4 mt-0.5 text-green-500" />
                        <span>Terrain and environmental features</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Map className="w-4 h-4 mt-0.5 text-green-500" />
                        <span>Quest and mission structures</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Map className="w-4 h-4 mt-0.5 text-green-500" />
                        <span>Item and loot distribution</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="md:col-span-2">
                  {isGenerating ? (
                    <div
                      className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6 flex flex-col items-center justify-center"
                      style={{ minHeight: "400px" }}
                    >
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zinc-900 dark:border-white mb-4"></div>
                      <p className="text-zinc-600 dark:text-zinc-400">Generating map...</p>
                    </div>
                  ) : generatedMap ? (
                    <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-medium">Generated Map</h3>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Save className="w-4 h-4 mr-1" />
                            Save
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-1" />
                            Export
                          </Button>
                        </div>
                      </div>
                      <div className="relative aspect-video rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700">
                        <img
                          src={generatedMap || "/placeholder.svg"}
                          alt="Generated Map"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700">
                          <h4 className="text-sm font-medium mb-1">Map Details</h4>
                          <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1">
                            <li>Size: {mapSettings.size}</li>
                            <li>Biome: {mapSettings.biome}</li>
                            <li>Complexity: {mapSettings.complexity}</li>
                            <li>Landmarks: {mapSettings.landmarks}</li>
                          </ul>
                        </div>
                        <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700">
                          <h4 className="text-sm font-medium mb-1">Map Features</h4>
                          <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1">
                            <li>Terrain Types: 4</li>
                            <li>Points of Interest: {mapSettings.landmarks}</li>
                            <li>Paths: {Math.floor(Math.random() * 5) + 3}</li>
                            <li>Unique Areas: {Math.floor(Math.random() * 3) + 2}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6 flex flex-col items-center justify-center text-center"
                      style={{ minHeight: "400px" }}
                    >
                      <Map className="w-12 h-12 text-zinc-400 mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Map Generated Yet</h3>
                      <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                        Adjust the settings and click "Generate Map" to create a procedurally generated game map.
                      </p>
                    </div>
                  )}

                  <div className="mt-6 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
                    <h3 className="text-lg font-medium mb-3">Advanced Procedural Generation</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white z-10">
                          <Lock className="w-8 h-8 mb-2" />
                          <p className="text-sm font-medium">Premium Feature</p>
                        </div>
                        <h4 className="font-medium mb-2">3D Terrain Generation</h4>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                          Create detailed 3D terrain with heightmaps, textures, and environmental features.
                        </p>
                        <Button variant="outline" size="sm" disabled>
                          Upgrade to Access
                        </Button>
                      </div>

                      <div className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white z-10">
                          <Lock className="w-8 h-8 mb-2" />
                          <p className="text-sm font-medium">Premium Feature</p>
                        </div>
                        <h4 className="font-medium mb-2">Dynamic Quest Generation</h4>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                          Generate complex, branching quests with multiple outcomes and character interactions.
                        </p>
                        <Button variant="outline" size="sm" disabled>
                          Upgrade to Access
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
            <h2 className="text-xl font-semibold mb-4">Explore More AI Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-medium mb-2">AI-Driven Dialogue Systems</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                  Create dynamic, contextual dialogue systems that respond naturally to player choices.
                </p>
                <Link href="#" className="text-sm font-medium flex items-center gap-1">
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-medium mb-2">Adaptive Difficulty Systems</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                  Implement AI that adjusts game difficulty based on player performance and engagement.
                </p>
                <Link href="#" className="text-sm font-medium flex items-center gap-1">
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-medium mb-2">Emergent Gameplay Simulation</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                  Test complex game systems and predict emergent behaviors before implementation.
                </p>
                <Link href="#" className="text-sm font-medium flex items-center gap-1">
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
