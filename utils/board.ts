import { ArrangedBoardProps } from './GeneralProps';

export const initialData: ArrangedBoardProps = {
  tasks: {},

  columns: {
    'stage-1': {
      id: 0,
      slug: '',
      title: '',
      taskIds: [''],
    },
    'stage-2': {
      id: 0,
      slug: '',
      title: '',
      taskIds: [''],
    },
    'stage-3': {
      id: 0,
      slug: '',
      title: '',
      taskIds: [''],
    },
    'stage-4': {
      id: 0,
      slug: '',
      title: '',
      taskIds: [''],
    },
    'stage-5': {
      id: 0,
      slug: '',
      title: '',
      taskIds: [''],
    },
  },

  // Facilitate column ordering
  columnOrder: [],
};
