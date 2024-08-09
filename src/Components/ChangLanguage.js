import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const handleLanguageChange = () => {
    if (currentLanguage === 'en') {
      i18n.changeLanguage('ar');
      setCurrentLanguage('ar');
    } else {
      i18n.changeLanguage('en');
      setCurrentLanguage('en');
    }
  };

  return (
    <div className="fixed bottom-0 right-0 mb-4 mr-4">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleLanguageChange}
      >
        {currentLanguage === 'en' ? 'العربية' : 'English'}
      </button>
    </div>
  );
}

export default LanguageSwitcher;