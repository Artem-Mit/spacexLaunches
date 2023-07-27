import PageButtons from '../PagesButtons/PageButtons';
import Filter from '../Filter/Filter';
import RocketCard from '../Rocket/RocketCard';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { sortMaxDateBottom, sortMaxDateTop } from '../../redux/missionsSlice';
import { goToNextPage, goToPrevPage } from '../../redux/pagesSlice';

export default function RocketsList() {
  const missions = useAppSelector((store) => store.missions.rockets);
  const isLoading = useAppSelector((store) => store.status.isLoading);
  const isError = useAppSelector((store) => store.status.isError);
  const currentPage = useAppSelector((store) => store.pages.currentPage);
  const lastPage = useAppSelector((store) => store.pages.totalPages);
  const dispatch = useAppDispatch();

  const handleNextPage = () => {
    dispatch(goToNextPage());
    window.scrollTo(0, 0);
  };

  const handlePrevPage = () => {
    dispatch(goToPrevPage());
    window.scrollTo(0, 0);
  };

  return (
    <>
      {!isLoading && !isError && (
        <div className="app-container__buttons-container">
          <PageButtons
            lastPage={lastPage}
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
              lastPage={lastPage}
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
