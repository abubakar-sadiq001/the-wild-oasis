import { supabase, supabaseUrl } from "./supabase";

// Get cabins handler
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be laoded");
  }

  return data;
}

// Create cabin handler
export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/edit cabin
  let query = supabase.from("cabins");

  // A) CREATE CABIN
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]); // Insert new row

  // B) EDIT CABIN
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath }) // Update cabin
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  // IF HAS IMAGE PATH EXISTS THEN RETURN THE DATA EARLY
  if (hasImagePath) return data;

  // Upload file using standard upload
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // Delete thr cabin if there was an error uploading image
  if (storageError) {
    // Handle error
    await supabase.from("cabins").delete().eq("id", data[0].id);
    console.log(storageError);

    throw new Error("Cabin image could not be uploaded");
  }

  return data;
}

// Delete cabin handler
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
