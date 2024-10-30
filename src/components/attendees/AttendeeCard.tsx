import Image from 'next/image';
import { useState } from 'react';

interface AttendeeMetadata {
  hometown: string;
  relationToKory: string;
  funFact?: string;
}

interface AttendeeCardProps {
  name: string;
  photoUrl: string;
  metadata: AttendeeMetadata;
}

export default function AttendeeCard({ name, photoUrl, metadata }: AttendeeCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-48 h-48 rounded-lg overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={photoUrl}
        alt={name}
        fill
        className="object-cover transition-opacity duration-300"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      
      {isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-75 p-4 text-white transition-opacity duration-300">
          <h3 className="font-bold mb-2">{name}</h3>
          <p className="text-sm mb-1">From: {metadata.hometown}</p>
          <p className="text-sm mb-1">{metadata.relationToKory}</p>
          {metadata.funFact && (
            <p className="text-sm italic">&quot;{metadata.funFact}&quot;</p>
          )}
        </div>
      )}
    </div>
  );
}