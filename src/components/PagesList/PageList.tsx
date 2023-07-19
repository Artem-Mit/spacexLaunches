import React from 'react';
import './PageList.css';

interface IProps {
  onNext(): void;
  onPrev(): void;
  pageNumberForUser: number;
  lastPage: number;
}

export default function PageList({
  onNext, onPrev, pageNumberForUser, lastPage,
}: IProps) {
  return (
    <div className="app-container__pages">
      <button type="button" onClick={onPrev} disabled={pageNumberForUser === 1} className="app-container__button app-container__button_previous">Prev</button>
      <p className='className="app-container__pages-text"'>{`Page ${pageNumberForUser} of ${lastPage}`}</p>
      <button type="button" onClick={onNext} disabled={pageNumberForUser === lastPage} className="app-container__button app-container__button_next">Next</button>
    </div>
  );
}
