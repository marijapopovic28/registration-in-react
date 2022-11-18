import './App.css';
import { Routes, Route } from "react-router-dom";
import MultistepForm from "./components/MultistepForm";
import { Suspense } from "react";

//dodaaaaaaaj u git

function App() {
  return (
    <div>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<MultistepForm />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
