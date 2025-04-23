import React, { useState } from 'react';
import { ChevronDown, User } from 'lucide-react';
import { Agent } from '../../types';

interface AgentSelectorProps {
  agents: Agent[];
  selectedAgent: Agent | null;
  onSelectAgent: (agent: Agent) => void;
}

const AgentSelector: React.FC<AgentSelectorProps> = ({
  agents,
  selectedAgent,
  onSelectAgent,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelectAgent = (agent: Agent) => {
    onSelectAgent(agent);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="inline-flex items-center gap-x-2 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 rounded-md w-full"
        onClick={toggleDropdown}
      >
        {selectedAgent ? (
          <div className="flex items-center space-x-2">
            <img
              src={selectedAgent.avatar}
              alt={selectedAgent.name}
              className="h-6 w-6 rounded-full object-cover"
            />
            <span className="flex-1 text-left">{selectedAgent.name}</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5 text-gray-400" />
            <span className="flex-1 text-left text-gray-500">Select an agent</span>
          </div>
        )}
        <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 max-h-60 overflow-auto">
          <ul className="py-1">
            {agents.map((agent) => (
              <li
                key={agent.id}
                className="cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSelectAgent(agent)}
              >
                <div className="flex items-center px-4 py-2 space-x-3">
                  <img
                    src={agent.avatar}
                    alt={agent.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{agent.name}</p>
                    <p className="text-xs text-gray-500">{agent.team} · {agent.role}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AgentSelector;