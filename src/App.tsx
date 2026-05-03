import { Toaster } from "react-hot-toast";
import Router from "./router/Router";
import "./App.css";

function App() {
  return (
    <>
      {" "}
      <Router />
      <Toaster position="bottom-center" reverseOrder={false} />
      {/* </QueryClientProvider> */}
    </>
  );
}

export default App;
