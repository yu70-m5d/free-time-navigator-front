import { DirectionsRenderer, DirectionsService } from "@react-google-maps/api";
import React, { useState, useCallback, useEffect } from "react";

export default function Direction( props ) {
  // 出発点=origin、目的地=destination
  const { origin, destination, onDurationChange } = props;

  // 出発点を指定する
  // const origin = props.origin;

  // 目的地を指定する
  // const destination = props.destination;

  // DirectionsServiceへのAPIコールで得られたルート情報を保存する
  const [currentDirection, setCurrentDirection] = useState(null);


  const directionsCallback = useCallback((googleResponse) => {
    if (googleResponse) {
      if (currentDirection) {
        if (
          googleResponse.status === "OK" &&
          googleResponse.geocoded_waypoints.length !==
            currentDirection.geocoded_waypoints.length
        ) {
          console.log("a.ルートが変更されたのでstateを更新する");
          setCurrentDirection(googleResponse);
        } else {
          console.log("b.前回と同じルートのためstateを更新しない");
        }
      } else {
        if (googleResponse.status === "OK") {
          const distance = googleResponse.routes[0].legs[0].distance.text
          const newDuration = googleResponse.routes[0].legs[0].duration.text

          onDurationChange(newDuration);

          console.log("距離:", distance);
          console.log("所要時間:", newDuration);
          console.log("c.初めてルートが設定されたため、stateを更新する");
          setCurrentDirection(googleResponse);
        } else {
          console.log("d.前回と同じルートのためstateを更新しない");
        }
      }
    }
  });


  return (
    <>
      <DirectionsService
        options={{
          origin,
          destination,
          travelMode: "WALKING",
          optimizeWaypoints: true,
          // waypoints: transitPoints,
        }}
        callback={directionsCallback}
      />
      {currentDirection !== null && (
        <DirectionsRenderer
          options={{
            directions: currentDirection,
          }}
        />
      )}
    </>
  );
}