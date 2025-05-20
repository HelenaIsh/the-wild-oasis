import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createEditCabin } from '../../services/apiCabins';

import type { CreateCabin } from './CabinRow';

export const useEditCabin = () => {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({
      newCabinData,
      id,
    }: {
      newCabinData: CreateCabin;
      id?: string;
    }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('New cabin was successfully updated');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isEditing, editCabin };
};
