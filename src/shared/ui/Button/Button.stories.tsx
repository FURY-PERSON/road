import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button, ThemeVariant } from './Button';

export default {
  title: 'Shared/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'children',
};

export const Clear = Template.bind({});
Clear.args = {
  children: 'children',
  variant: ThemeVariant.CLEAR,
};

export const Outline = Template.bind({});
Outline.args = {
  children: 'children',
  variant: ThemeVariant.OUTLINE,
};
