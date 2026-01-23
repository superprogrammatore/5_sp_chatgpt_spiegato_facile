import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { ScreenContainer } from "./ScreenContainer";
import { NavigationControls } from "./NavigationControls";
import { Screen1Input } from "./screens/Screen1Input";
import { Screen2Tokenization } from "./screens/Screen2Tokenization";
import { Screen3Embeddings } from "./screens/Screen3Embeddings";
import { Screen4Attention } from "./screens/Screen4Attention";
import { Screen5Prediction } from "./screens/Screen5Prediction";
import { Screen6Loop } from "./screens/Screen6Loop";
import { Screen7Training } from "./screens/Screen7Training";
import { Screen8Summary } from "./screens/Screen8Summary";

const TOTAL_SCREENS = 8;

export const ChatGPTExplainer = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [submittedInput, setSubmittedInput] = useState("");

  const handleNext = useCallback(() => {
    if (currentScreen < TOTAL_SCREENS - 1) {
      setCurrentScreen(prev => prev + 1);
    }
  }, [currentScreen]);

  const handlePrev = useCallback(() => {
    if (currentScreen > 0) {
      setCurrentScreen(prev => prev - 1);
    }
  }, [currentScreen]);

  const handleReset = useCallback(() => {
    setCurrentScreen(0);
    setUserInput("");
    setSubmittedInput("");
  }, []);

  const handleInputSubmit = useCallback(() => {
    if (userInput.trim()) {
      setSubmittedInput(userInput.trim());
      handleNext();
    }
  }, [userInput, handleNext]);

  const canGoNext = currentScreen === 0 ? submittedInput.length > 0 : true;

  const renderScreen = () => {
    switch (currentScreen) {
      case 0:
        return (
          <Screen1Input
            userInput={userInput}
            setUserInput={setUserInput}
            onSubmit={handleInputSubmit}
          />
        );
      case 1:
        return <Screen2Tokenization userInput={submittedInput} />;
      case 2:
        return <Screen3Embeddings userInput={submittedInput} />;
      case 3:
        return <Screen4Attention userInput={submittedInput} />;
      case 4:
        return <Screen5Prediction userInput={submittedInput} />;
      case 5:
        return <Screen6Loop userInput={submittedInput} />;
      case 6:
        return <Screen7Training />;
      case 7:
        return <Screen8Summary userInput={submittedInput} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen pb-24">
      <AnimatePresence mode="wait">
        <ScreenContainer key={currentScreen} screenIndex={currentScreen}>
          {renderScreen()}
        </ScreenContainer>
      </AnimatePresence>

      <NavigationControls
        currentScreen={currentScreen}
        totalScreens={TOTAL_SCREENS}
        onNext={handleNext}
        onPrev={handlePrev}
        onReset={handleReset}
        canGoNext={canGoNext}
      />
    </div>
  );
};
