import { useCallback, useEffect } from 'react';
import { useGetSpacexByYearMutation } from '../../redux/spacexApi';
import { LOADING_TEXT, SUCCESS_TEXT, ERROR_TEXT } from '../../utils/constatnts';
import './App.css';
import { useAppDispatch } from '../../hooks/hooks';
import { addMissions, setLoadingStatus, setErrorStatus } from '../../redux/missionsSlice';
import RocketsList from '../RocketsList/RocketsList';

export default function App() {
  const [getSpacex, { isError, isLoading }] = useGetSpacexByYearMutation();
  const dispatch = useAppDispatch();

  const getRockets = useCallback(async () => {
    try {
      const res = await getSpacex('').unwrap();
      const sortedResult = [...res].sort((a, b) => Date.parse(b.date_utc) - Date.parse(a.date_utc));
      dispatch(addMissions(sortedResult));
    } catch (error) {
      dispatch(setErrorStatus(true));
      throw new Error(error.message);
    } finally {
      dispatch(setLoadingStatus(false));
    }
  }, [dispatch, getSpacex]);

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
