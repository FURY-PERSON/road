import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'shared/contexts/ThemeProvider';
import { NewsPage } from './NewsPage';

export default {
  title: 'pages/NewsPage',
  component: NewsPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof NewsPage>;

const Template: ComponentStory<typeof NewsPage> = (args) => <NewsPage />;

export const Light = Template.bind({});
Light.args = {

};

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.Dark)];
Dark.args = {

};
