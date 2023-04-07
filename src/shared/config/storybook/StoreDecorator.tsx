import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { newsDetailsReducer } from 'entities/News/model/slice/newsDetails.slice';
import { loginReducer } from 'features/AuthByUsername/model/slice/login.slice';
import { profileReducer } from 'features/EditableProfileCard';
import { newsDetailsCommentsReducer } from 'features/NewsDetailsCommentList/model/slice/newsDetailsComments.slice';
import { registerReducer } from 'features/RegisterNewUser/model/slice/register.slice';
import { ReducersList } from 'shared/lib/helpers/DynamicModuleLoader/DynamicModuleLoader';

const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer,
  registerForm: registerReducer,
  newsDetails: newsDetailsReducer,
  newsDetailsComments: newsDetailsCommentsReducer
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
