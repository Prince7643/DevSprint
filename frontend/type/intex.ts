
export interface DeveloperSkills {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  skillName?: string;
  category?: string;
  description?: string;
  difficultyLevel?: string;
  isCoreSkill?: boolean;
  documentationUrl?: string;
}


export interface EvidenceCards {
  _id?: string;
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


export interface PublicProjects {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  projectTitle?: string;
  projectOverview?: string;
  coverImage?: string;
  liveProjectUrl?: string;
  codeRepositoryUrl?: string;
  summaryVideoUrl?: string;
}


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


export interface UserSprints {
  _id?: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  sprintName?: string;
  description?: string;
  status?: string;
  creatorName?:{ name?: string; _id?: string }
  templateName?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  difficultyLevel?: string;
  progressPercentage?: number;
}

export type Member = {
  id?: string;
  name?: string | null | undefined,
  email?: string | null | undefined,
  loginEmailVerified?: boolean
  status?:string,
  contact?: {
    firstName?:string 
    lastName?: string 
    phones?:string
  },
  profile?: {
    nickname?:string
    photo?: {
      url?: string
      height?: number
      width?: number
      offsetX?:number
      offsetY?: number
    },
    title?: string

  },
  isPro?:boolean,
  proExpirationDate?:Date,
  _createdDate?:Date
  _updatedDate?: Date
  lastLoginDate?:Date
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  description?: string;
}

export type useStoreType = {
  user: Member | undefined
  setUser: (user: Member | undefined) => void
  isAuthenticated:boolean
  setIsAuthenticated: (isAuthenticated: boolean) => void
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
}
export type PersistedState = {
  user: Member | undefined;
  isAuthenticated: boolean;
};
