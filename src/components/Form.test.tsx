import { composeStory } from '@storybook/react';
import { userEvent } from '@storybook/test';
import { render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest';

import Meta, * as Stories from './Form.stories';

// MSWサーバーのセットアップ
const server = setupServer();
beforeAll(() => server.listen());
afterAll(() => server.close());

describe('Form', () => {
  test.concurrent(
    'submits form data correctly',
    server.boundary(async () => {
      // APIモック
      server.use(...Stories.mockHandler);

      // Arrange
      const expectedSelectedValue = 'option-1';
      const submitHandler = vi.fn();
      const Form = composeStory(Stories.Default, Meta);
      render(<Form onSubmit={submitHandler} />);

      // オプションが読み込まれるのを待つ
      await waitFor(() => {
        expect(screen.getAllByRole('option')).toHaveLength(3);
      });

      // Act
      const comboBox = screen.getByRole('combobox');
      await userEvent.selectOptions(comboBox, expectedSelectedValue);
      await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

      // Assert
      expect(submitHandler).toHaveBeenCalledWith({
        option: expectedSelectedValue,
      });
    })
  );
});
