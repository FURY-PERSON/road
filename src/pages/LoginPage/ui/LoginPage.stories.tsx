import { ComponentStory, ComponentMeta } from '@storybook/react';
import { LoginPage } from './LoginPage';

export default {
  title: 'pages/LoginPage',
  component: LoginPage,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof LoginPage>;

const Template: ComponentStory<typeof LoginPage> = (args) => <LoginPage {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
