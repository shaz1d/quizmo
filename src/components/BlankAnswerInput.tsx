import React, { useMemo } from "react";
import keyword_extractor from "keyword-extractor";

type Props = {
  answer: string;
  setBlankAnswer: React.Dispatch<React.SetStateAction<string>>;
};

const BLANKS = "_____";
const BlankAnswerInput = ({ answer, setBlankAnswer }: Props) => {
  const keywords = useMemo(() => {
    const words = keyword_extractor.extract(answer, {
      language: "english",
      remove_digits: true,
      return_changed_case: false,
      remove_duplicates: false,
    });
    const shuffled = words.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 2);
  }, [answer]);

  const answerWithBlanks = useMemo(() => {
    const ansWithBlacks = keywords.reduce((acc, keyword) => {
      return acc.replace(keyword, BLANKS);
    }, answer);
    setBlankAnswer(ansWithBlacks);
    return ansWithBlacks;
  }, [keywords, answer, setBlankAnswer]);

  return (
    <div className="w-full p-2">
      <div className="text-xl font-medium">
        {answerWithBlanks.split(BLANKS).map((part, index) => {
          return (
            <h2 key={index} className=" inline">
              {part}
              {index === answerWithBlanks.split(BLANKS).length - 1 ? null : (
                <input
                  id="user-blank-input"
                  className="text-center border-black dark:border-white border-b-2 w-28 accent-black"
                />
              )}
            </h2>
          );
        })}
      </div>
      <h2>{answer}</h2>
    </div>
  );
};

export default BlankAnswerInput;
