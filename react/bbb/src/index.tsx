import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Main from './App'
import 'antd/dist/reset.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Main />
);

reportWebVitals();
