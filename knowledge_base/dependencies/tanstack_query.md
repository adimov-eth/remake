# React Query Optimized Guide for LLM Assistant

## 1. Core Concepts

### Queries
- Declarative dependencies on async data sources
- Automatic caching, refetching, and updates
- Key features: parallel and dependent queries, pagination support

Example:
```javascript
const { data, isLoading, error } = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
  staleTime: 5 * 60 * 1000, // 5 minutes
});
```

### Mutations
- Create/update/delete data or perform server side-effects
- Supports optimistic updates and rollbacks

Example:
```javascript
const mutation = useMutation({
  mutationFn: newTodo => axios.post('/todos', newTodo),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] });
  },
});

mutation.mutate({ title: 'Buy milk' });
```

### Query Invalidation
- Mark queries as stale and trigger refetches
- Use: `queryClient.invalidateQueries({ queryKey: ['todos'] })`

### Prefetching
- Proactively fetch and cache data
- Improves perceived performance

Example:
```javascript
queryClient.prefetchQuery({
  queryKey: ['todo', 5],
  queryFn: () => fetchTodoById(5),
});
```

## 2. Key Hooks

### useQuery
- Primary hook for data fetching
- Returns { data, isLoading, error, refetch }
- Options: queryKey, queryFn, staleTime, cacheTime, enabled, etc.

### useMutation
- For data modifications
- Returns mutation object with mutate function
- Supports onMutate, onError, onSuccess, onSettled callbacks

### useQueries
- Execute multiple queries in parallel
- Dynamic query execution based on an array of query configs

Example:
```javascript
const results = useQueries({
  queries: userIds.map(id => ({
    queryKey: ['user', id],
    queryFn: () => fetchUserById(id),
  })),
});
```

### useInfiniteQuery
- Implement infinite scrolling or "load more" functionality
- Uses getNextPageParam for pagination logic

Example:
```javascript
const {
  data,
  fetchNextPage,
  hasNextPage,
} = useInfiniteQuery({
  queryKey: ['projects'],
  queryFn: ({ pageParam = 0 }) => fetchProjects(pageParam),
  getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
});
```

### useQueryClient
- Access to QueryClient instance for manual cache interactions

## 3. Advanced Features

### Query Cancellation
- Automatic for unused queries
- Manual: `queryClient.cancelQueries({ queryKey: ['todos'] })`

### Optimistic Updates
- Update UI before server confirmation
- Provide rollback mechanism in case of error

Example:
```javascript
const mutation = useMutation({
  mutationFn: updateTodo,
  onMutate: async (newTodo) => {
    await queryClient.cancelQueries({ queryKey: ['todo', newTodo.id] });
    const previousTodo = queryClient.getQueryData(['todo', newTodo.id]);
    queryClient.setQueryData(['todo', newTodo.id], newTodo);
    return { previousTodo };
  },
  onError: (err, newTodo, context) => {
    queryClient.setQueryData(['todo', newTodo.id], context.previousTodo);
  },
});
```

### Window Focus Refetching
- Auto-refetch on window focus (configurable)

### Offline Support
- Configure with `networkMode` option
- Persist and rehydrate cache for offline-first experiences

### Server-Side Rendering (SSR)
- Prefetch queries on server
- Hydrate cache on client

Example:
```javascript
// Server
const queryClient = new QueryClient();
await queryClient.prefetchQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
});
const dehydratedState = dehydrate(queryClient);

// Client
function App({ dehydratedState }) {
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <YourApp />
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
```

## 4. Performance Optimizations

### Structural Sharing
- Automatic optimization to reduce unnecessary re-renders

### Request Deduplication
- Prevents redundant network requests for identical queries

### Stale-While-Revalidate
- Return cached data immediately while fetching in background

### Configurable Retry Logic
- Customize retry behavior for failed queries

Example:
```javascript
const result = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
  retry: (failureCount, error) => {
    if (error.status === 404) return false;
    return failureCount < 3;
  },
  retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
});
```

## 5. Key Options

### Query Options
- staleTime: Duration before refetch
- gcTime (formerly cacheTime): Unused query retention time
- refetchInterval: Enable periodic refetching
- enabled: Conditional fetching
- select: Transform or select part of the query result

### Mutation Options
- onMutate: Pre-mutation operations (e.g., optimistic updates)
- onError/onSuccess/onSettled: Post-mutation side effects

## 6. QueryClient Configuration

### defaultOptions
- Set global defaults for queries and mutations

Example:
```javascript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 3,
    },
    mutations: {
      retry: 2,
    },
  },
});
```

### queryCache / mutationCache
- Customize global caching behavior

## 7. Advanced Patterns

### Dependent Queries
- Execute queries based on results of previous queries
- Use `enabled` option to control execution

Example:
```javascript
const { data: user } = useQuery({
  queryKey: ['user', email],
  queryFn: () => fetchUser(email),
});

const { data: projects } = useQuery({
  queryKey: ['projects', user?.id],
  queryFn: () => fetchUserProjects(user.id),
  enabled: !!user?.id,
});
```

### Parallel Queries
- Execute multiple independent queries simultaneously

### Infinite Queries with Cursor-based Pagination
- Implement efficient infinite scrolling
- Use `getNextPageParam` for cursor management

