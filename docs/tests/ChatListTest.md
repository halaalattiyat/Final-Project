# ChatList Test

```tsx
import { render, screen } from '@testing-library/react';
import ChatList from '../../components/Chat/ChatList';

describe('ChatList Component', () => {
  test('renders chat list', () => {
    render(<ChatList />);
    const chatListElement = screen.getByText(/chat list/i);
    expect(chatListElement).toBeInTheDocument();
  });
});
```