import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';

import { Form } from './Form';

const meta: Meta<typeof Form> = {
  component: Form,
  parameters: {
    msw: {
      handlers: [
        http.get('/api/options', () => {
          return HttpResponse.json({
            options: [
              {
                label: 'Option 1',
                value: 'option-1',
              },
              {
                label: 'Option 2',
                value: 'option-2',
              },
              {
                label: 'Option 3',
                value: 'option-3',
              },
            ],
          });
        }),
      ],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Form>;

export const Default: Story = {};
