import { Rocket } from './Rocket';

export type RocketsFetchData = {
  docs: Rocket[],
  currentPage: number,
  totalPages: number,
  nextPage: number,
  prevPage: number,
  hasNextPage: boolean,
  hasPrevPage: boolean,
};
