import mongoose, { Document } from "mongoose";

export interface EvidenceCards extends Document {
  _createdDate?: Date;
  _updatedDate?: Date;
  title?: string;
  summary?: string;
  codeSnippet?: string;
  mainImage?: string;
  videoUrl?: string;
  performanceMetric?: number;
  skillTags?: string;
  creationDate?: Date | string;
}

const evidenceCardSchema = new mongoose.Schema<EvidenceCards>({
    title: { 
        type: String,
         required: true 
    },
    summary: {
        type: String,
        required: true
    },
    codeSnippet: {
        type: String,
        required: true
    },
    mainImage: {
        type: String,
    },
    videoUrl: {
        type: String,
    },
    performanceMetric: {
        type: Number,
    },
    skillTags: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
})

export const EvidenceCardsModel = mongoose.model<EvidenceCards>('EvidenceCards', evidenceCardSchema);