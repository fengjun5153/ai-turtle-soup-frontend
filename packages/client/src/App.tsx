import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StarrySky from './components/Shared/StarrySky';
import TurtleSoupHuntBanner from './components/Shared/TurtleSoupHuntBanner';
import Home from './pages/Home';
import Game from './pages/Game';
import Result from './pages/Result';

export default function App() {
  return (
    <>
      <StarrySky />
      <TurtleSoupHuntBanner />
      <BrowserRouter>
        {/* z 高于星空/顶栏装饰，避免任何未穿透的层挡住表单 */}
        <div className="relative z-[30] min-h-dvh pt-11 sm:pt-12">
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
