import { useCallback, useState } from 'react';

import { useDeleteScientificWork, useGetUserScientificWorks } from '@/entities/ScientificWork';

export const useUserScientificWork = (login?: string) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editableScientificWorkId, setEditableScientificWorkId] = useState('');

  const {
    data: userScientificWorks,
    isLoading,
    error
  } = useGetUserScientificWorks({ login: login! }, { skip: !login });

  const [deleteScientificWorkEndpoint] = useDeleteScientificWork();

  const openAddScientificWork = useCallback(() => {
    setIsAddModalOpen(true);
  }, [setIsAddModalOpen]);

  const closeAddScientificWork = useCallback(() => {
    setIsAddModalOpen(false);
  }, [setIsAddModalOpen]);

  const openEditScientificWork = useCallback(
    (id: string) => () => {
      setEditableScientificWorkId(id);
      setIsEditModalOpen(true);
    },
    [setEditableScientificWorkId, setIsEditModalOpen]
  );

  const closeEditScientificWork = useCallback(() => {
    setIsEditModalOpen(false);
  }, [setIsEditModalOpen]);

  const deleteScientificWork = useCallback(
    (id: string) => () => {
      deleteScientificWorkEndpoint({ id });
    },
    [deleteScientificWorkEndpoint]
  );

  const loading = isLoading;

  return {
    userScientificWorks,
    loading,
    error,
    isAddModalOpen,
    isEditModalOpen,
    deleteScientificWork,
    editableScientificWorkId,
    openAddScientificWork,
    closeAddScientificWork,
    openEditScientificWork,
    closeEditScientificWork
  };
};
