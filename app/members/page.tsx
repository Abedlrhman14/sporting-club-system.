'use client';
import React, { useState } from 'react';
import { UserPlus } from 'lucide-react'; //icon
import Navbar from '../components/navbar';
import { useMembers } from '../Context/MemberContext' 

const MembersPage = () => {
  const { members, setMembers } = useMembers(); // ✅ من الـ Context
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();

    // validation 
    if (!name || !age) return window.alert('name and age is requierd');

      
    const newMember = {
      id: Date.now(),
      name,
      age: parseInt(age),
      sports: [],
    };

    setMembers((prev) => [...prev, newMember]);
    setName('');
    setAge('');
    setShowForm(false);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-yellow-400">Club Members</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 flex items-center gap-2"
          >
            <UserPlus size={18} /> Add Member
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleAddMember}
            className="bg-black/60 border border-yellow-400 p-6 rounded-xl space-y-4 max-w-md mb-10"
          >
            <input
              type="text"
              placeholder="Member Name"
              className="w-full p-3 rounded bg-gray-800 border border-yellow-400 focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Age"
              className="w-full p-3 rounded bg-gray-800 border border-yellow-400 focus:outline-none"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-yellow-400 text-black font-semibold py-2 rounded hover:bg-yellow-500"
            >
              Save Member
            </button>
          </form>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {members.map((member) => (
            <div
              key={member.id}
              className="bg-white/10 border border-yellow-400 p-5 rounded-xl shadow hover:scale-[1.02] transition"
            >
              <h2 className="text-2xl font-bold text-yellow-300">{member.name}</h2>
              <p className="text-gray-300">Age: {member.age}</p>
              <p className="text-gray-400 mt-2">
                Sports:{" "}
                <span className="text-white">
                  {member.sports.length ? member.sports.join(', ') : 'None'}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MembersPage;
