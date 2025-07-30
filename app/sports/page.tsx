'use client';
import React, { useEffect, useState } from 'react';
import SportCardList from './componned/SportCardList';
import Navbar from '../components/navbar';
import { useSports } from '../Context/SportContext';

const SportsPage = () => {
  const { sports } = useSports(); // ✅ من context
  const [selectedSport, setSelectedSport] = useState('');

  const selectedSportData = sports.find((s) => s.name === selectedSport);

  useEffect(() => {
    if (sports.length && !selectedSport) {
      setSelectedSport(sports[0].name);
    }
  }, [sports, selectedSport]);

  return (
    <>
      <Navbar />
      <div className="relative w-full min-h-screen overflow-hidden text-yellow-400">
        {/* Background Image */}
        <img
          src={selectedSportData?.image}
          alt={selectedSport}
          className="absolute top-0 left-0 w-full h-full object-cover object-[center_20%] z-0"
        />
        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10"></div>

        {/* Content */}
        <div className="relative z-20 flex flex-col md:flex-row items-center md:items-end justify-center md:justify-end h-full px-6 md:px-20">
          <img
            src={selectedSportData?.image}
            alt={`${selectedSport} preview`}
            className="w-64 h-64 md:w-88 md:h-120 object-cover object-[40%] mb-6 md:mb-0 md:mr-20 mt-50 rotate-10 shadow-lg"
          />

          <div className="max-w-xl text-center md:text-left mt-1 sm:mt-20">
            <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-4 ml-6">
              Blue Ribbon {selectedSport} Academy
            </h1>
            <p className="mt-4 md:text-x text-gray-300 max-w-xl text-left ml-8">
              {selectedSportData?.description}
            </p>

            <select
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
              className="bg-transparent border border-yellow-400 px-2 py-2 mt-20 mx-50 rounded"
            >
              {sports.map((sport) => (
                <option key={sport.name} value={sport.name}>
                  {sport.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <SportCardList
        selectedSport={selectedSport}
        setSelectedSport={setSelectedSport}
      />
    </>
  );
};

export default SportsPage;
