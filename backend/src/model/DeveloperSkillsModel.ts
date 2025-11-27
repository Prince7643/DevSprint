import mongoose, {Document} from "mongoose";

export interface DeveloperSkills extends Document {
  _createdDate?: Date;
  _updatedDate?: Date;
  skillName?: string;
  category?: string;
  description?: string;
  difficultyLevel?: string;
  isCoreSkill?: boolean;
  documentationUrl?: string;
}

const developerSkillsSchema=new mongoose.Schema<DeveloperSkills>({
    _createdDate: {type: Date, default: Date.now},
    _updatedDate: {type: Date, default: Date.now},
    skillName: {type: String, required: true},
    category: {type: String, required: true},
    description: {type: String, required: true},
    difficultyLevel: {type: String, required: true},
    isCoreSkill: {type: Boolean, default: false},
    documentationUrl: {type: String, required: false},
});

const DeveloperSkillsModel = mongoose.model<DeveloperSkills>('DeveloperSkills', developerSkillsSchema);

export default DeveloperSkillsModel;