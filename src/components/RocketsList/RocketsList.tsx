import React from 'react';
import PageButtons from '../PagesButtons/PageButtons';
import Filter from '../Filter/Filter';
import RocketCard from '../Rocket/RocketCard';
import { Rocket } from '../../types/Rocket';
import { useAppSelector } from '../../hooks/hooks';

export default function RocketsList() {
  const missions = useAppSelector((store) => store.missions.rockets);
  const isLoading = useAppSelector((store) => store.missions.isLoading);
  const isError = useAppSelector((store) => store.missions.isError);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [missionsOnPage, setMissionsOnPage] = React.useState<Rocket[]>([]);
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

  React.useEffect(() => {
    setCurrentMissionsOnPage();
  }, [currentPage, missions, setCurrentMissionsOnPage]);

  return (
    <>
      {!isLoading && !isError && (
        <div className="app-container__buttons-container">
          <PageButtons
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
      {
        missionsOnPage.map((mission) => (
          <RocketCard
            key={mission.id}
            date_utc={mission.date_utc}
            details={mission.details}
            links={mission.links}
            name={mission.name}
            id={mission.id}
            success={mission.success}
          />
        ))
      }
      {
        !isLoading && !isError && (
          <div className="app-container__buttons-container app-container__buttons-container_bottom">
            <PageButtons
              lastPage={lastPage}
              pageNumberForUser={pageNumberForUser}
              onNext={goToNextPage}
              onPrev={goToPrevPage}
            />
          </div>
        )
      }
    </>
  );
}
