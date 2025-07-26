import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const audioFiles = pgTable("audio_files", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  filename: text("filename").notNull(),
  originalName: text("original_name").notNull(),
  fileSize: integer("file_size").notNull(),
  filePath: text("file_path").notNull(),
  status: text("status").notNull().default("uploaded"), // uploaded, transcribing, transcribed, summarized, exported
  transcription: text("transcription"),
  summary: text("summary"),
  pdfPath: text("pdf_path"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertAudioFileSchema = createInsertSchema(audioFiles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateAudioFileSchema = createInsertSchema(audioFiles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).partial();

export type InsertAudioFile = z.infer<typeof insertAudioFileSchema>;
export type UpdateAudioFile = z.infer<typeof updateAudioFileSchema>;
export type AudioFile = typeof audioFiles.$inferSelect;
