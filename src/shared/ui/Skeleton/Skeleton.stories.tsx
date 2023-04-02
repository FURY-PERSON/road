import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Skeleton } from './Skeleton';

export default {
  title: 'Shared/Skeleton',
  component: Skeleton,
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args) => <Skeleton {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  width: 200,
  height: 50
};

export const Circle = Template.bind({});
Circle.args = {
  borderRadius: '50%',
  width: 50,
  height: 50
};

