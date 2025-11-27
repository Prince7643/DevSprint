'use client'
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Plus, CheckCircle2, Circle, Sparkles, Image as ImageIcon, Code2, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';
import { Image } from 'lucide-react';
import { useParams } from 'next/dist/client/components/navigation';
import Link from 'next/link';
import { useSprint } from '@/hooks/use-sprint';
import { useEvidence } from '@/hooks/use-evidence';
import { useRouter } from 'next/navigation';
import { Task } from '@/type/intex';

export default function SprintWorkspacePage() {
  const { id } = useParams();
  const { 
    activeTemplates, 
    fetchTemplatesById,
    loading, 
    FetchAllTasks,
    tasks, 
    setTasks,
    fetchTasks,
    updateTask 
  } = useSprint();

  const {evidenceCards, fetchEvidenceCards}=useEvidence()
  const router = useRouter();
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  
  useEffect(()=>{
    if (!id) return
    const fetchAll = async () => {
      try {
        await Promise.all([
          fetchTemplatesById(id.toString()),
          fetchEvidenceCards(),
          fetchTasks(id.toString())
        ]);
      } catch (err) {
        console.error("Error loading sprint data:", err);
      }
    };
    fetchAll()
  }, [id]);

  const toggleTask = (taskId: string) => {
    const updatedTasks = tasks.map((task: Task) => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    updateTask(id?.toString()||"",updatedTasks)
    setTasks(updatedTasks);
  };
  console.log("Active Templates:", activeTemplates);
  const completedTasks = tasks.filter(t => t.completed).length;
  const progress = Math.round((completedTasks / tasks.length) * 100);

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-480 mx-auto px-6 lg:px-12">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-secondary/20 rounded w-1/3" />
            <div className="h-4 bg-secondary/20 rounded w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (!activeTemplates) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-480 mx-auto px-6 lg:px-12 text-center">
          <h1 className="font-heading text-2xl text-primary mb-4">Sprint Not Found</h1>
          <Link href={"/dashboard"}>
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-480 mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-8">
          <Link href={"/dashboard"}>
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex-1">
              <h1 className="font-heading text-4xl lg:text-5xl text-primary mb-2">
                {activeTemplates.sprintName}
              </h1>
              <p className="font-paragraph text-base text-foreground/70">
                {activeTemplates.description}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-chart-2 text-primary capitalize">
                {activeTemplates.status}
              </Badge>
              {activeTemplates.difficultyLevel && (
                <Badge variant="outline" className="capitalize">
                  {activeTemplates.difficultyLevel}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <span className="font-paragraph text-sm text-foreground/60">Sprint Progress</span>
              <span className="font-heading text-2xl text-primary">{progress}%</span>
            </div>
            <Progress value={progress} className="h-3 mb-4" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-primary/10">
              <div>
                <p className="font-paragraph text-xs text-foreground/60 mb-1">Tasks</p>
                <p className="font-paragraph text-sm text-primary">{completedTasks}/{tasks.length}</p>
              </div>
              <div>
                <p className="font-paragraph text-xs text-foreground/60 mb-1">Evidence Cards</p>
                <p className="font-paragraph text-sm text-primary">{evidenceCards.length}</p>
              </div>
              {activeTemplates.startDate && (
                <div>
                  <p className="font-paragraph text-xs text-foreground/60 mb-1">Started</p>
                  <p className="font-paragraph text-sm text-primary">
                    {format(new Date(activeTemplates.startDate), 'MMM d, yyyy')}
                  </p>
                </div>
              )}
              {activeTemplates.endDate && (
                <div>
                  <p className="font-paragraph text-xs text-foreground/60 mb-1">Due Date</p>
                  <p className="font-paragraph text-sm text-primary">
                    {format(new Date(activeTemplates.endDate), 'MMM d, yyyy')}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Main Content - 2 Column Layout (Mobile: Single Column) */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Tasks */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="tasks" className="w-full">
              <TabsList className="bg-background border border-primary/10 mb-6 w-65">
                <TabsTrigger value="tasks" className="font-paragraph">Tasks</TabsTrigger>
                <TabsTrigger value="evidence" className="font-paragraph">Evidence Cards</TabsTrigger>
              </TabsList>

              <TabsContent value="tasks" className="mt-0">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="font-heading text-2xl text-primary">Task List</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {tasks.length === 0 ? (
                      <div className="text-center py-12">
                        <CheckCircle2 className="w-12 h-12 text-foreground/30 mx-auto mb-4" />
                        <h3 className="font-heading text-lg text-primary mb-2">No Tasks Yet</h3>
                        <p className="font-paragraph text-sm text-foreground/70 mb-6">
                          Add tasks to track your sprint progress
                        </p>
                        <Button onClick={()=>{
                            FetchAllTasks(id?.toString()||"")
                          }
                          } size="sm" className="rounded-full">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Your First Task
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {tasks.map(task => (
                          <div key={task.id} className="flex items-center justify-between p-4 border border-primary/10 rounded-lg">
                            <p className="font-paragraph text-sm text-primary">{task.title}</p>
                            <input onClick={() => toggleTask(task.id)} type="checkbox" checked={task.completed} readOnly />
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="evidence" className="mt-0">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="font-heading text-2xl text-primary">Evidence Cards</CardTitle>
                      <Link href={`/sprint/${id}/evidence/create`}>
                        <Button size="sm" className="bg-primary text-primary-foreground rounded-full">
                          <Plus className="w-4 h-4 mr-2" />
                          Create Card
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {evidenceCards.length === 0 ? (
                      <div className="text-center py-12">
                        <Code2 className="w-12 h-12 text-foreground/30 mx-auto mb-4" />
                        <h3 className="font-heading text-lg text-primary mb-2">No Evidence Cards Yet</h3>
                        <p className="font-paragraph text-sm text-foreground/70 mb-6">
                          Document your work with evidence cards
                        </p>
                        <Link href={`/sprint/${id}/evidence/create`}>
                          <Button size="sm" className="rounded-full">
                            <Plus className="w-4 h-4 mr-2" />
                            Create Your First Card
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-2 gap-4">
                        {evidenceCards.map(card => (
                          <Link key={card._id} href={`/dashboard/sprint/evidence/${card._id}`}>
                            <Card className="hover:border-primary/20 transition-colors h-full">
                              {card.mainImage && (
                                <div className="aspect-video bg-secondary/10 rounded-t-lg overflow-hidden">
                                  <Image className="w-full h-full object-cover" />
                                </div>
                              )}
                              <CardHeader>
                                <CardTitle className="font-heading text-lg text-primary line-clamp-1">
                                  {card.title}
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="font-paragraph text-sm text-foreground/70 line-clamp-2 mb-3">
                                  {card.summary}
                                </p>
                                {card.performanceMetric !== undefined && (
                                  <div className="flex items-center gap-2 text-xs text-foreground/60">
                                    <TrendingUp className="w-3.5 h-3.5" />
                                    <span className="font-paragraph">Metric: {card.performanceMetric}</span>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - AI Assistant & Info */}
          <div className="space-y-6 lg:mt-16">
            {/* AI Assistant */}
            <Card className="bg-secondary/10 border-secondary/30">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <CardTitle className="font-heading text-xl text-primary">AI Assistant</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-paragraph text-sm text-foreground/70">
                  Get help with your sprint tasks, code suggestions, and learning resources.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full rounded-full"
                  onClick={() => setShowAiAssistant(!showAiAssistant)}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {showAiAssistant ? 'Hide Assistant' : 'Show Assistant'}
                </Button>
                {showAiAssistant && (
                  <div className="p-4 bg-background rounded-lg border border-primary/10">
                    <p className="font-paragraph text-xs text-foreground/60">
                      AI assistant features coming soon. Get personalized guidance and code generation.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-xl text-primary">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                  <Button onClick={() => router.push(`/dashboard/sprint/evidence/create`)} variant="outline" size="sm" className="w-full justify-start rounded-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Evidence Card
                  </Button>
                <Button onClick={()=>{
                    FetchAllTasks(id?.toString()||"")
                  }
                  } variant="outline" size="sm" className="w-full justify-start rounded-full">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Get AI-Generated Tasks
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start rounded-full">
                  <Code2 className="w-4 h-4 mr-2" />
                  Add Code Snippet
                </Button>
              </CardContent>
            </Card>

            {/* Sprint Info */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-xl text-primary">Sprint Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {activeTemplates.templateName && (
                  <div>
                    <p className="font-paragraph text-xs text-foreground/60 mb-1">Template</p>
                    <p className="font-paragraph text-sm text-primary">{activeTemplates.templateName}</p>
                  </div>
                )}
                {activeTemplates.creatorName && (
                  <div>
                    <p className="font-paragraph text-xs text-foreground/60 mb-1">Created By</p>
                    <p className="font-paragraph text-sm text-primary">{activeTemplates.creatorName.name}</p>
                  </div>
                )}
                {activeTemplates._createdDate && (
                  <div>
                    <p className="font-paragraph text-xs text-foreground/60 mb-1">Created On</p>
                    <p className="font-paragraph text-sm text-primary">
                      {format(new Date(activeTemplates._createdDate), 'MMM d, yyyy')}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Floating AI Button (Mobile Only) */}
        <button
          onClick={() => setShowAiAssistant(!showAiAssistant)}
          className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center z-50 hover:bg-primary/90 transition-colors"
        >
          <Sparkles className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
