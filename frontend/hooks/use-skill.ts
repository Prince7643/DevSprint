import { axiosIntance } from "@/lib/axios";
import { DeveloperSkills } from "@/type/intex";
import { useState } from "react";

export const useSkill = () => {
    const [skills, setSkills] = useState<DeveloperSkills[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchSkills = async () => {
        setLoading(true);
        try {
            const response = await axiosIntance.get('/skills/');
            const data = await response.data
            setSkills(data);
        } catch (error) {
            console.error("Error fetching skills:", error);
        } finally {
            setLoading(false);
        }
    }

    return { 
        skills, 
        loading, 
        fetchSkills 
    };
}