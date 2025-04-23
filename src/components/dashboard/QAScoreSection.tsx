import React from 'react';
import { BarChart, LineChart, Scale } from 'lucide-react';
import Card from '../ui/Card';
import ScoreGauge from '../ui/ScoreGauge';
import Tabs from '../ui/Tabs';
import { QAScore } from '../../types';

interface QAScoreSectionProps {
  scores: QAScore[];
}

type ScoreCategories = {
  customerService: number;
  compliance: number;
  productKnowledge: number;
  communicationSkills: number;
};

const QAScoreSection: React.FC<QAScoreSectionProps> = ({ scores }) => {
  // Get the latest score
  const latestScore = scores.length > 0 
    ? scores[scores.length - 1] 
    : null;
  
  // Sort scores by date for trend analysis
  const sortedScores = [...scores].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  // Calculate averages
  const calculateAverage = (property: keyof ScoreCategories) => {
    if (!scores.length) return 0;
    
    const sum = scores.reduce((acc, score) => acc + score.categories[property], 0);
    return Math.round((sum / scores.length) * 10) / 10;
  };
  
  const customerServiceAvg = calculateAverage('customerService');
  const complianceAvg = calculateAverage('compliance');
  const productKnowledgeAvg = calculateAverage('productKnowledge');
  const communicationSkillsAvg = calculateAverage('communicationSkills');

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Scale size={16} /> },
    { id: 'trends', label: 'Trends', icon: <LineChart size={16} /> },
    { id: 'categories', label: 'Categories', icon: <BarChart size={16} /> },
  ];

  return (
    <Card title="QA Scores" className="h-full">
      <Tabs tabs={tabs} defaultTabId="overview">
        {/* Overview Tab */}
        <div className="space-y-6">
          {latestScore ? (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-medium text-gray-900">Overall Score</h4>
                  <p className="text-sm text-gray-500">
                    Last evaluation: {formatDate(latestScore.date)}
                  </p>
                </div>
                <ScoreGauge 
                  score={latestScore.overallScore} 
                  label="Overall"
                  size="lg"
                />
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-medium text-gray-500 mb-3">Latest Evaluation</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700">"{latestScore.comments}"</p>
                  <p className="text-xs text-gray-500 mt-2">- {latestScore.evaluator}</p>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500">No QA scores available yet.</p>
            </div>
          )}
        </div>
        
        {/* Trends Tab */}
        <div className="space-y-6">
          <h4 className="text-lg font-medium text-gray-900">Score Trends</h4>
          
          {sortedScores.length > 0 ? (
            <div className="relative h-60">
              <div className="absolute inset-0">
                <svg className="w-full h-full">
                  {/* Chart Grid */}
                  <line x1="0" y1="0" x2="0" y2="100%" stroke="#e5e7eb" strokeWidth="1" />
                  <line x1="0" y1="0" x2="100%" y2="0" stroke="#e5e7eb" strokeWidth="1" />
                  <line x1="0" y1="25%" x2="100%" y2="25%" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4" />
                  <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4" />
                  <line x1="0" y1="75%" x2="100%" y2="75%" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4" />
                  <line x1="0" y1="100%" x2="100%" y2="100%" stroke="#e5e7eb" strokeWidth="1" />
                  
                  {/* Score Line */}
                  {sortedScores.length > 1 && (
                    <polyline
                      points={sortedScores.map((score, index) => {
                        const x = (index / (sortedScores.length - 1)) * 100 + '%';
                        const y = (1 - score.overallScore / 100) * 100 + '%';
                        return `${x},${y}`;
                      }).join(' ')}
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                  
                  {/* Data Points */}
                  {sortedScores.map((score, index) => {
                    const x = (index / (sortedScores.length - 1)) * 100 + '%';
                    const y = (1 - score.overallScore / 100) * 100 + '%';
                    return (
                      <circle
                        key={index}
                        cx={x}
                        cy={y}
                        r="4"
                        fill="#3b82f6"
                        stroke="#ffffff"
                        strokeWidth="2"
                      />
                    );
                  })}
                </svg>
              </div>
              
              {/* Y-Axis Labels */}
              <div className="absolute left-0 inset-y-0 flex flex-col justify-between text-xs text-gray-500 py-2">
                <span>100</span>
                <span>75</span>
                <span>50</span>
                <span>25</span>
                <span>0</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500">Not enough data to show trends.</p>
            </div>
          )}
          
          <div className="flex justify-between text-xs text-gray-500 pt-2">
            {sortedScores.map((score, index) => (
              <span key={index} className="text-center">
                {formatDate(score.date).split(' ')[0]}
              </span>
            ))}
          </div>
        </div>
        
        {/* Categories Tab */}
        <div className="space-y-6">
          <h4 className="text-lg font-medium text-gray-900">Score Categories</h4>
          
          {latestScore ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center">
                <ScoreGauge 
                  score={latestScore.categories.customerService} 
                  label="Latest"
                  size="md"
                />
                <p className="mt-2 text-sm font-medium text-gray-900">Customer Service</p>
                <p className="text-xs text-gray-500">Avg: {customerServiceAvg}</p>
              </div>
              
              <div className="flex flex-col items-center">
                <ScoreGauge 
                  score={latestScore.categories.compliance} 
                  label="Latest"
                  size="md"
                />
                <p className="mt-2 text-sm font-medium text-gray-900">Compliance</p>
                <p className="text-xs text-gray-500">Avg: {complianceAvg}</p>
              </div>
              
              <div className="flex flex-col items-center">
                <ScoreGauge 
                  score={latestScore.categories.productKnowledge} 
                  label="Latest"
                  size="md"
                />
                <p className="mt-2 text-sm font-medium text-gray-900">Product Knowledge</p>
                <p className="text-xs text-gray-500">Avg: {productKnowledgeAvg}</p>
              </div>
              
              <div className="flex flex-col items-center">
                <ScoreGauge 
                  score={latestScore.categories.communicationSkills} 
                  label="Latest"
                  size="md"
                />
                <p className="mt-2 text-sm font-medium text-gray-900">Communication</p>
                <p className="text-xs text-gray-500">Avg: {communicationSkillsAvg}</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500">No category scores available yet.</p>
            </div>
          )}
        </div>
      </Tabs>
    </Card>
  );
};

export default QAScoreSection;