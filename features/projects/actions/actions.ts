import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateProjectName() {
    const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      fetch(`/api/projects/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ name }),
      }).then((r) => r.json()),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["project", id] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}
