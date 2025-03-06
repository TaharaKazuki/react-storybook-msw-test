import { composeStory } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import Meta, * as Stories from './Form.stories';

describe('Form', () => {
  test.concurrent('should submit correct data', async () => {
    // Arrange
    const submitHandler = vi.fn();

    const Form = composeStory(Stories.Default, Meta);
    render(<Form onSubmit={submitHandler} />);

    const submitButton = screen.getByRole('button', { name: 'Submit' });

    //Act
    await userEvent.click(submitButton);

    //Assert
    expect(submitHandler).toHaveBeenCalledWith({ option: 'option-3' });
  });
});
