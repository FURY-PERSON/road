import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NewsBlockType, NewsType } from 'entities/News/model/types/news';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import { NewsDetailsPage } from './NewsDetailsPage';
import MewsImg from "shared/assets/tests/newsImage.jpeg"
import { AppRoutes, RoutePath } from 'shared/config/routeConfig/routeConfig';

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
  title: 'pages/NewsDetailsPage',
  component: NewsDetailsPage,
  parameters: {
    id: 'b4cbe2ad-ae76-437c-89e3-a94a03c8b274'
  }
} as ComponentMeta<typeof NewsDetailsPage>;

const Template: ComponentStory<typeof NewsDetailsPage> = (args) => <NewsDetailsPage />;

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

