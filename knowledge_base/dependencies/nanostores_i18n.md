# Nano Stores I18n

Tiny, flexible JS library for web app translation using [Nano Stores] and [JS Internationalization API].

## Key Components

1. **Locale Management**
   - Use `localeFrom()` to find user's locale
   - `browser()` for browser settings
   - Can use `persistentAtom` for localStorage

2. **Formatter**
   - `formatter()` creates store with `time()`, `number()`, `relativeTime()`
   - Uses Intl.DateTimeFormat, Intl.NumberFormat, Intl.RelativeTimeFormat

3. **I18n Object**
   - `createI18n()` for defining components and downloading translations

4. **Translations**
   - Base translation in component sources (English default)
   - Other translations in JSON format

5. **Translation Transforms**
   - `params()` for parameter replacement
   - `count()` for pluralization

## Usage Examples

### Basic Setup

```tsx
// stores/i18n.js
import { createI18n, localeFrom, browser, formatter } from '@nanostores/i18n'
import { persistentAtom } from '@nanostores/persistent'

export const setting = persistentAtom<string | undefined>('locale', undefined)
export const locale = localeFrom(
  setting,
  browser({ available: ['en', 'fr', 'ru'], fallback: 'en' })
)
export const format = formatter(locale)
export const i18n = createI18n(locale, {
  get (code) {
    return fetchJSON(`/translations/${code}.json`)
  }
})
```

### Component Usage

```tsx
// components/post.jsx
import { params, count } from '@nanostores/i18n'
import { useStore } from '@nanostores/react'
import { i18n, format } from '../stores/i18n.js'

export const messages = i18n('post', {
  title: 'Post details',
  published: params('Was published at {at}'),
  comments: count({
    one: '{count} comment',
    many: '{count} comments'
  })
})

export const Post = ({ author, comments, publishedAt }) => {
  const t = useStore(messages)
  const { time } = useStore(format)
  return <article>
    <h1>{t.title}</h1>
    <p>{t.published({ at: time(publishedAt) })}</p>
    <p>{t.comments(comments.length)}</p>
  </article>
}
```

### Translation JSON

```json
// public/translations/ru.json
{
  "post": {
    "title": "Данные о публикации",
    "published": "Опубликован {at}",
    "comments": {
      "one": "{count} комментарий",
      "few": "{count} комментария",
      "many": "{count} комментариев"
    }
  }
}
```

## Advanced Features

1. **Custom Variable Translations**
   - Create custom transforms using `transform` and `strings`

2. **Lazy Loading**
   - Use component prefixes (e.g., 'main/post')
   - Split translations into chunks

3. **Server-Side Rendering**
   - Use custom `locale` store and set `cache` options

4. **Processors**
   - Apply global translation processors
   - Example: screen size transform

```js
// stores/i18n.js
import { atom, onMount } from 'nanostores'
import { createI18n, createProcessor } from '@nanostores/i18n'

const screenSize = atom('big')
onMount(screenSize, () => {
  let media = window.matchMedia('(min-width: 600px)')
  const check = () => {
    screenSize.set(media.matches ? 'big' : 'small')
  }
  media.addEventListener('change', check)
  return () => {
    media.removeEventListener('change', check)
  }
})

export const size = createProcessor(screenSize)

export const i18n = createI18n(locale, {
  get: /* ... */,
  processors: [size]
})

// Usage in component
export const messages = i18n({
  send: size({
    big: 'Send message',
    small: 'send'
  }),
  name: 'User name'
})
```

## Translation Process

1. Developer creates base translation in component source
2. CI extracts base translation to JSON
3. Upload JSON to translation service
4. Translators translate
5. Download translated JSONs to project

For extraction:

```ts
import { messagesToJSON } from '@nanostores/i18n'

const components = await glob('./src/*.tsx', { absolute: true })
const translations = await Promise.all(components.map(async (file) => {
  return (await import(file)).messages
}))
const json = messagesToJSON(...translations)
```