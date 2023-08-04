import { Rocket } from './Rocket';

export type IRocketsFetchData = {
  docs: Rocket[],
  currentPage: number,
  totalPages: number,
  nextPage: number,
  prevPage: number,
  hasNextPage: boolean,
  hasPrevPage: boolean,
};
