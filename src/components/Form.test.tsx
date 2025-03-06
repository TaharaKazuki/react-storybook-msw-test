import { composeStory } from '@storybook/react';
import { userEvent } from '@storybook/test';
import { render, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest';

import Meta, * as Stories from './Form.stories';

// MSWサーバーのセットアップ
const server = setupServer();
beforeAll(() => server.listen());
afterAll(() => server.close());

// モックデータ
const mockOptions = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
  { label: 'Option 3', value: 'option-3' },
];

describe('Form', () => {
  test.concurrent(
    'submits form data correctly',
    server.boundary(async () => {
      // APIモック
      server.use(
        http.get('/api/options', () => {
          return HttpResponse.json({ options: mockOptions });
        })
      );

      // Arrange
      const submitHandler = vi.fn();
      const Form = composeStory(Stories.Default, Meta);
      render(<Form onSubmit={submitHandler} />);

      // オプションが読み込まれるのを待つ
      await waitFor(() => {
        expect(screen.getAllByRole('option')).toHaveLength(mockOptions.length);
      });

      // Act
      await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

      // Assert
      expect(submitHandler).toHaveBeenCalledWith({ option: 'option-1' });
    })
  );
});
