import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Loading } from '../components/Loading';

const Top = lazy(() => import('../pages/Top'));
const Setting = lazy(() => import('../pages/Setting'));
const Test = lazy(() => import('../pages/Test'));
const SectionalPrize = lazy(() => import('../pages/SectionalPrize'));
const TeamResults = lazy(() => import('../pages/TeamResults'));
const Error = lazy(() => import('../pages/Error'));

export const Router: React.VFC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/' element={<Top />} />
          <Route path='/Setting' element={<Setting />} />
          <Route path='/Test' element={<Test />} />
          <Route path='/SectionalPrize' element={<SectionalPrize />} />
          <Route path='/TeamResults' element={<TeamResults />} />

          <Route path='*' element={<Error />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
