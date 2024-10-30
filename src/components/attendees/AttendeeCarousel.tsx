"use client";

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Attendee {
  id: string;
  name: string;
  photoUrl: string;
  metadata: {
    hometown: string;
    relationToKory: string;
    funFact?: string;
  };
}

interface AttendeeCarouselProps {
  attendees: Attendee[];
}

export default function AttendeeCarousel({ attendees }: AttendeeCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const TRANSITION_DURATION = 250; // Reduced from 500ms to 250ms
  const RESET_DURATION = 25; // Reduced from 50ms to 25ms
  
  const wrappedAttendees = [...attendees.slice(-1), ...attendees, ...attendees.slice(0, 1)];
  
  const goToSlide = (index: number, wrap = false) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex(index);

    if (wrap) {
      // After the main transition, quickly reset to the actual slide
      setTimeout(() => {
        setIsAnimating(true);
        if (index >= attendees.length) {
          setCurrentIndex(0);
        } else if (index < 0) {
          setCurrentIndex(attendees.length - 1);
        }
        setTimeout(() => setIsAnimating(false), RESET_DURATION);
      }, TRANSITION_DURATION);
    }
    
    setTimeout(() => setIsAnimating(false), TRANSITION_DURATION);
  };

  const nextSlide = () => {
    goToSlide(currentIndex + 1, currentIndex === attendees.length - 1);
  };

  const prevSlide = () => {
    goToSlide(currentIndex - 1, currentIndex === 0);
  };

  // Touch handling with adjusted sensitivity
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    const difference = touchStart - touchEnd;
    if (Math.abs(difference) > 30) { // Reduced from 50 to 30 for more sensitive swipe
      if (difference > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  const getSlideStyle = (index: number) => {
    const position = index - currentIndex - 1;
    const translateX = position * 100;
    let scale = 0.7;
    let zIndex = 0;
    
    if (position === 0) {
      scale = 1;
      zIndex = 2;
    }

    return {
      transform: `translateX(${translateX}%) scale(${scale})`,
      zIndex,
      opacity: Math.abs(position) <= 1 ? 1 : 0,
      transition: isAnimating 
        ? `transform ${TRANSITION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)` // Added easing function
        : 'none',
    };
  };

  return (
    <div className="relative max-w-4xl mx-auto px-4 py-8">
      <div 
        className="relative h-[500px] overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute w-full h-full flex justify-center items-start">
          {wrappedAttendees.map((attendee, index) => (
            <div
              key={`${attendee.id}-${index}`}
              className="absolute w-64 transition-all duration-250 ease-in-out" // Updated duration here too
              style={getSlideStyle(index)}
            >
              <div className="relative">
                <img
                  src={attendee.photoUrl}
                  alt={attendee.name}
                  className="w-64 h-64 object-cover rounded-lg shadow-lg"
                />
                
                {index === currentIndex + 1 && (
                  <div className="mt-6 text-center transition-all duration-200"> {/* Faster metadata transition */}
                    <h3 className="font-bold text-xl mb-2">{attendee.name}</h3>
                    <p className="text-sm mb-1">From: {attendee.metadata.hometown}</p>
                    <p className="text-sm mb-1">{attendee.metadata.relationToKory}</p>
                    {attendee.metadata.funFact && (
                      <p className="text-sm italic mt-2">&quot;{attendee.metadata.funFact}&quot;</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prevSlide}
        disabled={isAnimating}
        className="absolute left-0 top-1/3 -translate-y-1/2 p-4 text-gray-600 hover:text-gray-900 
          disabled:opacity-50 disabled:cursor-not-allowed z-10 transition-colors duration-150" // Added button transition
      >
        <ChevronLeft size={32} />
      </button>
      <button
        onClick={nextSlide}
        disabled={isAnimating}
        className="absolute right-0 top-1/3 -translate-y-1/2 p-4 text-gray-600 hover:text-gray-900 
          disabled:opacity-50 disabled:cursor-not-allowed z-10 transition-colors duration-150" // Added button transition
      >
        <ChevronRight size={32} />
      </button>
    </div>
  );
}