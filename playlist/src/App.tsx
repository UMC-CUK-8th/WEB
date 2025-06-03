import './App.css';
import { Provider } from 'react-redux';
import store from './store/store.ts';
import Navbar from './components/Navbar.tsx';
import CartList from './components/CartList.tsx';
import PriceBox from './components/PriceBox.tsx';
import Modal from './components/Modal.tsx'; 
import { useSelector } from './hooks/useCustomRedux';

function AppContent() {
  const { isOpen } = useSelector((state) => state.modal);

  return (
    <>
      <Navbar />
      <CartList />
      <PriceBox />
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-yellow-200 flex justify-center items-center z-50">
          <Modal />
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
