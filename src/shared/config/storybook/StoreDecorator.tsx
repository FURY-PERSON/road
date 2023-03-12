import { DeepPartial } from '@reduxjs/toolkit';
import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';

export const StoreDecorator = (initialState?: DeepPartial<StateSchema>) => (Story: Story) => (
  <StoreProvider initialState={initialState as StateSchema}>
    <Story />
  </StoreProvider>
);
