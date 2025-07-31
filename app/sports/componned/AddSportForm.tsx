'use client';
import React, { useState } from "react";
import { useSports } from '../../Context/SportContext';

const AddSportForm: React.FC = () => {
  const [name , setName] = useState('');
  const [image , setImage] = useState('');
  const [description , setDescription] = useState('');
  const { addSport } = useSports();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !image || !description) return window.alert('something missed');
    addSport(name, image, description);
    setName('');
    setImage('');
    setDescription('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-black/60 border border-yellow-500 rounded-xl p-6 shadow-xl backdrop-blur-md text-white space-y-4 mt-60"
    >
      <h2 className="text-2xl font-bold text-yellow-400 text-center mb-2">Add New Sport</h2>

      <div className="space-y-1">
        <label className="text-sm font-semibold text-yellow-300">Sport Name</label>
        <input
          type="text"
          placeholder="e.g. Football"
          className="w-full p-3 rounded bg-black/40 border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 mt-5"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-semibold text-yellow-300">Image</label>
        <input
            type="file"
            accept="image/*"
            className="w-full p-3 rounded bg-black/40 border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 mt-5"
            onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    if (reader.result && typeof reader.result === 'string') {
                    setImage(reader.result); 
        }
      };
      reader.readAsDataURL(file);
    }
                }}
            />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-semibold text-yellow-300">Description</label>
        <textarea
          placeholder="Describe the sport"
          className="w-full p-3 rounded bg-black/40 border border-yellow-400 resize-none h-28 focus:ring-2 focus:ring-yellow-400 mt-5"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <button
        type='submit'
        className="w-full bg-yellow-400 text-black font-semibold py-2 rounded hover:bg-yellow-500 transition duration-300 cursor-pointer mt-5"
      >
        Add Sport
      </button>
    </form>
  );
};

export default AddSportForm;
