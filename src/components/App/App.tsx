import React from 'react';
import RocketCard from '../Rocket/RocketCard';
import Filter from '../Filter/Filter';
import PageList from '../PagesList/PageList';
import { useGetSpacexByYearMutation } from '../../redux/spacexApi';
import { Rocket } from '../../types/Rocket';
import { LOADING_TEXT, SUCCESS_TEXT, ERROR_TEXT } from '../../utils/constatnts';
import './App.css';

export default function App() {
  const [getSpacex, { isError, isLoading }] = useGetSpacexByYearMutation();
  const [missions, setMissions] = React.useState<Rocket[]>([]);
  const [missionsOnPage, setMissionsOnPage] = React.useState<Rocket[]>([]);
  const [currentPage, setCurrentPage] = React.useState(0);
  const missionsPerPage = 5;
  const lastPage = Math.ceil(missions.length / missionsPerPage);
  const pageNumberForUser = currentPage + 1;

  const setCurrentMissionsOnPage = React.useCallback(() => {
    if (currentPage === 0) {
      setMissionsOnPage(missions.slice(0, missionsPerPage));
      return;
    }
    if (currentPage === Math.ceil(missions.length / missionsPerPage)) {
      setMissionsOnPage(
        missions
          .slice((missions.length - Math.ceil(missions.length - missionsPerPage)), missions.length),
      );
      return;
    }
    setMissionsOnPage(
      missions
        .slice(currentPage * missionsPerPage, (currentPage * missionsPerPage) + missionsPerPage),
    );
  }, [currentPage, missions]);

  const goToNextPage = () => {
    setCurrentPage((prev) => (prev + 1));
    setCurrentMissionsOnPage();
    window.scrollTo(0, 0);
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => (prev - 1));
    setCurrentMissionsOnPage();
    window.scrollTo(0, 0);
  };

  const filterMaxDateTop = () => {
    const sortedResult = [...missionsOnPage]
      .sort((a, b) => Date.parse(b.date_utc) - Date.parse(a.date_utc));
    setMissionsOnPage(sortedResult);
  };

  const filterMaxDateBottom = () => {
    const sortedResult = [...missionsOnPage]
      .sort((a, b) => Date.parse(a.date_utc) - Date.parse(b.date_utc));
    setMissionsOnPage(sortedResult);
  };

  const getRockets = React.useCallback(async () => {
    try {
      const res = await getSpacex('').unwrap();
      const sortedResult = [...res].sort((a, b) => Date.parse(b.date_utc) - Date.parse(a.date_utc));
      setMissions(sortedResult);
    } catch (error) {
      throw new Error(error.message);
    }
  }, [getSpacex]);

  React.useEffect(() => {
    getRockets();
  }, [getRockets]);

  React.useEffect(() => {
    setCurrentMissionsOnPage();
  }, [currentPage, missions, setCurrentMissionsOnPage]);

  return (
    <div className="app-container">
      <h1 className="app-container__header">
        {isLoading && LOADING_TEXT}
        {!isLoading && !isError && SUCCESS_TEXT}
        {isError && !isLoading && ERROR_TEXT}
        {!isLoading && !isError && <span>&#128640;</span>}
      </h1>
      {!isLoading && !isError && (
        <div className="app-container__buttons-container">
          <PageList
            lastPage={lastPage}
            pageNumberForUser={pageNumberForUser}
            onNext={goToNextPage}
            onPrev={goToPrevPage}
          />
          <Filter
            onMaxDate={filterMaxDateTop}
            onMinDate={filterMaxDateBottom}
          />
        </div>
      )}
      {missionsOnPage.map((mission) => (
        <RocketCard
          key={mission.id}
          date_utc={mission.date_utc}
          details={mission.details}
          links={mission.links}
          name={mission.name}
          id={mission.id}
          success={mission.success}
        />
      ))}
      {!isLoading && !isError && (
        <div className="app-container__buttons-container app-container__buttons-container_bottom">
          <PageList
            lastPage={lastPage}
            pageNumberForUser={pageNumberForUser}
            onNext={goToNextPage}
            onPrev={goToPrevPage}
          />
        </div>
      )}
    </div>
  );
}
