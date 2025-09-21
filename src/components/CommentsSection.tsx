import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, Send, ThumbsUp, Flag, Clock } from "lucide-react";

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  isVerified?: boolean;
}

const CommentsSection = () => {
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "Dr. Sarah Johnson",
      content: "Thank you for providing such comprehensive information about COVID-19 safety measures. This resource has been invaluable for educating my patients.",
      timestamp: "2 hours ago",
      likes: 24,
      isVerified: true
    },
    {
      id: "2", 
      author: "Mike Chen",
      content: "The testing center locator helped me find a convenient location near my workplace. Got tested quickly and received results within 24 hours!",
      timestamp: "5 hours ago",
      likes: 12
    },
    {
      id: "3",
      author: "Jennifer Martinez",
      content: "Great resource for staying updated on vaccination information. The guidelines are clear and easy to understand.",
      timestamp: "1 day ago",
      likes: 8
    },
    {
      id: "4",
      author: "Robert Kim",
      content: "The prevention tips section is particularly helpful. I've shared this website with my family and colleagues.",
      timestamp: "2 days ago",
      likes: 15
    }
  ]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) {
      toast({
        title: "Comment Required",
        description: "Please enter a comment before submitting.",
        variant: "destructive"
      });
      return;
    }

    if (newComment.length < 10) {
      toast({
        title: "Comment Too Short",
        description: "Please enter at least 10 characters.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const comment: Comment = {
        id: Date.now().toString(),
        author: "Anonymous User",
        content: newComment,
        timestamp: "Just now",
        likes: 0
      };

      setComments(prev => [comment, ...prev]);
      setNewComment("");
      setIsSubmitting(false);

      toast({
        title: "Comment Posted",
        description: "Your comment has been successfully posted!",
      });
    }, 1000);
  };

  const handleLike = (commentId: string) => {
    setComments(prev => 
      prev.map(comment => 
        comment.id === commentId 
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      )
    );
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <section className="py-20 bg-muted/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground flex items-center justify-center gap-3">
            <MessageCircle className="w-8 h-8 text-primary" />
            Community Feedback
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Share your experiences and help others stay informed about COVID-19 safety measures.
          </p>
        </div>

        {/* Comment Form */}
        <Card className="p-6 mb-8 shadow-lg border-primary/20">
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <div>
              <Label htmlFor="comment" className="text-lg font-medium">
                Share Your Experience
              </Label>
              <p className="text-sm text-muted-foreground mb-3">
                Tell us about your experience with COVID-19 resources, testing, or safety measures.
              </p>
              <Textarea
                id="comment"
                placeholder="Share your thoughts, experiences, or ask questions about COVID-19 safety measures..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[120px] resize-none"
                maxLength={1000}
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-muted-foreground">
                  Minimum 10 characters required
                </span>
                <span className={`text-sm ${newComment.length > 900 ? 'text-warning' : 'text-muted-foreground'}`}>
                  {newComment.length}/1000
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Comments are moderated and will be reviewed before posting.
              </p>
              <Button 
                type="submit" 
                disabled={isSubmitting || newComment.length < 10}
                className="flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? "Posting..." : "Post Comment"}
              </Button>
            </div>
          </form>
        </Card>

        {/* Comments List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold text-foreground">
              Recent Comments ({comments.length})
            </h3>
            <Badge variant="outline" className="text-sm">
              <Clock className="w-4 h-4 mr-1" />
              Updated in real-time
            </Badge>
          </div>

          {comments.map((comment, index) => (
            <Card 
              key={comment.id} 
              className="p-6 hover:shadow-md transition-shadow animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {getInitials(comment.author)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-foreground">{comment.author}</h4>
                    {comment.isVerified && (
                      <Badge variant="secondary" className="text-xs">
                        Verified Healthcare Professional
                      </Badge>
                    )}
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{comment.timestamp}</span>
                  </div>
                  
                  <p className="text-foreground mb-4 leading-relaxed">
                    {comment.content}
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(comment.id)}
                      className="text-muted-foreground hover:text-primary"
                    >
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      {comment.likes}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Flag className="w-4 h-4 mr-1" />
                      Report
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Load More Comments
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CommentsSection;