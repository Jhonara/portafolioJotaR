import { useEffect, useState } from "react";

const DesktopClock = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );

    update();

    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute bottom-8 right-10 text-white/70">
      {time}
    </div>
  );
};

export default DesktopClock;