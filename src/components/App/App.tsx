import { useCallback, useEffect } from 'react';
import { useGetSpacexByYearMutation } from '../../redux/spacexApi';
import { LOADING_TEXT, SUCCESS_TEXT, ERROR_TEXT } from '../../utils/constatnts';
import './App.css';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { addMissions } from '../../redux/missionsSlice';
import { setErrorStatus, setLoadingStatus } from '../../redux/loadingStatusSlice';
import RocketsList from '../RocketsList/RocketsList';
import {
  setCurrentPage, setNextPage, setPrevPage, setTotalPages, setHasNextPage, setHasPrevPage,
} from '../../redux/pagesSlice';
import { Rocket } from '../../types/Rocket';

interface IRocketsFetchData {
  docs: Rocket[],
  page: number,
  totalPages: number,
  nextPage: number | null,
  prevPage: number | null,
  hasNextPage: boolean,
  hasPrevPage: boolean,
}

export default function App() {
  const [getSpacex, { isError, isLoading }] = useGetSpacexByYearMutation();
  const { currentPage } = useAppSelector((store) => store.pages);
  const dispatch = useAppDispatch();

  const getRockets = useCallback(async () => {
    try {
      const data: IRocketsFetchData = await getSpacex(currentPage).unwrap();
      dispatch(addMissions(data.docs));
      dispatch(setCurrentPage(data.page));
      dispatch(setTotalPages(data.totalPages));
      dispatch(setNextPage(data.nextPage));
      dispatch(setPrevPage(data.prevPage));
      dispatch(setHasNextPage(data.hasNextPage));
      dispatch(setHasPrevPage(data.hasPrevPage));
    } catch {
      dispatch(setErrorStatus(true));
    } finally {
      dispatch(setLoadingStatus(false));
    }
  }, [currentPage, dispatch, getSpacex]);

  useEffect(() => {
    getRockets();
  }, [getRockets]);

  return (
    <div className="app-container">
      <h1 className="app-container__header">
        {isLoading && LOADING_TEXT}
        {!isLoading && !isError && SUCCESS_TEXT}
        {isError && !isLoading && ERROR_TEXT}
        {!isLoading && !isError && <span>&#128640;</span>}
      </h1>
      <RocketsList />
    </div>
  );
}
