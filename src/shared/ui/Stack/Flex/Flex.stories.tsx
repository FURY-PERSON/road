import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Flex } from './Flex';

const children = <>
  <div style={{width: 50, height: 50, background: '#E7ECFF'}}></div>
  <div style={{width: 50, height: 50, background: '#FFFADD'}}></div>
  <div style={{width: 50, height: 50, background: '#DEF7FE'}}></div>
</>

export default {
  title: 'Shared/Flex',
  component: Flex,
  argTypes: {
    align: {
      control: {type: 'radio'},
      options: ['start', 'center', 'end'] 
    },
    justify: {
      control: {type: 'radio'},
      options: ['start', 'center', 'end', 'between', 'around'] 
    },
    direction: {
      control: {type: 'radio'},
      options: ['row', 'column', 'row-reverse', 'column-reverse'] 
    },
    gap: {
      control: {type: 'radio'},
      options: [4, 8 ,16, 32] 
    },
  }
} as ComponentMeta<typeof Flex>;

const Template: ComponentStory<typeof Flex> = (args) => <Flex {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: children,
};

export const JustifyStart = Template.bind({});
JustifyStart.args = {
  children: children,
  justify: 'start'
};

export const JustifyCenter = Template.bind({});
JustifyCenter.args = {
  children: children,
  justify: 'center'
};

export const JustifyEnd = Template.bind({});
JustifyEnd.args = {
  children: children,
  justify: 'end'
};

export const JustifyBetween = Template.bind({});
JustifyBetween.args = {
  children: children,
  justify: 'between'
};

export const JustifyAround = Template.bind({});
JustifyAround.args = {
  children: children,
  justify: 'around'
};

export const AlignStart = Template.bind({});
AlignStart.args = {
  children: children,
  align: 'start'
};

export const AlignCenter = Template.bind({});
AlignCenter.args = {
  children: children,
  align: 'center'
};

export const AlignEnd = Template.bind({});
AlignEnd.args = {
  children: children,
  align: 'end'
};

export const DirectionRow = Template.bind({});
DirectionRow.args = {
  children: children,
  direction: 'row'
};

export const DirectionColumn = Template.bind({});
DirectionColumn.args = {
  children: children,
  direction: 'column'
};

export const DirectionRowReverse = Template.bind({});
DirectionRowReverse.args = {
  children: children,
  direction: 'row-reverse'
};

export const DirectionColumnReverse = Template.bind({});
DirectionColumnReverse.args = {
  children: children,
  direction: 'column-reverse'
};

export const Gap4 = Template.bind({});
Gap4.args = {
  children: children,
  gap: 4
};

export const Gap8 = Template.bind({});
Gap8.args = {
  children: children,
  gap: 8
};

export const Gap16 = Template.bind({});
Gap16.args = {
  children: children,
  gap: 16
};

export const Gap32 = Template.bind({});
Gap32.args = {
  children: children,
  gap: 32
};
