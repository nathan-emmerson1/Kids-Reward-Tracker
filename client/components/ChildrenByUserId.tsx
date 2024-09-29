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
          Here are the list of kids
        </p>
      </div>

      <div className="mx-auto grid gap-10 sm:grid-cols-2 lg:max-w-screen-lg lg:grid-cols-4">
        {children.length === 0 ? (
          <div className="col-span-full rounded-lg border border-gray-300 bg-gray-100 p-6 text-center shadow-md">
            <p className="mb-2 text-xl font-semibold text-gray-800">
              Add your Kiddo
            </p>
            <p className="text-gray-600">
              It looks like you haven't added any kiddo yet.
            </p>
          </div>
        ) : (
          children.map((child: Children) => (
            <div
              key={child.id}
              className="mx-auto max-w-sm transform overflow-hidden rounded-lg bg-white shadow-lg transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="relative pb-56 lg:pb-64">
                <img
                  className="absolute h-full w-full rounded-t-lg object-cover"
                  src={childrenImage}
                  alt={child.name}
                />
              </div>
              <div className="p-6">
                <h2 className="mb-2 text-2xl font-bold text-teal-600">
                  {child.name}
                </h2>
                <div className="flex items-center justify-between space-x-4">
                  <Link
                    to={`/children/${child.id}/chores`} // Link to child's chores
                    className="font-semibold text-teal-500 transition duration-300 hover:text-teal-700"
                  >
                    Chores
                  </Link>
                  <Link
                    to={`/reward/${child.id}/rewards`}
                    className="font-semibold text-teal-500 transition duration-300 hover:text-teal-700"
                  >
                    Rewards
                  </Link>
                  <button
                    onClick={() => handleDelete(child.id)}
                    className="font-semibold text-red-500 transition duration-300 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ChildrenListByUserId
