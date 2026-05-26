// src/lib/llm/output_validator.ts

import { z } from 'zod';

export const LabAnalysisSuggestionSchema = z.object({
  suggestion: z.string(),
});

export const LLMOutputValidator = {
  validate: (schema: z.ZodSchema, data: string) => {
    try {
      const parsed = JSON.parse(data);
      const result = schema.safeParse(parsed);
      return { isValid: result.success, parsed: result.success ? result.data : null };
    } catch (e) {
      return { isValid: false, parsed: null };
    }
  }
};
