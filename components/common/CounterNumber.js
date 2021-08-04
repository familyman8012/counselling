import React from "react";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

function CounterNumber({ stateCount }) {
  return (
    <div class="counter-wrapper">
      <div class="counter-content">
        <div class="stat-count-wrapper">
          {stateCount.imgUrl && (
            <figure class="stat-count-icon">
              <img src={stateCount.imgUrl} />
            </figure>
          )}
          <p
            class="stat-count stat-count__dec"
            data-count={stateCount.datacount}
          >
            <CountUp end={stateCount.datacount} redraw={false}>
              {({ countUpRef, start }) => (
                <VisibilitySensor onChange={start} delayedCall>
                  <span ref={countUpRef} />
                </VisibilitySensor>
              )}
            </CountUp>
          </p>
          <p class="counter-title">{stateCount.title}</p>
        </div>
        <div class="stat-temp"></div>
      </div>
    </div>
  );
}

export default React.memo(CounterNumber);
