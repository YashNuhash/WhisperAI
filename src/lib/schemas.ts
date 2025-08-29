import { z } from "zod";

export const transcriptionSchema = z.object({
  audioUrl: z.string().url(),
  language: z.string().optional(),
  prompt: z.string().optional()
});

export const transcriptionResponseSchema = z.object({
  text: z.string(),
  success: z.boolean(),
  error: z.string().optional()
});

export type TranscriptionRequest = z.infer<typeof transcriptionSchema>;
export type TranscriptionResponse = z.infer<typeof transcriptionResponseSchema>;