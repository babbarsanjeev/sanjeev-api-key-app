import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";

/**
 * Creates a Langchain chain that summarizes a GitHub repository
 * and extracts cool facts from its README content.
 * @param {string} readmeContent - The README content to summarize
 * @returns {Promise<{summary: string, cool_facts: string[]}>}
 */
export async function summarizeGithubReadme(readmeContent) {
  const prompt = PromptTemplate.fromTemplate(
    `You are an expert summarizer for GitHub repositories.
Given the README content below, please do the following:
1. Write a brief summary (1-3 sentences) of the repository.
2. List up to 5 interesting or cool facts (as bullet points, each on a new line, do NOT number them) about this repository based solely on the README content.

README:
{content}

Respond only in this JSON format:
{{
  "summary": "<Brief summary here>",
  "cool_facts": [
    "<Fact 1>",
    "<Fact 2>"
  ]
}}
`
  );

  // Debug: Check if API key is available
  console.log('OPENAI_API_KEY exists:', !!process.env.OPENAI_API_KEY);
  console.log('OPENAI_API_KEY prefix:', process.env.OPENAI_API_KEY?.substring(0, 10) + '...');
  
  const llm = new ChatOpenAI({
    model: "gpt-4o",
    temperature: 0.2,
    openAIApiKey: process.env.OPENAI_API_KEY
  });

  const outputParser = new StringOutputParser();

  const chain = RunnableSequence.from([prompt, llm, outputParser]);

  // Run the chain and parse JSON result
  const outputRaw = await chain.invoke({ content: readmeContent });
  
  // Clean up the response - remove markdown code fences if present
  let cleanedOutput = outputRaw.trim();
  
  // Remove ```json or ``` at the start
  if (cleanedOutput.startsWith('```json')) {
    cleanedOutput = cleanedOutput.slice(7);
  } else if (cleanedOutput.startsWith('```')) {
    cleanedOutput = cleanedOutput.slice(3);
  }
  
  // Remove ``` at the end
  if (cleanedOutput.endsWith('```')) {
    cleanedOutput = cleanedOutput.slice(0, -3);
  }
  
  cleanedOutput = cleanedOutput.trim();
  
  console.log('Cleaned AI output:', cleanedOutput.substring(0, 200) + '...');
  
  let result;
  try {
    result = JSON.parse(cleanedOutput);
    if (
      typeof result.summary !== "string" ||
      !Array.isArray(result.cool_facts)
    ) {
      // Malformed, try to coerce
      result = {
        summary: cleanedOutput,
        cool_facts: [],
      };
    }
  } catch (e) {
    console.error('JSON parse error:', e.message);
    result = {
      summary: cleanedOutput,
      cool_facts: [],
    };
  }
  
  return result;
}

