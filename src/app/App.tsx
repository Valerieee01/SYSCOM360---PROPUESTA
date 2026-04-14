import { RouterProvider } from "react-router";
import { router } from "./routes";
import { TransportProvider } from "./context/TransportContext";
import { ToastContainer } from "./components/Toast";
import { MobileViewportFix } from "./components/MobileViewportFix";

export default function App() {
  return (
    <TransportProvider>
      <MobileViewportFix />
      <RouterProvider router={router} />
      <ToastContainer />
    </TransportProvider>
  );
}