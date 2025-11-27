import express from "express";
import { getAllEvidenceCards, createEvidenceCard, getEvidenceCardById } from "../controllers/evidenceController";
import protect from "../middleware/proctect";

const router = express.Router();

router.use(protect);

router.get("/evidence/", getAllEvidenceCards);
router.post("/evidence/", createEvidenceCard);
router.get("/evidence/:_id", getEvidenceCardById);


export default router;