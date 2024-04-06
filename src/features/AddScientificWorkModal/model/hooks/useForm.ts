import { useCallback, useState } from 'react';

import { ScientificWorkType, useAddScientificWork } from '@/entities/ScientificWork';

export const useForm = (login?: string, onSuccess?: () => void) => {
  const [title, setTitle] = useState<string>();
  const [type, setType] = useState<ScientificWorkType>();
  const [date, setDate] = useState<string>();
  const [error, setError] = useState<string>();

  const [addScientificWork, { isLoading }] = useAddScientificWork();

  const submit = useCallback(() => {
    if (!login) {
      setError('User is not defined');
      return;
    }

    if (!title) {
      setError('Title is required ');
      return;
    }

    if (!type) {
      setError('Type is required ');
      return;
    }

    if (!date) {
      setError('Date is required ');
      return;
    }

    addScientificWork({
      login: login,
      title: title,
      type: type,
      date: date
    });

    onSuccess?.();
  }, [addScientificWork, date, login, onSuccess, title, type]);

  const loading = isLoading;

  return {
    title,
    setTitle,
    type,
    setType,
    date,
    setDate,
    submit,
    loading,
    error
  };
};
