Telegram UI

Development

Import styles:

jsxCopyimport '@telegram-apps/telegram-ui/dist/styles.css';

Wrap app with AppRoot:

jsxCopyimport { AppRoot } from '@telegram-apps/telegram-ui';

ReactDOM.render(
  <AppRoot>
    <App />
  </AppRoot>,
  document.getElementById('root')
);
Usage example
jsxCopyimport '@telegram-apps/telegram-ui/dist/styles.css';
import { AppRoot, Cell, List, Section } from '@telegram-apps/telegram-ui';

const cellsTexts = ['Chat Settings', 'Data and Storage', 'Devices'];

export const App = () => (
  <AppRoot>
    <List>
      <Section header="Header" footer="Footer">
        {cellsTexts.map((text, index) => (
          <Cell key={index}>{text}</Cell>
        ))}
      </Section>
    </List>
  </AppRoot>
);
AppRoot Theming Mechanism
Uses CSS variables and React context for dynamic theming.
CSS Variables

Basic Variables:


Inherit from Telegram theme
Fallback to library defaults


Custom Variables:


Allow specific styling adjustments
Support brand identity

Internal Mechanism

Detects theme and platform
Updates CSS variables
Applies platform-specific styles
Provides context for nested components

AppRoot abstracts theming complexities, enabling focus on feature development and visual appeal across platforms and themes.


# TelegramUI Component Library Documentation

## Table of Contents

