import { axiosIntance } from "@/lib/axios";
import { useUserStore } from "@/store/useStore";
import { SprintTemplates, Task, UserSprints } from "@/type/intex";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const useSprint=()=>{
    const [templates, setTemplates] = useState<SprintTemplates[]>([]);
    const [userSprints, setUserSprints] = useState<UserSprints[]>([]);
    const [activeTemplates, setActiveTemplates] = useState<UserSprints | null>(null);
    const [creating, setCreating] = useState(false);
    const [loading, setLoading] = useState(true);
    const { tasks, setTasks } = useUserStore();
    const router=useRouter()

    const [formData, setFormData] = useState({
        sprintName: '',
        description: '',
        templateId: '',
        difficultyLevel: 'intermediate',
        startDate: new Date(),
        endDate: undefined as Date | undefined,
    });
    const handleTemplateSelect = (templateId: string) => {
        const template = templates.find(t => t._id === templateId);
        if (template) {
          setFormData(prev => ({
            ...prev,
            templateId,
            sprintName: template.templateName || '',
            description: template.shortDescription || '',
            difficultyLevel: template.difficultyLevel || 'intermediate',
          }));
        }
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreating(true);

        try {
        const template = templates.find(t => t._id === formData.templateId);
        
        const newSprint: UserSprints = {
            sprintName: formData.sprintName,
            description: formData.description,
            status: 'active',
            difficultyLevel: formData.difficultyLevel,
            startDate: formData.startDate.toISOString(),
            endDate: formData.endDate?.toISOString(),
            templateName: template?.templateName,
            creatorName: undefined,
            progressPercentage: 0,
        };
        const response = await axiosIntance.post('/sprint/create', {newSprint})
        toast.success(response.data.message||'Sprint created successfully');
        if (response.status===200) {
            router.push('/dashboard');
        }
        } catch (error) {
        console.error('Error creating sprint:', error);
        } finally {
        setCreating(false);
        }
    };
    const fetchTemplates = async () => {
        try {
          const response = await axiosIntance.get('/sprint/');
          setTemplates(response.data);
        } catch (error) {
          console.error('Error fetching templates:', error);
        }finally{
            setLoading(false)
        }
    };
    const fetchUserTemplates= async ()=>{
        try {
            const response = await axiosIntance.get('/sprint/user');
            setUserSprints(response.data)
        } catch (error) {
            console.error("Error featching user templates:",error)
        }finally{
            setLoading(false)
        }
    }
    const fetchTemplatesById=async (_id:string)=>{
        try {
            const response=await axiosIntance.get(`/sprint/${_id}`)
            setActiveTemplates(response.data.sprint)
            setLoading(false);
        } catch (error) {
            console.error("Error fetching template by id:",error)
        }finally{
            setLoading(false)
        }
    }
    const fetchAiTasks=async (sprintTitle:string,description:string,level:string,sprintId:string)=>{
        try {
            const response = await axiosIntance.post('/sprint/aiSuggestion', { sprintTitle, description, level, sprintId });
            setTasks(response.data.task);
        } catch (error) {
            console.error('Error fetching AI tasks:', error);
        }
    }
    const fetchTasks=async (sprintId:string)=>{
        try {
            const response = await axiosIntance.get(`/sprint/tasks/${sprintId}`);
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching AI tasks:', error);
        }
    }
    const FetchAllTasks = async (id: string) => {
        toast.info("Generating AI tasks, please wait...");
        try {
            // 1️⃣ Run AI task generation first and wait for it
            await fetchAiTasks(
            activeTemplates?.sprintName || "",
            activeTemplates?.description || "",
            activeTemplates?.difficultyLevel || "",
            id.toString()
            );

            // 2️⃣ Wait 5 seconds
            await new Promise((resolve) => setTimeout(resolve, 5000));

            // 3️⃣ Then fetch tasks
            await fetchTasks(id.toString());
            toast.success("AI tasks generated successfully");

        } catch (error) {
            console.log("Error fetching tasks:", error);
        }
    };
    const updateTask = async (sprintId: string, tasks: Task[]) => {
        try {
            const response = await axiosIntance.put(`/sprint/updateTask/${sprintId}`, { tasks });
            toast.success(response.data.message);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };
    
    return {
        templates,
        creating,
        formData,
        loading,
        userSprints,
        activeTemplates,
        tasks,
        setTasks,
        setFormData,
        handleTemplateSelect,
        handleSubmit,
        fetchTemplates,
        fetchUserTemplates,
        fetchTemplatesById,
        fetchAiTasks,
        fetchTasks,
        FetchAllTasks,
        updateTask
    }
}