# @nanostores/persistent

Smart store for Nano Stores state manager. Keeps data in `localStorage` and syncs between browser tabs.

## Key Features
- Tiny: 281 bytes (min+brotli), zero deps
- TypeScript support
- Framework-agnostic, SSR-compatible
- Configurable storage

## Usage

### Primitive Store
```ts
import { persistentAtom } from '@nanostores/persistent'

export const shoppingCart = persistentAtom<Product[]>('cart', [], {
  encode: JSON.stringify,
  decode: JSON.parse,
})

// Update
shoppingCart.set([...shoppingCart.get(), newProduct])
```

### Map Store
```ts
import { persistentMap } from '@nanostores/persistent'

export const settings = persistentMap<SettingsValue>('settings:', {
  sidebar: 'show',
  theme: 'auto'
})

// Update
settings.setKey('sidebar', 'hide')
```

### Sync Control
Disable tab sync:
```ts
export const draft = persistentAtom('draft', '', { listen: false })
```

### Custom Encoding
```ts
export const draft = persistentAtom('draft', [], {
  encode: JSON.stringify,
  decode: value => {
    try { return JSON.parse(value) }
    catch { return value }
  }
})
```

### SSR Support
```js
if (isServer) {
  locale.set(user.locale)
}
```

### Custom Storage Engine
```ts
import { setPersistentEngine } from '@nanostores/persistent'

const storage = new Proxy({/*...*/})
const events = {
  addEventListener(key, callback) {/*...*/},
  removeEventListener(key, callback) {/*...*/},
  perKey: false
}

setPersistentEngine(storage, events)
```

## TypeScript
```ts
import { PersistentListener, PersistentEvent } from '@nanostores/persistent'

const events = {
  addEventListener(key: string, callback: PersistentListener) {/*...*/},
  removeEventListener(key: string, callback: PersistentListener) {/*...*/}
}

function onChange() {
  const event: PersistentEvent = { key: 'locale', newValue: 'ru' }
  // ...
}
```