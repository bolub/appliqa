export const initialData = {
  tasks: {
    'task-1': {
      id: 'task-1',
      level: 'Senior',
      role: 'Frontend Developer',
      company_name: 'Abstergo Ltd',
      created: '2 days ago',
    },
    'task-2': {
      id: 'task-2',
      level: '',
      role: 'Frontend Developer',
      company_name: 'Synapse',
      created: '2 days ago',
    },
    'task-3': {
      id: 'task-3',
      level: '',
      role: 'Fullstack Developer',
      company_name: 'Sendchamp',
      created: '2 days ago',
    },
    'task-4': {
      id: 'task-4',
      level: 'Senior',
      role: 'UI Developer',
      company_name: 'Tolumi TFP',
      created: '2 days ago',
    },
  },

  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Wishlist',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
    'column-2': {
      id: 'column-2',
      title: 'Applied',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Interview',
      taskIds: [],
    },
    'column-4': {
      id: 'column-4',
      title: 'Offer',
      taskIds: [],
    },
  },

  // Facilitate column ordering
  columnOrder: ['column-1', 'column-2', 'column-3', 'column-4'],
};
