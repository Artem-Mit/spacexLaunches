import { Rocket } from '../../types/Rocket';
import './RocketCard.css';

export default function RocketCard({
  date_utc, details, links, name,
}: Rocket) {
  const date = new Date(date_utc).toLocaleString();

  return (
    <article className="rocket">
      <img src={links.patch.small} alt="rocketLabel" className="rocket__label" />
      <div className="rocket__info">
        <h2 className="rocket__name">{name}</h2>
        <p className="rocket__details">{details || 'Описание отуствует'}</p>
        <p className="rocket__date">
          {`Launched at ${date}`}
        </p>
      </div>
    </article>
  );
}
