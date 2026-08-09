import type { PointerEventHandler, ReactNode } from "react";
import { useDesktopStore } from "../../store/desktop.store";

interface WindowProps {
  id: string;
  title: string;
  children: ReactNode;
  maximized: boolean;
  onTitlePointerDown: PointerEventHandler<HTMLDivElement>;
  onTitlePointerMove: PointerEventHandler<HTMLDivElement>;
  onTitlePointerUp: PointerEventHandler<HTMLDivElement>;
}

const Window = ({
  id,
  title,
  children,
  maximized,
  onTitlePointerDown,
  onTitlePointerMove,
  onTitlePointerUp,
}: WindowProps) => {
  const {
    closeWindow,
    minimizeWindow,
    maximizeWindow,
  } = useDesktopStore();
  const usesInternalScroll = ["skills", "experience", "contact", "mail", "documents", "pokemon", "personalization"].includes(id);

  return (
    <div
      className={`flex h-full w-full flex-col
        overflow-hidden
        ${maximized ? "rounded-none" : "rounded-2xl"}
        border
        border-white/10
        bg-[#0B1220]/80
        backdrop-blur-xl
        shadow-[0_0_60px_rgba(56,189,248,.15)]
      `}
    >
      <div
        onPointerDown={onTitlePointerDown}
        onPointerMove={onTitlePointerMove}
        onPointerUp={onTitlePointerUp}
        onPointerCancel={onTitlePointerUp}
        className="
          flex
          items-center
          justify-between
          border-b
          border-white/10
          bg-white/5
          px-3
          py-2.5
          sm:px-5
          sm:py-3
          cursor-grab
          active:cursor-grabbing
        "
      >
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeWindow(id);
            }}
            className="h-3 w-3 rounded-full bg-red-500 hover:brightness-125"
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              minimizeWindow(id);
            }}
            className="h-3 w-3 rounded-full bg-yellow-400 hover:brightness-125"
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              maximizeWindow(id);
            }}
            className="h-3 w-3 rounded-full bg-green-500 hover:brightness-125"
          />
        </div>

        <span className="text-white/70">{title}</span>

        <div className="w-14" />
      </div>

      <div className={`min-h-0 flex-1 p-3 sm:p-6 ${usesInternalScroll ? "overflow-hidden" : "overflow-auto"}`}>
        {children}
      </div>
    </div>
  );
};

export default Window;
