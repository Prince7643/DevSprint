import { Response } from "express";
import { createRequest } from "../middleware/proctect";
import { EvidenceCardsModel } from "../model/evidenceModel";
export async function getAllEvidenceCards(req:createRequest,res:Response) {
    try {
        const user = req.user
        if(!user){
            return res.status(401).json({message:"Unauthorized"})
        }
        const evidenceCards=await EvidenceCardsModel.find({})
        if(!evidenceCards){
            return res.status(404).json({message:"No evidence cards found"})
        }
        return res.status(200).json(evidenceCards)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error"})
    }
}

export async function createEvidenceCard(req:createRequest,res:Response) {
    try {
        const user = req.user
        const {newEvidenceCard}=req.body
        if(!user){
            return res.status(401).json({message:"Unauthorized"})
        }
        const evidenceCard=new EvidenceCardsModel({...newEvidenceCard})
        await evidenceCard.save()
        return res.status(200).json({message:"Evidence card created successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error"})
    }
}

export async function getEvidenceCardById(req:createRequest,res:Response) {
    try {
        const user = req.user
        const {_id}=req.params
        if(!user){
            return res.status(401).json({message:"Unauthorized"})
        }
        const evidenceCard=await EvidenceCardsModel.findById(_id)
        if(!evidenceCard){
            return res.status(404).json({message:"No evidence card found"})
        }
        return res.status(200).json({evidenceCard})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error"})
    }
}
