# Wouter - Tiny React/Preact Router

Wouter is a minimalist router (2.1KB gzipped) for React and Preact applications, utilizing hooks for routing logic.

## Key Features

- Familiar API with `<Route>`, `<Link>`, `<Switch>`, `<Redirect>` components
- Hook-based API: `useLocation`, `useRoute`, `useParams`, `useSearch`, `useRouter`
- Supports nested routing and base path configuration
- Compatible with browser history API and hash-based routing
- TypeScript support
- No top-level `<Router>` required (optional for customization)

## Core Hooks

- `useLocation()`: Get/set current path
- `useRoute(pattern)`: Match current path against pattern
- `useParams()`: Access route parameters
- `useSearch()`: Get current query string
- `useRouter()`: Access router configuration

## Key Components

- `<Route path={pattern}>`: Render conditionally based on path
- `<Link href={path}>`: Navigation component
- `<Switch>`: Exclusive routing (render first match only)
- `<Redirect to={path}>`: Programmatic navigation
- `<Router>`: Optional top-level configuration

## Router Configuration Options

- `hook`: Custom location hook
- `base`: Set base path for app
- `parser`: Custom path parsing function

## Advanced Features

- Server-side rendering support
- Custom location hooks (e.g. hash-based routing)
- Path parameter matching and extraction
- Relative routing in nested contexts
- Active link detection

## Usage Examples

### Basic Usage

```jsx
import { Route, Link, Switch } from "wouter";

function App() {
  return (
    <>
      <nav>
        <Link href="/users">Users</Link>
      </nav>
      <Switch>
        <Route path="/users/:id" component={UserProfile} />
        <Route path="/users">User List</Route>
        <Route>404: Not Found</Route>
      </Switch>
    </>
  );
}
```

### Using `useRoute` Hook

```jsx
import { useRoute } from "wouter";

function UserSection() {
  const [isUsersRoute, params] = useRoute("/users/:id");
  
  if (!isUsersRoute) return null;
  
  return <div>User ID: {params.id}</div>;
}
```

### Nested Routing

```jsx
import { Route, Link } from "wouter";

function App() {
  return (
    <Route path="/dashboard" nest>
      <h1>Dashboard</h1>
      <nav>
        <Link href="/profile">Profile</Link>
        <Link href="/settings">Settings</Link>
      </nav>
      
      <Route path="/profile">Dashboard Profile</Route>
      <Route path="/settings">Dashboard Settings</Route>
    </Route>
  );
}
```

### Programmatic Navigation

```jsx
import { useLocation } from "wouter";

function NavigationButton() {
  const [, setLocation] = useLocation();
  
  return (
    <button onClick={() => setLocation("/dashboard")}>
      Go to Dashboard
    </button>
  );
}
```

### Custom Active Link

```jsx
import { Link, useRoute } from "wouter";

function ActiveLink(props) {
  const [isActive] = useRoute(props.href);
  
  return (
    <Link {...props}>
      <a className={isActive ? "active" : ""}>{props.children}</a>
    </Link>
  );
}
```

### Exclusive Routing with Default Route

```jsx
import { Switch, Route } from "wouter";

function AppRoutes() {
  return (
    <Switch>
      <Route path="/home" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route>404: Page Not Found</Route>
    </Switch>
  );
}
```

### Accessing Route Parameters

```jsx
import { Route, useParams } from "wouter";

function UserProfile() {
  const params = useParams();
  
  return <div>User ID: {params.id}</div>;
}

function App() {
  return <Route path="/users/:id" component={UserProfile} />;
}
```

### Hash-Based Routing

```jsx
import { Router, Link, Route } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";

function App() {
  return (
    <Router hook={useHashLocation}>
      <nav>
        <Link href="#/home">Home</Link>
        <Link href="#/about">About</Link>
      </nav>
      
      <Route path="/home" component={Home} />
      <Route path="/about" component={About} />
    </Router>
  );
}
```

### Accessing Search Parameters

```jsx
import { useSearch } from "wouter";

function SearchResults() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const query = params.get("q");
  
  return <div>Search results for: {query}</div>;
}
```

## Customization

```jsx
import { Router, useHashLocation } from "wouter";

<Router hook={useHashLocation} base="/app">
  {/* App routes */}
</Router>
```

This documentation covers the key features, API, and usage examples of the wouter library.