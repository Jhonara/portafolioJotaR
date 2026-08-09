import { useRef } from "react";
import type { PointerEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Window from "../ui/Window";
import { apps } from "../../apps";
import { useDesktopStore } from "../../store/desktop.store";
import type { AppWindow } from "../../store/desktop.store";

const dockOrder = ["about", "projects", "skills", "experience", "contact", "terminal"];

const getMinimizeTarget = (id: string) => {
  const rawIndex = dockOrder.indexOf(id);
  const index = rawIndex === -1 ? dockOrder.length - 1 : rawIndex;
  return {
    x: Math.round(window.innerWidth / 2 - 264 + index * 88),
    y: window.innerHeight - 112,
  };
};

interface ManagedWindowProps {
  appWindow: AppWindow;
}

const ManagedWindow = ({ appWindow }: ManagedWindowProps) => {
  const dragStart = useRef<{ pointerX: number; pointerY: number; x: number; y: number } | null>(null);
  const { focusWindow, finishMinimizeWindow, moveWindow } = useDesktopStore();
  const target = getMinimizeTarget(appWindow.id);

  const onTitlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (appWindow.maximized || window.innerWidth < 768 || appWindow.minimizing || (event.target as HTMLElement).closest("button")) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    dragStart.current = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      x: appWindow.x,
      y: appWindow.y,
    };
    focusWindow(appWindow.id);
  };

  const onTitlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragStart.current) return;

    const nextX = Math.max(0, Math.min(window.innerWidth - 96, dragStart.current.x + event.clientX - dragStart.current.pointerX));
    const nextY = Math.max(0, Math.min(window.innerHeight - 56, dragStart.current.y + event.clientY - dragStart.current.pointerY));
    moveWindow(appWindow.id, nextX, nextY);
  };

  const onTitlePointerUp = () => {
    dragStart.current = null;
  };

  return (
    <motion.div
      key={appWindow.id}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={appWindow.minimizing
        ? {
            opacity: 0,
            scale: 0.1,
            x: target.x - appWindow.x,
            y: target.y - appWindow.y,
          }
        : {
            opacity: 1,
            scale: 1,
            x: appWindow.maximized ? -appWindow.x : 0,
            y: appWindow.maximized ? -appWindow.y : 0,
            width: appWindow.maximized ? "100vw" : appWindow.width,
            height: appWindow.maximized ? "100vh" : appWindow.height,
          }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={appWindow.minimizing
        ? { duration: 0.3, ease: "easeIn" }
        : { type: "spring", stiffness: 320, damping: 30 }}
      onAnimationComplete={() => {
        if (appWindow.minimizing) finishMinimizeWindow(appWindow.id);
      }}
      onMouseDown={() => focusWindow(appWindow.id)}
      className="absolute"
      style={{
        left: appWindow.x,
        top: appWindow.y,
        zIndex: appWindow.zIndex,
      }}
    >
      <Window
        id={appWindow.id}
        title={appWindow.title}
        maximized={appWindow.maximized}
        onTitlePointerDown={onTitlePointerDown}
        onTitlePointerMove={onTitlePointerMove}
        onTitlePointerUp={onTitlePointerUp}
      >
        {apps[appWindow.id as keyof typeof apps]}
      </Window>
    </motion.div>
  );
};

const WindowManager = () => {
  const windows = useDesktopStore((state) => state.windows);

  return (
    <AnimatePresence>
      {windows
        .filter((appWindow) => appWindow.opened && !appWindow.minimized)
        .map((appWindow) => <ManagedWindow key={appWindow.id} appWindow={appWindow} />)}
    </AnimatePresence>
  );
};

export default WindowManager;
