import React from 'react';
import HourCard from './HourCard';

const Hourly = ({ hourly }) => {
  return (
    <section id="hourly">
        {hourly.map((hour, i) => {
          return (
            <div key={hour.time + i}>
              <HourCard
                hour = {hour.time}
                condition = {hour.condition}
                temp = {hour.tempE}
                icon = {hour.icon}
              />
            </div>
          );
        })}
    </section>
  );
};

export default Hourly;
