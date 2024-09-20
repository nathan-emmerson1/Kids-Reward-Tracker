import react, {useMutation, useQueryClient, useSate} from '@tanstack/react-query'
import { useState } from 'react'

function ChoreForm() {
  const [newName, setNewName] = useState('')
  const [newDescripton, setNewDescription] = useState('')
  const queryClient = useQueryClient()
  const addMutation = useMutation({
    mutationFn: 
  })
}

export default ChoreForm