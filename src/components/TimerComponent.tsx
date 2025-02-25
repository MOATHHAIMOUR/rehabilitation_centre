import React, { useState, useEffect } from "react";

interface TimerProps {
  initialSeconds?: number; // Default to 60 seconds
  onComplete?: () => void; // Callback when timer reaches 0
}

const TimerComponent: React.FC<TimerProps> = ({
  initialSeconds = 60,
  onComplete,
}) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>; // ✅ Fix: Correct Timer Type

    if (isActive && seconds > 0) {
      timer = setInterval(() => setSeconds((prev) => prev - 1), 1000);
    } else if (seconds === 0) {
      setIsActive(false);
      if (onComplete) onComplete();
    }

    return () => clearInterval(timer); // ✅ Cleanup on unmount
  }, [isActive, onComplete, seconds]);

  useEffect(() => {
    setSeconds(initialSeconds);
    setIsActive(true);
  }, [initialSeconds]);

  return (
    <div>
      <p className="text-black font-semibold">
        {`يمكنك طلب رمز جديد بعد: ${seconds} ثانيه`}
      </p>
    </div>
  );
};

export default TimerComponent;
