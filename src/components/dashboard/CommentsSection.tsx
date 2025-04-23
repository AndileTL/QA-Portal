import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { Comment } from '../../types';

interface CommentsSectionProps {
  comments: Comment[];
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ comments }) => {
  // Sort comments by date (most recent first)
  const sortedComments = [...comments].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  // Track which comments have response inputs open
  const [activeResponses, setActiveResponses] = useState<Record<string, string>>({});
  
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Determine badge type based on related item
  const getBadgeType = (comment: Comment) => {
    if (!comment.relatedTo) return null;
    
    switch (comment.relatedTo.type) {
      case 'qa':
        return { variant: 'info' as const, label: 'QA Evaluation' };
      case 'merit':
        return { variant: 'success' as const, label: 'Merit' };
      case 'demerit':
        return { variant: 'danger' as const, label: 'Demerit' };
      default:
        return null;
    }
  };
  
  // Handle response input change
  const handleResponseChange = (commentId: string, value: string) => {
    setActiveResponses({
      ...activeResponses,
      [commentId]: value
    });
  };
  
  // Toggle response input visibility
  const toggleResponse = (commentId: string) => {
    const newResponses = { ...activeResponses };
    
    if (newResponses[commentId]) {
      delete newResponses[commentId];
    } else {
      newResponses[commentId] = '';
    }
    
    setActiveResponses(newResponses);
  };
  
  // Handle response submission (mock)
  const handleSubmitResponse = (commentId: string) => {
    // In a real app, this would send the response to an API
    console.log(`Submitting response for comment ${commentId}: ${activeResponses[commentId]}`);
    
    // Clear the input
    setActiveResponses({
      ...activeResponses,
      [commentId]: ''
    });
    
    // For now, just hide the response input
    toggleResponse(commentId);
  };

  return (
    <Card title="Comments & Feedback" className="h-full">
      <div className="space-y-6">
        {sortedComments.length > 0 ? (
          <div className="space-y-4">
            {sortedComments.map((comment) => {
              const badgeInfo = getBadgeType(comment);
              
              return (
                <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center mb-1">
                        <p className="text-sm font-medium text-gray-900 mr-2">{comment.author}</p>
                        <p className="text-xs text-gray-500">{formatDate(comment.date)}</p>
                        
                        {badgeInfo && (
                          <Badge 
                            variant={badgeInfo.variant}
                            className="ml-2"
                          >
                            {badgeInfo.label}
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-700">{comment.content}</p>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => toggleResponse(comment.id)}
                      leftIcon={<MessageSquare size={14} />}
                    >
                      Reply
                    </Button>
                  </div>
                  
                  {/* Responses */}
                  {comment.responses && comment.responses.length > 0 && (
                    <div className="mt-3 pl-4 border-l-2 border-gray-200 space-y-3">
                      {comment.responses.map((response) => (
                        <div key={response.id} className="bg-white rounded p-3">
                          <div className="flex items-center mb-1">
                            <p className="text-sm font-medium text-gray-900 mr-2">{response.author}</p>
                            <p className="text-xs text-gray-500">{formatDate(response.date)}</p>
                          </div>
                          <p className="text-sm text-gray-700">{response.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Response Input */}
                  {activeResponses[comment.id] !== undefined && (
                    <div className="mt-3 pl-4 border-l-2 border-gray-200">
                      <div className="bg-white rounded p-3">
                        <div className="flex items-center mb-2">
                          <p className="text-sm font-medium text-gray-900">Your Response</p>
                        </div>
                        <div className="flex">
                          <textarea
                            className="flex-1 p-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                            rows={2}
                            placeholder="Type your response..."
                            value={activeResponses[comment.id]}
                            onChange={(e) => handleResponseChange(comment.id, e.target.value)}
                          />
                          <Button
                            variant="primary"
                            className="ml-2 self-end"
                            onClick={() => handleSubmitResponse(comment.id)}
                            leftIcon={<Send size={14} />}
                          >
                            Send
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-500">No comments or feedback available yet.</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default CommentsSection;