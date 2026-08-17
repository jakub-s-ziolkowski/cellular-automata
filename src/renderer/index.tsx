
import ReactDOM from 'react-dom/client';

import App from '@components/App/App';
import '@assets/styles/main.scss';

const body = document.body!;
const root = ReactDOM.createRoot(body);

root.render(<App />);
