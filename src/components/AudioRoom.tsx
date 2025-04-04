"use client";

import { useDaily, useParticipantIds, useAudioTrack } from '@daily-co/daily-react';
import { useCallback, useEffect, useState } from 'react';
import { DAILY_ROOM_URL } from '../lib/constants';
import { Button } from "~/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";

function AudioParticipant({ id }: { id: string }) {
  const { track } = useAudioTrack(id);
  
  useEffect(() => {
    if (!track) return;
    
    const audioElement = document.createElement('audio');
    audioElement.autoplay = true;
    document.body.appendChild(audioElement);
    audioElement.srcObject = new MediaStream([track]);
    
    return () => {
      audioElement.srcObject = null;
      audioElement.remove();
    };
  }, [track]);

  return null;
}

function Controls() {
  const call = useDaily();
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = useCallback(() => {
    call?.setLocalAudio(!isMuted);
    setIsMuted(!isMuted);
  }, [call, isMuted]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Voice Room</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Button onClick={toggleMute}>
          {isMuted ? 'Unmute' : 'Mute'}
        </Button>
      </CardContent>
    </Card>
  );
}

export function AudioRoom() {
  const participantIds = useParticipantIds({ filter: 'remote' });
  const call = useDaily();

  useEffect(() => {
    if (!call) return;
    
    call.join({ url: DAILY_ROOM_URL, videoSource: false });
    
    return () => {
      call.leave();
    };
  }, [call]);

  return (
    <div className="space-y-4">
      <Controls />
      {participantIds.map((id) => (
        <AudioParticipant key={id} id={id} />
      ))}
    </div>
  );
}
