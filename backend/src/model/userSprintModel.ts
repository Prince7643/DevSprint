import mongoose, {Document} from "mongoose";
export interface UserSprints extends Document {
  _createdDate?: Date;
  _updatedDate?: Date;
  sprintName?: string;
  description?: string;
  status?: string;
  creatorName?: mongoose.Schema.Types.ObjectId;
  templateName?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  difficultyLevel?: string;
  progressPercentage?: number;
}

const userSprintsSchema = new mongoose.Schema<UserSprints>({
  _createdDate: Date,
  _updatedDate: Date,
  sprintName: String,
  description: String,
  status: String,
  creatorName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    },
  templateName: String,
  startDate: Date,
  endDate: Date,
  difficultyLevel: String,
  progressPercentage: Number,
});

export const UserSprints = mongoose.model("UserSprints", userSprintsSchema);