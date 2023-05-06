import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'shared/contexts/ThemeProvider';

import { Text, TextSize, TextVariant } from './Text';

export default {
  title: 'Shared/Text',
  component: Text,
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const OnlyTitle = Template.bind({});
OnlyTitle.args = {
  title: 'Title'
};

export const OnlyText = Template.bind({});
OnlyText.args = {
  text: 'text'
};

export const TitleAndText = Template.bind({});
TitleAndText.args = {
  title: 'Title',
  text: 'Text'
};

export const OnlyTitleDark = Template.bind({});
OnlyTitleDark.decorators = [ThemeDecorator(Theme.Dark)];
OnlyTitleDark.args = {
  title: 'Title'
};

export const OnlyTextDark = Template.bind({});
OnlyTextDark.decorators = [ThemeDecorator(Theme.Dark)];
OnlyTextDark.args = {
  text: 'text'
};

export const TitleAndTextDark = Template.bind({});
TitleAndTextDark.decorators = [ThemeDecorator(Theme.Dark)];
TitleAndTextDark.args = {
  title: 'Title',
  text: 'Text'
};

export const TitleAndTextError = Template.bind({});
TitleAndTextError.args = {
  title: 'Title',
  text: 'Text',
  variant: TextVariant.ERROR
};

export const TitleAndTextErrorDark = Template.bind({});
TitleAndTextErrorDark.decorators = [ThemeDecorator(Theme.Dark)];
TitleAndTextErrorDark.args = {
  title: 'Title',
  text: 'Text',
  variant: TextVariant.ERROR
};


export const SizeM = Template.bind({});
SizeM.args = {
  title: 'Title',
  text: 'Text',
  size: TextSize.M
}

export const SizeL = Template.bind({});
SizeL.args = {
  title: 'Title',
  text: 'Text',
  size: TextSize.L
};

export const SizeXL = Template.bind({});
SizeXL.args = {
  title: 'Title',
  text: 'Text',
  size: TextSize.XL
};