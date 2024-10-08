import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/Store/Store';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import LanguageSwitcher from './Components/ChangLanguage';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: require('./locales/en.json'),
    },
    ar: {
      translation: require('./locales/ar.json'),
    },
  },
  lng: 'en',
  ns: ['translation'],
  defaultNS: 'translation',
  react: {
    wait: true,
  },
}).then(() => {
  console.log('i18n initialized');
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} >
      <I18nextProvider i18n={i18n} >
        <App />
        <LanguageSwitcher />
      </I18nextProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
