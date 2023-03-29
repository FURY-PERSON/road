import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ProfileCard } from './ProfileCard';

export default {
  title: 'Entities/ProfileCard',
  component: ProfileCard,
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const WithoutProps = Template.bind({});
WithoutProps.args = {
  profile: {
    firstName: 'first name',
    lastName: 'last name',
    login: 'Admin'
  },
  readOnly: true
};

export const Error = Template.bind({});
Error.args = {
  error: 'Error'
};


export const Loading = Template.bind({});
Loading.args = {
  isLoading: true
};  

export const Editable = Template.bind({});
Editable.args = {
  profile: {
    firstName: 'first name',
    lastName: 'last name',
    login: 'Admin'
  },
  readOnly: false
};  

