import { useAppSelector } from '../../hooks/hooks';
import './PageButtons.css';

interface IProps {
  onNext(): void;
  onPrev(): void;
  pageNumberForUser: number;
  lastPage: number;
}

export default function PageButtons({
  onNext, onPrev, pageNumberForUser, lastPage,
}: IProps) {
  const { hasNextPage, hasPrevPage } = useAppSelector((store) => store.pages);
  return (
    <div className="app-container__pages">
      <button type="button" onClick={onPrev} disabled={!hasPrevPage} className="app-container__button app-container__button_previous">Prev</button>
      <p className='className="app-container__pages-text"'>{`Page ${pageNumberForUser} of ${lastPage}`}</p>
      <button type="button" onClick={onNext} disabled={!hasNextPage} className="app-container__button app-container__button_next">Next</button>
    </div>
  );
}
