import type { CreateCabin } from '../features/cabins/CabinRow';
import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    throw new Error('Cabins could not be loaded');
  }

  return data;
}

export async function deleteCabin(id: string) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);
  if (error) {
    throw new Error('Cabin could not be deleted');
  }

  return data;
}

export async function createEditCabin(newCabin: CreateCabin, id?: string) {
  let imagePath = newCabin.image;
  let imageName = '';

  if (newCabin.image && typeof newCabin.image !== 'string') {
    const image = newCabin.image?.[0];
    imageName = `${Math.random()}-${image?.name}`.replaceAll('/', '');
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images//${imageName}`;
  }

  let query = await supabase.from('cabins');

  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  } else {
    query = query.update({ ...newCabin, image: imagePath }).eq('id', id);
  }

  const { data, error } = await query.select();

  if (error) {
    console.log(error);

    throw new Error('Cabin could not be created');
  }

  if (typeof newCabin.image !== 'string') {
    const { error: storageError } = await supabase.storage
      .from('cabin-images')
      .upload(imageName, newCabin.image?.[0], {
        cacheControl: '3600',
        upsert: false,
      });

    if (storageError) {
      await supabase.from('cabins').delete().eq('id', data.id);
      throw new Error(
        'Cabin image could not be uploaded. Cabin was not created'
      );
    }
  }

  return data;
}
