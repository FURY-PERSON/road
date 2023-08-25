import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Avatar } from './Avatar';
import AvatarImg from '@/shared/assets/tests/storybook.jpg';

export default {
  title: 'Shared/Avatar',
  component: Avatar,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: AvatarImg
};

export const WithSize = Template.bind({});
WithSize.args = {
  src: AvatarImg,
  size: 100
};
