import { Post } from '@prisma/client';
import Image from 'next/image';
import React from 'react';


const Card = ({data}:{data:Post}) => (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
      <img
        className="w-full h-auto object-cover rounded-xl"
        src={data.image}
        alt={data.prompt}
        loading='lazy'
      />
      <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
        <p className="text-white text-sm overflow-y-auto prompt">{data.prompt}</p>
  
        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">{data.name[0]}</div>
            <p className="text-white text-sm">{data.name}</p>
          </div>
        </div>
      </div>
    </div>
  );

export default Card;
