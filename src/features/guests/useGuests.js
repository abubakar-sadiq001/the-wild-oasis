import { useQuery } from "@tanstack/react-query";
import { getGuests } from "../../services/apiGuests";
import { useSearchParams } from "react-router-dom";

export function useGuests() {
  const [searchParams] = useSearchParams();

  const sortByRaw = searchParams.get("sortBy") || "created_at-desc";
  const [field, direction] = sortByRaw.split("-");

  // SORT
  const sortBy = {
    field: field,
    direction: direction,
  };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page")); // if no page value, set the page value to 1. else return the value a s number.

  const { data: { data: guests, count } = {}, isLoading } = useQuery({
    queryKey: ["guests", sortBy, page],
    queryFn: () => getGuests({ sortBy, page }),
  });

  return { guests, count, isLoading };
}
