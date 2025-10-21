import { fixGrammarTool, improveWritingTool, translateTextTool } from '../tools/agent-tools.js';
import type { Request, Response } from 'express';
import { z } from 'zod';
const RequestSchema = z
    .object({
        text: z.string().min(1, "Text is required"),
        targetLanguage: z.string().optional(),
        fixGrammar: z.boolean().default(false),
        improveWriting: z.boolean().default(false),
        translate: z.boolean().default(false),
    })
    .refine(
        (data) => {
            // only one of the three flags should be true
            const flags = [data.fixGrammar, data.improveWriting, data.translate];
            return flags.filter(Boolean).length === 1;
        },
        {
            message: "Exactly one action flag (fixGrammar, improveWriting, translate) must be true.",
        }
    );
export const testiq = async (req: Request, res: Response) => {
    const parsed = RequestSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.message });
    }
    const { text, targetLanguage, fixGrammar: doFix, improveWriting: doImprove, translate: doTranslate } = parsed.data;
    try {
        let result: string | undefined;

        if (doFix) {
            console.log("Calling fixGrammarTool...");
            result = await fixGrammarTool.execute({ text });
        } else if (doImprove) {
            console.log("Calling improveWritingTool...");
            result = await improveWritingTool.execute({ text });
        } else if (doTranslate) {
            console.log("Calling translateTextTool...");
            if (!targetLanguage) {
                return res.status(400).json({
                    error: "Target language is required when translate=true.",
                });
            }
            result = await translateTextTool.execute({ text, targetLanguage });
        }
        return res.status(200).json({
            result,
        });
    } catch (error) {
        console.error("TextIQ error:", error);
        return res.status(500).json({
            error: "Internal server error",
            details: error instanceof Error ? error.message : "Unknown error",
        });
    }
}