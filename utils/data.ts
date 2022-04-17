import { Options } from './GeneralProps';

export const JOB_TYPES: Options[] = [
  { label: 'Remote Fulltime', value: 'remote_fulltime' },
];

export const DUMMY_STAGES: Options[] = [
  { label: 'Wishlist', value: 'wishlist' },
  { label: 'Applied', value: 'Applied' },
  { label: 'Interview', value: 'Interview' },
  { label: 'Offer', value: 'Offer' },
];
// interface taskProps{
//   task : {
//     id: string;
//     content: string;
//   }
// }

// interface columnProps {
//   columns: {
//     id: string;
//     title: string;
//     taskIds: string[]
//   };
// }

// interface dataProps{
//   tasks: taskProps[];
//   columns: columnProps[];
//   columnOrder: string[]
// }
