import React from 'react';
import { render, screen } from '@testing-library/react';
import ChatList from '../../components/Chat/ChatList';

describe('ChatList Component', () => {
  test('renders chat list', () => {
    const mockThreads = [
      { id: '1', bookingId: '12345', lastMessage: 'Hello', timestamp: '2026-02-02T12:00:00Z', participants: ['User1', 'User2'] },
    ];
    const mockOnSelect = jest.fn();
    render(<ChatList threads={mockThreads} activeThreadId="1" onSelect={mockOnSelect} />);
    const chatListElement = screen.getByText(/تنسيق: 12345/i);
    expect(chatListElement).toBeInTheDocument();
  });
});