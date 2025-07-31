'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

// this is members fields 
interface Member {
  id: number;
  name: string;
  age: number;
  sports: string[];
}
// to define the types of members 
interface MemberContextType {
  members: Member[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
}

const MemberContext = createContext<MemberContextType | undefined>(undefined);

//the defult mmeber if the user diden't make new member
const defaultMembers: Member[] = [
  { id: 1, name: 'Ahmed Hassan', age: 22, sports: ['Football'] },
  { id: 2, name: 'Sara Ali', age: 19, sports: ['Basketball'] },
];


export const MemberProvider = ({ children }: { children: React.ReactNode }) => {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('members');
    if (stored) {
      const parsed: Member[] = JSON.parse(stored);
      const merged = [...parsed];

      defaultMembers.forEach((defaultMember) => {
        if (!parsed.some((m) => m.id === defaultMember.id)) {
          merged.push(defaultMember);
        }
      });

      setMembers(merged);
      localStorage.setItem('members', JSON.stringify(merged));
    } else {
      setMembers(defaultMembers);
      localStorage.setItem('members', JSON.stringify(defaultMembers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('members', JSON.stringify(members));
  }, [members]);

  return (
    // to share member and set member to all components
    <MemberContext.Provider value={{ members, setMembers }}>
      {children}
    </MemberContext.Provider>
  );
};

export const useMembers = () => {
  const context = useContext(MemberContext);
  if (!context) throw new Error('useMembers must be used inside a MemberProvider');
  return context;
};
