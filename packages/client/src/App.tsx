import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StarrySky from './components/Shared/StarrySky';
import Home from './pages/Home';
import Game from './pages/Game';
import Result from './pages/Result';

export default function App() {
  return (
    <>
      <StarrySky />
      <BrowserRouter>
        <div className="relative z-10 min-h-dvh">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game/:id" element={<Game />} />
            <Route path="/result/:id" element={<Result />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}
