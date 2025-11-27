import mongoose from "mongoose";

interface task {
  userId:mongoose.Schema.Types.ObjectId;
  sprintId:mongoose.Schema.Types.ObjectId;
  tasks:[
    {
      id: String,
      title: String,
      completed: Boolean
    }
  ];
}

const TaskSchema = new mongoose.Schema<task>({
  sprintId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserSprints",
    required: true,
  },
  tasks: [
    {
      id: String,
      title: String,
      completed: Boolean
    }
  ],
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const TaskModel = mongoose.model("SprintAITasks",TaskSchema);


