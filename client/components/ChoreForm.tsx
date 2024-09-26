// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import React, { Children, useState } from 'react'
// import { ChoreData } from '../../models/chores'
// import { AddChore } from '../apis/chores'
// import { getAllChildrenByUserId, getChildrenByUserId } from '../apis/children'
// import { useAuth0 } from '@auth0/auth0-react'
// import { getUserWithAuthId } from '../apis/users'

// function ChoreForm() {
//   const [newName, setNewName] = useState('')
//   const { user, isAuthenticated } = useAuth0()
//   const [newFrequency, setNewFrequency] = useState<
//     'daily' | 'weekly' | 'monthly'
//   >('daily')
//   const [newDescription, setNewDescription] = useState('')
//   const queryClient = useQueryClient()
//   const addMutation = useMutation({
//     mutationFn: (newChore: ChoreData) => AddChore(newChore),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['chores'] })
//       setNewName('')
//       setNewDescription('')
//       setNewFrequency('daily')
//     },
//   })
//   const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setNewDescription(e.target.value)
//   }

//   const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setNewName(e.target.value)
//   }

//   const handleFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setNewFrequency(e.target.value as 'daily' | 'weekly' | 'monthly')
//   }

//   const handleAdd = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (isAuthenticated && user) {
//       const auth0Sub = user.sub
//       const authId = parseInt(auth0Sub.split('|')[1])
//       const userId = await getUserWithAuthId(authId)
//       console.log(userId)
//       const childrenId = await getAllChildrenByUserId(userId.id)

//       console.log(childrenId)
//       addMutation.mutate({
//         name: newName,
//         childrenId: childrenId,
//         description: newDescription,
//         frequency: newFrequency,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       })
//     }
//   }

//   return (
//     <form onSubmit={handleAdd}>
//       <div>
//         <label>Name:</label>
//         <input type="text" value={newName} onChange={handleNameChange} />
//       </div>
//       <div>
//         <label>Description:</label>
//         <input
//           type="text"
//           value={newDescription}
//           onChange={handleDescriptionChange}
//         />
//       </div>
//       <div>
//         <label>Frequency:</label>
//         <select value={newFrequency} onChange={handleFrequencyChange}>
//           <option value="daily">Daily</option>
//           <option value="weekly">Weekly</option>
//           <option value="monthly">Monthly</option>
//         </select>
//       </div>
//       <button type="submit">Add Chore</button>
//     </form>
//   )
// }

// export default ChoreForm
