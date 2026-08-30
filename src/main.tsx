import "./lib/ssr-polyfill";
import { ViteReactSSG } from "vite-react-ssg";
import { routes } from "./routes";
import { installChunkReloadHandler } from "./lib/chunkReload";
import "./index.css";

installChunkReloadHandler();

export const createRoot = ViteReactSSG({ routes });
