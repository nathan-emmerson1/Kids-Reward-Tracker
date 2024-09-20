import react, {useQuery, useMutation, useQueryClient} from '@tanstack/react-query'

function RewardList() {
  const queryClient = useQueryClient()
  const deleteMutation = useMutation({
    mutationFn: (id:number) => delete
  })
}