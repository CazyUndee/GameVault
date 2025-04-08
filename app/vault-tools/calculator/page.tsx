"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calculator } from "lucide-react"

export default function CalculatorPage() {
  const [display, setDisplay] = useState("0")
  const [currentValue, setCurrentValue] = useState<string | null>(null)
  const [operator, setOperator] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  const [memory, setMemory] = useState(0)

  const clearAll = () => {
    setDisplay("0")
    setCurrentValue(null)
    setOperator(null)
    setWaitingForOperand(false)
  }

  const clearEntry = () => {
    setDisplay("0")
    setWaitingForOperand(false)
  }

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === "0" ? digit : display + digit)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.")
      setWaitingForOperand(false)
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".")
    }
  }

  const toggleSign = () => {
    const newValue = Number.parseFloat(display) * -1
    setDisplay(String(newValue))
  }

  const inputPercent = () => {
    const currentValueNum = Number.parseFloat(display)
    const newValue = currentValueNum / 100
    setDisplay(String(newValue))
  }

  const performOperation = (nextOperator: string) => {
    const inputValue = Number.parseFloat(display)

    if (currentValue === null) {
      setCurrentValue(display)
    } else if (operator) {
      const currentValueNum = Number.parseFloat(currentValue)
      let newValue: number

      switch (operator) {
        case "+":
          newValue = currentValueNum + inputValue
          break
        case "-":
          newValue = currentValueNum - inputValue
          break
        case "×":
          newValue = currentValueNum * inputValue
          break
        case "÷":
          newValue = currentValueNum / inputValue
          break
        default:
          newValue = inputValue
      }

      setCurrentValue(String(newValue))
      setDisplay(String(newValue))
    }

    setWaitingForOperand(true)
    setOperator(nextOperator)
  }

  const handleMemoryAdd = () => {
    setMemory(memory + Number.parseFloat(display))
  }

  const handleMemorySubtract = () => {
    setMemory(memory - Number.parseFloat(display))
  }

  const handleMemoryRecall = () => {
    setDisplay(String(memory))
    setWaitingForOperand(true)
  }

  const handleMemoryClear = () => {
    setMemory(0)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 md:px-6 py-12 md:py-20">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Calculator className="h-6 w-6 mr-2 text-purple-600" />
              <h1 className="text-2xl font-bold">Calculator</h1>
            </div>
            <Link
              href="/vault-tools"
              className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
            >
              ← Back to Tools
            </Link>
          </div>

          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg overflow-hidden border border-zinc-200 dark:border-zinc-700">
            {/* Display */}
            <div className="bg-zinc-100 dark:bg-zinc-900 p-4">
              <div className="text-right text-3xl font-mono h-12 flex items-center justify-end">{display}</div>
            </div>

            {/* Memory display */}
            <div className="bg-zinc-50 dark:bg-zinc-900/50 px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">
              <div className="text-right text-sm text-zinc-500 dark:text-zinc-400">
                {memory !== 0 && `Memory: ${memory}`}
              </div>
            </div>

            {/* Keypad */}
            <div className="grid grid-cols-4 gap-1 p-2">
              {/* Memory functions */}
              <Button
                variant="ghost"
                className="bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                onClick={handleMemoryClear}
              >
                MC
              </Button>
              <Button
                variant="ghost"
                className="bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                onClick={handleMemoryRecall}
              >
                MR
              </Button>
              <Button
                variant="ghost"
                className="bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                onClick={handleMemoryAdd}
              >
                M+
              </Button>
              <Button
                variant="ghost"
                className="bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                onClick={handleMemorySubtract}
              >
                M-
              </Button>

              {/* Clear and operations */}
              <Button
                variant="ghost"
                className="bg-red-100 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400"
                onClick={clearAll}
              >
                C
              </Button>
              <Button
                variant="ghost"
                className="bg-red-100 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400"
                onClick={clearEntry}
              >
                CE
              </Button>
              <Button
                variant="ghost"
                className="bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                onClick={() => toggleSign()}
              >
                ±
              </Button>
              <Button
                variant="ghost"
                className="bg-purple-100 dark:bg-purple-900/20 hover:bg-purple-200 dark:hover:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                onClick={() => performOperation("÷")}
              >
                ÷
              </Button>

              {/* Numbers and operations */}
              <Button
                variant="ghost"
                className="bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                onClick={() => inputDigit("7")}
              >
                7
              </Button>
              <Button
                variant="ghost"
                className="bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                onClick={() => inputDigit("8")}
              >
                8
              </Button>
              <Button
                variant="ghost"
                className="bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                onClick={() => inputDigit("9")}
              >
                9
              </Button>
              <Button
                variant="ghost"
                className="bg-purple-100 dark:bg-purple-900/20 hover:bg-purple-200 dark:hover:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                onClick={() => performOperation("×")}
              >
                ×
              </Button>

              <Button
                variant="ghost"
                className="bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                onClick={() => inputDigit("4")}
              >
                4
              </Button>
              <Button
                variant="ghost"
                className="bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                onClick={() => inputDigit("5")}
              >
                5
              </Button>
              <Button
                variant="ghost"
                className="bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                onClick={() => inputDigit("6")}
              >
                6
              </Button>
              <Button
                variant="ghost"
                className="bg-purple-100 dark:bg-purple-900/20 hover:bg-purple-200 dark:hover:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                onClick={() => performOperation("-")}
              >
                -
              </Button>

              <Button
                variant="ghost"
                className="bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                onClick={() => inputDigit("1")}
              >
                1
              </Button>
              <Button
                variant="ghost"
                className="bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                onClick={() => inputDigit("2")}
              >
                2
              </Button>
              <Button
                variant="ghost"
                className="bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                onClick={() => inputDigit("3")}
              >
                3
              </Button>
              <Button
                variant="ghost"
                className="bg-purple-100 dark:bg-purple-900/20 hover:bg-purple-200 dark:hover:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                onClick={() => performOperation("+")}
              >
                +
              </Button>

              <Button
                variant="ghost"
                className="bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                onClick={() => inputPercent()}
              >
                %
              </Button>
              <Button
                variant="ghost"
                className="bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                onClick={() => inputDigit("0")}
              >
                0
              </Button>
              <Button
                variant="ghost"
                className="bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                onClick={() => inputDecimal()}
              >
                .
              </Button>
              <Button
                variant="ghost"
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => performOperation("=")}
              >
                =
              </Button>
            </div>
          </div>

          <div className="mt-8 bg-white dark:bg-zinc-800 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
            <h2 className="text-lg font-medium mb-2">Calculator Features</h2>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li>• Basic arithmetic operations (add, subtract, multiply, divide)</li>
              <li>• Memory functions (store, recall, add to memory, subtract from memory)</li>
              <li>• Percentage calculations</li>
              <li>• Sign toggle (+/-)</li>
              <li>• Clear entry and clear all functions</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
