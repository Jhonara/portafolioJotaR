import { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

const Typewriter = ({
  text,
  speed = 40,
  onComplete,
}: TypewriterProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setFinished(false);

    let index = 0;

    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index + 1));

      index++;

      if (index >= text.length) {
        clearInterval(interval);
        setFinished(true);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, onComplete]);

  return (
    <span className="text-green-400">
      {displayedText}
      {!finished && <span className="animate-pulse">█</span>}
    </span>
  );
};

export default Typewriter;