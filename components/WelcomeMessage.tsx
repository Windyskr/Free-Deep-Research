import React from 'react';
import { useLanguage } from './LanguageSwitcher';

interface WelcomeMessageProps {
  show: boolean;
  onAIBtnClick: () => void;
}

export const WelcomeMessage: React.FC<WelcomeMessageProps> = ({
  show,
  onAIBtnClick,
}) => {
  const { t } = useLanguage();

  if (!show) return null;

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="max-w-3xl px-4 mx-auto text-center">
        <h2 className="mb-2 text-2xl font-semibold text-gray-800">
          {t('welcome.title')}
        </h2>
        <p className="text-gray-600">{t('welcome.description')}</p>

        <p className="mt-2 text-sm text-gray-500">
          {t('welcome.promote')}{' '}
          <button
            onClick={onAIBtnClick}
            className="mt-4 text-blue-600 hover:text-blue-800 hover:underline focus:outline-none"
          >
            Demo Pages
          </button>
        </p>
      </div>
    </div>
  );
};
