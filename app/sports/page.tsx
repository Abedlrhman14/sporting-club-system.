'use client';
import React, { useEffect, useState } from 'react'
import SportCardList from './componned/SportCardList';


interface Sport {
  name: string;
  description: string;
  image: string;
}
const page = () => {
  const [sports, setsports] = useState<Sport[]>([]);
  const [selectedSport , setSelectedSport] = useState('');

  const selectedSportData = sports.find(s => s.name === selectedSport);
  useEffect(() => {
  const defaultSports: Sport[] = [
    {
      name: 'Football',
      image: '/football.jpg',
      description: 'Football is a globally celebrated team sport that builds teamwork,agility, and endurance. At Blue Ribbon Egypt, our football academy offers top-tier training for all skill levels, from beginners to aspiring professionals',
    },
    {
      name: 'Vollyball',
      image: '/vollyball.jpg',
      description: 'Volleyball combines speed, coordination, and quick decision-making.Our indoor and beach volleyball programs foster strong team dynamics and develop core strength and agility in a competitive yet supportive environment',
    },
    {
      name:'Basketball',
      image : 'Basketball.jpeg',
      description : 'Basketball is perfect for those who thrive on strategy, speed, and sharp shooting.Join our professional-grade courts and coaching staff to elevate your game and build confidence.'
    },
    {
      name:'Tennies',
      image:'tennies.jpg',
      description:'Tennis is the ultimate one-on-one challenge of skill, focus, and fitness. Blue Ribbons tennis program features state-of-the-art courts and personalized coaching to help you master the art of the game.'
    }
  ];

  // to store data in local storage
  const stored = localStorage.getItem('sports');
  const storedSports: Sport[] = stored ? JSON.parse(stored) : [];

  // the mergedSports for the action when the user add sport and want to delete it from local storage don't remove the basic sport
  const mergedSports = [...defaultSports];
  storedSports.forEach((sport) => {
    if (!mergedSports.some((s) => s.name === sport.name)) {
      mergedSports.push(sport);
    }
  });

  setsports(mergedSports);
  setSelectedSport(mergedSports[0]?.name || '');

  // to save new sport in local storage 
  localStorage.setItem('sports', JSON.stringify(mergedSports));
}, []);
  

  useEffect(()=>{
    // this function to update the data in browser
    localStorage.setItem('sports' ,JSON.stringify(sports));
  },[sports])

  // this function to show defult or first sport 
  useEffect(()=>{

    if(sports.length && !selectedSport){
      setSelectedSport(sports[0].name);
    }
  },[sports, selectedSport])
  
  return (
    
     <>
         <div className='relative w-full min-h-screen overflow-hidden text-yellow-400'>

        {/* Background Imge */}
        
           <img
              src={selectedSportData?.image}
              alt={selectedSport}
              className='absolute top-0 left-0 w-full h-full object-cover  object-[center_20%]  z-0 '
           />

          {/* Overlay */}

           <div className='absolute top-0 left-0 w-full h-full bg-black/60 z-10'></div>
          
          {/* Content */}
        <div className='relative z-20 flex flex-col md:flex-row items-center md:items-end justify-center md:justify-end h-full px-6 md:px-20'>

             <img
                src={selectedSportData?.image}
                alt={`${selectedSport} preview`}
                className='w-64 h-64 md:w-88 md:h-120 object-cover object-[40%] mb-6 md:mb-0 md:mr-20 mt-50 rotate-10 shadow-lg '
             />


          <div className='max-w-xl text-center md:text-left mt-1 sm:mt-20'>
            <h1 className='text-3xl md:text-4xl font-bold text-yellow-400 mb-4 ml-6'>
                  Blue Ribbon {selectedSport} Academy
            </h1>

             <p className='mt-4 md:text-x text-gray-300 max-w-xl text-left ml-8'>
                {selectedSportData?.description} 
            </p>
            
            <select
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
              className='bg-transparent border border-yellow-400 px-2  py-2 mt-20 mx-50 rounded'
            >
              {sports.map((sport)=> (
                <option key={sport.name} value={sport.name}>{sport.name}</option>
              ))}
              
            </select>
          </div>
         <div className='mb-4'>
       
         </div>
        </div>
     
      </div> 
      <SportCardList
          sports = {sports}
          selectedSport={selectedSport}
          setSelectedSport={setSelectedSport}
          onAddSport={(name , image , description) => {
            const exists = sports.some((s) => s.name === name);
            if(exists) return alert ('Sport already exists!');
            setsports((prev) => [...prev , {name , image , description}]);
          }}
      />
    
     </>      
    
  )
}

export default page
