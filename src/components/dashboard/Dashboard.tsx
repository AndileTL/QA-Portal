import React, { useState, useEffect } from 'react';
import QAScoreSection from './QAScoreSection';
import MeritDemeritSection from './MeritDemeritSection';
import CommentsSection from './CommentsSection';
import GoalsSection from './GoalsSection';
import AgentSelector from '../agent-selector/AgentSelector';
import { Agent } from '../../types';
import { agents, qaScores, meritDemerits, comments, goals } from '../../data/mockData';

const Dashboard: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  
  // Set default agent on initial load
  useEffect(() => {
    if (agents.length > 0) {
      setSelectedAgent(agents[0]);
    }
  }, []);
  
  // Filter data based on selected agent
  const filteredQAScores = selectedAgent 
    ? qaScores.filter(score => score.agentId === selectedAgent.id)
    : [];
  
  const filteredMeritDemerits = selectedAgent
    ? meritDemerits.filter(item => item.agentId === selectedAgent.id)
    : [];
  
  const filteredComments = selectedAgent
    ? comments.filter(comment => comment.agentId === selectedAgent.id)
    : [];
  
  const filteredGoals = selectedAgent
    ? goals.filter(goal => goal.agentId === selectedAgent.id)
    : [];
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Agent Selector Section */}
      <div className="mb-6">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold text-gray-900">Agent Performance Dashboard</h2>
              <p className="text-sm text-gray-500">View and analyze agent QA scores, merits, and feedback</p>
            </div>
            <div className="w-full md:w-72">
              <AgentSelector 
                agents={agents}
                selectedAgent={selectedAgent}
                onSelectAgent={setSelectedAgent}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* QA Scores */}
        <div className="md:col-span-1">
          <QAScoreSection scores={filteredQAScores} />
        </div>
        
        {/* Merit/Demerit */}
        <div className="md:col-span-1">
          <MeritDemeritSection meritDemerits={filteredMeritDemerits} />
        </div>
        
        {/* Comments & Feedback */}
        <div className="md:col-span-1">
          <CommentsSection comments={filteredComments} />
        </div>
        
        {/* Goals */}
        <div className="md:col-span-1">
          <GoalsSection goals={filteredGoals} />
        </div>
      </div>
      
      {/* Help Section */}
      <div className="mt-6">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
          <h3 className="text-sm font-medium text-blue-800 mb-2">Need Help?</h3>
          <p className="text-sm text-blue-700">
            If you have questions about your QA scores or metrics, contact your supervisor or 
            visit the <a href="#" className="underline font-medium">QA Portal Help Center</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;