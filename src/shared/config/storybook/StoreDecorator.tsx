import { DeepPartial, ReducersMapObject } from '@reduxjs/toolkit';
import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { profileReducer } from 'entities/Profile';
import { loginReducer } from 'features/AuthByUsername/model/slice/login.slice';

const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
  loginForm: loginReducer,
  profile: profileReducer
};

export const StoreDecorator = (
  initialState?: DeepPartial<StateSchema>, 
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>,
) => (Story: Story) => {
  const typedDefaultAsyncReducers = defaultAsyncReducers as ReducersMapObject<StateSchema>;
  const typedAsyncReducers = asyncReducers as ReducersMapObject<StateSchema>;

  return (
    <StoreProvider 
      initialState={initialState as StateSchema} 
      asyncReducers={{ ...typedDefaultAsyncReducers, ...typedAsyncReducers }}
    >
      <Story />
    </StoreProvider>
  );
};
