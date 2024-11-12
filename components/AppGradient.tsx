import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import Content from "./Content";

const AppGradient = ({
  colors,
  children,
}: {
  colors: string[];
  children: any;
}) => {
  return (
    <LinearGradient colors={colors} className="flex-1">
      <Content>{children}</Content>
    </LinearGradient>
  );
};

export default AppGradient;