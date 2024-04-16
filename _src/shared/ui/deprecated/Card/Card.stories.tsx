import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Card } from './Card';

export default {
  title: 'Shared/Card',
  component: Card
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <div>Hi</div>
};
