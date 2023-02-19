import React from "react";
import { DateTime } from "luxon";

const Today = () => {
  const currentDate = DateTime.local();
  return (
    <div className="flex items-center">
      <div>
        <p className="mb-2 text-4xl font-semibold">
          {currentDate.weekdayLong}
        </p>
        <span className="text-lg font-medium">
          {currentDate.toFormat("dd MMM yyyy")}
        </span>
      </div>
    </div>
  );
};

export default Today;
