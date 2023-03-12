import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button, ButtonSize, ButtonVariant } from './Button';

export default {
  title: 'Shared/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'children',
};

export const Clear = Template.bind({});
Clear.args = {
  children: 'children',
  variant: ButtonVariant.CLEAR,
};

export const Outline = Template.bind({});
Outline.args = {
  children: 'children',
  variant: ButtonVariant.OUTLINE,
};

export const Background = Template.bind({});
Background.args = {
  children: 'children',
  variant: ButtonVariant.BACKGROUND,
};

export const BackgroundInverted = Template.bind({});
BackgroundInverted.args = {
  children: 'children',
  variant: ButtonVariant.BACKGROUND_INVERTED,
};

export const Square = Template.bind({});
Square.args = {
  children: '>',
  variant: ButtonVariant.BACKGROUND_INVERTED,
  square: true,
};

export const SquareSmall = Template.bind({});
SquareSmall.args = {
  children: '>',
  square: true,
  variant: ButtonVariant.BACKGROUND_INVERTED,
  size: ButtonSize.SMALL,
};

export const SquareMedium = Template.bind({});
SquareMedium.args = {
  children: '>',
  square: true,
  variant: ButtonVariant.BACKGROUND_INVERTED,
  size: ButtonSize.MEDIUM,
};

export const SquareLarge = Template.bind({});
SquareLarge.args = {
  children: '>',
  square: true,
  variant: ButtonVariant.BACKGROUND_INVERTED,
  size: ButtonSize.LARGE,
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: 'children',
  disabled: true
};
