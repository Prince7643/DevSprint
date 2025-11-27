import { Request, Response } from 'express';
import DeveloperSkillsModel from '../model/DeveloperSkillsModel';
export async function getAllSkills(req:Request,res:Response) {
    try {
        const skills = await DeveloperSkillsModel.find();
        res.status(200).json(skills);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch skills", error });
    }
}