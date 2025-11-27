import { Response } from "express";
import { createRequest } from "../middleware/proctect";
import { SprintTemplates } from "../model/sprintModel";
import { UserSprints } from "../model/userSprintModel";
import { OpenRouter } from "@openrouter/sdk";
import { TaskModel } from "../model/taskModel";
import { User } from "../model/userModel";

export async function getAllSprint(req:createRequest,res:Response) {
    try {
        const user=req.user
        if(!user){
            return res.status(401).json({message:"Unauthorized"})
        }
        const sprint=await SprintTemplates.find({})
        if(!sprint){
            return res.status(404).json({message:"No sprint found"})
        }
        return res.status(200).json(sprint)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error"})
    }
}

export async function createSprint(req:createRequest,res:Response) {
    try {
        const user=req.user;
        const {newSprint}=req.body
        if(!user){
            return res.status(401).json({message:"Unauthorized"})
        }
        const userData=await User.findOne({_id:user._id})
        if(!userData){
            return res.status(404).json({message:"User not found"})
        }else{
          if (!userData.isPro) {
            if (userData.limitations?.maxSprints <= 0) {
              return res.status(403).json({
                message: "Sprint creation limit reached. Please upgrade to Pro for more sprints."
              });
            }
          }
          
          if (userData.proExpirationDate && userData.proExpirationDate < new Date()) {
            return res.status(403).json({
              message: "Your Pro subscription has expired. Please renew to continue."
            });
          }
        }
        const sprintExist=await UserSprints.findOne({sprintName:newSprint.sprintName, creatorName:user._id})
        if(sprintExist){
            return res.status(400).json({message:"Sprint is already exist Create a different one"})
        }
        console.log("Found sprint:", sprintExist);
        const sprint=new UserSprints({...newSprint, creatorName: user._id})
        await sprint.save()
        if(!userData.isPro){
          await User.findByIdAndUpdate(user._id, { $inc: { "limitations.maxSprints": -1 } })
        }
        return res.status(200).json({message:"Sprint created successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error"})
    }
}

export async function getSprintById(req:createRequest,res:Response) {
    try {
        const user=req.user;
        const {_id}=req.params
        if(!user){
            return res.status(401).json({message:"Unauthorized"})
        }
        const sprint=await UserSprints.findById(_id).populate('creatorName','name')
        if(!sprint){
            return res.status(404).json({message:"No sprint found"})
        }
        return res.status(200).json({sprint})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error"})
    }
}

export async function getSprintByuserId(req:createRequest,res:Response) {
    try {
        const user = req.user
        if(!user){
            return res.status(401).json({message:"Unauthorized"})
        }
        const sprint=await UserSprints.find({creatorName:user._id})
        if(!sprint){
            return res.status(404).json({message:"No sprint found"})
        }
        return res.status(200).json(sprint)  
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error"})
    }
}

export async function getAiTasks(req: any, res: Response) {
  try {
    const user=req.user;
    const { sprintTitle, description, level, sprintId } = req.body;
    if (!sprintTitle || !description || !level || !sprintId) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const userData=await User.findOne({_id:user._id})
    if(!userData){
      return res.status(404).json({message:"User not found"})
    }
    else{
          if (!userData.isPro) {
            if (userData.limitations?.maxAiTasksPerSprint <= 0) {
              return res.status(403).json({
                message: "Task creation limit reached. Please upgrade to Pro for more tasks."
              });
            }
          }
          if (userData.proExpirationDate && userData.proExpirationDate < new Date()) {
            return res.status(403).json({
              message: "Your Pro subscription has expired. Please renew to continue."
            });
          }
        }
      if(!userData.isPro){
          await User.findByIdAndUpdate(user._id, { $inc: { "limitations.maxAiTasksPerSprint": -1 } })
        }
    const userPrompt = `
      You are an expert software project planner.

      Generate exactly 6 tasks.
      Each task must be returned as:
      {
        "id": string,
        "title": string,
        "completed": false
      }

      Title rules:
      - 4–10 words
      - Directly implementable
      - No vague tasks
      - No long explanations

      Context:
      - Sprint: ${sprintTitle}
      - Description: ${description}
      - Level: ${level}

      Return ONLY a JSON array. No markdown, no comments.
    `;

    const client = new OpenRouter({
      apiKey: process.env.OPENROUTER_API_KEY!,
    });

    const completion = await client.chat.send({
      model: "openai/gpt-4.1-mini",
      maxTokens: 300,
      messages: [
        {
          role: "system",
          content: `
            You must respond ONLY with a valid JSON array.
            No extra text.
            No markdown.
            No explanation.
            Example:
            [
              { "id": "1", "title": "Set up API module", "completed": false }
            ]
          `,
        },
        { role: "user", content: userPrompt },
      ],
    });

    const messageContent = completion.choices[0].message.content;
    
    if (!messageContent) {
      throw new Error("AI returned empty response");
    }

    const rawContent = typeof messageContent === 'string' 
      ? messageContent 
      : messageContent[0]?.type === 'text' 
        ? messageContent[0].text 
        : '';

    if (!rawContent) {
      throw new Error("AI returned no text content");
    }

    let task;
    try {
      task = JSON.parse(rawContent);
    } catch (e) {
      console.error("AI RAW OUTPUT:", rawContent);
      throw new Error("AI did not return valid JSON array");
    }

    if (!Array.isArray(task)) {
      throw new Error("AI did not return a JSON array");
    }
    const findTask = await TaskModel.findOne({ sprintId });
    if(findTask){
      const saveTask=await TaskModel.updateOne({ sprintId }, {
        tasks:task,userId:user._id
      });
      if(!saveTask){
        throw new Error("Task not saved");
      }
    }
    else{
      const newTask = new TaskModel({
        sprintId,
        tasks:task,
        userId:user._id
      });
      await newTask.save();
      if(!newTask){
        throw new Error("Task not saved");
      }
    }
    return res.status(200).json({ task,message:"AI tasks generated successfully" });
  } catch (error) {
    console.error("AI TASK ERROR:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}


export async function getTaskBySprintId(req:createRequest, res:Response) {
  try {
    const user=req.user;
    const {sprintId}=req.params
    if(!user){
      return res.status(401).json({message:"Unauthorized"})
    }
    const task=await TaskModel.findOne({sprintId})
    if(!task){
      return res.status(404).json({message:"No task found"})
    }
    return res.status(200).json(task.tasks);
  } catch (error) {
    console.log(error)
    return res.status(500).json({message:"Internal server error"})
  }
}

export async function updateTask(req:createRequest, res:Response) {
  try {
    const user=req.user;
    const {sprintId}=req.params
    const {tasks}=req.body
    if(!user){
      return res.status(401).json({message:"Unauthorized"})
    }
    const task=await TaskModel.findOneAndUpdate({sprintId}, {tasks})
    if(!task){
      return res.status(404).json({message:"No task found"})
    }
    return res.status(200).json({message:"Task updated successfully"})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message:"Internal server error"})
  }
}