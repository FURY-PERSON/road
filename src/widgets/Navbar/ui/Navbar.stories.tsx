import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import { Navbar } from './Navbar';

export default {
  title: 'widget/Navbar',
  component: Navbar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />;

export const LoggedOut = Template.bind({});
LoggedOut.args = {

};

export const LoggedIn = Template.bind({});
LoggedIn.decorators = [StoreDecorator({
  user: {
    authData: {
      id: '1',
      login: '23'
    }
  }
})]
LoggedIn.args = {

};
