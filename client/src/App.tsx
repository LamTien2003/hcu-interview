import { Routes, Route } from "react-router-dom";

import DefaultLayout from "@/layouts/DefaultLayout";
import Home from "@/pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<DefaultLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
