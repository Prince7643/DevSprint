'use client'
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Plus, Calendar, Target, TrendingUp, Code2, Award, Clock } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/dist/client/link';
import { useSprint } from '@/hooks/use-sprint';

export default function DashboardPage() {
  const {userSprints,loading,fetchUserTemplates}=useSprint()

  const activeSprints = userSprints?.filter(s => s.status === 'active' || s.status === 'in-progress');
  const completedSprints = userSprints?.filter(s => s.status === 'completed');

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'active':
      case 'in-progress':
        return 'bg-chart-2 text-primary';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'planned':
        return 'bg-chart-1 text-primary';
      default:
        return 'bg-chart-2 text-primary';
    }
  };
  useEffect(()=>{
    fetchUserTemplates()
  },[])
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-480 mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h1 className="font-heading text-4xl lg:text-5xl text-primary mb-2">
              Welcome back, { 'Developer'}
            </h1>
            <p className="font-paragraph text-base text-foreground/70">
              Track your progress and manage your learning sprints
            </p>
          </div>
          <Link href={"/dashboard/sprint/create"} className="mt-4 md:mt-0">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-6 rounded-full">
              <Plus className="w-5 h-5 mr-2" />
              New Sprint
            </Button>
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-paragraph text-sm text-foreground/60 mb-1">Active Sprints</p>
                  <p className="font-heading text-3xl text-primary">{activeSprints.length}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-chart-2 flex items-center justify-center">
                  <Target className="w-6 h-6 text-black" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-paragraph text-sm text-foreground/60 mb-1">Completed</p>
                  <p className="font-heading text-3xl text-primary">{completedSprints.length}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-chart-1 flex items-center justify-center">
                  <Award className="w-6 h-6 text-black" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-paragraph text-sm text-foreground/60 mb-1">Total Sprints</p>
                  <p className="font-heading text-3xl text-primary">{userSprints.length}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-chart-2 flex items-center justify-center">
                  <Code2 className="w-6 h-6 text-black" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-paragraph text-sm text-foreground/60 mb-1">Avg Progress</p>
                  <p className="font-heading text-3xl text-primary">
                    {userSprints.length > 0 
                      ? Math.round(userSprints.reduce((acc, s) => acc + (s.progressPercentage || 0), 0) / userSprints.length)
                      : 0}%
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-chart-1 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-black" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Active Sprints */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-2xl text-primary">Active Sprints</h2>
              <Link href={"/dashboard/sprint/create"}>
                <Button
                 variant="outline" size="sm" className="rounded-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Sprint
                </Button>
              </Link>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="pt-6">
                      <div className="h-4 bg-secondary/20 rounded w-3/4 mb-4" />
                      <div className="h-3 bg-secondary/20 rounded w-1/2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : activeSprints.length === 0 ? (
              <Card>
                <CardContent className="pt-12 pb-12 text-center">
                  <Target className="w-12 h-12 text-foreground/30 mx-auto mb-4" />
                  <h3 className="font-heading text-xl text-primary mb-2">No Active Sprints</h3>
                  <p className="font-paragraph text-sm text-foreground/70 mb-6">
                    Start your first sprint to begin building your skills
                  </p>
                  <Link href={"dashboard/sprint/create"}>
                    <Button className="bg-primary text-primary-foreground rounded-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Your First Sprint
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {activeSprints.map(sprint => (
                  <Card key={sprint._id} className="hover:border-primary/20 transition-colors">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="font-heading text-xl text-primary mb-2">
                            {sprint.sprintName}
                          </CardTitle>
                          <p className="font-paragraph text-sm text-foreground/70 line-clamp-2">
                            {sprint.description}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-paragraph ${getStatusColor(sprint.status)}`}>
                          {sprint.status}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Progress */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-paragraph text-xs text-foreground/60">Progress</span>
                            <span className="font-paragraph text-xs text-primary font-medium">
                              {sprint.progressPercentage || 0}%
                            </span>
                          </div>
                          <Progress value={sprint.progressPercentage || 0} className="h-2 bg-chart-2" />
                        </div>

                        {/* Meta Info */}
                        <div className="flex flex-wrap gap-4 text-xs">
                          {sprint.difficultyLevel && (
                            <div className="flex items-center gap-1.5 text-foreground/60">
                              <Target className="w-3.5 h-3.5" />
                              <span className="font-paragraph capitalize">{sprint.difficultyLevel}</span>
                            </div>
                          )}
                          {sprint.startDate && (
                            <div className="flex items-center gap-1.5 text-foreground/60">
                              <Calendar className="w-3.5 h-3.5" />
                              <span className="font-paragraph">
                                {format(new Date(sprint.startDate), 'MMM d, yyyy')}
                              </span>
                            </div>
                          )}
                          {sprint.endDate && (
                            <div className="flex items-center gap-1.5 text-foreground/60">
                              <Clock className="w-3.5 h-3.5" />
                              <span className="font-paragraph">
                                Due {format(new Date(sprint.endDate), 'MMM d, yyyy')}
                              </span>
                            </div>
                          )}
                        </div>

                        <Link href={`/dashboard/sprint/${sprint._id}`}>
                          <Button variant="outline" size="sm" className="w-full rounded-full ">
                            Open Workspace
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Skill Map Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-xl text-primary">Skill Map</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-chart-2 rounded-xl mb-4 flex items-center justify-center">
                  <Code2 className="w-16 h-16 text-black" />
                </div>
                <p className="font-paragraph text-sm text-foreground/70 mb-4">
                  Visualize your skill progression and learning paths
                </p>
                <Link href={"/dashboard/skills"}>
                  <Button variant="outline" size="sm" className="w-full rounded-full">
                    View Full Map
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-xl text-primary">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <Link href={"/dashboard/sprint/create"}>
                  <Button variant="outline" size="sm" className="w-full justify-start rounded-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Sprint
                  </Button>
                </Link>
                <Link href={"/dashboard/portfolio"}>
                  <Button variant="outline" size="sm" className="w-full justify-start rounded-full">
                    <Award className="w-4 h-4 mr-2" />
                    View Portfolio
                  </Button>
                </Link>
                <Link href={"/dashboard/templates"}>
                  <Button variant="outline" size="sm" className="w-full justify-start rounded-full ">
                    <Code2 className="w-4 h-4 mr-2" />
                    Browse Templates
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            {completedSprints.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-xl text-black">Recently Completed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {completedSprints.slice(0, 3).map(sprint => (
                      <div key={sprint._id} className="pb-3 border-b border-primary/10 last:border-0 last:pb-0">
                        <Link href={`/sprint/${sprint._id}`}>
                          <p className="font-paragraph text-sm text-black hover:underline line-clamp-1">
                            {sprint.sprintName}
                          </p>
                          {sprint.endDate && (
                            <p className="font-paragraph text-xs text-foreground/60 mt-1">
                              {format(new Date(sprint.endDate), 'MMM d, yyyy')}
                            </p>
                          )}
                        </Link>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
