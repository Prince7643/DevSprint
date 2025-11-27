'use client'
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code2, Database, Layout, Server, Smartphone, Star, ExternalLink } from 'lucide-react';
import { useSkill } from '@/hooks/use-skill';

export default function SkillMapPage() {
  const {loading,skills,fetchSkills}=useSkill()
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchSkills();
  }, []);


  const categories = Array.from(new Set(skills.map(s => s.category).filter(Boolean)));
  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(s => s.category === selectedCategory);

  const coreSkills = skills.filter(s => s.isCoreSkill);

  const getCategoryIcon = (category?: string) => {
    switch (category?.toLowerCase()) {
      case 'frontend':
        return <Layout className="w-5 h-5" />;
      case 'backend':
        return <Server className="w-5 h-5" />;
      case 'database':
        return <Database className="w-5 h-5" />;
      case 'mobile':
        return <Smartphone className="w-5 h-5" />;
      default:
        return <Code2 className="w-5 h-5" />;
    }
  };

  const getDifficultyColor = (level?: string) => {
    switch (level?.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-chart-2 text-primary';
      case 'advanced':
        return 'bg-chart-1 text-primary';
      default:
        return 'bg-secondary/20 text-primary';
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-heading text-4xl lg:text-5xl text-primary mb-2">Skill Map</h1>
          <p className="font-paragraph text-base text-foreground/70">
            Track your technical competencies and learning progress
          </p>
        </div>

        {/* Core Skills Highlight */}
        {coreSkills.length > 0 && (
          <Card className="mb-8 bg-primary/5 border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" />
                <CardTitle className="font-heading text-xl text-primary">Core Skills</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {coreSkills.map(skill => (
                  <Badge 
                    key={skill._id} 
                    variant="secondary"
                    className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {skill.skillName}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Skills Grid */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="mb-8 bg-background border border-primary/10">
            <TabsTrigger value="all" className="font-paragraph">All Skills</TabsTrigger>
            {categories.map(category => (
              <TabsTrigger key={category} value={category || ''} className="font-paragraph capitalize">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-0">
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="pt-6">
                      <div className="h-4 bg-secondary/20 rounded w-3/4 mb-4" />
                      <div className="h-3 bg-secondary/20 rounded w-1/2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredSkills.length === 0 ? (
              <Card>
                <CardContent className="pt-12 pb-12 text-center">
                  <Code2 className="w-12 h-12 text-foreground/30 mx-auto mb-4" />
                  <h3 className="font-heading text-xl text-primary mb-2">No Skills Found</h3>
                  <p className="font-paragraph text-sm text-foreground/70">
                    Start learning and add skills to your map
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSkills.map(skill => (
                  <Card key={skill._id} className="hover:border-primary/20 transition-colors">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center text-primary">
                          {getCategoryIcon(skill.category)}
                        </div>
                        {skill.isCoreSkill && (
                          <Star className="w-5 h-5 text-primary fill-primary" />
                        )}
                      </div>
                      <CardTitle className="font-heading text-xl text-primary">
                        {skill.skillName}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="font-paragraph text-sm text-foreground/70 line-clamp-3">
                        {skill.description || 'No description available'}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {skill.category && (
                          <Badge variant="outline" className="font-paragraph text-xs capitalize">
                            {skill.category}
                          </Badge>
                        )}
                        {skill.difficultyLevel && (
                          <Badge className={`font-paragraph text-xs ${getDifficultyColor(skill.difficultyLevel)}`}>
                            {skill.difficultyLevel}
                          </Badge>
                        )}
                      </div>

                      {skill.documentationUrl && (
                        <a 
                          href={skill.documentationUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-block"
                        >
                          <Button variant="outline" size="sm" className="w-full rounded-full">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Documentation
                          </Button>
                        </a>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Stats Summary */}
        <div className="grid md:grid-cols-4 gap-6 mt-12">
          <Card>
            <CardContent className="pt-6">
              <p className="font-paragraph text-sm text-foreground/60 mb-1">Total Skills</p>
              <p className="font-heading text-3xl text-primary">{skills.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <p className="font-paragraph text-sm text-foreground/60 mb-1">Core Skills</p>
              <p className="font-heading text-3xl text-primary">{coreSkills.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <p className="font-paragraph text-sm text-foreground/60 mb-1">Categories</p>
              <p className="font-heading text-3xl text-primary">{categories.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <p className="font-paragraph text-sm text-foreground/60 mb-1">Advanced</p>
              <p className="font-heading text-3xl text-primary">
                {skills.filter(s => s.difficultyLevel?.toLowerCase() === 'advanced').length}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
