import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { ProfileValidationError } from '../../model/types/editableProfileCard';

import { EditableProfileCard } from './EditableProfileCard';

export default {
  title: 'features/EditableProfileCard',
  component: EditableProfileCard,
} as ComponentMeta<typeof EditableProfileCard>;

const Template: ComponentStory<typeof EditableProfileCard> = (args) => <EditableProfileCard {...args} />;

export const WithoutProps = Template.bind({});
WithoutProps.decorators = [StoreDecorator({
  profile: {

  }
})];
WithoutProps.args = {

};

export const Default = Template.bind({});
Default.decorators = [StoreDecorator({
  profile: {
    form: {
      firstName: 'first form',
      lastName: 'last form',
      login: 'login form'
    },
    data: {
      firstName: 'first data',
      lastName: 'last data',
      login: 'login data'
    }
  }
})];
Default.args = {

};

export const Loading = Template.bind({});
Loading.decorators = [StoreDecorator({
  profile: {
    isLoading: true
  }
})];
Loading.args = {

};

export const Error = Template.bind({});
Error.decorators = [StoreDecorator({
  profile: {
    error: 'error'
  }
})];
Error.args = {

};

export const ValidationError = Template.bind({});
ValidationError.decorators = [StoreDecorator({
  profile: {
    validationErrors: [ProfileValidationError.NO_DATA]
  }
})];
ValidationError.args = {

};

