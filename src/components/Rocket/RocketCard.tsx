import React from 'react';
import { Rocket } from '../../types/Rocket';
import './RocketCard.css';

export default function RocketCard({
  date_utc, details, links, name,
}: Rocket) {
  const date = new Date(date_utc).toLocaleString();
  return (
    <article className="rocket">
      <img src={links.patch.small} alt="rocketLabel" className="rocket__label" loading="lazy" />
      <div className="rocket__info">
        <h2 className="rocket__name">{name}</h2>
        <p className="rocket__details">{details || 'Описание отуствует'}</p>
        <p className="rocket__date">
          {`Launched at ${date}`}
        </p>
      </div>
      <img src={links.flickr.original[Math.floor(Math.random() * links.flickr.original.length)]} alt="RocketLaunch" className="rocket__photo" loading="lazy" />
    </article>
  );
}
