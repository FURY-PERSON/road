import { useCallback, useEffect, useState } from 'react';

import {
  ScientificWorkType,
  useGetScientificWorkById,
  useUpdateScientificWork
} from '@/entities/ScientificWork';

import { getFormattedDate } from '../helpers/getFormattedDate';

export const useForm = (scientificWorkId: string, login?: string, onSuccess?: () => void) => {
  const { data: scientificWork, isLoading: scientificWorkLoading } = useGetScientificWorkById({
    id: scientificWorkId
  });

  const [title, setTitle] = useState<string>();
  const [type, setType] = useState<ScientificWorkType>();
  const [date, setDate] = useState<string>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (!scientificWork) return;

    setTitle(scientificWork.title);
    setType(scientificWork.type);
    setDate(scientificWork.date);
  }, [scientificWork]);

  const [updateScientificWork, { isLoading }] = useUpdateScientificWork();

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

    updateScientificWork({
      id: scientificWorkId,
      login: login,
      title: title,
      type: type,
      date: date
    });

    onSuccess?.();
  }, [login, title, type, date, updateScientificWork, scientificWorkId, onSuccess]);

  const loading = isLoading || scientificWorkLoading;

  const formattedDate = getFormattedDate(date);

  return {
    title,
    setTitle,
    type,
    setType,
    date: formattedDate,
    setDate,
    submit,
    loading,
    error
  };
};
