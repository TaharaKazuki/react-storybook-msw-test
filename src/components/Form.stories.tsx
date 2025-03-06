import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';

import { Form } from './Form';

export const mockHandler = [
  http.get('/api/options', () => {
    return HttpResponse.json({
      options: [
        { label: 'Option 1', value: 'option-1' },
        { label: 'Option 2', value: 'option-2' },
        { label: 'Option 3', value: 'option-3' },
      ],
    });
  }),
];

const meta = {
  title: 'Components/Form',
  component: Form,
  parameters: {
    msw: {
      handlers: mockHandler,
    },
  },
  excludeStories: ['mockHandler'],
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: (data) => console.log(data),
  },
};
