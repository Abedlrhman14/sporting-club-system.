'use client';
import React, { useState } from "react";

interface Props{
    onAddSport : (name: string , image : string , description : string) => void ;
}

const AddSportForm: React.FC<Props> = ({onAddSport}) => {
    const [name , setName] = useState('');
    const [image , setImage] = useState('');
    const [description , setDescription] = useState('');
    
    // this function to handel data and make sure the sport didnet daplicate 
    const handelSubmit = (e: React.FormEvent)=>{
        e.preventDefault();
        if(!name || !image || !description) return;
        onAddSport(name,image,description);
        setName('');
        setImage('');
        setDescription('');
    };
    return(
        <form
            onSubmit={handelSubmit}
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
                onChange={(e)=>setName(e.target.value)}
            />
            </div>
            <div className="space-y-1">
                <label className="text-sm font-semibold text-yellow-300">Image Url</label>
                <input
                    type="file"
                    placeholder="e.g. /football.jpg"
                    accept="image/*"
                    className="w-full p-3 rounded bg-black/40 border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 mt-5"
                    // value={image}
                    onChange={(e) => {
                        const file =e.target.files?.[0];
                        if(file && file instanceof Blob) {
                            const url = URL.createObjectURL(file);
                            setImage(url);
                        } else {
                                console.error("الملف غير صالح أو غير موجود");
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
                Add Spport
            </button>
        </form>
    )

}

export default AddSportForm