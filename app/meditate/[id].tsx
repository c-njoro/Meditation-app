import AppGradient from "@/components/AppGradient";
import CustomButton from "@/components/CustomButton";
import MEDITATION_IMAGES from "@/constants/meditation-images";
import { AUDIO_FILES, MEDITATION_DATA } from "@/constants/MeditationData";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Audio } from "expo-av";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ImageBackground, Pressable, Text, View } from "react-native";

const Meditate = () => {
  const { id } = useLocalSearchParams();
  const [secondsRemaining, setSecondsRemaining] = useState(10);
  const [isMeditating, setIsMeditating] = useState(false);
  const [audioSound, setAudio] = useState<Audio.Sound>();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (secondsRemaining === 0) {
      setIsMeditating(false);
      return;
    }

    if (isMeditating) {
      timerId = setTimeout(() => {
        setSecondsRemaining(secondsRemaining - 1);
      }, 1000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [secondsRemaining, isMeditating]);

  const toggleMeditatingSession = async () => {
    if (secondsRemaining === 0) setSecondsRemaining(10);
    setIsMeditating(!isMeditating);

    await toggleSound();
  };

  const initializeSound = async () => {
    const audioFileName = MEDITATION_DATA[Number(id) - 1].audio;
    const { sound } = await Audio.Sound.createAsync(AUDIO_FILES[audioFileName]);
    setAudio(sound);

    return sound;
  };

  const toggleSound = async () => {
    const sound = audioSound ? audioSound : await initializeSound();

    const status = await sound?.getStatusAsync();

    if (status?.isLoaded && !isPlaying) {
      await sound.playAsync();
      setIsPlaying(true);
    } else {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      audioSound?.unloadAsync();
    };
  }, [audioSound]);

  return (
    <View className="flex-1">
      <ImageBackground
        source={MEDITATION_IMAGES[Number(id) - 1]}
        resizeMode="cover"
        className="flex-1"
      >
        <AppGradient colors={["transparent", "rgba(0, 0, 0, 0.8)"]}>
          <Pressable
            onPress={() => router.back()}
            className="absolute top-10 left-4 z-10"
          >
            <AntDesign name="leftcircleo" size={50} color="white" />
          </Pressable>

          <View className="flex-1 justify-center">
            <View className="mx-auto bg-neutral-200 rounded-full w-44 h-44 justify-center items-center">
              <Text className="text-4xl text-blue-800 font-rmono">
                00:
                {secondsRemaining > 9
                  ? `${secondsRemaining}`
                  : `0${secondsRemaining}`}
              </Text>
            </View>
          </View>
          <View className="mb-5 gap-5">
            <CustomButton
              title="Adjust Duration"
              onPress={toggleMeditatingSession}
            />
            <CustomButton
              title="Start Meditation"
              onPress={toggleMeditatingSession}
            />
          </View>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default Meditate;
