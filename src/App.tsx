import { Toaster } from "react-hot-toast";
import Router from "./router/Router";

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
