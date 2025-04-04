"use client";

import { DailyProvider } from '@daily-co/daily-react';
import { useCallback, useEffect } from 'react';
import { AudioRoom } from './AudioRoom';
import { DAILY_ROOM_URL } from '../lib/constants';

export default function Frame() {
  const getCallOptions = useCallback(() => ({
    videoSource: false,
    startVideoOff: true,
    startAudioOff: false,
  }), []);

  return (
    <div className="w-[300px] mx-auto py-2 px-2">
      <DailyProvider 
        url={DAILY_ROOM_URL}
        callOptions={getCallOptions}
      >
        <AudioRoom />
      </DailyProvider>
    </div>
  );
}
