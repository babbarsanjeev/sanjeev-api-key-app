import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";

// Define the output schema using Zod
const summarySchema = z.object({
  summary: z.string().describe("A brief 1-3 sentence summary of the repository"),
  cool_facts: z.array(z.string()).max(5).describe("Up to 5 interesting facts about the repository")
});

/**
 * Creates a Langchain chain that summarizes a GitHub repository
 * and extracts cool facts from its README content.
 * Uses withStructuredOutput for type-safe responses.
 * @param {string} readmeContent - The README content to summarize
 * @returns {Promise<{summary: string, cool_facts: string[]}>}
 */
export async function summarizeGithubReadme(readmeContent) {
  // Debug: Check if API key is available
  console.log('OPENAI_API_KEY exists:', !!process.env.OPENAI_API_KEY);
  
  // Initialize the model
  const llm = new ChatOpenAI({
    model: "gpt-4o",
    temperature: 0.2,
    openAIApiKey: process.env.OPENAI_API_KEY
  });

  // Bind structured output schema to the model
  const structuredLlm = llm.withStructuredOutput(summarySchema);

  // Create the prompt message
  const prompt = `You are an expert summarizer for GitHub repositories.
Given the README content below, please:
1. Write a brief summary (1-3 sentences) of what this repository does.
2. List up to 5 interesting or cool facts about this repository.

README:
${readmeContent}`;

  // Invoke the model with structured output
  const result = await structuredLlm.invoke(prompt);
  
  console.log('Structured output result:', result);
  
  // Result is already parsed and validated by Zod schema
  return {
    summary: result.summary || "Summary not available",
    cool_facts: result.cool_facts || []
  };
}
