import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ForbiddenView } from './ForbiddenView';

export default {
  title: 'shared/ForbiddenView',
  component: ForbiddenView
} as ComponentMeta<typeof ForbiddenView>;

const Template: ComponentStory<typeof ForbiddenView> = (args) => <ForbiddenView {...args} />;

export const Default = Template.bind({});
Default.args = {};
