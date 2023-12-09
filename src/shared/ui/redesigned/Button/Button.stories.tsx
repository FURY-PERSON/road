import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from './Button';

export default {
  title: 'Shared/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'children'
};

export const Clear = Template.bind({});
Clear.args = {
  children: 'children',
  variant: 'clear'
};

export const Outline = Template.bind({});
Outline.args = {
  children: 'children',
  variant: 'outline'
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: 'children',
  disabled: true
};
