"use client"

import { useState } from "react"
import { PromptInterface } from "@/components/prompt-interface"
import { inngest } from "@/inngest/client"

export default function Home() {
  const [value, setValue] = useState("")
  const [isPending, setIsPending] = useState(false)

  const handleInvoke = async (inputValue: string) => {
    try {
      setIsPending(true)
      console.log("Invoking background job with:", inputValue)

      // Send event to Inngest
      await inngest.send({
        name: "test/hello.world",
        data: { value: inputValue }
      });

      setValue("") // Clear input after successful submission
    } catch (error) {
      console.error("Error invoking background job:", error)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] flex items-center justify-center p-4">
      <PromptInterface
        value={value}
        onChange={setValue}
        onSubmit={handleInvoke}
        disabled={isPending}
        placeholder="Enter your prompt to invoke background job..."
      />
    </main>
  )
}