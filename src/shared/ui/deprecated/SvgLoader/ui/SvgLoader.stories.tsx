import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SvgLoader, SvgLoaderType } from './SvgLoader';

export default {
  title: 'shared/SvgLoader',
  component: SvgLoader,
  argTypes: {
    backgroundColor: { control: 'color' }
  },
  parameters: {
    loki: { skip: true }
  }
} as ComponentMeta<typeof SvgLoader>;

const Template: ComponentStory<typeof SvgLoader> = (args) => <SvgLoader {...args} />;

export const CAT_BLUE = Template.bind({});
CAT_BLUE.args = {
  type: SvgLoaderType.CAT_BLUE
};
