import { News, NewsList, NewsListVariant } from 'entities/News';
import { useTranslation } from 'react-i18next';
import styles from './NewsPage.module.scss';

const news = new Array(16).fill(0).map(() => ({
  id: 'b4cbe2ad-ae76-437c-89e3-a94a03c8b274',
  title: 'Title test',
  subTitle: 'Sub title test',
  mainText: 'main text 123 main text 123. main text 123  main text 123  main text 123  main text 123  main text 123 . main text 123  main text 123 main text 123 main text 123 main text 123 . ',
  imageName: '4498e491-b103-43b2-8a66-2cea4c8acfe1.jpg',
  imageUrl: 'http://localhost:3005/40ab9b38-4c93-4412-b132-0da062de53ab.jpg',
  createdAt: '2023-04-04T09:31:30.966Z',
  type: 'warning',
  author: {
    id: '070bf09e-5410-4b13-aa52-e195d05cacf7', firstName: 'MIkhail', lastName: 'dtg', phone: '+375442332333', login: 'admin', email: 'admin@gmail.com', 
  },
  blocks: [{
    id: 'b1e14392-2d39-4525-b70f-0699df5e6d6f', type: 'NewsTextBlock', paragraphs: ['Новость о карасике) Новость о карасике) Новость о карасике) Новость о карасике)', 'Он очень клевый) Он очень клевый) Он очень клевый) Он очень клевый)'], title: 'Карасик)', 
  }, {
    id: '80646175-30d9-4004-9ef8-7126bd275b6f', type: 'NewsImageBlock', src: 'http://localhost:3005/40ab9b38-4c93-4412-b132-0da062de53ab.jpg', title: 'это тот самый карасик', 
  }, { id: '8ed9a84d-c855-42dc-adad-c4e014cd3a42', type: 'NewsCodeBlock', code: 'var block = [\n    {type: "text", title: "Карасик)", paragraphs: [\n        \'Новость о карасике) Новость о карасике) Новость о карасике) Новость о карасике)\', \n        \'Он очень клевый) Он очень клевый) Он очень клевый) Он очень клевый)\'\n    ]},\n    {type: \'image\', src: "http://localhost:3005/40ab9b38-4c93-4412-b132-0da062de53ab.jpg", title: "это тот самый карасик"},\n        {type: "text", title: "Карасик)", paragraphs: [\n        \'Новость о карасике) Новость о карасике) Новость о карасике) Новость о карасике)\', \n        \'Он очень клевый) Он очень клевый) Он очень клевый) Он очень клевый)\'\n    ]},\n    {type: \'code\'}\n]' }, {
    id: '8738e75a-73e9-4668-bd92-b1868ecfbfe1', type: 'NewsTextBlock', paragraphs: ['Новость о карасике) Новость о карасике) Новость о карасике) Новость о карасике)', 'Он очень клевый) Он очень клевый) Он очень клевый) Он очень клевый)'], title: 'Карасик)', 
  }], 
}));

export const NewsPage = () => {
  const { t } = useTranslation('news');

  return (
    <div className={styles.main}>
      <NewsList variant={NewsListVariant.BLOCK} news={news as News[]} />
    </div>
  );
};
