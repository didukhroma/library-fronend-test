import { Navigate, Route, Routes } from 'react-router-dom';

import { lazy } from 'react';

const AsyncHomePage = lazy(() => import('../../pages/HomePage'));

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<AsyncHomePage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Router;
