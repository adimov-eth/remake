# Nano Stores Compressed Guide

## Core Concepts

### Atom
- Basic store for primitive values
- Create: `atom(initialValue)`
- Usage: `$counter.get()`, `$counter.set(newValue)`

### Map
- For objects with one level depth
- Create: `map(initialObject)`
- Usage: `$profile.setKey('name', 'New Name')`

### Deep Map
- Supports nested objects/arrays with fine-grained reactivity
- Create: `deepMap(complexObject)`
- Usage: `$profile.setKey('hobbies[0].friends[0].name', 'New Friend')`

### Computed
- Derived from other stores
- Create: `computed($dependentStore, callback)`
- Async: Use `task()` for async computations

### Batched
- Like computed, but updates at end of tick
- Create: `batched([$store1, $store2], callback)`

## Best Practices

1. Move logic from components to stores
2. Separate changes and reactions
3. Reduce `get()` usage outside tests; prefer `useStore()` or subscriptions

## Advanced Features

### Lazy Initialization
- Use `onMount($store, callback)` for mount/unmount logic

### Tasks
- `task(asyncFunction)` for async operations
- `allTasks()` to wait for all ongoing tasks

### Events
- `onSet`, `onNotify`, `onMount`, `onStart`, `onStop`
- Can abort changes or notifications

## Integration

### React/Preact
```tsx
import { useStore } from '@nanostores/react'
const Component = () => {
  const value = useStore($store)
  return <div>{value}</div>
}
```

### SSR
- Set initial values on server
- Use `allTasks()` to wait for async operations

## Examples

### Atom Store
```ts
import { atom } from 'nanostores'
export const $counter = atom(0)
$counter.set($counter.get() + 1)
```

### Map Store
```ts
import { map } from 'nanostores'
export const $profile = map({ name: 'anonymous' })
$profile.setKey('name', 'Kazimir Malevich')
```

### Computed Store
```ts
import { computed } from 'nanostores'
export const $admins = computed($users, users => users.filter(u => u.isAdmin))
```

### Lazy Store
```ts
import { onMount } from 'nanostores'
onMount($profile, () => {
  // Initialize
  return () => {
    // Cleanup
  }
})
```

### Deep Map
```ts
import { deepMap } from 'nanostores'
export const $profile = deepMap({
  hobbies: [{ name: 'coding', level: 'expert' }]
})
$profile.setKey('hobbies[0].level', 'master')
```

### Batched Computed
```ts
import { batched } from 'nanostores'
export const $link = batched([$sortBy, $categoryId], (sort, category) => 
  `/api/entities?sortBy=${sort}&categoryId=${category}`
)
```

### Async Computed
```ts
import { computed, task } from 'nanostores'
export const $user = computed($userId, id => task(async () => {
  const response = await fetch(`/api/users/${id}`)
  return response.json()
}))
```

Remember: This guide assumes high proficiency in JavaScript and state management concepts. Refer to the full documentation for more detailed explanations and edge cases.