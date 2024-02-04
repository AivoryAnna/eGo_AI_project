// @ts-ignore
import Page from '../Page/Page.svelte';

export default {
	title: 'Example/Page',
	component: Page,
};

const Template = ({...args }) => ({
	Component: Page,
	props: args,
});

export const Default = Template.bind({});

