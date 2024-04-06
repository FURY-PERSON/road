import { useCallback, useState } from 'react';

import { RebukeType, useAddRebuke } from '@/entities/Rebuke';

export const useForm = (login?: string, onSuccess?: () => void) => {
  const [note, setNote] = useState<string>();
  const [type, setType] = useState<RebukeType>();
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();

  const [error, setError] = useState<string>();

  const [addRebuke, { isLoading }] = useAddRebuke();

  const submit = useCallback(() => {
    if (!login) {
      setError('User is not defined');
      return;
    }

    if (!note) {
      setError('Note is required ');
      return;
    }

    if (!type) {
      setError('Type is required ');
      return;
    }

    if (!startDate) {
      setError('Start date is required ');
      return;
    }

    if (!endDate) {
      setError('End date is required ');
      return;
    }

    setError('');

    addRebuke({
      login: login,
      note: note,
      type: type,
      startDate: startDate,
      endDate: endDate
    });

    onSuccess?.();
  }, [login, note, type, startDate, endDate, addRebuke, onSuccess]);

  const loading = isLoading;

  return {
    note,
    setNote,
    type,
    setType,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    submit,
    loading,
    error
  };
};
