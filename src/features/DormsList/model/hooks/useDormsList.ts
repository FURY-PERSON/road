import { useGetDorms } from '@/entities/Dorm';

export const useDormsList = () => {
  const { data: dorms, isLoading, error } = useGetDorms();

  return {
    dorms,
    isLoading,
    error
  };
};
