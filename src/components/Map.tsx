"use client";

import { State, states } from "@/db/schema";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Tooltip,
} from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";

type Props = {
  onStateClick: (state: State) => void;
  selectedState?: State;
  stateInfo?: Record<State, string>;
};

const STATE_POSITION: Record<State, [number, number]> = {
  Johor: [1.4799, 103.7643],
  Kedah: [6.0499, 100.5296],
  Kelantan: [6.1254, 102.2405],
  "Kuala Lumpur": [3.1319, 101.6841],
  Labuan: [5.2831, 115.2308],
  Malacca: [2.1896, 102.2501],
  "Negeri Sembilan": [2.8707, 102.2548],
  Pahang: [3.8168, 103.3317],
  Penang: [5.4141, 100.3288],
  Perak: [4.8073, 100.8],
  Perlis: [6.517, 100.2152],
  Putrajaya: [2.9264, 101.6964],
  Sabah: [5.4204, 116.7968],
  Sarawak: [2.5574, 113.0012],
  Selangor: [3.5092, 101.5248],
  Terengganu: [5.3283, 103.1412],
};

export default function Map({ onStateClick, selectedState, stateInfo }: Props) {
  return (
    <MapContainer
      center={[3.659996, 107.262817]}
      zoom={6}
      className="h-full rounded-lg shadow-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {states.map((state) => (
        <>
          <Marker
            position={STATE_POSITION[state]}
            eventHandlers={{ click: () => onStateClick(state) }}
            icon={L.icon({
              iconUrl: `flags/${state}.svg`,
              iconSize: [60, 30],
              className: "border-2 border-black border-opacity-20",
            })}
          >
            {stateInfo && stateInfo[state] && (
              <Tooltip direction="top" offset={[0, -10]}>
                {stateInfo[state]}
              </Tooltip>
            )}
          </Marker>
        </>
      ))}
      <ZoomToState selectedState={selectedState} />
    </MapContainer>
  );
}

function ZoomToState({ selectedState }: Pick<Props, "selectedState">) {
  const map = useMap();

  useEffect(() => {
    if (!selectedState) {
      return;
    }
    map.setZoom(12);
    map.panTo(STATE_POSITION[selectedState], { animate: true });
  }, [selectedState]);

  return <></>;
}
