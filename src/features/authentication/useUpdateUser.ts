import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCurrentUser } from '../../services/apiAuth';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending: isEditing } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      toast.success('User was successfully updated');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isEditing, updateUser };
};
