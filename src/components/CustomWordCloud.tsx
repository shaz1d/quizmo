"use client";

import { useTheme } from "next-themes";
import D3WordCloud from "react-d3-cloud";

type Props = {};
const data = [
  {
    text: "AI",
    value: 30,
  },
  {
    text: "React Js",
    value: 15,
  },
  {
    text: "PHP",
    value: 25,
  },
  {
    text: "Laravel",
    value: 5,
  },
];
const fontSizeMapper = (word: { value: number }) => {
  return Math.log2(word.value) * 5 + 16;
};
const CustomWordCloud = (props: Props) => {
  const theme = useTheme();
  return (
    <D3WordCloud
      data={data}
      width={500}
      height={500}
      font="Times"
      fontSize={fontSizeMapper}
      rotate={0}
      padding={10}
      fill={theme.theme == "dark" ? "white" : "black"}
    ></D3WordCloud>
  );
};

export default CustomWordCloud;
