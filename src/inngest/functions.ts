import { inngest } from "./client";
import { openai } from "@/lib/openai";
import { Sandbox } from "@e2b/code-interpreter";
import { getSandbox } from "./utils";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {

    const sandboxId = await step.run("get-sandbox-id", async () => {
      const sandbox = await Sandbox.create("whisperai-test4");
      return sandbox.sandboxId;
    })

    try {
      const codeAgent = await step.run("generate-response", async () => {
        return await openai.chat.completions.create({
          model: "openai/gpt-oss-20b:free", // OpenRouter model
          messages: [
            {
              role: "system",
              content: "You are an expert next.js developer. You write readable, maintainable code. You write simple Next.js & React snippets."
            },
            {
              role: "user",
              content: `Write the following snippet: ${event.data.value}`
            }
          ],
        });
      });

      console.log(codeAgent.choices[0].message.content);
      
      await step.sleep("wait-a-moment", "5s");

     const sandboxUrl = await step.run("get-sandbox-url", async () => {
      const sandbox = await getSandbox(sandboxId);
      const host = sandbox.getHost(3000);
      return `http://${host}`;
    });
      return { output: codeAgent.choices[0].message.content , sandboxUrl}; 
    } catch (error) {
      console.error("OpenRouter API error:", error);
      return {
        error: error instanceof Error ? error.message : "Unknown error",
        success: false
      };
    }
  }
);