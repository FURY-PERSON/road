import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import { RegisterForm } from './RegisterForm';
import {ValidationError} from "../../model/types/error";
import { Role } from 'entities/Role';

export default {
   title: 'features/RegisterForm',
   component: RegisterForm,
   argTypes: {
      backgroundColor: { control: 'color' },
   },
} as ComponentMeta<typeof RegisterForm>;

const Template: ComponentStory<typeof RegisterForm> = (args) => <RegisterForm { ...args } />;

export const WithoutState = Template.bind({});
WithoutState.args = {

};


export const Normal = Template.bind({});
Normal.decorators = [StoreDecorator({
   registerForm: {
      form: {
         confirmPassword: '12345',
         email: 'email@gmail.com',
         firstName: 'first',
         lastName: 'last',
         login: 'admin',
         password: '12345',
         phone: '+37533455644',
         role: Role.ADMIN
      }
   }
})];
Normal.args = {

};

export const Loading = Template.bind({});
Loading.decorators = [StoreDecorator({
   registerForm: {
      isLoading: true
   }
})];
Loading.args = {

};

export const Error = Template.bind({});
Error.decorators = [StoreDecorator({
   registerForm: {
      error: 'Error text'
   }
})];
Error.args = {

};

export const WithValidationError = Template.bind({});
WithValidationError.decorators = [StoreDecorator({
   registerForm: {
      validationError: [ValidationError.NO_DATA, ValidationError.SERVER_ERROR]
   }
})];
WithValidationError.args = {

};
