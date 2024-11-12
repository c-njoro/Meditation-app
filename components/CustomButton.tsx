import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface CustomButtonProps {
  onPress: () => void;
  title: string;
  textStyles?: string;
  containerStyles?: string;
}

const CustomButton = ({
  onPress,
  title,
  textStyles = "",
  containerStyles = "",
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      className={`bg-white rounded-xl min-h-[62px] justify-center items-center ${containerStyles} `}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text className={`font-semibold text-lg ${textStyles} capitalize`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;