import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteChildren, getAllChildrenByUserId } from '../apis/children'
import { Children } from '../../models/children'
import { Link } from 'react-router-dom'
import childrenImage from '../assets/images/1000_F_566212049_vHdovtR0UAbfn9eBfFS6nHkXQJMWxOoh.jpg'

interface ChildrenListProps {
  userId: number | undefined
}

function ChildrenListByUserId({ userId }: ChildrenListProps) {
  const {
    data: children,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['children', userId],
    queryFn: () => getAllChildrenByUserId(userId),
  })
  const queryClient = useQueryClient()
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteChildren(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['children'] }),
  })

  if (isLoading) return <p>Loading...</p>

  if (isError) return <p>Error getting children by user id</p>

  function handleDelete(id: number) {
    deleteMutation.mutate(id)
  }

  return (
    <div className="mx-auto px-4 py-16 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8 lg:py-20">
      <div className="mx-auto mb-10 sm:text-center lg:max-w-xl">
        <p className="bg-teal-accent-400 mb-4 inline-block rounded-full px-3 py-px text-xs font-semibold uppercase tracking-wider text-teal-900">
          Kiddo
        </p>
        <p className="text-base text-gray-700 md:text-lg">
          There are the list of kids
        </p>
      </div>
      <div className="mx-auto grid gap-10 sm:grid-cols-2 lg:max-w-screen-lg lg:grid-cols-4">
        {children.map((child: Children) => (
          <div key={child.id}>
            <div className="relative mb-4 rounded pb-56 shadow lg:pb-64">
              <img
                className="absolute h-full w-full rounded object-cover"
                src={childrenImage} // Ensure child.imgSrc is defined
                alt={child.name}
              />
            </div>
            <div className="flex flex-col sm:text-center">
              <p className="text-lg font-bold">{child.name}</p>
              <p className="mb-5 text-xs text-gray-800">{child.role}</p>
              <div className="flex items-center space-x-3 sm:justify-center">
                <Link
                  to={`/children/${child.id}/chores`} // Link to child's chores
                  className="hover:text-deep-purple-accent-400 text-gray-600 transition-colors duration-300"
                >
                  Chores
                </Link>
                <button
                  onClick={() => handleDelete(child.id)}
                  className="hover:text-deep-purple-accent-400 text-gray-600 transition-colors duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChildrenListByUserId
