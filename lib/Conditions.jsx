import React from 'react';

export default function Conditions({ conditions }) {
  if(conditions.location) {
    return (
      <div className="conditions">
        <div className="condition-location">{conditions.location}</div>
        <div className="condition-temp-f">{conditions.tempF}°</div>
        <img className="condition-img"src={conditions.icon}/>
        <div className="condition-status">{conditions.status}</div>
      </div>
    );
  }
  return (
    <div></div>
  )
}
