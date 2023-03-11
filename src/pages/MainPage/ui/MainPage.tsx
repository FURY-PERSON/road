import { Counter } from 'entities/Counter';
import { LoginModal } from 'features/AuthByUsername';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

export const MainPage = () => {
  const { t } = useTranslation('main');
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.main}>
      <div onClick={() => setOpen(true)}>{t('about page')}</div>
      <Counter />
      <LoginModal open={open} onClose={onClose} />
    </div>
  );
};
