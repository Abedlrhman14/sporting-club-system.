'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface Sport {
  name: string;
  image: string;
  description: string;
}

interface SportContextType {
  sports: Sport[];
  setSports: React.Dispatch<React.SetStateAction<Sport[]>>;
  addSport: (name: string, image: string, description: string) => void;
}

const SportContext = createContext<SportContextType | undefined>(undefined);

const defaultSports: Sport[] = [
  {
    name: 'Football',
    image: '/football.jpg',
    description: 'Football is a globally celebrated team sport...',
  },
  {
    name: 'Volleyball',
    image: '/vollyball.jpg',
    description: 'Volleyball combines speed, coordination...',
  },
  {
    name: 'Basketball',
    image: '/Basketball.jpeg',
    description: 'Basketball is perfect for those who thrive...',
  },
  {
    name: 'Tennis',
    image: '/tennies.jpg',
    description: 'Tennis is the ultimate one-on-one challenge...',
  },
];

export const SportProvider = ({ children }: { children: React.ReactNode }) => {
  const [sports, setSports] = useState<Sport[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('sports');
    if (stored) {
      const parsed: Sport[] = JSON.parse(stored);
      const merged = [...parsed];

      defaultSports.forEach((defaultSport) => {
        if (!parsed.some((s) => s.name === defaultSport.name)) {
          merged.push(defaultSport);
        }
      });

      setSports(merged);
      localStorage.setItem('sports', JSON.stringify(merged));
    } else {
      setSports(defaultSports);
      localStorage.setItem('sports', JSON.stringify(defaultSports));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sports', JSON.stringify(sports));
  }, [sports]);

  const addSport = (name: string, image: string, description: string) => {
    const exists = sports.some((s) => s.name.toLowerCase() === name.toLowerCase());
    if (exists) return window.alert('this sport allready exist');
    const newSport: Sport = { name, image, description };
    setSports((prev) => [...prev, newSport]);
  };

  return (
    <SportContext.Provider value={{ sports, setSports, addSport }}>
      {children}
    </SportContext.Provider>
  );
};

export const useSports = () => {
  const context = useContext(SportContext);
  if (!context) throw new Error('useSports must be used inside a SportProvider');
  return context;
};
