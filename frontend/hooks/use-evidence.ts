'use client'
import { axiosIntance } from "@/lib/axios";
import { EvidenceCards } from "@/type/intex";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
export const useEvidence = () => {
    // Hook logic for managing evidence cards will go here
    const { id: sprintId } = useParams();
    const [evidenceCards, setEvidenceCards] = useState<EvidenceCards[]>([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [card, setCard] = useState<EvidenceCards | null>(null);
    const navigate = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        summary: '',
        codeSnippet: '',
        mainImage: '',
        videoUrl: '',
        performanceMetric: '',
        skillTags: '',
    });  
    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);

        try {
        const newCard: EvidenceCards = {
            title: formData.title,
            summary: formData.summary,
            codeSnippet: formData.codeSnippet,
            mainImage: formData.mainImage || undefined,
            videoUrl: formData.videoUrl || undefined,
            performanceMetric: formData.performanceMetric ? parseFloat(formData.performanceMetric) : undefined,
            skillTags: formData.skillTags,
            creationDate: new Date().toISOString(),
        };

        const response = await axiosIntance.post('/evidence', {newEvidenceCard:newCard})
        if (response.status===200) {
            navigate.push(`/dashboard/sprint/${sprintId}`);
        }
        if (sprintId) {
            navigate.push(`/dashboard/sprint/${sprintId}`);
        } else {
            navigate.push('/dashboard');
        }
        } catch (error) {
        console.error('Error creating evidence card:', error);
        } finally {
        setCreating(false);
        }
    };
    const fetchEvidenceCards = async () => {
        try {
            const response = await axiosIntance.get('/evidence/');
            if (response.status === 200) {
                setEvidenceCards(response.data);
            }
            setLoading(false);

        } catch (error) {
            console.error('Error fetching evidence cards:', error);
            setLoading(false);
        }
    }
    const fetchEvidenceCardById = async (_id: string) => {
        console.log("Fetching evidence card by ID:", _id);
        try {
            setLoading(true);
            const response = await axiosIntance.get(`/evidence/${_id}`);
            if (response.status === 200) {
                setCard(response.data.evidenceCard);
                setLoading(false);
            }
        }catch (error) {
            console.error('Error fetching evidence card by ID:', error);
        }finally{
            setLoading(false);
        }
    }
    return {
        evidenceCards,
        loading,
        creating,
        formData,
        card,
        setEvidenceCards,
        setLoading,
        setCreating,
        setFormData,
        handleSubmit,
        fetchEvidenceCards,
        fetchEvidenceCardById
    };
}