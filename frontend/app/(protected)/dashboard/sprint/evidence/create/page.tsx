'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Upload, Code2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Router from 'next/router';
import { useEvidence } from '@/hooks/use-evidence';
export default function CreateEvidenceCardPage() {
  const { id: sprintId } = useParams();
  const { creating, setCreating, formData, setFormData, handleSubmit } = useEvidence();

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
        <div className="mb-8">
          <Link href={sprintId ? `/sprint/${sprintId}` : '/dashboard'}>
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="font-heading text-4xl lg:text-5xl text-primary mb-2">Create Evidence Card</h1>
          <p className="font-paragraph text-base text-foreground/70">
            Document your work and showcase your learning
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-2xl text-primary">Card Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title" className="font-paragraph text-sm text-primary">
                      Title *
                    </Label>
                    <Input
                      id="title"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., Implemented User Authentication"
                      className="font-paragraph"
                    />
                  </div>

                  {/* Summary */}
                  <div className="space-y-2">
                    <Label htmlFor="summary" className="font-paragraph text-sm text-primary">
                      Summary
                    </Label>
                    <Textarea
                      id="summary"
                      value={formData.summary}
                      onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                      placeholder="Describe what you built and what you learned..."
                      rows={4}
                      className="font-paragraph"
                    />
                  </div>

                  {/* Code Snippet */}
                  <div className="space-y-2">
                    <Label htmlFor="code" className="font-paragraph text-sm text-primary">
                      Code Snippet
                    </Label>
                    <Textarea
                      id="code"
                      value={formData.codeSnippet}
                      onChange={(e) => setFormData(prev => ({ ...prev, codeSnippet: e.target.value }))}
                      placeholder="Paste your code here..."
                      rows={8}
                      className="font-paragraph font-mono text-xs"
                    />
                  </div>

                  {/* Image URL */}
                  <div className="space-y-2">
                    <Label htmlFor="image" className="font-paragraph text-sm text-primary">
                      Screenshot/Image URL
                    </Label>
                    <Input
                      id="image"
                      type="url"
                      value={formData.mainImage}
                      onChange={(e) => setFormData(prev => ({ ...prev, mainImage: e.target.value }))}
                      placeholder="https://example.com/screenshot.png"
                      className="font-paragraph"
                    />
                    <p className="font-paragraph text-xs text-foreground/60">
                      Provide a URL to a screenshot or demo image
                    </p>
                  </div>

                  {/* Video URL */}
                  <div className="space-y-2">
                    <Label htmlFor="video" className="font-paragraph text-sm text-primary">
                      Video Demo URL
                    </Label>
                    <Input
                      id="video"
                      type="url"
                      value={formData.videoUrl}
                      onChange={(e) => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
                      placeholder="https://youtube.com/watch?v=..."
                      className="font-paragraph"
                    />
                  </div>

                  {/* Performance Metric */}
                  <div className="space-y-2">
                    <Label htmlFor="metric" className="font-paragraph text-sm text-primary">
                      Performance Metric
                    </Label>
                    <Input
                      id="metric"
                      type="number"
                      step="0.01"
                      value={formData.performanceMetric}
                      onChange={(e) => setFormData(prev => ({ ...prev, performanceMetric: e.target.value }))}
                      placeholder="e.g., 95.5 (test coverage %)"
                      className="font-paragraph"
                    />
                    <p className="font-paragraph text-xs text-foreground/60">
                      Optional: Add a quantifiable metric (e.g., test coverage, performance score)
                    </p>
                  </div>

                  {/* Skill Tags */}
                  <div className="space-y-2">
                    <Label htmlFor="tags" className="font-paragraph text-sm text-primary">
                      Skill Tags
                    </Label>
                    <Input
                      id="tags"
                      value={formData.skillTags}
                      onChange={(e) => setFormData(prev => ({ ...prev, skillTags: e.target.value }))}
                      placeholder="React, TypeScript, Authentication"
                      className="font-paragraph"
                    />
                    <p className="font-paragraph text-xs text-foreground/60">
                      Comma-separated list of skills demonstrated
                    </p>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      type="submit"
                      disabled={creating || !formData.title}
                      className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 h-12 rounded-full"
                    >
                      {creating ? 'Creating...' : 'Create Evidence Card'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => Router.push(sprintId ? `/sprint/${sprintId}` : '/dashboard')}
                      className="h-12 rounded-full"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upload Tips */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-primary" />
                  <CardTitle className="font-heading text-xl text-primary">Upload Tips</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 font-paragraph text-sm text-foreground/70">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Use clear, high-quality screenshots</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Include before/after comparisons</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Add code snippets with context</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Tag relevant skills for tracking</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Code Snippet Guide */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-primary" />
                  <CardTitle className="font-heading text-xl text-primary">Code Best Practices</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 font-paragraph text-sm text-foreground/70">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Keep snippets focused and concise</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Add comments to explain logic</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Show your problem-solving approach</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Highlight key learning moments</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Example Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-xl text-primary">Example Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 font-paragraph text-sm text-foreground/70">
                  <p>• Test coverage: 95%</p>
                  <p>• Performance score: 98</p>
                  <p>• Load time: 1.2s</p>
                  <p>• Code quality: A+</p>
                  <p>• Accessibility: 100</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
