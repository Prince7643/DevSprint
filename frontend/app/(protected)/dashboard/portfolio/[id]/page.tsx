'use client'
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink, Github, Play } from 'lucide-react';
import { Image } from 'lucide-react';
import { useParams } from 'next/navigation';
import { PublicProjects } from '@/type/intex';
import Link from 'next/link';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState<PublicProjects | null>(null);
  const [loading, setLoading] = useState(true);

{/**  useEffect(() => {
    if (id) {
      loadProject();
    }
  }, [id]);

  const loadProject = async () => {
    try {
      const projectData = await BaseCrudService.getById<PublicProjects>('publicprojects', id!);
      setProject(projectData);
    } catch (error) {
      console.error('Error loading project:', error);
    } finally {
      setLoading(false);
    }
  };
 */}
  if (loading) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-400 mx-auto px-6 lg:px-12">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-secondary/20 rounded w-1/3" />
            <div className="h-4 bg-secondary/20 rounded w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-400 mx-auto px-6 lg:px-12 text-center">
          <h1 className="font-heading text-2xl text-primary mb-4">Project Not Found</h1>
          <Link href={"/portfolio"}>
            <Button>Back to Portfolio</Button>
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
          <Link href={"/portfolio"}>
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Button>
          </Link>
          <h1 className="font-heading text-4xl lg:text-6xl text-primary mb-4">
            {project.projectTitle}
          </h1>
          <div className="flex flex-wrap gap-3">
            {project.liveProjectUrl && (
              <a 
                href={project.liveProjectUrl} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Live Project
                </Button>
              </a>
            )}
            {project.codeRepositoryUrl && (
              <a 
                href={project.codeRepositoryUrl} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="rounded-full">
                  <Github className="w-4 h-4 mr-2" />
                  View Code
                </Button>
              </a>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cover Image */}
            {project.coverImage && (
              <Card>
                <CardContent className="pt-6">
                  <div className="aspect-video bg-secondary/10 rounded-lg overflow-hidden">
                    <Image 
                      className="w-full h-full object-cover"
                      width={800}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Project Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-2xl text-primary">Project Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-paragraph text-base text-foreground/70 whitespace-pre-wrap">
                  {project.projectOverview || 'No overview available.'}
                </p>
              </CardContent>
            </Card>

            {/* Video Summary */}
            {project.summaryVideoUrl && (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Play className="w-5 h-5 text-primary" />
                    <CardTitle className="font-heading text-2xl text-primary">Video Summary</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <a 
                    href={project.summaryVideoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="font-paragraph text-sm">Watch Project Walkthrough</span>
                  </a>
                </CardContent>
              </Card>
            )}

            {/* Key Features Section */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-2xl text-primary">Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 font-paragraph text-base text-foreground/70">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Full-stack implementation with modern technologies</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Responsive design for all devices</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Comprehensive testing and documentation</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Production-ready deployment</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-xl text-primary">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {project.liveProjectUrl && (
                  <a 
                    href={project.liveProjectUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button variant="outline" size="sm" className="w-full justify-start rounded-full">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                  </a>
                )}
                {project.codeRepositoryUrl && (
                  <a 
                    href={project.codeRepositoryUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button variant="outline" size="sm" className="w-full justify-start rounded-full">
                      <Github className="w-4 h-4 mr-2" />
                      Source Code
                    </Button>
                  </a>
                )}
                {project.summaryVideoUrl && (
                  <a 
                    href={project.summaryVideoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button variant="outline" size="sm" className="w-full justify-start rounded-full">
                      <Play className="w-4 h-4 mr-2" />
                      Video Demo
                    </Button>
                  </a>
                )}
              </CardContent>
            </Card>

            {/* Technologies */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-xl text-primary">Technologies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="font-paragraph">React</Badge>
                  <Badge variant="secondary" className="font-paragraph">TypeScript</Badge>
                  <Badge variant="secondary" className="font-paragraph">Node.js</Badge>
                  <Badge variant="secondary" className="font-paragraph">Tailwind CSS</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Project Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-xl text-primary">Project Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-paragraph text-xs text-foreground/60 mb-1">Status</p>
                  <Badge className="bg-green-100 text-green-800">Completed</Badge>
                </div>
                {project._createdDate && (
                  <div>
                    <p className="font-paragraph text-xs text-foreground/60 mb-1">Published</p>
                    <p className="font-paragraph text-sm text-primary">
                      {new Date(project._createdDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="font-heading text-xl text-primary">Interested?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-paragraph text-sm text-foreground/70 mb-4">
                  Want to build something similar or collaborate on a project?
                </p>
                <Link href={"/"}>
                  <Button className="w-full bg-primary text-primary-foreground rounded-full">
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
