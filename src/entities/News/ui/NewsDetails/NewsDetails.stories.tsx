import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NewsBlockType, NewsType } from 'entities/News/model/types/news';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';

import { NewsDetailsContainer as NewsDetails } from './NewsDetails.container';
import MewsImg from "shared/assets/tests/newsImage.jpeg"

const blocks = [
  {type: NewsBlockType.TEXT, title: "Карасик)", paragraphs: [
      'Новость о карасике) Новость о карасике) Новость о карасике) Новость о карасике)', 
      'Он очень клевый) Он очень клевый) Он очень клевый) Он очень клевый)'
  ]},
  {type: NewsBlockType.IMAGE, src: MewsImg, title: "это тот самый карасик"},
      {type: NewsBlockType.TEXT, title: "Карасик)", paragraphs: [
      'Новость о карасике) Новость о карасике) Новость о карасике) Новость о карасике)', 
      'Он очень клевый) Он очень клевый) Он очень клевый) Он очень клевый)'
  ]},
  {type: NewsBlockType.CODE, code: `var block = [
  {type: "text", title: "Карасик)", paragraphs: [
      'Новость о карасике) Новость о карасике) Новость о карасике) Новость о карасике)', 
      'Он очень клевый) Он очень клевый) Он очень клевый) Он очень клевый)'
  ]},
  {type: 'image', src: ${MewsImg}, title: "это тот самый карасик"},
      {type: "text", title: "Карасик)", paragraphs: [
      'Новость о карасике) Новость о карасике) Новость о карасике) Новость о карасике)', 
      'Он очень клевый) Он очень клевый) Он очень клевый) Он очень клевый)'
  ]},
  {type: 'code'}
]`}
]

export default {
  title: 'entities/NewsDetails',
  component: NewsDetails,
  args: {
    id: 'b4cbe2ad-ae76-437c-89e3-a94a03c8b274'
  }
} as ComponentMeta<typeof NewsDetails>;

const Template: ComponentStory<typeof NewsDetails> = (args) => <NewsDetails {...args} />;

export const Default = Template.bind({});
Default.decorators = [StoreDecorator({
  newsDetails: {
    data: {
      blocks: blocks,
      imageUrl: MewsImg,
      createdAt: '2023-04-04T09:31:30.966Z',
      mainText: 'main text',
      title: "title",
      type: NewsType.WARNING,
      subTitle: 'sub title',
      author: {
        email: 'sdf@gmnail.com',
        firstName: 'first name',
        lastName: 'last name',
        login: 'admin',
        phone: '+375443423455'
      }
    }
  }
})]
Default.args = {
  
};

export const Loading = Template.bind({});
Loading.decorators = [StoreDecorator({
  newsDetails: {
    isLoading: true
  }
})]
Loading.args = {
  
};

export const Error = Template.bind({});
Error.decorators = [StoreDecorator({
  newsDetails: {
    error: 'Error text'
  }
})]
Error.args = {
  
};

