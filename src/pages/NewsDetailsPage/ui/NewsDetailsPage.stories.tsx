import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'shared/contexts/ThemeProvider';
import { NewsDetailsPage } from './NewsDetailsPage';

export default {
  title: 'pages/NewsDetailsPage',
  component: NewsDetailsPage,
} as ComponentMeta<typeof NewsDetailsPage>;

const Template: ComponentStory<typeof NewsDetailsPage> = (args) => <NewsDetailsPage />;

export const Light = Template.bind({});
Light.args = {

};

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.Dark)];
Dark.args = {

};
