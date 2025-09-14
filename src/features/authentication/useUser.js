import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

// get the current user and exports to consumers
export function useUser() {
  const { isLoading, data: user = {} } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return { isLoading, user, isAuthenticated: !!user?.role };
}