1. [Typography](#typography)
   - [Text](#text)
   - [Title](#title)
   - [LargeTitle](#largetitle)
   - [Headline](#headline)
   - [Subheadline](#subheadline)
   - [Caption](#caption)
2. [Layout](#layout)
   - [FixedLayout](#fixedlayout)
   - [Tabbar](#tabbar)
   - [List](#list)
3. [Navigation](#navigation)
   - [Breadcrumbs](#breadcrumbs)
   - [CompactPagination](#compactpagination)
   - [Pagination](#pagination)
   - [SegmentedControl](#segmentedcontrol)
   - [TabsList](#tabslist)
4. [Blocks](#blocks)
   - [Accordion](#accordion)
   - [Avatar](#avatar)
   - [AvatarStack](#avatarstack)
   - [Badge](#badge)
   - [Banner](#banner)
   - [Blockquote](#blockquote)
   - [Button](#button)
   - [Card](#card)
   - [Cell](#cell)
   - [Divider](#divider)
   - [IconButton](#iconbutton)
   - [Image](#image)
   - [InlineButtons](#inlinebuttons)
   - [Placeholder](#placeholder)
   - [Section](#section)
   - [Steps](#steps)
   - [Timeline](#timeline)

## Typography

### Text

The Text component is used for general purpose text display.

#### API

- `weight`: '1' | '2' | '3' (default: '3')
- `Component`: ElementType (default: 'span')
- `children`: ReactNode

#### Example

```jsx
import { Text } from './Text';

export const TextExample = () => (
  <>
    <Text weight="3">Text · Regular</Text>
    <Text weight="2">Text · Semibold</Text>
    <Text weight="1">Text · Bold</Text>
  </>
);
```

### Title

The Title component is used for section headings.

#### API

- `level`: '1' | '2' | '3' (default: '1')
- `weight`: '1' | '2' | '3' (default: '1')
- `Component`: ElementType
- `plain`: boolean
- `children`: ReactNode

#### Example

```jsx
import { Title } from './Title';

export const TitleExample = () => (
  <>
    <Title level="1" weight="3">Title 1 · Regular</Title>
    <Title level="1" weight="2">Title 1 · Semibold</Title>
    <Title level="1" weight="1">Title 1 · Bold</Title>
    
    <Title level="2" weight="3">Title 2 · Regular</Title>
    <Title level="2" weight="2">Title 2 · Semibold</Title>
    <Title level="2" weight="1">Title 2 · Bold</Title>
    
    <Title level="3" weight="3">Title 3 · Regular</Title>
    <Title level="3" weight="2">Title 3 · Semibold</Title>
    <Title level="3" weight="1">Title 3 · Bold</Title>
  </>
);
```

### LargeTitle

The LargeTitle component is used for main headings or hero text.

#### API

- `weight`: '1' | '2' | '3' (default: '1')
- `Component`: ElementType
- `plain`: boolean
- `children`: ReactNode

#### Example

```jsx
import { LargeTitle } from './LargeTitle';

export const LargeTitleExample = () => (
  <>
    <LargeTitle weight="3">Large Title · Regular</LargeTitle>
    <LargeTitle weight="2">Large Title · Semibold</LargeTitle>
    <LargeTitle weight="1">Large Title · Bold</LargeTitle>
  </>
);
```

### Headline

The Headline component is used for important subheadings.

#### API

- `weight`: '1' | '2' | '3' (default: '1')
- `Component`: ElementType
- `plain`: boolean
- `children`: ReactNode

#### Example

```jsx
import { Headline } from './Headline';

export const HeadlineExample = () => (
  <>
    <Headline weight="3">Headline · Regular</Headline>
    <Headline weight="2">Headline · Semibold</Headline>
    <Headline weight="1">Headline · Bold</Headline>
  </>
);
```

### Subheadline

The Subheadline component is used for secondary headings.

#### API

- `level`: '1' | '2' (default: '1')
- `weight`: '1' | '2' | '3' (default: '1')
- `Component`: ElementType
- `plain`: boolean
- `children`: ReactNode

#### Example

```jsx
import { Subheadline } from './Subheadline';

export const SubheadlineExample = () => (
  <>
    <Subheadline level="1" weight="3">Subheadline 1 · Regular</Subheadline>
    <Subheadline level="1" weight="2">Subheadline 1 · Semibold</Subheadline>
    <Subheadline level="1" weight="1">Subheadline 1 · Bold</Subheadline>
    
    <Subheadline level="2" weight="3">Subheadline 2 · Regular</Subheadline>
    <Subheadline level="2" weight="2">Subheadline 2 · Semibold</Subheadline>
    <Subheadline level="2" weight="1">Subheadline 2 · Bold</Subheadline>
  </>
);
```

### Caption

The Caption component is used for small, supplementary text.

#### API

- `level`: '1' | '2' (default: '1')
- `weight`: '1' | '2' | '3' (default: '3')
- `Component`: ElementType
- `children`: ReactNode

#### Example

```jsx
import { Caption } from './Caption';

export const CaptionExample = () => (
  <>
    <Caption level="1" weight="3">Caption 1 · Regular</Caption>
    <Caption level="1" weight="2">Caption 1 · Semibold</Caption>
    <Caption level="1" weight="1">Caption 1 · Bold</Caption>
    
    <Caption level="2" weight="3">Caption 2 · Regular</Caption>
    <Caption level="2" weight="2">Caption 2 · Semibold</Caption>
    <Caption level="2" weight="1">Caption 2 · Bold</Caption>
  </>
);
```

## Layout

### FixedLayout

The FixedLayout component is used for creating fixed-position layouts.

#### API

- `vertical`: 'top' | 'bottom' (default: 'bottom')
- `filled`: boolean
- `children`: ReactNode

#### Example

```jsx
import { FixedLayout, Button } from 'components';

export const FixedLayoutExample = () => (
  <div style={{ height: 200, width: 400 }}>
    <FixedLayout vertical="top" style={{ padding: 16 }}>
      <Button size="l" stretched>
        This is FixedLayout with top vertical
      </Button>
    </FixedLayout>
    <FixedLayout style={{ padding: 16 }}>
      <Button size="l" stretched>
        This is FixedLayout with default vertical
      </Button>
    </FixedLayout>
  </div>
);
```

### Tabbar

The Tabbar component is used for bottom navigation.

#### API

- `children`: ReactNode (Tabbar.Item components)

Tabbar.Item API:
- `text`: string
- `selected`: boolean
- `onClick`: () => void
- `children`: ReactNode

#### Example

```jsx
import { useState } from 'react';
import { Tabbar } from './Tabbar';
import { Icon28Chat, Icon28Devices, Icon28Stats } from 'icons';

const tabs = [
  { id: 0, Icon: Icon28Devices, text: 'Devices' },
  { id: 1, Icon: Icon28Chat, text: 'Chat' },
  { id: 2, Icon: Icon28Stats, text: 'Stats' },
];

export const TabbarExample = () => {
  const [currentTab, setCurrentTab] = useState(tabs[0].id);

  return (
    <Tabbar>
      {tabs.map(({ id, text, Icon }) => (
        <Tabbar.Item
          key={id}
          text={text}
          selected={id === currentTab}
          onClick={() => setCurrentTab(id)}
        >
          <Icon />
        </Tabbar.Item>
      ))}
    </Tabbar>
  );
};
```

### List

The List component is a container for grouping other components.

#### API

- `children`: ReactNode

#### Example

```jsx
import { List, Section, Cell } from 'components';

export const ListExample = () => (
  <List style={{ background: 'var(--tgui--secondary_bg_color)' }}>
    <Section header="Section 1">
      <Cell>Cell 1</Cell>
      <Cell>Cell 2</Cell>
    </Section>
    <Section header="Section 2">
      <Cell>Cell 3</Cell>
      <Cell>Cell 4</Cell>
    </Section>
  </List>
);
```
## Navigation

### Breadcrumbs

The Breadcrumbs component displays a hierarchy of pages or sections.

#### API

- `divider`: 'dot' | 'arrow' (default: 'dot')
- `children`: ReactNode (Breadcrumbs.Item components)

Breadcrumbs.Item API:
- `Component`: ElementType (default: 'span')
- `children`: ReactNode

#### Example

```jsx
import { Breadcrumbs } from 'components';

export const BreadcrumbsExample = () => (
  <Breadcrumbs divider="dot">
    <Breadcrumbs.Item Component="a" href="/">Home</Breadcrumbs.Item>
    <Breadcrumbs.Item Component="a" href="/category">Category</Breadcrumbs.Item>
    <Breadcrumbs.Item>Current Page</Breadcrumbs.Item>
  </Breadcrumbs>
);
```

### CompactPagination

The CompactPagination component provides a compact way to navigate through pages.

#### API

- `children`: ReactNode (CompactPagination.Item components)
- `mode`: 'dark' | 'white' (default: 'dark')

CompactPagination.Item API:
- `selected`: boolean
- `onClick`: () => void
- `children`: ReactNode

#### Example

```jsx
import { useState } from 'react';
import { CompactPagination } from './CompactPagination';

const paginationItems = Array.from({ length: 8 }, (_, i) => i + 1);

export const CompactPaginationExample = () => {
  const [selected, setSelected] = useState(1);

  return (
    <CompactPagination>
      {paginationItems.map((item) => (
        <CompactPagination.Item
          key={item}
          onClick={() => setSelected(item)}
          selected={item === selected}
        >
          {item}
        </CompactPagination.Item>
      ))}
    </CompactPagination>
  );
};
```

### Pagination

The Pagination component provides standard pagination controls.

#### API

- `currentPage`: number
- `totalPages`: number
- `onPageChange`: (page: number) => void

#### Example

```jsx
import { useState } from 'react';
import { Pagination } from './Pagination';

export const PaginationExample = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
    />
  );
};
```

### SegmentedControl

The SegmentedControl component allows users to select from a set of options.

#### API

- `children`: ReactNode (SegmentedControl.Item components)

SegmentedControl.Item API:
- `selected`: boolean
- `onClick`: () => void
- `children`: ReactNode

#### Example

```jsx
import { useState } from 'react';
import { SegmentedControl } from './SegmentedControl';

const labels = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
];

export const SegmentedControlExample = () => {
  const [selected, setSelected] = useState(labels[0].value);

  return (
    <SegmentedControl>
      {labels.map(({ value, label }) => (
        <SegmentedControl.Item
          key={value}
          selected={selected === value}
          onClick={() => setSelected(value)}
        >
          {label}
        </SegmentedControl.Item>
      ))}
    </SegmentedControl>
  );
};
```

### TabsList

The TabsList component provides a horizontal tab navigation.

#### API

- `children`: ReactNode (TabsList.Item components)

TabsList.Item API:
- `selected`: boolean
- `onClick`: () => void
- `children`: ReactNode

#### Example

```jsx
import { useState } from 'react';
import { TabsList } from './TabsList';

const tabs = [
  { label: 'Tab 1', value: 'tab1' },
  { label: 'Tab 2', value: 'tab2' },
  { label: 'Tab 3', value: 'tab3' },
];

export const TabsListExample = () => {
  const [selected, setSelected] = useState(tabs[0].value);

  return (
    <TabsList>
      {tabs.map(({ value, label }) => (
        <TabsList.Item
          key={value}
          selected={selected === value}
          onClick={() => setSelected(value)}
        >
          {label}
        </TabsList.Item>
      ))}
    </TabsList>
  );
};
```

## Blocks

### Accordion

The Accordion component creates expandable content sections.

#### API

- `expanded`: boolean
- `onChange`: () => void
- `children`: ReactNode (Accordion.Summary and Accordion.Content)

Accordion.Summary API:
- `children`: ReactNode

Accordion.Content API:
- `children`: ReactNode

#### Example

```jsx
import { useState } from 'react';
import { Accordion, Blockquote } from 'components';

export const AccordionExample = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
      <Accordion.Summary>History of accordion</Accordion.Summary>
      <Accordion.Content>
        <Blockquote>
          The accordion's basic form is believed to have been invented in Berlin, in 1822,
          by Christian Friedrich Ludwig Buschmann, although one instrument was discovered in 2006
          that appears to have been built earlier.
        </Blockquote>
      </Accordion.Content>
    </Accordion>
  );
};
```

### Avatar

The Avatar component displays user or entity images with fallback options.

#### API

- `size`: number (default: 48)
- `src`: string
- `fallbackIcon`: ReactNode
- `acronym`: string
- `children`: ReactNode

Avatar.Badge API:
- `type`: 'dot' | 'number'
- `children`: ReactNode (for 'number' type)

#### Example

```jsx
import { Avatar } from 'components/Blocks/Avatar/Avatar';

export const AvatarExample = () => (
  <>
    <Avatar size={96} src="https://example.com/avatar.jpg" />
    <Avatar size={48} acronym="JD" />
    <Avatar size={48} src="https://example.com/avatar.jpg">
      <Avatar.Badge type="number">42</Avatar.Badge>
    </Avatar>
  </>
);
```

### AvatarStack

The AvatarStack component displays a group of overlapping avatars.

#### API

- `children`: ReactNode (Avatar components)

#### Example

```jsx
import { AvatarStack, Avatar } from 'components';

const AVATAR_URL = 'https://example.com/avatar.jpg';

export const AvatarStackExample = () => (
  <AvatarStack>
    <Avatar size={48} src={AVATAR_URL} />
    <Avatar size={48} src={AVATAR_URL} />
    <Avatar size={48} src={AVATAR_URL} />
    <Avatar size={48} src={AVATAR_URL} />
  </AvatarStack>
);
```

### Badge

The Badge component displays a notification or status indicator.

#### API

- `type`: 'dot' | 'number'
- `mode`: 'primary' | 'secondary' | 'tertiary' (default: 'primary')
- `children`: ReactNode (for 'number' type)

#### Example

```jsx
import { Badge } from './Badge';

export const BadgeExample = () => (
  <>
    <Badge type="dot" mode="primary" />
    <Badge type="number" mode="primary">50</Badge>
  </>
);
```

### Banner

The Banner component displays promotional or informational content.

#### API

- `type`: 'section' | 'full'
- `before`: ReactNode
- `callout`: string
- `header`: string
- `subheader`: string
- `description`: string
- `children`: ReactNode
- `onCloseIcon`: () => void
- `background`: ReactNode

#### Example

```jsx
import { Banner, Button, Image } from 'components';

export const BannerExample = () => (
  <Banner
    type="section"
    before={<Image size={48} />}
    callout="Urgent notification"
    header="Introducing TON Space"
    description="Start exploring TON in a new, better way"
    onCloseIcon={() => console.log('Banner closed')}
  >
    <Button size="s">Try it out</Button>
    <Button size="s" mode="plain">Maybe later</Button>
  </Banner>
);
```


### Blockquote

The Blockquote component is used to highlight quoted text.

#### API

- `type`: 'text' | 'image' (default: 'text')
- `topRightIcon`: ReactNode
- `children`: ReactNode

#### Example

```jsx
import { Blockquote } from './Blockquote';

export const BlockquoteExample = () => (
  <Blockquote type="text">
    There is grandeur in this view of life, with its several powers, having been originally breathed by the Creator into a few forms or into one; and that, whilst this planet has gone circling on according to the fixed law of gravity, from so simple a beginning endless forms most beautiful and most wonderful have been, and are being evolved.
  </Blockquote>
);
```

### Button

The Button component is used for triggering actions.

#### API

- `size`: 's' | 'm' | 'l' (default: 'm')
- `mode`: 'filled' | 'outline' | 'plain' (default: 'filled')
- `before`: ReactNode
- `after`: ReactNode
- `children`: ReactNode
- `Component`: ElementType (default: 'button')

#### Example

```jsx
import { Button } from './Button';
import { Icon20Copy } from 'icons/20/copy';

export const ButtonExample = () => (
  <Button
    size="s"
    mode="filled"
    before={<Icon20Copy />}
  >
    Create channel
  </Button>
);
```

### Card

The Card component is a container for grouping related content.

#### API

- `children`: ReactNode

Card.Chip API:
- `readOnly`: boolean
- `children`: ReactNode

Card.Cell API:
- `readOnly`: boolean
- `subtitle`: string
- `children`: ReactNode

#### Example

```jsx
import { Card } from './Card';

export const CardExample = () => (
  <Card>
    <Card.Chip readOnly>Hot place</Card.Chip>
    <img
      alt="New York"
      src="https://example.com/newyork.jpg"
      style={{ display: 'block', width: 254, height: 308, objectFit: 'cover' }}
    />
    <Card.Cell readOnly subtitle="United States">
      New York
    </Card.Cell>
  </Card>
);
```

### Cell

The Cell component is a versatile list item component.

#### API

- `before`: ReactNode
- `after`: ReactNode
- `titleBadge`: ReactNode
- `subhead`: string
- `subtitle`: string
- `children`: ReactNode
- `hint`: string
- `description`: string

#### Example

```jsx
import { Cell, Avatar, Badge } from 'components';

export const CellExample = () => (
  <Cell
    before={<Avatar size={48} />}
    after={<Badge type="number">99</Badge>}
    titleBadge={<Badge type="dot" />}
    subhead="Subhead"
    subtitle="Subtitle"
    description="Description"
  >
    Title
  </Cell>
);
```

### Divider

The Divider component is used to separate content.

#### API

This component doesn't accept any props.

#### Example

```jsx
import { Divider, Cell } from 'components';

export const DividerExample = () => (
  <>
    <Cell>Content above</Cell>
    <Divider />
    <Cell>Content below</Cell>
  </>
);
```

### IconButton

The IconButton component is a button that contains only an icon.

#### API

- `size`: 's' | 'm' | 'l' (default: 'm')
- `mode`: 'bezeled' | 'plain' (default: 'bezeled')
- `children`: ReactNode (typically an icon)

#### Example

```jsx
import { IconButton } from './IconButton';
import { Icon24QR } from 'icons/24/qr';

export const IconButtonExample = () => (
  <IconButton size="m" mode="bezeled">
    <Icon24QR />
  </IconButton>
);
```

### Image

The Image component displays images with fallback options.

#### API

- `size`: number
- `src`: string
- `fallbackIcon`: ReactNode
- `children`: ReactNode

Image.Badge API:
- `type`: 'dot' | 'number'
- `children`: ReactNode (for 'number' type)

#### Example

```jsx
import { Image } from './Image';

export const ImageExample = () => (
  <>
    <Image size={96} src="https://example.com/image.jpg" />
    <Image size={48} src="https://example.com/image.jpg">
      <Image.Badge type="number">42</Image.Badge>
    </Image>
  </>
);
```

### InlineButtons

The InlineButtons component displays a row of inline buttons.

#### API

- `mode`: 'plain' | 'outline' (default: 'plain')
- `children`: ReactNode (InlineButtons.Item components)

InlineButtons.Item API:
- `text`: string
- `children`: ReactNode (typically an icon)

#### Example

```jsx
import { InlineButtons } from './InlineButtons';
import { Icon24Chat, Icon24Notifications, Icon24QR } from 'icons';

export const InlineButtonsExample = () => (
  <InlineButtons mode="plain">
    <InlineButtons.Item text="Chat">
      <Icon24Chat />
    </InlineButtons.Item>
    <InlineButtons.Item text="Mute">
      <Icon24Notifications />
    </InlineButtons.Item>
    <InlineButtons.Item text="QR">
      <Icon24QR />
    </InlineButtons.Item>
  </InlineButtons>
);
```

### Placeholder

The Placeholder component is used for empty states or loading indicators.

#### API

- `header`: string
- `description`: string
- `action`: ReactNode
- `children`: ReactNode

#### Example

```jsx
import { Placeholder, Button } from 'components';

export const PlaceholderExample = () => (
  <Placeholder
    header="No messages"
    description="You don't have any messages yet"
    action={<Button size="m">Start a conversation</Button>}
  >
    <img
      alt="Empty inbox"
      src="https://example.com/empty-inbox.png"
      style={{ width: 144, height: 144 }}
    />
  </Placeholder>
);
```

### Section

The Section component is used for grouping related content.

#### API

- `header`: ReactNode
- `footer`: ReactNode
- `children`: ReactNode

#### Example

```jsx
import { Section, Cell, IconContainer } from 'components';
import { Icon28Chat, Icon28Devices, Icon28Stats } from 'icons';

const cells = [
  { id: 1, icon: <Icon28Chat />, text: 'Chat Settings' },
  { id: 2, icon: <Icon28Devices />, text: 'Data and Storage' },
  { id: 3, icon: <Icon28Stats />, text: 'Devices' },
];

export const SectionExample = () => (
  <Section
    header="Main Settings"
    footer="The official Telegram app is available for Android, iPhone, iPad, Windows, macOS and Linux."
  >
    {cells.map((cell) => (
      <Cell
        key={cell.id}
        before={<IconContainer>{cell.icon}</IconContainer>}
      >
        {cell.text}
      </Cell>
    ))}
  </Section>
);
```

### Steps

The Steps component displays a progress indicator for multi-step processes.

#### API

- `count`: number
- `progress`: number

#### Example

```jsx
import { Steps } from './Steps';

export const StepsExample = () => (
  <Steps count={10} progress={5} />
);
```

### Timeline

The Timeline component displays a vertical or horizontal timeline of events.

#### API

- `active`: number
- `horizontal`: boolean
- `children`: ReactNode (Timeline.Item components)

Timeline.Item API:
- `header`: string
- `children`: ReactNode

#### Example

```jsx
import { Timeline } from './Timeline';

const TimelineItems = [
  { key: '1', header: 'Arrived', children: 'Yesterday' },
  { key: '2', header: 'Departed', children: 'Today' },
  { key: '3', header: 'In transit', children: 'Tomorrow' },
  { key: '4', header: 'Processed to delivery center', children: 'Next week' },
  { key: '5', header: 'Shipped', children: 'Someday' },
];

export const TimelineExample = () => (
  <Timeline active={2}>
    {TimelineItems.map((item) => (
      <Timeline.Item key={item.key} header={item.header}>
        {item.children}
      </Timeline.Item>
    ))}
  </Timeline>
);
```

## Form Components

### Checkbox

The Checkbox component is used for selecting multiple options.

#### API

- `defaultChecked`: boolean
- `checked`: boolean
- `onChange`: (event: ChangeEvent<HTMLInputElement>) => void
- `name`: string
- `value`: string

#### Example

```jsx
import { Checkbox, Cell } from 'components';

export const CheckboxExample = () => (
  <>
    <Cell
      Component="label"
      before={<Checkbox name="checkbox" value="1" />}
      description="Pass Component='label' to Cell to make it clickable."
    >
      Option 1
    </Cell>
    <Cell
      Component="label"
      before={<Checkbox name="checkbox" value="2" />}
      description="Pass Component='label' to Cell to make it clickable."
    >
      Option 2
    </Cell>
  </>
);
```

### Chip

The Chip component is used for compact, toggleable options.

#### API

- `mode`: 'elevated' | 'mono' | 'outline' (default: 'elevated')
- `before`: ReactNode
- `after`: ReactNode
- `Component`: ElementType (default: 'div')
- `children`: ReactNode

#### Example

```jsx
import { Chip, Avatar } from 'components';

export const ChipExample = () => (
  <>
    <Chip mode="elevated">Elevated</Chip>
    <Chip mode="mono" before={<Avatar size={20} />}>
      Mono
    </Chip>
    <Chip mode="outline">Outline</Chip>
  </>
);
```

### ColorInput

The ColorInput component allows users to select a color.

#### API

- `header`: string
- `placeholder`: string
- `value`: string
- `onChange`: (value: string) => void

#### Example

```jsx
import { useState } from 'react';
import { ColorInput } from './ColorInput';

export const ColorInputExample = () => {
  const [color, setColor] = useState('#000000');

  return (
    <ColorInput
      header="Color"
      placeholder="Select color"
      value={color}
      onChange={setColor}
    />
  );
};
```

### FileInput

The FileInput component is used for file uploads.

#### API

- `multiple`: boolean
- `onChange`: (event: ChangeEvent<HTMLInputElement>) => void
- `children`: ReactNode

#### Example

```jsx
import { useState } from 'react';
import { FileInput, Cell } from 'components';

export const FileInputExample = () => {
  const [files, setFiles] = useState<FileList | null>(null);

  return (
    <FileInput multiple onChange={(event) => setFiles(event.target.files)}>
      {files && Array.from(files).map((file) => (
        <Cell key={file.name} subtitle={`${file.size} bytes`}>
          {file.name}
        </Cell>
      ))}
    </FileInput>
  );
};
```

### Input

The Input component is used for text input.

#### API

- `header`: string
- `placeholder`: string
- `value`: string
- `onChange`: (event: ChangeEvent<HTMLInputElement>) => void
- `status`: 'default' | 'error' | 'focused' (default: 'default')
- `disabled`: boolean
- `after`: ReactNode

#### Example

```jsx
import { useState } from 'react';
import { Input, Tappable } from 'components';
import { Icon24Close } from 'icons/24/close';

export const InputExample = () => {
  const [value, setValue] = useState('');

  return (
    <Input
      header="Username"
      placeholder="Enter your username"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      after={
        value && (
          <Tappable Component="div" onClick={() => setValue('')}>
            <Icon24Close />
          </Tappable>
        )
      }
    />
  );
};
```

### Multiselect

The Multiselect component allows users to select multiple options from a list.

#### API

- `header`: string
- `placeholder`: string
- `options`: Array<{ value: string, label: string }>
- `value`: Array<{ value: string, label: string }>
- `onChange`: (newOptions: Array<{ value: string, label: string }>) => void
- `closeDropdownAfterSelect`: boolean
- `creatable`: string | boolean

#### Example

```jsx
import { useState } from 'react';
import { Multiselect } from './Multiselect';

const PLATFORM_OPTIONS = [
  { value: 'mac', label: 'macOS' },
  { value: 'windows', label: 'Windows' },
  { value: 'linux', label: 'Linux' },
];

export const MultiselectExample = () => {
  const [value, setValue] = useState([]);

  return (
    <Multiselect
      header="Platforms"
      placeholder="Select platforms"
      options={PLATFORM_OPTIONS}
      value={value}
      onChange={setValue}
      creatable="Create new platform"
    />
  );
};
```

### Multiselectable

The Multiselectable component is used for multiple selection inputs.

#### API

- `name`: string
- `value`: string
- `checked`: boolean
- `onChange`: (event: ChangeEvent<HTMLInputElement>) => void

#### Example

```jsx
import { Multiselectable, Cell } from 'components';

export const MultiselectableExample = () => (
  <form>
    <Cell
      Component="label"
      before={<Multiselectable name="multiselect" value="1" />}
      description="Pass Component='label' to Cell to make it clickable."
    >
      Option 1
    </Cell>
    <Cell
      Component="label"
      before={<Multiselectable name="multiselect" value="2" />}
      description="Pass Component='label' to Cell to make it clickable."
    >
      Option 2
    </Cell>
  </form>
);
```

### PinInput

The PinInput component is used for entering PIN codes or OTPs.

#### API

- `length`: number (default: 4)
- `onComplete`: (value: string) => void

#### Example

```jsx
import { PinInput } from './PinInput';

export const PinInputExample = () => (
  <PinInput
    length={6}
    onComplete={(value) => console.log('PIN entered:', value)}
  />
);
```

### Radio

The Radio component is used for selecting a single option from a list.

#### API

- `name`: string
- `value`: string
- `checked`: boolean
- `onChange`: (event: ChangeEvent<HTMLInputElement>) => void

#### Example

```jsx
import { Radio, Cell } from 'components';

export const RadioExample = () => (
  <form>
    <Cell
      Component="label"
      before={<Radio name="radio" value="1" />}
      description="Pass Component='label' to Cell to make it clickable."
    >
      Option 1
    </Cell>
    <Cell
      Component="label"
      before={<Radio name="radio" value="2" />}
      description="Pass Component='label' to Cell to make it clickable."
    >
      Option 2
    </Cell>
  </form>
);
```

### Rating

The Rating component allows users to provide a star rating.

#### API

- `value`: number
- `onChange`: (value: number) => void
- `IconContainer`: ComponentType (optional, for custom icon)

#### Example

```jsx
import { useState } from 'react';
import { Rating, Section } from 'components';
import { Icon28Heart } from 'icons/28/heart';

export const RatingExample = () => {
  const [rating, setRating] = useState(0);

  return (
    <Section header="Rate this item">
      <Rating value={rating} onChange={setRating} IconContainer={Icon28Heart} />
    </Section>
  );
};
```

### Select

The Select component is used for selecting a single option from a dropdown list.

#### API

- `header`: string
- `placeholder`: string
- `value`: string
- `onChange`: (event: ChangeEvent<HTMLSelectElement>) => void
- `children`: ReactNode (option elements)

#### Example

```jsx
import { Select } from './Select';

export const SelectExample = () => (
  <Select
    header="Select"
    placeholder="Choose an option"
  >
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
  </Select>
);
```

### Selectable

The Selectable component is a customizable radio input.

#### API

- `name`: string
- `value`: string
- `checked`: boolean
- `onChange`: (event: ChangeEvent<HTMLInputElement>) => void

#### Example

```jsx
import { Selectable, Cell } from 'components';

export const SelectableExample = () => (
  <form>
    <Cell
      Component="label"
      before={<Selectable name="selectable" value="1" />}
      description="Pass Component='label' to Cell to make it clickable."
    >
      Option 1
    </Cell>
    <Cell
      Component="label"
      before={<Selectable name="selectable" value="2" />}
      description="Pass Component='label' to Cell to make it clickable."
    >
      Option 2
    </Cell>
  </form>
);
```

### Slider

The Slider component allows users to select a value from a range.

#### API

- `min`: number (default: 0)
- `max`: number (default: 100)
- `step`: number (default: 1)
- `value`: number | [number, number] (for range slider)
- `onChange`: (value: number | [number, number]) => void
- `multiple`: boolean (for range slider)
- `before`: ReactNode
- `after`: ReactNode

#### Example

```jsx
import { useState } from 'react';
import { Slider, IconContainer } from 'components';
import { Icon24SunLow } from 'icons/24/sun_low';

export const SliderExample = () => {
  const [value, setValue] = useState(50);

  return (
    <Slider
      value={value}
      onChange={setValue}
      before={<IconContainer><Icon24SunLow /></IconContainer>}
      after={<IconContainer><Icon24SunLow /></IconContainer>}
    />
  );
};
```

### Switch

The Switch component is used for toggling a single option on or off.

#### API

- `checked`: boolean
- `onChange`: (event: ChangeEvent<HTMLInputElement>) => void
- `disabled`: boolean

#### Example

```jsx
import { useState } from 'react';
import { Switch, Cell } from 'components';

export const SwitchExample = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <Cell
      Component="label"
      after={<Switch checked={isOn} onChange={() => setIsOn(!isOn)} />}
    >
      Toggle feature
    </Cell>
  );
};
```

### Textarea

The Textarea component is used for multi-line text input.

#### API

- `header`: string
- `placeholder`: string
- `value`: string
- `onChange`: (event: ChangeEvent<HTMLTextAreaElement>) => void

#### Example

```jsx
import { useState } from 'react';
import { Textarea } from './Textarea';

export const TextareaExample = () => {
  const [value, setValue] = useState('');

  return (
    <Textarea
      header="Description"
      placeholder="Enter a description"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
```

## Feedback Components

### CircularProgress

The CircularProgress component displays a circular loading indicator.

#### API

- `size`: 'small' | 'medium' | 'large'
- `progress`: number (0-100)

#### Example

```jsx
import { CircularProgress } from './CircularProgress';

export const CircularProgressExample = () => (
  <>
    <CircularProgress size="small" progress={25} />
    <CircularProgress size="medium" progress={50} />
    <CircularProgress size="large" progress={75} />
  </>
);
```

### Progress

The Progress component displays a linear progress bar.

#### API

- `value`: number (0-100)

#### Example

```jsx
import { Progress } from './Progress';

export const ProgressExample = () => (
  <>
    <Progress value={25} />
    <Progress value={50} />
    <Progress value={75} />
  </>
);
```

### Skeleton

The Skeleton component is used as a placeholder while content is loading.

#### API

- `children`: ReactNode

#### Example

```jsx
import { Skeleton, Cell } from 'components';

export const SkeletonExample = () => (
  <Skeleton>
    <Cell subtitle="Loading...">Content loading</Cell>
  </Skeleton>
);
```

### Snackbar

The Snackbar component displays brief messages at the bottom of the screen.

#### API

- `before`: ReactNode
- `after`: ReactNode
- `description`: string
- `children`: ReactNode
- `onClose`: () => void
- `link`: ReactNode

#### Example

```jsx
import { useState } from 'react';
import { Snackbar, Button } from 'components';
import { Icon28Archive } from 'icons/28/archive';

export const SnackbarExample = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <Button onClick={() => setIsVisible(true)}>Show Snackbar</Button>
      {isVisible && (
        <Snackbar
          before={<Icon28Archive />}
          description="Message deleted"
          onClose={() => setIsVisible(false)}
          after={
            <Snackbar.Button onClick={() => console.log('Undo')}>
              Undo
            </Snackbar.Button>
          }
        >
          Action completed
        </Snackbar>
      )}
    </>
  );
};
```

### Spinner

The Spinner component is used to indicate a loading state.

#### API

- `size`: 's' | 'm' | 'l'

#### Example

```jsx
import { Spinner } from './Spinner';

export const SpinnerExample = () => (
  <>
    <Spinner size="s" />
    <Spinner size="m" />
    <Spinner size="l" />
  </>
);
```

### Spoiler

The Spoiler component is used to hide and reveal content.

#### API

- `children`: ReactNode

#### Example

```jsx
import { Spoiler, Cell } from 'components';

export const SpoilerExample = () => (
  <Spoiler>
    <Cell description="This content is initially hidden.">
      Hidden content
    </Cell>
  </Spoiler>
);
```

## Overlay Components

### Modal

The Modal component creates popup dialogs or sheets.

#### API

- `open`: boolean
- `onOpenChange`: (open: boolean) => void
- `header`: ReactNode
- `children`: ReactNode
- `trigger`: ReactNode
- `snapPoints`: number[]
- `nested`: boolean
- `fadeFromIndex`: number

Modal.Header API:
- `children`: ReactNode
- `before`: ReactNode
- `after`: ReactNode

Modal.Close API:
- `children`: ReactNode

#### Example

```jsx
import { useState } from 'react';
import { Modal, Button, Placeholder } from 'components';
import { Icon28Close } from 'icons/28/close';

export const ModalExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Modal
      open={isOpen}
      onOpenChange={setIsOpen}
      header={
        <Modal.Header after={
          <Modal.Close>
            <Icon28Close style={{ color: 'var(--tgui--plain_foreground)' }} />
          </Modal.Close>
        }>
          Modal Title
        </Modal.Header>
      }
      trigger={<Button onClick={() => setIsOpen(true)}>Open Modal</Button>}
    >
      <Placeholder
        header="Modal Content"
        description="This is the body of the modal"
        action={<Button onClick={() => setIsOpen(false)}>Close</Button>}
      />
    </Modal>
  );
};
```

### Popper

The Popper component is used for positioning dropdowns or tooltips relative to a target element.

#### API

- `targetRef`: RefObject<HTMLElement | VirtualElement>
- `children`: ReactNode
- `placement`: Placement
- `offset`: [number, number]
- `arrowProps`: CSSProperties
- `style`: CSSProperties
- `customMiddlewares`: Middleware[]

#### Example

```jsx
import { useRef, useState } from 'react';
import { Popper, Touch, Placeholder, Caption } from 'components';

export const PopperExample = () => {
  const [virtualElement, setVirtualElement] = useState(() =>
    DOMRect.fromRect({ x: -200, y: -200, width: 10, height: 10 })
  );

  const handleClick = (event) => {
    setVirtualElement(({ width, height }) =>
      DOMRect.fromRect({
        x: event.clientX,
        y: event.clientY,
        width,
        height,
      })
    );
  };

  return (
    <Touch
      style={{
        position: 'relative',
        height: '40vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClickCapture={handleClick}
    >
      <Placeholder
        header="Click anywhere in this window"
        description="A Popper will appear at the clicked location."
      />
      <Popper
        targetRef={{
          getBoundingClientRect() {
            return virtualElement;
          },
        }}
        style={{
          padding: '10px 12px',
          background: 'var(--tgui--button_color)',
          color: 'var(--tgui--white)',
        }}
      >
        <Caption level="1">Hello</Caption>
      </Popper>
    </Touch>
  );
};
```

### Tooltip

The Tooltip component displays informative text when users hover over, focus on, or tap an element.

#### API

- `children`: ReactNode
- `targetRef`: RefObject<HTMLElement>
- `mode`: 'light' | 'dark'
- `placement`: Placement
- `offset`: [number, number]
- `arrowProps`: CSSProperties
- `Component`: ElementType

#### Example

```jsx
import { useRef, useState } from 'react';
import { Tooltip, Button } from 'components';

export const TooltipExample = () => {
  const ref = useRef(null);
  const [shown, setShown] = useState(true);

  return (
    <>
      <Button ref={ref} onClick={() => setShown(!shown)}>
        {shown ? 'Hide' : 'Show'} Tooltip
      </Button>
      {shown && (
        <Tooltip targetRef={ref} mode="light">
          This is a helpful tooltip message.
        </Tooltip>
      )}
    </>
  );
};
```
