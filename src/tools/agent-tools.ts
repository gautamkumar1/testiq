import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export const fixGrammar = async (text: string) => {
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
};

export const improveWriting = async (text: string) => {
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
};

export const translateText = async (text: string, targetLanguage: string) => {
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
};
