import './App.css';
import { Provider } from 'react-redux';
import store from './store/store.ts';
import Navbar from './components/Navbar.tsx';
import CartList from './components/CartList.tsx';
import PriceBox from './components/PriceBox.tsx';

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <CartList />
      <PriceBox />
    </Provider>
  )
}

export default App;
