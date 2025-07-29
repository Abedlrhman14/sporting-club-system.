'use client';
import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface Member {
  id: number;
  name: string;
  age: number;
  sports: string[];
}

const sportsList = ['Football', 'Volleyball', 'Basketball', 'Tennis'];

export default function SubscriptionsPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedSports, setSelectedSports] = useState<Record<number, string>>({});

  // Load from localStorage or use default
  useEffect(() => {
    const stored = localStorage.getItem('members');
    if (stored) {
      setMembers(JSON.parse(stored));
    } else {
      const defaultMembers: Member[] = [
        { id: 1, name: 'Ahmed', age: 21, sports: ['Football'] },
        { id: 2, name: 'Sara', age: 18, sports: [] },
      ];
      setMembers(defaultMembers);
      localStorage.setItem('members', JSON.stringify(defaultMembers));
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('members', JSON.stringify(members));
  }, [members]);

  const subscribe = (memberId: number) => {
    const sport = selectedSports[memberId];
    if (!sport) return;

    setMembers((prev) =>
      prev.map((m) =>
        m.id === memberId && !m.sports.includes(sport)
          ? { ...m, sports: [...m.sports, sport] }
          : m
      )
    );
    setSelectedSports((prev) => ({ ...prev, [memberId]: '' }));
  };

  const removeSport = (memberId: number, sport: string) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === memberId
          ? { ...m, sports: m.sports.filter((s) => s !== sport) }
          : m
      )
    );
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">🏷️ Subscriptions</h1>

      <div className="space-y-6">
        {members.map((member) => (
          <div key={member.id} className="bg-zinc-800 p-5 rounded-lg border border-yellow-500">
            <div className="flex justify-between items-center mb-3">
              <div>
                <h2 className="text-xl font-bold text-yellow-300">{member.name}</h2>
                <p className="text-sm text-gray-400">Age: {member.age}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 items-center mb-4">
              <select
                value={selectedSports[member.id] || ''}
                onChange={(e) =>
                  setSelectedSports((prev) => ({
                    ...prev,
                    [member.id]: e.target.value,
                  }))
                }
                className="bg-zinc-700 text-white border border-yellow-400 p-2 rounded"
              >
                <option value="">Choose sport</option>
                {sportsList
                  .filter((s) => !member.sports.includes(s))
                  .map((sport) => (
                    <option key={sport} value={sport}>
                      {sport}
                    </option>
                  ))}
              </select>

              <button
                onClick={() => subscribe(member.id)}
                className="bg-yellow-400 text-black px-3 py-2 rounded hover:bg-yellow-500"
              >
                Subscribe
              </button>
            </div>

            <div>
              <h4 className="text-sm text-gray-400 mb-1">Subscribed Sports:</h4>
              <div className="flex flex-wrap gap-2">
                {member.sports.map((sport) => (
                  <span
                    key={sport}
                    className="bg-yellow-500 text-black px-3 py-1 rounded-full flex items-center text-sm"
                  >
                    {sport}
                    <button
                      onClick={() => removeSport(member.id, sport)}
                      className="ml-2 text-red-700 hover:text-red-900"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
