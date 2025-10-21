import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { z } from 'zod';

export const fixGrammarTool = {
  description:
    'Corrects grammar, punctuation, and word usage errors in the provided text while preserving the original meaning and tone.',
  parameters: z.object({
    text: z.string().describe('The text to fix grammar for'),
  }),
  execute: async ({ text }: { text: string }) => {
    const { text: fixedText } = await generateText({
      model: google('gemini-2.5-flash'),
      prompt: `
You are an expert copy editor. Analyze the following text and its tone, then correct all grammar, punctuation, and word usage errors while preserving the original meaning and tone. 

ONLY return the corrected text, nothing else.

Text:
"""${text}"""
`,
    });
    return fixedText;
  },
};

export const improveWritingTool = {
  description:
    'Rewrites the provided text to be clearer, more polished, and more engaging while preserving the original meaning and intent.',
  parameters: z.object({
    text: z.string().describe('The text to improve'),
  }),
  execute: async ({ text }: { text: string }) => {
    const { text: improvedText } = await generateText({
      model: google('gemini-2.5-flash'),
      prompt: `
You are a professional editor. Analyze the following text and its tone, then rewrite it to be clearer, more polished, and more engaging while preserving the original meaning and intent. 

ONLY return the improved text, nothing else.

Text:
"""${text}"""
`,
    });
    return improvedText;
  },
};

export const translateTextTool = {
  description:
    'Translates the provided text into the specified target language while preserving meaning, tone, and context.',
  parameters: z.object({
    text: z.string().describe('The text to translate'),
    targetLanguage: z
      .string()
      .describe('The target language to translate the text into (e.g., "Spanish", "French", "Japanese")'),
  }),
  execute: async ({ text, targetLanguage }: { text: string; targetLanguage: string }) => {
    const { text: translatedText } = await generateText({
      model: google('gemini-2.5-flash'),
      prompt: `
You are an expert translator. Analyze the following text and its tone, then translate it into ${targetLanguage} while preserving meaning, tone, and context. 

ONLY return the translated text, nothing else.

Text:
"""${text}"""
`,
    });
    return translatedText;
  },
};
