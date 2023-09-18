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

export const Background = Template.bind({});
Background.args = {
  children: 'children',
  variant: 'background'
};

export const BackgroundInverted = Template.bind({});
BackgroundInverted.args = {
  children: 'children',
  variant: 'backgroundInverted'
};

export const Square = Template.bind({});
Square.args = {
  children: '>',
  variant: 'backgroundInverted',
  square: true
};

export const SquareSmall = Template.bind({});
SquareSmall.args = {
  children: '>',
  square: true,
  variant: 'backgroundInverted',
  size: 'small'
};

export const SquareMedium = Template.bind({});
SquareMedium.args = {
  children: '>',
  square: true,
  variant: 'backgroundInverted',
  size: 'medium'
};

export const SquareLarge = Template.bind({});
SquareLarge.args = {
  children: '>',
  square: true,
  variant: 'backgroundInverted',
  size: 'large'
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: 'children',
  disabled: true
};
