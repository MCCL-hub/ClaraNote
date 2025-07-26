import { type AudioFile, type InsertAudioFile, type UpdateAudioFile } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createAudioFile(audioFile: InsertAudioFile): Promise<AudioFile>;
  getAudioFile(id: string): Promise<AudioFile | undefined>;
  updateAudioFile(id: string, updates: UpdateAudioFile): Promise<AudioFile | undefined>;
  getAllAudioFiles(): Promise<AudioFile[]>;
  deleteAudioFile(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private audioFiles: Map<string, AudioFile>;

  constructor() {
    this.audioFiles = new Map();
  }

  async createAudioFile(insertAudioFile: InsertAudioFile): Promise<AudioFile> {
    const id = randomUUID();
    const now = new Date();
    const audioFile: AudioFile = {
      ...insertAudioFile,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.audioFiles.set(id, audioFile);
    return audioFile;
  }

  async getAudioFile(id: string): Promise<AudioFile | undefined> {
    return this.audioFiles.get(id);
  }

  async updateAudioFile(id: string, updates: UpdateAudioFile): Promise<AudioFile | undefined> {
    const existing = this.audioFiles.get(id);
    if (!existing) return undefined;

    const updated: AudioFile = {
      ...existing,
      ...updates,
      updatedAt: new Date(),
    };
    this.audioFiles.set(id, updated);
    return updated;
  }

  async getAllAudioFiles(): Promise<AudioFile[]> {
    return Array.from(this.audioFiles.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async deleteAudioFile(id: string): Promise<boolean> {
    return this.audioFiles.delete(id);
  }
}

export const storage = new MemStorage();
