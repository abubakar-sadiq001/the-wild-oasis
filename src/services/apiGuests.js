import { supabase } from "./supabase";
import PAGE_LENGTH from "../utils/contants";

export async function getGuests({ sortBy, page }) {
  let query = supabase.from("guests").select("*", {
    count: "exact",
  });

  // SORT
  const { field, direction } = sortBy;

  if (field) {
    query = query.order(field, {
      ascending: direction === "asc",
    });
  }

  // PAGINATION
  if (page) {
    const from = (page - 1) * PAGE_LENGTH;
    const to = from + PAGE_LENGTH - 1;
    query = query.range(from, to);
  }

  const { data, count, error } = await query;

  if (error) {
    console.log(error);
    throw new Error("Guests couldn't be loaded");
  }

  return { data, count };
}

export async function createEditGuest(newGuest, id) {
  let query = supabase.from("guests");

  if (id) {
    query = query.update({ ...newGuest }).eq("id", id);
  }
  if (!id) {
    query = query.insert([newGuest]);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("Guest couldn't be created");
  }

  return data;
}
