'use client'
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Target, Clock, CheckCircle2, Layers } from 'lucide-react';
import { SprintTemplates } from '@/type/intex';
import Router from 'next/router';
import { useSprint } from '@/hooks/use-sprint';

export default function TemplatesPage() {
  const {templates,fetchTemplates,loading}=useSprint()

  useEffect(() => {
    fetchTemplates();
  }, []);

  const getDifficultyColor = (level?: string) => {
    switch (level?.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-chart-1 text-primary';
      case 'advanced':
        return 'bg-chart-2 text-primary';
      default:
        return 'bg-secondary/20 text-primary';
    }
  };

  const activeTemplates = templates.filter(t => t.isActive);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl lg:text-6xl text-primary mb-4">
            Sprint Templates
          </h1>
          <p className="font-paragraph text-lg text-foreground/70 max-w-2xl mx-auto">
            Choose from curated sprint templates to accelerate your learning journey
          </p>
        </div>

        {/* Templates Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <Card key={i} className="animate-pulse">
                <CardContent className="pt-6">
                  <div className="h-4 bg-secondary/20 rounded w-3/4 mb-4" />
                  <div className="h-3 bg-secondary/20 rounded w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : activeTemplates.length === 0 ? (
          <Card>
            <CardContent className="pt-12 pb-12 text-center">
              <Layers className="w-12 h-12 text-foreground/30 mx-auto mb-4" />
              <h3 className="font-heading text-xl text-primary mb-2">No Templates Available</h3>
              <p className="font-paragraph text-sm text-foreground/70">
                Check back soon for new sprint templates
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeTemplates.map(template => (
              <Card key={template._id} className="hover:border-primary/20 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 rounded-xl bg-chart-2 flex items-center justify-center">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    {template.isActive && (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="font-heading text-2xl text-primary">
                    {template.templateName}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="font-paragraph text-sm text-foreground/70 line-clamp-3">
                    {template.shortDescription || 'No description available'}
                  </p>

                  {/* Metadata */}
                  <div className="flex flex-wrap gap-2">
                    {template.difficultyLevel && (
                      <Badge className={`font-paragraph  text-xs ${getDifficultyColor(template.difficultyLevel)}`}>
                        {template.difficultyLevel}
                      </Badge>
                    )}
                    {template.estimatedDurationDays && (
                      <Badge variant="outline" className="font-paragraph text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {template.estimatedDurationDays} days
                      </Badge>
                    )}
                  </div>

                  {/* Deliverables */}
                  {template.deliverablesDescription && (
                    <div className="pt-3 border-t border-primary/10">
                      <p className="font-paragraph text-xs text-foreground/60 mb-2">Deliverables:</p>
                      <p className="font-paragraph text-sm text-primary line-clamp-2">
                        {template.deliverablesDescription}
                      </p>
                    </div>
                  )}

                  <Button 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full"
                    onClick={() => Router.push('/sprint/create')}
                  >
                    Use This Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Info Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="font-heading text-xl text-primary">Structured Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-paragraph text-sm text-foreground/70">
                Each template provides a clear roadmap with defined goals and deliverables
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-softyellowaccent flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="font-heading text-xl text-primary">Time-Boxed</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-paragraph text-sm text-foreground/70">
                Templates include estimated durations to help you plan your learning schedule
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center mb-4">
                <Layers className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="font-heading text-xl text-primary">Customizable</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-paragraph text-sm text-foreground/70">
                Start with a template and customize it to match your specific learning goals
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
