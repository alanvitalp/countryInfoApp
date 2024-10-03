import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import CountryInfo from './pages/CountryInfo';
import { CountryList } from './pages/CountryList';
import React from "react"

const queryClient = new QueryClient();

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<CountryList />} />
      <Route path="/:country/:code" element={<CountryInfo />} />
    </Routes>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="flex flex-col w-full min-h-screen">
          <Header /> 
          <main className="flex items-center justify-center flex-grow p-4">
            <AppRouter /> 
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
