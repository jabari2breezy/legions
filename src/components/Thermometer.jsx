import React from 'react';
import './Thermometer.css';
import Logo from './Logo';

export default function Thermometer({ currentAmount, goalAmount, labels }) {
  const percentage = Math.min((currentAmount / goalAmount) * 100, 100);

  return (
    <div className="thermometer-container">
      {/* Goal Badge */}
      <div className="goal-badge badge">
        {goalAmount} M
      </div>

      <div className="thermometer-wrapper">
        {/* Scale Markers */}
        <div className="scale-markers">
          {labels.map((label, index) => (
            <div key={index} className="marker" style={{ bottom: `${label.percentage}%` }}>
              <span className="marker-label">{label.text}</span>
              <span className="marker-line"></span>
            </div>
          ))}
        </div>

        {/* Thermometer Body */}
        <div className="thermometer-body glass-panel">
          {/* Logo overlay near top */}
          <div className="thermometer-logo">
             <Logo width={50} height={75} />
          </div>
          
          {/* Fill Bar */}
          <div 
            className="thermometer-fill" 
            style={{ height: `${percentage}%` }}
          ></div>
        </div>

        {/* Current Badge */}
        <div className="current-badge-wrapper" style={{ bottom: `${percentage}%` }}>
          <div className="current-badge">
            <span className="current-badge-label">CURRENTLY AT</span>
            <span className="current-badge-value">{currentAmount} M</span>
          </div>
        </div>
      </div>
    </div>
  );
}
