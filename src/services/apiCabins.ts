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

export async function createCabin(newCabin: CreateCabin) {
  const image = newCabin.image[0];
  const imageName = `${Math.random()}-${image.name}`.replaceAll('/', '');
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images//${imageName}`;
  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imagePath }])
    .select();
  if (error) {
    throw new Error('Cabin could not be deleted');
  }
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, image, {
      cacheControl: '3600',
      upsert: false,
    });

  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    throw new Error('Cabin image could not be uploaded. Cabin was not created');
  }

  return data;
}
