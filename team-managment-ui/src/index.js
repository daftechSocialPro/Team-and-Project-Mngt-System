import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './store/store';

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";                                       
import { Provider } from 'react-redux';
        
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}> 
    <App />
  </Provider>
);


