import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';

import { LoginForm } from './LoginForm';

export default {
  title: 'features/LoginForm',
  component: LoginForm,
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = (args) => <LoginForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  
};

export const Error = Template.bind({});
Error.decorators =  [StoreDecorator({
  loginForm: {
    error: 'error'
  }
})];
Error.args = {
  
};


export const Pending = Template.bind({});
Pending.decorators =  [StoreDecorator({
  loginForm: {
    isLoading: true
  }
})];
Pending.args = {
  
};

