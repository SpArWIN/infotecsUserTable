import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigpath from "vite-tsconfig-paths"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigpath()],
  base: "/infotecsUserTable0/",
});
