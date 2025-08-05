import React, { useState } from 'react';
import AccountSettingsPage from './pages/AccountSettingsPage';
// import PrivacyPolicySettings from './pages/PrivacyPolicyPage';
// import TermsConditionsPage from './pages/TermsContionsPage';
import AboutUsPage from './pages/AboutUsPage';
import { FONTS } from '../../constants/constants';

const SettingsPage: React.FC = () => {
  const [tab, setTab] = useState<string>('Account Settings');

  const handleRenderComponent = (tabText: string) => {
    setTab(tabText);
  };

  const getButtonClassName = (tabName: string) => {
    const baseClasses = "font-semibold py-2 px-4 border rounded-full  transition-all duration-200";
    
    if (tab === tabName) {
      // Active state - keep hover colors
      return `${baseClasses} text-white bg-[#7812A4]`;
    } else {
      // Inactive state - normal styling with hover
      return `${baseClasses} text-black bg-white hover:text-white hover:bg-[#7812A4]`;
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-wrap  align-center justify-center gap-4 mb-6" style={{...FONTS.paragraph}}>
        <button
          onClick={() => handleRenderComponent('Account Settings')}
          className={getButtonClassName('Account Settings')}
        >
          Account Settings
        </button>

        <button
          onClick={() => handleRenderComponent('About us')}
          className={getButtonClassName('About us')}
        >
          About us
        </button>

        


        {/* <button
          onClick={() => handleRenderComponent('Privacy Policy')}
          className={getButtonClassName('Privacy Policy')}
        >
          Privacy Policy
        </button>

        <button
          onClick={() => handleRenderComponent('Terms & Conditions')}
          className={getButtonClassName('Terms & Conditions')}
        >
          Terms & Conditions
        </button> */}
      </div>

      <div>
        <header className="mb-8">
                <h1 style={{...FONTS.header}}>Profile Settings</h1>
                <p className="mt-2"style={{...FONTS.cardSubHeader}}>
                  Update your personal information, contact details, and preferences
                </p>
              </header>
        {tab === 'Account Settings' && <AccountSettingsPage />}
        {/* {tab === 'Privacy Policy' && <PrivacyPolicySettings />}
        {tab === 'Terms & Conditions' && <TermsConditionsPage />} */}
        {tab === 'About us' && <AboutUsPage />}
      </div>
    </div>
  );
};

export default SettingsPage;