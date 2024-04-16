import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/contexts/ThemeProvider';
import { AppLink } from './AppLink';

export default {
  title: 'shared/AppLink',
  component: AppLink,
  argTypes: {
    backgroundColor: { control: 'color' }
  },
  args: {
    to: '/'
  }
} as ComponentMeta<typeof AppLink>;

const Template: ComponentStory<typeof AppLink> = (args) => <AppLink {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  children: 'Primary'
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  children: 'Secondary'
};

export const Red = Template.bind({});
Red.args = {
  variant: 'red',
  children: 'Red'
};

export const PrimaryDark = Template.bind({});
PrimaryDark.decorators = [ThemeDecorator(Theme.Dark)];
PrimaryDark.args = {
  variant: 'primary',
  children: 'Primary'
};

export const SecondaryDark = Template.bind({});
SecondaryDark.decorators = [ThemeDecorator(Theme.Dark)];
SecondaryDark.args = {
  variant: 'secondary',
  children: 'Secondary'
};
