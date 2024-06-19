import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import App from '../src/app/App';
import './index.css';


const anyReactDOM = ReactDOM as any;

anyReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
);