### Optimistic Updates with Rollback
- Instantly update UI, revert on error
- Manage in `onMutate` and `onError` callbacks

## 8. Integration and Ecosystem

### Suspense Compatibility
- Use `useSuspenseQuery` for Suspense-enabled queries

Example:
```javascript
function TodoList() {
  return (
    <Suspense fallback={<Loading />}>
      <Todos />
    </Suspense>
  );
}

function Todos() {
  const { data } = useSuspenseQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });
  return (/* render todos */);
}
```

### Error Boundaries
- Graceful error handling in React components

### TypeScript Support
- Strongly typed queries and mutations
- Type-safe query keys and custom hooks

## 9. Performance Considerations

### Effective Query Keys
- Design keys for granular cache control
- Structure: `['entity', { filters }]`

Example:
```javascript
useQuery({
  queryKey: ['todos', { status: 'active', userId: 1 }],
  queryFn: fetchTodos,
});
```

### Leverage staleTime
- Reduce unnecessary network requests
- Balance data freshness and performance

### Proper Loading and Error States
- Implement Suspense and Error Boundaries for clean UIs

## 10. Best Practices

### Centralize API Logic
- Create reusable query/mutation hooks
- Encapsulate API calls and cache interactions

Example:
```javascript
export const useTodosQuery = (filters) => useQuery({
  queryKey: ['todos', filters],
  queryFn: () => fetchTodos(filters),
});

export const useCreateTodoMutation = () => useMutation({
  mutationFn: createTodo,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] });
  },
});
```

### Handle Race Conditions
- Use mutation keys for rapid mutations
- Consider using `cancelQueries` before mutations

### Selective Hydration in SSR
- Optimize initial load by hydrating critical queries first

### Custom Performance Monitoring
- Implement tracking for query/mutation performance
- Use `queryCache.subscribe` for global monitoring

Example:
```javascript
queryClient.getQueryCache().subscribe(({ type, query }) => {
  if (type === 'updated') {
    const duration = query.state.dataUpdatedAt - query.state.fetchMeta?.fetchStart;
    console.log(`Query ${query.queryKey} took ${duration}ms to update`);
  }
});
```

## 11. Advanced TypeScript Usage

### Type-Safe Query Keys
- Define and use strongly-typed query key factories

Example:
```typescript
const todoKeys = {
  all: ['todos'] as const,
  lists: () => [...todoKeys.all, 'list'] as const,
  list: (filters: string) => [...todoKeys.lists(), { filters }] as const,
  details: () => [...todoKeys.all, 'detail'] as const,
  detail: (id: number) => [...todoKeys.details(), id] as const,
};

useQuery({
  queryKey: todoKeys.detail(1),
  queryFn: () => fetchTodoById(1),
});
```

### Custom Type Inference
- Enhance type inference for custom query hooks
- Leverage TypeScript's type system for safer code

Remember:
- Always consider the trade-offs between data freshness and performance
- Utilize React Query's built-in capabilities before adding external solutions
- Keep up with the latest updates and best practices in the React Query documentation

# React Query Optimized Guide for LLM Assistant

[Previous content remains the same]

## 12. DevTools

- ReactQueryDevtools component for debugging and inspecting queries/mutations
- Provides real-time insight into cache contents and query states

Example:
```jsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourApp />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
```

## 13. Testing

### Mock QueryClient
- Create a mock QueryClient for isolated unit tests

Example:
```javascript
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
```

### waitFor Utilities
- Use waitFor to handle asynchronous operations in tests

Example:
```javascript
test('useQuery hook', async () => {
  const { result } = renderHook(() => useQuery({ queryKey: ['todos'], queryFn: fetchTodos }), {
    wrapper: createWrapper(),
  });

  await waitFor(() => result.current.isSuccess);

  expect(result.current.data).toEqual(/* expected data */);
});
```

### Mocking fetch/axios
- Mock API calls in end-to-end tests

## 14. Persistence

### Persist and Rehydrate Cache
- Implement persistence for improved offline support and faster initial loads

Example:
```javascript
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
})

const persister = createSyncStoragePersister({
  storage: window.localStorage,
})

persistQueryClient({
  queryClient,
  persister,
})
```

## 15. Networking

### Custom Fetch Function
- Implement a global fetch function for consistent error handling and request configuration

Example:
```javascript
const defaultQueryFn = async ({ queryKey }) => {
  const response = await fetch(`https://api.example.com/${queryKey.join('/')}`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
})
```

## 16. Data Transformation

### Using select for Data Transformation
- Transform query results before they reach components

Example:
```javascript
const { data } = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
  select: (todos) => todos.filter(todo => !todo.completed),
})
```

## 17. Placeholder Data

### Initial Data and Placeholder Data Functions
- Provide instant data for better UX while fetching

Example:
```javascript
const result = useQuery({
  queryKey: ['todo', id],
  queryFn: () => fetchTodoById(id),
  placeholderData: () => {
    return queryClient.getQueryData(['todos'])?.find(d => d.id === id)
  },
})
```

Remember:
- Balance between fresh data and performance
- Utilize built-in React Query features before external solutions
- Keep up with React Query documentation for latest practices
- Consider trade-offs in caching strategies based on your app's needs
- Implement proper error handling and loading states for robust UX
- Use TypeScript for enhanced type safety when possible
- Regularly profile and optimize query performance