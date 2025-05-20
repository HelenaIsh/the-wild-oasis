import { useQuery } from '@tanstack/react-query';
import { getSettings, type Settings } from '../../services/apiSettings';

export const useSettings = () => {
  const {
    data: settings,
    isLoading,
    error,
  } = useQuery<Settings>({
    queryKey: ['settings'],
    queryFn: getSettings,
  });

  return { isLoading, settings, error };
};
