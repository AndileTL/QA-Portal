import React from 'react';
import { Award, ThumbsDown, Clock } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { MeritDemerit } from '../../types';

interface MeritDemeritSectionProps {
  meritDemerits: MeritDemerit[];
}

const MeritDemeritSection: React.FC<MeritDemeritSectionProps> = ({ meritDemerits }) => {
  // Calculate total merit and demerit points
  const totalMeritPoints = meritDemerits
    .filter(item => item.type === 'merit')
    .reduce((sum, item) => sum + item.points, 0);
  
  const totalDemeritPoints = meritDemerits
    .filter(item => item.type === 'demerit')
    .reduce((sum, item) => sum + item.points, 0);
  
  const netScore = totalMeritPoints - totalDemeritPoints;
  
  // Sort by date (most recent first)
  const sortedItems = [...meritDemerits].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
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

  return (
    <Card title="Merit & Demerit Scores" className="h-full">
      <div className="space-y-6">
        {/* Score Summary */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex justify-center mb-2">
              <Award className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-sm font-medium text-gray-500">Merit Points</p>
            <p className="text-2xl font-bold text-green-600">{totalMeritPoints}</p>
          </div>
          
          <div className="bg-red-50 rounded-lg p-4">
            <div className="flex justify-center mb-2">
              <ThumbsDown className="h-6 w-6 text-red-600" />
            </div>
            <p className="text-sm font-medium text-gray-500">Demerit Points</p>
            <p className="text-2xl font-bold text-red-600">{totalDemeritPoints}</p>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex justify-center mb-2">
              <span className="text-2xl font-bold text-blue-600">=</span>
            </div>
            <p className="text-sm font-medium text-gray-500">Net Score</p>
            <p className={`text-2xl font-bold ${netScore >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
              {netScore}
            </p>
          </div>
        </div>
        
        {/* Recent Activity */}
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-3">Recent Activity</h4>
          
          <div className="space-y-4">
            {sortedItems.length > 0 ? (
              sortedItems.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      {item.type === 'merit' ? (
                        <Award className="h-5 w-5 text-green-600 mr-2" />
                      ) : (
                        <ThumbsDown className="h-5 w-5 text-red-600 mr-2" />
                      )}
                      <div>
                        <div className="flex items-center">
                          <Badge 
                            variant={item.type === 'merit' ? 'success' : 'danger'}
                            className="mr-2"
                          >
                            {item.type === 'merit' ? '+' : '-'}{item.points} points
                          </Badge>
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatDate(item.date)}
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mt-1">{item.reason}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Issued by: {item.issuedBy}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500">No merit or demerit records available yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MeritDemeritSection;