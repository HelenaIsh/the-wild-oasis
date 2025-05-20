import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';

import type { CreateCabin, CabinType } from './CabinRow';
import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';

function CreateCabinForm({ cabinToEdit }: { cabinToEdit?: CabinType }) {
  const isEditSession = cabinToEdit && 'id' in cabinToEdit && !!cabinToEdit.id;
  const { register, handleSubmit, reset, getValues, formState } =
    useForm<CreateCabin>({
      defaultValues: cabinToEdit ? cabinToEdit : {},
    });
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  const { errors } = formState;

  const isWorking = isCreating || isEditing;

  const onSubmit = (data: CreateCabin) => {
    if (isEditSession) {
      editCabin(
        { newCabinData: data, id: cabinToEdit.id },
        { onSuccess: () => reset() }
      );
    } else {
      createCabin(data, { onSuccess: () => reset() }); //{ ...data, image: data.image }
    }
  };

  return (
    <Form type="form" onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register('name', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register('regularPrice', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Price should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              value < getValues().regularPrice ||
              'Discount should be less than the regular price',
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register('description', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isWorking}
          {...register('image', {
            required: isEditSession ? false : 'This field is required',
          })}
        />
      </FormRow>

      {/* <FormRow> */}
      {/* type is an HTML attribute! */}
      <Button variation="secondary" type="reset">
        Cancel
      </Button>
      <Button disabled={isWorking}>
        {isEditSession ? 'Update cabin' : 'Add cabin'}
      </Button>
      {/* </FormRow> */}
    </Form>
  );
}

export default CreateCabinForm;
