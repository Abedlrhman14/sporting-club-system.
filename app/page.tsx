import { MapPin } from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
      <>
       <div className="relative w-full h-screen overflow-hidden">
          {/* Background Videos */}
     <iframe
        className="absolute top-0 left-0 w-full h-full z-0"
        src="https://www.youtube.com/embed/PxQZQp_Ijak?autoplay=1&mute=1&controls=0&showinfo=0&modestbranding=1&loop=1&playlist=PxQZQp_Ijak&rel=0"
        title="Blue Ribbon Video"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      />

          {/* overlay */}
         <div className="absolute top-0 left-0 w-full h-full bg-black/60  z-10"/>    
            <div className="absolute top-0 left-0 w-full h-full z-20 flex flex-col mt-30 items-center justify-center text-white text-center px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  🏆 Blue Ribbon Egypt
                </h1>
                  <p className="text-lg md:text-xl mb-6">
                      Your gateway to elite sports in Egypt
                 </p>
                 <div className="flex flex-col md:flex-row gap-4">
                    <Link 
                      href={'/sports'}
                      >
                        <div className="bg-yellow-400 text-black px-6 py-3 rounded font-semibold hover:bg-yellow-500 transition text-center" >
                            sports  
                        </div>    
                    </Link>
                    <Link
                      href={'/members'}
                    >
                        <div className="bg-yellow-400 text-black px-6 py-3 rounded font-semibold hover:bg-yellow-500 transition text-center ">
                          members
                        </div>
                    </Link>
                    <Link
                      href={'/subscriptions'}
                    >
                      <div className="bg-yellow-400 text-black px-6 py-3 rounded font-semibold hover:bg-yellow-500 transition textcenter">
                          subscriptions
                      </div>
                    </Link>
                 </div>
            </div>
        </div>

       {/* About Section */}
          <section className="bg-[#0D1117] text-white py-16 px-6 text-center">
                <h2 className="text-3xl font-bold mb-4">About Blue Ribbon Egypt</h2>
                <p className="max-w-2xl mx-auto text-gray-300 text-lg leading-relaxed mt-20">
                   Blue Ribbon Egypt is a prestigious multi-sport club dedicated to
                  excellence in athletic performance and community connection. From
                  football to tennis, our platform helps you manage all your sports and
                  members in one place.
                </p>
          </section>

          {/* Branch Section */}

          <section className="bg-[#0D1117] text-white py-16 px-6">
              <h2 className="text-3xl font-bold text-center mb-10">Our Branches</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {[
                   { name: 'Maadi Branch', city: 'Cairo' },
                   { name: 'Sporting Branch', city: 'Alexandria' },
                   { name: 'October Club', city: 'Giza' },
                   { name: 'Marina Club', city: 'North Coast' },
                ].map((branch,index) =>(
                  <div
                    key={index}
                    className="bg-[#1C1C1E] rounded-lg p-6 flex items-center gap4 " 
                  >
                      <MapPin size={24} className="text-yellow-400 left-0" />
                      <div>
                        <h3 className="text-xl font-semibold ms-5">{branch.name}</h3>
                        <p className="text-gray-400 ms-5">{branch.city}</p>
            
                      </div>
                  </div>
                ))}
              </div>
          </section>
          
      </>
  );
}
