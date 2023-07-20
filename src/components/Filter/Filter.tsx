import './Filter.css';

interface IProps {
  onMaxDate(): void,
  onMinDate(): void,
}

export default function Filter({ onMaxDate, onMinDate }: IProps) {
  return (
    <div className="app-container__filters">
      <span className="app-container__sort-text">Sort date:</span>
      <div className="app-container__sort-button app-container__sort-button_up" onClick={onMaxDate} aria-hidden />
      <div className="app-container__sort-button app-container__sort-button_bottom" onClick={onMinDate} aria-hidden />
    </div>
  );
}
