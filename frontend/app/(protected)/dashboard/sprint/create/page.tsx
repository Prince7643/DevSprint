'use client'
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Sparkles, Target, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { useSprint } from '@/hooks/use-sprint';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function CreateSprintPage() {
  const {
    handleSubmit,
    formData,
    templates,
    handleTemplateSelect,
    setFormData,
    creating,
    fetchTemplates,
    loading
  }=useSprint()

  useEffect(() => {
    fetchTemplates();
  }, []);
  const Router = useRouter();
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-400rem mx-auto px-6 lg:px-12">
        <div className="mb-8">
          <h1 className="font-heading text-4xl lg:text-5xl text-primary mb-2">Create New Sprint</h1>
          <p className="font-paragraph text-base text-foreground/70">
            Design your learning journey with a structured sprint
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-2xl text-primary">Sprint Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Template Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="template" className="font-paragraph text-sm text-primary">
                      Choose Template (Optional)
                    </Label>
                    <Select value={formData.templateId} onValueChange={handleTemplateSelect}>
                      <SelectTrigger id="template">
                        <SelectValue placeholder="Start from scratch or select a template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Custom Sprint</SelectItem>
                        {templates.map(template => (
                          <SelectItem key={template._id} value={template._id}>
                            {template.templateName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Sprint Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-paragraph text-sm text-primary">
                      Sprint Name *
                    </Label>
                    <Input
                      id="name"
                      required
                      value={formData.sprintName}
                      onChange={(e) => setFormData(prev => ({ ...prev, sprintName: e.target.value }))}
                      placeholder="e.g., React Fundamentals Sprint"
                      className="font-paragraph"
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description" className="font-paragraph text-sm text-primary">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe your sprint goals and deliverables..."
                      rows={4}
                      className="font-paragraph"
                    />
                  </div>

                  {/* Difficulty Level */}
                  <div className="space-y-2">
                    <Label htmlFor="difficulty" className="font-paragraph text-sm text-primary">
                      Difficulty Level
                    </Label>
                    <Select 
                      value={formData.difficultyLevel} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, difficultyLevel: value }))}
                    >
                      <SelectTrigger id="difficulty">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date Range */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-paragraph text-sm text-primary">Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start font-paragraph">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {format(formData.startDate, 'PPP')}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.startDate}
                            onSelect={(date) => date && setFormData(prev => ({ ...prev, startDate: date }))}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label className="font-paragraph text-sm text-primary">End Date (Optional)</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start font-paragraph">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.endDate ? format(formData.endDate, 'PPP') : 'Select date'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.endDate}
                            onSelect={(date) => setFormData(prev => ({ ...prev, endDate: date }))}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      type="submit"
                      disabled={creating || !formData.sprintName}
                      className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 h-12 rounded-full"
                    >
                      {creating ? 'Creating...' : 'Create Sprint'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => Router.push('/dashboard')}
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
            {/* AI Assistant Card */}
            <Card className="bg-secondary/10 border-secondary/30">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <CardTitle className="font-heading text-xl text-primary">AI Assistant</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="font-paragraph text-sm text-foreground/70 mb-4">
                  Get AI-generated starter code and task suggestions for your sprint
                </p>
                <Button onClick={()=>toast.info('AI assistant features coming soon....')} variant="outline" size="sm" className="w-full rounded-full">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Ideas
                </Button>
              </CardContent>
            </Card>

            {/* Available Templates */}
            {!loading && templates.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-xl text-primary">Available Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {templates.slice(0, 3).map(template => (
                      <div 
                        key={template._id}
                        className="p-3 rounded-lg border border-primary/10 hover:border-primary/20 transition-colors cursor-pointer"
                        onClick={() => handleTemplateSelect(template._id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center shrink-0">
                            <Target className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-paragraph text-sm text-primary font-medium line-clamp-1">
                              {template.templateName}
                            </h4>
                            <p className="font-paragraph text-xs text-foreground/60 line-clamp-2 mt-1">
                              {template.shortDescription}
                            </p>
                            {template.estimatedDurationDays && (
                              <div className="flex items-center gap-1 mt-2 text-foreground/60">
                                <Clock className="w-3 h-3" />
                                <span className="font-paragraph text-xs">
                                  {template.estimatedDurationDays} days
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-xl text-primary">Sprint Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 font-paragraph text-sm text-foreground/70">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Keep sprints focused and time-boxed</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Define clear deliverables upfront</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Document your progress regularly</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Use evidence cards to track learning</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
