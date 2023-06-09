import Sidebar from './components/Sidebar';
import Route from './components/Route';
import FaqPage from './pages/FaqPage';
import ServicesPage from './pages/ServicesPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="container mx-auto grid grid-cols-6 gap-4 mt-4">
      <Sidebar />
      <div className="col-span-5">
        <Route path="/faq">
          <FaqPage />
        </Route>
        <Route path="/services">
          <ServicesPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </div>
    </div>
  );
}

export default App;