import { useCallback, useEffect } from 'react';
import { useGetSpacexByYearMutation } from '../../redux/spacexApi';
import { LOADING_TEXT, SUCCESS_TEXT, ERROR_TEXT } from '../../utils/constatnts';
import './App.css';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { addMissions } from '../../redux/missionsSlice';
import { setErrorStatus, setLoadingStatus } from '../../redux/loadingStatusSlice';
import RocketsList from '../RocketsList/RocketsList';
import { setInitialPagesState } from '../../redux/pagesSlice';
import { RocketsFetchData } from '../../types/RocketsFetchData';

export default function App() {
  const [getSpacex, { isError, isLoading }] = useGetSpacexByYearMutation();
  const { currentPage } = useAppSelector((store) => store.pages);
  const dispatch = useAppDispatch();

  const getRockets = useCallback(async () => {
    try {
      const data: RocketsFetchData = await getSpacex(currentPage).unwrap();
      dispatch(addMissions(data.docs));
      dispatch(setInitialPagesState(data));
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
