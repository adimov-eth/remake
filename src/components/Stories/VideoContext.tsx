import React, { createContext, useContext, useState, useEffect } from 'react';

interface VideoContextType {
  videoRef: React.RefObject<HTMLVideoElement>;
  isVideoReady: boolean;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleCanPlay = () => setIsVideoReady(true);
      video.addEventListener('canplay', handleCanPlay);
      return () => video.removeEventListener('canplay', handleCanPlay);
    }
  }, []);

  return (
    <VideoContext.Provider value={{ videoRef, isVideoReady }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
};