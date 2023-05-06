import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { newsDetailsReducer } from 'entities/News/model/slice/newsDetails.slice';
import { addCommentFormReducer } from 'features/AddNewComment/model/slice/addCommentForm.slice';
import { loginReducer } from 'features/AuthByUsername/model/slice/login.slice';
import { profileReducer } from 'features/EditableProfileCard';
import { newsDetailsCommentsReducer } from 'features/NewsDetailsCommentList/model/slice/newsDetailsComments.slice';
import { newsRecommendationListReducer } from 'features/NewsRecommendationList/model/slice/newsRecomendationList.slice';
import { registerReducer } from 'features/RegisterNewUser/model/slice/register.slice';
import { newsPageReducer } from 'pages/NewsPage/model/slice/newsPage.slice';
import { usersPageReducer } from 'pages/UsersPage/model/slice/usersPage.slice';
import { ReducersList } from 'shared/lib/helpers/DynamicModuleLoader/DynamicModuleLoader';
import { createAndEditNewsReducer } from 'widgets/CreateAndEditNews/model/slice/createAndEditNews.slice';

const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer,
  registerForm: registerReducer,
  newsDetails: newsDetailsReducer,
  newsDetailsComments: newsDetailsCommentsReducer,
  addCommentForm: addCommentFormReducer,
  newsPage: newsPageReducer,
  newsRecommendationList: newsRecommendationListReducer,
  createAndEditNews: createAndEditNewsReducer,
  usersPage: usersPageReducer
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
