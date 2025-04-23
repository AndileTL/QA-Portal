import React from 'react';
import { Target, Check, XCircle, Clock } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { Goal } from '../../types';

interface GoalsSectionProps {
  goals: Goal[];
}

const GoalsSection: React.FC<GoalsSectionProps> = ({ goals }) => {
  // Sort goals by deadline (closest first)
  const sortedGoals = [...goals].sort(
    (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
  );
  
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Get badge variant based on goal status
  const getStatusBadge = (status: Goal['status']) => {
    switch (status) {
      case 'completed':
        return { variant: 'success' as const, icon: <Check size={12} />, label: 'Completed' };
      case 'in-progress':
        return { variant: 'info' as const, icon: <Clock size={12} />, label: 'In Progress' };
      case 'missed':
        return { variant: 'danger' as const, icon: <XCircle size={12} />, label: 'Missed' };
      case 'pending':
        return { variant: 'warning' as const, icon: <Clock size={12} />, label: 'Pending' };
      default:
        return { variant: 'secondary' as const, icon: null, label: status };
    }
  };
  
  // Calculate days until deadline
  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  return (
    <Card title="Performance Goals" className="h-full">
      <div className="space-y-4">
        {sortedGoals.length > 0 ? (
          sortedGoals.map((goal) => {
            const statusBadge = getStatusBadge(goal.status);
            const daysUntil = getDaysUntilDeadline(goal.deadline);
            const progressPercentage = Math.min(100, Math.round((goal.currentScore / goal.targetScore) * 100));
            
            return (
              <div key={goal.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center">
                    <Target className="h-5 w-5 text-blue-600 mr-2" />
                    <h4 className="text-sm font-medium text-gray-900">{goal.title}</h4>
                  </div>
                  <Badge
                    variant={statusBadge.variant}
                    className="flex items-center space-x-1"
                  >
                    {statusBadge.icon}
                    <span>{statusBadge.label}</span>
                  </Badge>
                </div>
                
                <p className="text-sm text-gray-700 mb-3">{goal.description}</p>
                
                {/* Progress bar */}
                <div className="mb-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium text-gray-700">
                      Progress: {goal.currentScore} / {goal.targetScore}
                    </span>
                    <span className="text-xs font-medium text-gray-700">
                      {progressPercentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        goal.status === 'completed' 
                          ? 'bg-green-500' 
                          : 'bg-blue-500'
                      }`}
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Deadline: {formatDate(goal.deadline)}</span>
                  </div>
                  
                  {goal.status === 'in-progress' && daysUntil > 0 && (
                    <span className={`font-medium ${
                      daysUntil < 7 ? 'text-red-500' : 'text-blue-500'
                    }`}>
                      {daysUntil} days remaining
                    </span>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-500">No performance goals set yet.</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default GoalsSection;