import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { FormLabel } from '@/components/forms/FormLabel';

/**
 * Storybook stories for the FormLabel component.
 * Demonstrates usage for accessible labeling of form fields.
 * @author dilip.yadav@shorelineiot.com
 */
const meta: Meta<typeof FormLabel> = {
  title: 'Forms/FormLabel',
  component: FormLabel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Internal FormLabel wrapper for accessible, theme-consistent labeling of form fields.'
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormLabel>;

export const Basic: Story = {
  render: (args) => (
    <FormLabel htmlFor="input-basic" {...args}>
      Basic Label
    </FormLabel>
  ),
};

export const Required: Story = {
  render: (args) => (
    <FormLabel htmlFor="input-required" {...args}>
      Required Label <span style={{ color: 'red' }}>*</span>
    </FormLabel>
  ),
};

export const WithDescription: Story = {
  render: (args) => (
    <div>
      <FormLabel htmlFor="input-desc" {...args}>
        Label with Description
      </FormLabel>
      <div style={{ fontSize: 12, color: '#666' }}>This label describes the input below.</div>
    </div>
  ),
};

export const CustomStyle: Story = {
  render: (args) => (
    <FormLabel htmlFor="input-custom" style={{ color: 'purple', fontWeight: 700 }} {...args}>
      Custom Styled Label
    </FormLabel>
  ),
}; 