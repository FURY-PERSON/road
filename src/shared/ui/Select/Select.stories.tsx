import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Select } from './Select';

export default {
  title: 'Shared/Select',
  component: Select,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: 'label'
};

export const WithOptions = Template.bind({});
WithLabel.args = {
  options: [
    {value: 'val1', content: 'cont1'},
    {value: 'val2', content: 'cont2'},
    {value: 'val3', content: 'cont3'},
    {value: 'val4', content: 'cont4'},
  ]
};
