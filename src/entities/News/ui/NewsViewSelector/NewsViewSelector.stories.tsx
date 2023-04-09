import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { NewsViewSelector } from './NewsViewSelector';

export default {
    title: 'entities/ArticleViewSelector',
    component: NewsViewSelector,
} as ComponentMeta<typeof NewsViewSelector>;

const Template: ComponentStory<typeof NewsViewSelector> = (args) => <NewsViewSelector {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
