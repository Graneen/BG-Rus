import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import  store  from '../src/redux/store';
import App from '../src/app/App';
import './index.css';
import Modal from 'react-modal';


const appRoot = document.getElementById('root');
Modal.setAppElement(appRoot);

ReactDOM.createRoot(appRoot!).render(
  <Provider store={store}>
    <App />
  </Provider>
);