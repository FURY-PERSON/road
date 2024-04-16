import { useCallback, useState } from 'react';

import { useDeleteRebuke, useGetUserRebukes } from '@/entities/Rebuke';

export const useUserRebuke = (login?: string) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editableRebukeId, setEditableRebukeId] = useState('');

  const {
    data: userRebukes,
    isLoading,
    error
  } = useGetUserRebukes({ login: login! }, { skip: !login });

  const [deleteRebukeEndpoint] = useDeleteRebuke();

  const openAddRebuke = useCallback(() => {
    setIsAddModalOpen(true);
  }, [setIsAddModalOpen]);

  const closeAddRebuke = useCallback(() => {
    setIsAddModalOpen(false);
  }, [setIsAddModalOpen]);

  const openEditRebuke = useCallback(
    (id: string) => () => {
      setEditableRebukeId(id);
      setIsEditModalOpen(true);
    },
    [setEditableRebukeId, setIsEditModalOpen]
  );

  const closeEditRebuke = useCallback(() => {
    setIsEditModalOpen(false);
  }, [setIsEditModalOpen]);

  const deleteRebuke = useCallback(
    (id: string) => () => {
      deleteRebukeEndpoint({ id });
    },
    [deleteRebukeEndpoint]
  );

  const loading = isLoading;

  return {
    userRebukes,
    loading,
    error,
    isAddModalOpen,
    isEditModalOpen,
    deleteRebuke,
    editableRebukeId,
    openAddRebuke,
    closeAddRebuke,
    openEditRebuke,
    closeEditRebuke
  };
};
