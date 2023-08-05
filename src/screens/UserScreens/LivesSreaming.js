import React, { useState } from 'react';
import { View, Text, TouchableOpacity,
StyleSheet } from 'react-native';
// import FFMpegKit from 'ffmpeg-kit-react-native';

import { RTCView, MediaStream } from 'react-native-webrtc';

// import VLCPlayer from 'react-native-vlc-player';
import Headerx from '../../components/header';
import { useRef } from 'react';
import { useEffect } from 'react';
// import { encode } from 'base-64';

export default LiveStreaming = (props) => {
  const [stream, setStream] = useState(null);
  const streamRef = useRef(null);
  const pcRef = useRef(null);

  useEffect(() => {
    const startStream = async () => {
      try {
        const mediaStream = await MediaStream.createVideoStream(
          'rtsp://rtsp/stream/movie'
        );

        const pc = new RTCPeerConnection({
          iceServers: [
            {
              urls: 'stun:stun.l.google.com:19302',
            },
          ],
        });

        mediaStream.getTracks().forEach((track) => {
          pc.addTrack(track, mediaStream);
        });

        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        // Send the offer to the remote peer here

        // Receive the answer from the remote peer here

        await pc.setRemoteDescription(answer);

        const remoteStream = new MediaStream();
        pc.getReceivers().forEach((receiver) => {
          remoteStream.addTrack(receiver.track);
        });

        setStream(remoteStream);
        streamRef.current = remoteStream;
        pcRef.current = pc;
      } catch (error) {
        console.log(error);
      }
    };

    startStream();

    return () => {
      if (pcRef.current) {
        pcRef.current.close();
        pcRef.current = null;
      }
    };
  }, []);


  // const [isPlaying, setIsPlaying] = useState(false);
  // const [playerKey, setPlayerKey] = useState(0);

  // useEffect(() => {
  //   setIsPlaying(true);
  //   return () => {
  //     setIsPlaying(false);
  //     setPlayerKey(playerKey + 1);
  //   };
  // }, [playerKey]);

  // const credentials = 'admin:ParkingBuddy';
  // const authHeader = `Basic ${encode(credentials)}`;

  // const vlcPlayerOptions = {
  //   source: {
  //     uri: 'rtsp://admin:ParkingBuddy@192.168.1.64:554/Streaming/Channels/1/',
  //     initOptions: {
  //       headers: {
  //         Authorization: authHeader,
  //       },
  //     },
  //   },
  //   hwDecoderEnabled: true,
  //   playInBackground: false,
  //   autoplay: true,
  // };

  return (
    <>
      <Headerx
        navigation={props?.navigation}
        headerName={'Live Streaming'}></Headerx>
      <View style={styles.container}>

       
      {stream && <RTCView style={styles.video} streamURL={stream.toURL()} />}

      </View>
      {/* <View style={styles.container}>
        {isPlaying && (
          <VLCPlayer
            key={playerKey}
            style={styles.video}
            videoAspectRatio="16:9"
            {...vlcPlayerOptions}
          />
        )}
      </View> */}

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',

  },
  emptyView: {
    width: 400,
    height: 400,
    elevation: 2,
    marginTop: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  emptyViewText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});


