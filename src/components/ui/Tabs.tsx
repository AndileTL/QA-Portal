import React, { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  children: React.ReactNode[];
  defaultTabId?: string;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  children,
  defaultTabId,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState(defaultTabId || tabs[0].id);
  
  // Find the index of the active tab
  const activeTabIndex = tabs.findIndex(tab => tab.id === activeTab);
  
  return (
    <div className={className}>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
                transition-colors duration-200
              `}
              aria-current={activeTab === tab.id ? 'page' : undefined}
            >
              <div className="flex items-center">
                {tab.icon && <span className="mr-2">{tab.icon}</span>}
                {tab.label}
              </div>
            </button>
          ))}
        </nav>
      </div>
      <div className="py-4">
        {React.Children.toArray(children)[activeTabIndex]}
      </div>
    </div>
  );
};

export default Tabs;