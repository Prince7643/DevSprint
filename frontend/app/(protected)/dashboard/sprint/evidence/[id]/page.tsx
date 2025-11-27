'use client'
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, TrendingUp, ExternalLink, Code2 } from 'lucide-react';
import { format } from 'date-fns';
import { Image } from 'lucide-react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useEvidence } from '@/hooks/use-evidence';

export default function EvidenceCardDetailPage() {
  const { id } = useParams();
  const { card, loading, fetchEvidenceCardById, setLoading } = useEvidence();
  console.log("Evidence Card Data:", card);
  useEffect(() => {
    if (id) {
      fetchEvidenceCardById(id.toString());
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-secondary/20 rounded w-1/3" />
            <div className="h-4 bg-secondary/20 rounded w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12 text-center">
          <h1 className="font-heading text-2xl text-primary mb-4">Evidence Card Not Found</h1>
          <Link href={"/dashboard"}>
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  const skillTags = card.skillTags?.split(',').map(tag => tag.trim()).filter(Boolean) || [];
  console.log("Skill Tags:", skillTags);
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-8">
          <Link href={"/dashboard"}>
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="font-heading text-4xl lg:text-5xl text-primary mb-4">
            {card.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4">
            {card.creationDate && (
              <div className="flex items-center gap-2 text-foreground/60">
                <Calendar className="w-4 h-4" />
                <span className="font-paragraph text-sm">
                  {format(new Date(card.creationDate), 'MMMM d, yyyy')}
                </span>
              </div>
            )}
            {card.performanceMetric !== undefined && (
              <div className="flex items-center gap-2 text-foreground/60">
                <TrendingUp className="w-4 h-4" />
                <span className="font-paragraph text-sm">
                  Metric: {card.performanceMetric}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Image */}
            {card.mainImage && (
              <Card>
                <CardContent className="pt-6">
                  <div className="aspect-video bg-secondary/10 rounded-lg overflow-hidden">
                    <Image className="w-full h-full object-cover" />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Summary */}
            {card.summary && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-2xl text-primary">Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-paragraph text-base text-foreground/70 whitespace-pre-wrap">
                    {card.summary}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Code Snippet */}
            {card.codeSnippet && (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-primary" />
                    <CardTitle className="font-heading text-2xl text-primary">Code Snippet</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <pre className="bg-primary/5 p-4 rounded-lg overflow-x-auto">
                    <code className="font-mono text-sm text-primary whitespace-pre">
                      {card.codeSnippet}
                    </code>
                  </pre>
                </CardContent>
              </Card>
            )}

            {/* Video */}
            {card.videoUrl && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-2xl text-primary">Video Demo</CardTitle>
                </CardHeader>
                <CardContent>
                  <a 
                    href={card.videoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="font-paragraph text-sm">Watch Video Demo</span>
                  </a>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Skill Tags */}
            {skillTags.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-xl text-primary">Skills Demonstrated</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {[skillTags].map((tag, index) => (
                      <Badge key={index} variant="secondary" className="font-paragraph">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Metrics */}
            {card.performanceMetric !== undefined && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-xl text-primary">Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <div className="w-24 h-24 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                      <span className="font-heading text-3xl text-primary">
                        {card.performanceMetric}
                      </span>
                    </div>
                    <p className="font-paragraph text-sm text-foreground/70">
                      Performance Metric
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Metadata */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-xl text-primary">Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {card.creationDate && (
                  <div>
                    <p className="font-paragraph text-xs text-foreground/60 mb-1">Created</p>
                    <p className="font-paragraph text-sm text-primary">
                      {format(new Date(card.creationDate), 'MMMM d, yyyy')}
                    </p>
                  </div>
                )}
                {card._createdDate && (
                  <div>
                    <p className="font-paragraph text-xs text-foreground/60 mb-1">Added to System</p>
                    <p className="font-paragraph text-sm text-primary">
                      {format(new Date(card._createdDate), 'MMMM d, yyyy')}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
