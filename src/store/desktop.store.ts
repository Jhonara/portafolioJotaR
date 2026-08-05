import { create } from "zustand";

export interface AppWindow {
  id: string;
  title: string;

  x: number;
  y: number;

  width: number;
  height: number;

  minimized: boolean;
  minimizing: boolean;
  maximized: boolean;
  opened: boolean;

  zIndex: number;
}

export type DesktopTheme = "neon" | "matrix" | "night";

interface DesktopStore {
  windows: AppWindow[];
  theme: DesktopTheme;
  coffeeMode: boolean;

  openWindow: (window: { id: string; title: string }) => void;

  closeWindow: (id: string) => void;

  focusWindow: (id: string) => void;

  minimizeWindow: (id: string) => void;

  finishMinimizeWindow: (id: string) => void;

  maximizeWindow: (id: string) => void;

  moveWindow: (id: string, x: number, y: number) => void;

  setTheme: (theme: DesktopTheme) => void;

  activateCoffee: () => void;
}

const getWindowDimensions = (windowId: string) => {
  const viewportWidth = typeof window === "undefined" ? 1440 : window.innerWidth;
  const viewportHeight = typeof window === "undefined" ? 900 : window.innerHeight;

  if (windowId === "skills") {
    return {
      width: Math.min(1180, Math.max(320, viewportWidth - 32)),
      height: Math.min(760, Math.max(420, viewportHeight - 44)),
    };
  }

  return {
    width: Math.min(900, Math.max(320, viewportWidth - 48)),
    height: Math.min(600, Math.max(360, viewportHeight - 80)),
  };
};

const getInitialPosition = (windowIndex: number, width: number, height: number) => {
  const cascade = (windowIndex % 6) * 32;
  const viewportWidth = typeof window === "undefined" ? 1440 : window.innerWidth;
  const viewportHeight = typeof window === "undefined" ? 900 : window.innerHeight;

  return {
    x: Math.max(16, Math.min(viewportWidth - width - 16, Math.round((viewportWidth - width) / 2) + cascade)),
    y: Math.max(16, Math.min(viewportHeight - height - 16, Math.round((viewportHeight - height) / 2) + cascade)),
  };
};

export const useDesktopStore = create<DesktopStore>((set) => ({

  windows: [],
  theme: "neon",
  coffeeMode: false,

  openWindow: (window) =>
    set((state) => {

      const exists = state.windows.find(w => w.id === window.id);

      if (exists) {

        const highest = Math.max(...state.windows.map(w => w.zIndex));
        const dimensions = getWindowDimensions(window.id);
        const position = getInitialPosition(state.windows.indexOf(exists), dimensions.width, dimensions.height);

        return {

          windows: state.windows.map(w =>
            w.id === window.id
              ? {
                  ...w,
                  opened: true,
                  minimized: false,
                  minimizing: false,
                  width: dimensions.width,
                  height: dimensions.height,
                  x: window.id === "skills" ? position.x : w.x,
                  y: window.id === "skills" ? position.y : w.y,
                  zIndex: highest + 1
                }
              : w
          )

        };

      }

      const highest =
        state.windows.length > 0
          ? Math.max(...state.windows.map(w => w.zIndex))
          : 0;

      const dimensions = getWindowDimensions(window.id);
      const position = getInitialPosition(state.windows.length, dimensions.width, dimensions.height);

      return {

        windows: [

          ...state.windows,

          {

            ...window,

            x: position.x,
            y: position.y,

            width: dimensions.width,
            height: dimensions.height,

            minimized: false,
            minimizing: false,
            maximized: false,
            opened: true,

            zIndex: highest + 1

          }

        ]

      };

    }),

  closeWindow: (id) =>
    set(state => ({

      windows: state.windows.map(w =>
        w.id === id
          ? {
              ...w,
              opened: false
            }
          : w
      )

    })),

  focusWindow: (id) =>
    set(state => {

      const highest = Math.max(...state.windows.map(w => w.zIndex));

      return {

        windows: state.windows.map(w =>
          w.id === id
            ? {
                ...w,
                zIndex: highest + 1
              }
            : w
        )

      };

    }),

  minimizeWindow: (id) =>
    set(state => ({

      windows: state.windows.map(w =>
        w.id === id
          ? {
              ...w,
              minimizing: true
            }
          : w
      )

    })),

  finishMinimizeWindow: (id) =>
    set(state => ({

      windows: state.windows.map(w =>
        w.id === id
          ? {
              ...w,
              minimized: true,
              minimizing: false
            }
          : w
      )

    })),

  maximizeWindow: (id) =>
    set(state => ({

      windows: state.windows.map(w =>
        w.id === id
          ? {
              ...w,
              maximized: !w.maximized
            }
          : w
      )

    })),

  moveWindow: (id, x, y) =>
    set(state => ({

      windows: state.windows.map(w =>
        w.id === id
          ? {
              ...w,
              x,
              y
            }
          : w
      )

    })),

  setTheme: (theme) => set({ theme }),

  activateCoffee: () => {
    set({ coffeeMode: true });
    window.setTimeout(() => set({ coffeeMode: false }), 4200);
  }

}));
