'use client'
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Play } from 'lucide-react';
import { Image } from 'lucide-react';
import { PublicProjects } from '@/type/intex';
import Link from 'next/dist/client/link';

export default function PortfolioPage() {
  const [projects, setProjects] = useState<PublicProjects[]>([]);
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-480rem mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl lg:text-6xl text-primary mb-4">
            Public Portfolio
          </h1>
          <p className="font-paragraph text-lg text-foreground/70 max-w-2xl mx-auto">
            Explore completed projects and developer achievements
          </p>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <Card key={i} className="animate-pulse">
                <div className="aspect-video bg-secondary/20" />
                <CardContent className="pt-6">
                  <div className="h-4 bg-secondary/20 rounded w-3/4 mb-4" />
                  <div className="h-3 bg-secondary/20 rounded w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <Card>
            <CardContent className="pt-12 pb-12 text-center">
              <Play className="w-12 h-12 text-foreground/30 mx-auto mb-4" />
              <h3 className="font-heading text-xl text-primary mb-2">No Projects Yet</h3>
              <p className="font-paragraph text-sm text-foreground/70">
                Public projects will appear here once they are published
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(project => (
              <Card key={project._id} className="hover:border-primary/20 transition-colors overflow-hidden group">
                {/* Cover Image */}
                {project.coverImage ? (
                  <div className="aspect-video bg-secondary/10 overflow-hidden">
                    <Image 
                       
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      width={400}
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-secondary/10 flex items-center justify-center">
                    <Play className="w-12 h-12 text-primary/30" />
                  </div>
                )}

                <CardHeader>
                  <CardTitle className="font-heading text-xl text-primary line-clamp-1">
                    {project.projectTitle}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="font-paragraph text-sm text-foreground/70 line-clamp-3">
                    {project.projectOverview}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/portfolio/${project._id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full rounded-full">
                        View Details
                      </Button>
                    </Link>
                    {project.liveProjectUrl && (
                      <a 
                        href={project.liveProjectUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Button variant="ghost" size="sm" className="rounded-full">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </a>
                    )}
                    {project.codeRepositoryUrl && (
                      <a 
                        href={project.codeRepositoryUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Button variant="ghost" size="sm" className="rounded-full">
                          <Github className="w-4 h-4" />
                        </Button>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
