"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Sparkles, ArrowUp, Camera, Figma, Upload, Layout } from "lucide-react"

interface PromptInterfaceProps {
  value?: string
  onChange?: (value: string) => void
  onSubmit?: (value: string) => void
  disabled?: boolean
  placeholder?: string
}

export function PromptInterface({
  value: externalValue,
  onChange: externalOnChange,
  onSubmit,
  disabled = false,
  placeholder = "Ask v0 to build...",
}: PromptInterfaceProps = {}) {
  const [internalPrompt, setInternalPrompt] = useState("")

  const prompt = externalValue !== undefined ? externalValue : internalPrompt
  const setPrompt = externalOnChange || setInternalPrompt

  const handleSubmit = () => {
    if (prompt.trim()) {
      if (onSubmit) {
        onSubmit(prompt)
      } else {
        console.log("Submitting prompt:", prompt)
        // Handle prompt submission here
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Main heading */}
      <div className="text-center">
        <h1 className=" bg-gradient-to-tr from-[#BDC3C8] via-[#2d587b] to-[#C0382B] text-transparent bg-clip-text text-5xl font-bold text-foreground mb-8">What can I help you build?</h1>
      </div>

      {/* Prompt input area */}
      <div className="relative">
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="min-h-[120px] resize-none text-base bg-card border-border rounded-xl px-4 py-4 pr-16 focus:ring-2 focus:ring-ring focus:border-transparent"
        />

        {/* Input controls */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-accent">
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-accent">
            <Sparkles className="h-4 w-4" />
          </Button>
        </div>

        {/* Send button */}
        <div className="absolute bottom-3 right-3">
          <Button
            onClick={handleSubmit}
            disabled={disabled || !prompt.trim()}
            size="sm"
            className="h-8 w-8 p-0 rounded-lg"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Upgrade prompt */}
      <div className="flex items-center justify-between bg-muted/50 rounded-lg px-4 py-3 text-sm">
        <span className="text-muted-foreground">Upgrade to Team to unlock all of v0's features and more credits</span>
        <Button variant="link" className="text-primary p-0 h-auto font-medium">
          Upgrade Plan
        </Button>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <Button variant="outline" className="flex items-center gap-2 rounded-lg bg-transparent">
          <Camera className="h-4 w-4" />
          Clone a Screenshot
        </Button>
        <Button variant="outline" className="flex items-center gap-2 rounded-lg bg-transparent">
          <Figma className="h-4 w-4" />
          Import from Figma
        </Button>
        <Button variant="outline" className="flex items-center gap-2 rounded-lg bg-transparent">
          <Upload className="h-4 w-4" />
          Upload a Project
        </Button>
        <Button variant="outline" className="flex items-center gap-2 rounded-lg bg-transparent">
          <Layout className="h-4 w-4" />
          Landing Page
        </Button>
      </div>
    </div>
  )
}
