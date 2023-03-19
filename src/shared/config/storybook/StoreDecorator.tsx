import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { profileReducer } from 'entities/Profile';
import { loginReducer } from 'features/AuthByUsername/model/slice/login.slice';
import { ReducersList } from 'shared/lib/helpers/DynamicModuleLoader/DynamicModuleLoader';

const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer,
};

export const StoreDecorator = (
  initialState?: DeepPartial<StateSchema>, 
  asyncReducers?: ReducersList,
) => (Story: Story) => {
  const typedDefaultAsyncReducers = defaultAsyncReducers;
  const typedAsyncReducers = asyncReducers;

  return (
    <StoreProvider 
      initialState={initialState as StateSchema} 
      asyncReducers={{ ...typedDefaultAsyncReducers, ...typedAsyncReducers }}
    >
      <Story />
    </StoreProvider>
  );
};
