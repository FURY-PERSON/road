import { ComponentStory, ComponentMeta } from '@storybook/react';
import { RegisterPage } from './RegisterPage';

export default {
  title: 'pages/RegisterPage',
  component: RegisterPage
} as ComponentMeta<typeof RegisterPage>;

const Template: ComponentStory<typeof RegisterPage> = (args) => <RegisterPage {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
