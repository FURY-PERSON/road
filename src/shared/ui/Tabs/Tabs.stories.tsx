import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Tabs } from './Tabs';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Shared/Tabs',
  component: Tabs
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const Default = Template.bind({});
Default.args = {
  tabs: [
    { value: '1', content: 'tab 1' },
    { value: '2', content: 'tab 2' },
    { value: '3', content: 'tab 3' }
  ],
  value: '2',
  onTabClick: action('onTabClick')
};
