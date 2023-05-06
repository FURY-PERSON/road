import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';

import { AddNewCommentForm } from './AddNewCommentForm';

export default {
  title: 'features/AddNewCommentForm',
  component: AddNewCommentForm,
} as ComponentMeta<typeof AddNewCommentForm>;

const Template: ComponentStory<typeof AddNewCommentForm> = (args) => <AddNewCommentForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  
};

