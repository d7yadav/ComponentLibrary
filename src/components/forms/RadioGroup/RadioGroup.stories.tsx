import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { RadioGroup } from '@/components/forms/RadioGroup';

/**
 * Storybook stories for the RadioGroup component.
 * Demonstrates usage for exclusive selection among radio buttons.
 * @author dilip.yadav@shorelineiot.com
 */
const meta: Meta<typeof RadioGroup> = {
  title: 'Forms/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Internal RadioGroup wrapper for accessible, theme-consistent grouping of radio buttons.'
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Basic: Story = {
  render: (args) => {
    const [value, setValue] = useState('option1');
    return (
      <RadioGroup data-testid="radiogroup.stories" name="basic" value={value} onChange={(_, v) => setValue(v)} {...args}>
        <label>
          <input type="radio" name="basic" value="option1" checked={value === 'option1'} onChange={() => setValue('option1')} />
          Option 1
        </label>
        <label>
          <input type="radio" name="basic" value="option2" checked={value === 'option2'} onChange={() => setValue('option2')} />
          Option 2
        </label>
      </RadioGroup>
    );
  },
};

export const WithDefaultValue: Story = {
  render: (args) => {
    const [value, setValue] = useState('option2');
    return (
      <RadioGroup data-testid="radiogroup.stories" name="default" value={value} onChange={(_, v) => setValue(v)} {...args}>
        <label>
          <input type="radio" name="default" value="option1" checked={value === 'option1'} onChange={() => setValue('option1')} />
          Option 1
        </label>
        <label>
          <input type="radio" name="default" value="option2" checked={value === 'option2'} onChange={() => setValue('option2')} />
          Option 2
        </label>
      </RadioGroup>
    );
  },
};

export const Disabled: Story = {
  render: (args) => {
    const [value, setValue] = useState('option1');
    return (
      <RadioGroup data-testid="radiogroup.stories" name="disabled" value={value} onChange={(_, v) => setValue(v)} {...args}>
        <label>
          <input type="radio" name="disabled" value="option1" checked={value === 'option1'} onChange={() => setValue('option1')} disabled />
          Option 1
        </label>
        <label>
          <input type="radio" name="disabled" value="option2" checked={value === 'option2'} onChange={() => setValue('option2')} disabled />
          Option 2
        </label>
      </RadioGroup>
    );
  },
};

export const Horizontal: Story = {
  render: (args) => {
    const [value, setValue] = useState('option1');
    return (
      <RadioGroup data-testid="radiogroup.stories" name="horizontal" value={value} onChange={(_, v) => setValue(v)} style={{ flexDirection: 'row', gap: 16 }} {...args}>
        <label>
          <input type="radio" name="horizontal" value="option1" checked={value === 'option1'} onChange={() => setValue('option1')} />
          Option 1
        </label>
        <label>
          <input type="radio" name="horizontal" value="option2" checked={value === 'option2'} onChange={() => setValue('option2')} />
          Option 2
        </label>
      </RadioGroup>
    );
  },
}; 