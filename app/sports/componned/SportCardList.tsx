'use client';
import React from 'react'
import AddSportForm from './AddSportForm';


interface Sport {
  name : string ,
  image : string ,
  description : string ,
};
// this interface to devine props from sport page
interface props{
     sports: Sport[];
     selectedSport: string;
     setSelectedSport: (sport: string) => void;
     onAddSport: (name: string, image: string, description: string) => void;
} 


const SportCardList : React.FC<props> = ({sports , selectedSport , setSelectedSport , onAddSport}) =>{
  return (
      <section className='relative z-30 px-10 py-16 bg-black text-white'>
        <h2 className='text-3xl font-bold mb-8 text-yellow-400'>Explore All Sports</h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {sports.map((sport)=>(
            <div
              key={sport.name}
              className='bg-white/10 backdrop-blur-md rounded-xl  overflow-hidden shadow-lg border-yellow-400 hover:scale-105 transition cursor-pointer'
              onClick={() => setSelectedSport(sport.name)}
            >
              <img
                src={sport.image}
                alt={sport.name}
                className='w-full h-40 object-cover object-[center_20%] '
              />
              <div className='p-4'>
                <h2 className='text-xl font-bold'>{sport.name}</h2>
                <p className='text-sm text-gray-300 mt-2'>{sport.description}</p>
              </div>
            </div>
          ))}
        </div>
        <AddSportForm
          onAddSport={onAddSport}
        />
      </section>
  )
} 

export default SportCardList
