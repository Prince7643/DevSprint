import mongoose from "mongoose";

export interface SprintTemplates {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  templateName?: string;
  difficultyLevel?: string;
  deliverablesDescription?: string;
  shortDescription?: string;
  estimatedDurationDays?: number;
  isActive?: boolean;
}

const sprintTemplatesSchema = new mongoose.Schema<SprintTemplates>({
  _id: String,
  _createdDate: Date,
  _updatedDate: Date,
  templateName: String,
  difficultyLevel: String,
  deliverablesDescription: String,
  shortDescription: String,
  estimatedDurationDays: Number,
  isActive: Boolean,
});

export const SprintTemplates = mongoose.model("SprintTemplates", sprintTemplatesSchema);