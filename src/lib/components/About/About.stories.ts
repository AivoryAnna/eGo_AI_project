// @ts-ignore
import About from './About.svelte';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/About',
  component: About,
  argTypes: {
    continue: { action: 'continue' },
  },
};

const Template = ({ ...args }) => ({
  Component: About,
  props: args,
});

export const Default = Template.bind({});

