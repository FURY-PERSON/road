import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PermissionName } from '@/entities/Permission';
import { RoleName } from '@/entities/Role';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { Navbar } from './Navbar';

export default {
  title: 'widget/Navbar',
  component: Navbar,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />;

export const LoggedOut = Template.bind({});
LoggedOut.args = {};

export const LoggedIn = Template.bind({});
LoggedIn.decorators = [
  StoreDecorator({
    user: {
      authData: {
        accessToken: 'sdfsf',
        refreshToken: 'sdfdsf'
      },
      userData: {
        login: 'admin',
        id: '23',
        firstName: 'first',
        lastName: 'last',
        permissions: [
          {
            description: 'desc',
            id: '123',
            name: PermissionName.ADMIN
          }
        ],
        role: {
          description: 'desc',
          name: RoleName.STUDENT
        }
      }
    }
  })
];
LoggedIn.args = {};
