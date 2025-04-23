import { Agent, QAScore, MeritDemerit, Comment, Goal } from '../types';

// Mock Agents
export const agents: Agent[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    team: 'Customer Support',
    role: 'Senior Agent',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '2',
    name: 'Sarah Williams',
    team: 'Technical Support',
    role: 'Agent',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '3',
    name: 'Michael Brown',
    team: 'Sales',
    role: 'Junior Agent',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '4',
    name: 'Emily Davis',
    team: 'Customer Support',
    role: 'Team Lead',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

// Generate dates for the last 6 months
const getLastSixMonths = () => {
  const dates = [];
  const now = new Date();
  for (let i = 0; i < 6; i++) {
    const date = new Date(now);
    date.setMonth(date.getMonth() - i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates.reverse();
};

const dates = getLastSixMonths();

// Mock QA Scores
export const qaScores: QAScore[] = [
  // Alex Johnson
  ...dates.map((date, index) => ({
    id: `qa-1-${index}`,
    agentId: '1',
    date,
    overallScore: Math.min(95, 75 + index * 4),
    categories: {
      customerService: Math.min(98, 78 + index * 4),
      compliance: Math.min(95, 75 + index * 4),
      productKnowledge: Math.min(90, 70 + index * 4),
      communicationSkills: Math.min(93, 73 + index * 4),
    },
    evaluator: 'Jessica Parker',
    comments: index === 5 ? 'Excellent improvement over time. Keep up the good work!' : 'Good work, but there\'s room for improvement in product knowledge.',
  })),
  
  // Sarah Williams
  ...dates.map((date, index) => ({
    id: `qa-2-${index}`,
    agentId: '2',
    date,
    overallScore: Math.min(90, 80 - (index % 3) * 2),
    categories: {
      customerService: Math.min(92, 82 - (index % 3) * 2),
      compliance: Math.min(88, 78 - (index % 3) * 2),
      productKnowledge: Math.min(93, 83 - (index % 3) * 2),
      communicationSkills: Math.min(87, 77 - (index % 3) * 2),
    },
    evaluator: 'Robert Chen',
    comments: 'Consistent performer. Communication could be improved.',
  })),
  
  // Michael Brown
  ...dates.map((date, index) => ({
    id: `qa-3-${index}`,
    agentId: '3',
    date,
    overallScore: Math.min(85, 65 + index * 3.5),
    categories: {
      customerService: Math.min(88, 68 + index * 3.5),
      compliance: Math.min(82, 62 + index * 3.5),
      productKnowledge: Math.min(80, 60 + index * 3.5),
      communicationSkills: Math.min(90, 70 + index * 3.5),
    },
    evaluator: 'Patricia Lopez',
    comments: 'Showing improvement in all areas. Focus on compliance procedures.',
  })),
  
  // Emily Davis
  ...dates.map((date, index) => ({
    id: `qa-4-${index}`,
    agentId: '4',
    date,
    overallScore: Math.min(98, 93 + (index % 2)),
    categories: {
      customerService: Math.min(100, 95 + (index % 2)),
      compliance: Math.min(97, 92 + (index % 2)),
      productKnowledge: Math.min(97, 92 + (index % 2)),
      communicationSkills: Math.min(99, 94 + (index % 2)),
    },
    evaluator: 'David Wilson',
    comments: 'Exceptional performance. Setting the standard for the team.',
  })),
];

// Mock Merit/Demerit Records
export const meritDemerits: MeritDemerit[] = [
  // Alex Johnson
  {
    id: 'md-1-1',
    agentId: '1',
    date: dates[5],
    type: 'merit',
    points: 10,
    reason: 'Successfully resolved a complex customer issue with positive feedback',
    issuedBy: 'Jessica Parker',
  },
  {
    id: 'md-1-2',
    agentId: '1',
    date: dates[3],
    type: 'demerit',
    points: 5,
    reason: 'Missed scheduled team meeting without notice',
    issuedBy: 'Robert Chen',
  },
  {
    id: 'md-1-3',
    agentId: '1',
    date: dates[2],
    type: 'merit',
    points: 15,
    reason: 'Received customer commendation for exceptional service',
    issuedBy: 'Jessica Parker',
  },
  
  // Sarah Williams
  {
    id: 'md-2-1',
    agentId: '2',
    date: dates[4],
    type: 'merit',
    points: 8,
    reason: 'Helped train new team members on troubleshooting procedures',
    issuedBy: 'Emily Davis',
  },
  {
    id: 'md-2-2',
    agentId: '2',
    date: dates[1],
    type: 'demerit',
    points: 3,
    reason: 'Documentation errors in customer case notes',
    issuedBy: 'Robert Chen',
  },
  
  // Michael Brown
  {
    id: 'md-3-1',
    agentId: '3',
    date: dates[5],
    type: 'demerit',
    points: 8,
    reason: 'Failure to follow escalation protocol for urgent cases',
    issuedBy: 'Emily Davis',
  },
  {
    id: 'md-3-2',
    agentId: '3',
    date: dates[3],
    type: 'merit',
    points: 5,
    reason: 'Provided valuable product feedback that led to improvements',
    issuedBy: 'Patricia Lopez',
  },
  {
    id: 'md-3-3',
    agentId: '3',
    date: dates[0],
    type: 'merit',
    points: 12,
    reason: 'Highest customer satisfaction scores for the month',
    issuedBy: 'Jessica Parker',
  },
  
  // Emily Davis
  {
    id: 'md-4-1',
    agentId: '4',
    date: dates[5],
    type: 'merit',
    points: 20,
    reason: 'Implemented new training procedure that improved team performance',
    issuedBy: 'David Wilson',
  },
  {
    id: 'md-4-2',
    agentId: '4',
    date: dates[2],
    type: 'merit',
    points: 15,
    reason: 'Resolved critical system issue preventing customer service outage',
    issuedBy: 'Robert Chen',
  },
];

// Mock Comments
export const comments: Comment[] = [
  // Alex Johnson
  {
    id: 'comment-1-1',
    agentId: '1',
    date: dates[5],
    content: 'Great job handling the difficult customer situation yesterday.',
    author: 'Jessica Parker',
    relatedTo: {
      type: 'qa',
      id: 'qa-1-5',
    },
  },
  {
    id: 'comment-1-2',
    agentId: '1',
    date: dates[2],
    content: 'Need to work on product knowledge for the new software update.',
    author: 'Robert Chen',
    responses: [
      {
        id: 'response-1-2-1',
        date: dates[2],
        content: 'I\'ll review the materials and schedule time with the product team.',
        author: 'Alex Johnson',
      },
    ],
  },
  
  // Sarah Williams
  {
    id: 'comment-2-1',
    agentId: '2',
    date: dates[4],
    content: 'Your technical explanations to customers need to be simpler.',
    author: 'Emily Davis',
    relatedTo: {
      type: 'qa',
      id: 'qa-2-4',
    },
    responses: [
      {
        id: 'response-2-1-1',
        date: dates[4],
        content: 'Thank you for the feedback. I\'ll work on using less technical jargon.',
        author: 'Sarah Williams',
      },
    ],
  },
  
  // Michael Brown
  {
    id: 'comment-3-1',
    agentId: '3',
    date: dates[3],
    content: 'Please review the compliance procedures again. There were several oversights in your recent calls.',
    author: 'Patricia Lopez',
    relatedTo: {
      type: 'demerit',
      id: 'md-3-1',
    },
  },
  
  // Emily Davis
  {
    id: 'comment-4-1',
    agentId: '4',
    date: dates[5],
    content: 'Excellent leadership shown during the system outage. You kept the team calm and focused.',
    author: 'David Wilson',
    relatedTo: {
      type: 'merit',
      id: 'md-4-1',
    },
  },
];

// Mock Goals
export const goals: Goal[] = [
  // Alex Johnson
  {
    id: 'goal-1-1',
    agentId: '1',
    title: 'Improve Product Knowledge',
    description: 'Achieve a score of 95 or higher in the product knowledge category',
    targetScore: 95,
    currentScore: 90,
    deadline: '2025-03-15',
    status: 'in-progress',
  },
  
  // Sarah Williams
  {
    id: 'goal-2-1',
    agentId: '2',
    title: 'Communication Skills Enhancement',
    description: 'Work on improving communication skills score to 90+',
    targetScore: 90,
    currentScore: 87,
    deadline: '2025-02-28',
    status: 'in-progress',
  },
  
  // Michael Brown
  {
    id: 'goal-3-1',
    agentId: '3',
    title: 'Compliance Training Completion',
    description: 'Complete all compliance training modules and achieve 85+ score',
    targetScore: 85,
    currentScore: 82,
    deadline: '2025-04-10',
    status: 'in-progress',
  },
  {
    id: 'goal-3-2',
    agentId: '3',
    title: 'Customer Service Improvement',
    description: 'Increase customer service score to 90+',
    targetScore: 90,
    currentScore: 88,
    deadline: '2025-01-31',
    status: 'completed',
  },
  
  // Emily Davis
  {
    id: 'goal-4-1',
    agentId: '4',
    title: 'Leadership Training',
    description: 'Complete advanced leadership training program',
    targetScore: 100,
    currentScore: 100,
    deadline: '2024-12-15',
    status: 'completed',
  },
];