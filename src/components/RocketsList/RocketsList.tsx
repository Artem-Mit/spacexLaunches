import PageButtons from '../PagesButtons/PageButtons';
import Filter from '../Filter/Filter';
import RocketCard from '../Rocket/RocketCard';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { sortMaxDateBottom, sortMaxDateTop } from '../../redux/missionsSlice';
import { goToNextPage, goToPrevPage } from '../../redux/pagesSlice';

export default function RocketsList() {
  const missions = useAppSelector((store) => store.missions.rockets);
  const { isError, isLoading } = useAppSelector((store) => store.status);
  const { currentPage, totalPages } = useAppSelector((store) => store.pages);
  const dispatch = useAppDispatch();

  const scrollPageToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextPage = () => {
    dispatch(goToNextPage());
    scrollPageToTop();
  };

  const handlePrevPage = () => {
    dispatch(goToPrevPage());
    scrollPageToTop();
  };

  return (
    <>
      {!isLoading && !isError && (
        <div className="app-container__buttons-container">
          <PageButtons
            lastPage={totalPages}
            pageNumberForUser={currentPage}
            onNext={handleNextPage}
            onPrev={handlePrevPage}
          />
          <Filter
            onMaxDate={() => dispatch(sortMaxDateTop())}
            onMinDate={() => dispatch(sortMaxDateBottom())}
          />
        </div>
      )}
      {
        missions.map((mission) => (
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
              lastPage={totalPages}
              pageNumberForUser={currentPage}
              onNext={handleNextPage}
              onPrev={handlePrevPage}
            />
          </div>
        )
      }
    </>
  );
}
