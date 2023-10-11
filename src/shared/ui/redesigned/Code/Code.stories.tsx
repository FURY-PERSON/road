import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Code } from './Code';

export default {
  title: 'Shared/Code',
  component: Code
} as ComponentMeta<typeof Code>;

const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: `import { ComponentStory, ComponentMeta } from '@storybook/react';

  import { Code } from './Code';
  
  export default {
    title: 'Shared/Code',
    component: Code,
  } as ComponentMeta<typeof Code>;
  
  const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;
  
  export const Default = Template.bind({});
  Default.args = {
    children: ''
  };
  `
};
