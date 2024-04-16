import { useCallback, useEffect, useState } from 'react';

import { RebukeType, useGetRebukeById, useUpdateRebuke } from '@/entities/Rebuke';
import { getFormattedDate } from '@/shared/lib/helpers/date/getFormattedDate';

export const useForm = (rebukeId: string, login?: string, onSuccess?: () => void) => {
  const { data: rebuke, isLoading: rebukeLoading } = useGetRebukeById({
    id: rebukeId
  });

  const [note, setNote] = useState<string>();
  const [type, setType] = useState<RebukeType>();
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (!rebuke) return;

    setNote(rebuke.note);
    setType(rebuke.type);
    setStartDate(rebuke.startDate);
    setEndDate(rebuke.endDate);
  }, [rebuke]);

  const [updateRebuke, { isLoading }] = useUpdateRebuke();

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

    updateRebuke({
      id: rebukeId,
      note: note,
      type: type,
      startDate: startDate,
      endDate: endDate
    });

    onSuccess?.();
  }, [login, note, type, startDate, endDate, updateRebuke, rebukeId, onSuccess]);

  const loading = isLoading || rebukeLoading;

  const formattedStartDate = getFormattedDate(startDate);
  const formattedEndDate = getFormattedDate(endDate);

  return {
    note,
    setNote,
    type,
    setType,
    startDate: formattedStartDate,
    endDate: formattedEndDate,
    setStartDate,
    setEndDate,
    submit,
    loading,
    error
  };
};
