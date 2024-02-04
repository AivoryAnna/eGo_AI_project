
import type { Meta, StoryObj } from '@storybook/svelte';
// @ts-ignore
import Input from './Input.svelte'

const meta = {
  title: 'Example/Input',
  component: Input,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<Input>;

export default meta;
type Story = StoryObj<typeof meta>;

