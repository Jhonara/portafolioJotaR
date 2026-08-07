// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  resolve: {
    // R3F, Drei and postprocessing must share one Three/Fiber runtime.
    dedupe: ["three", "@react-three/fiber"],
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
