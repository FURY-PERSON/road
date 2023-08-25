import { CreateNewsProps } from 'cypress/support/commands/news';
import { CreateDormProps } from 'cypress/support/commands/dorm';

import { NewsType } from '../../../src/entities/News/model/types/news';

const dormData: CreateDormProps = {
  address: 'test address',
  email: 'test@gmail.com',
  name: 'name',
  phone: '+375446378177'
};

const newsData: Omit<CreateNewsProps, 'dormId'> = {
  mainText: 'mainText',
  blocks: [],
  subTitle: 'subTitle',
  title: 'title',
  type: NewsType.WARNING
};

let newsId;
let dormId;

describe('News List', () => {
  beforeEach(() => {
    cy.visit('');
    cy.login('admin', '12345');
    cy.createDorm(dormData).then((dorm) => {
      dormId = dorm.id;

      cy.createNews({
        ...newsData,
        dormId: dorm.id
      }).then((news) => {
        newsId = news.id;
        cy.visit(`/news/${newsId}`);
      });
    });
  });

  afterEach(() => {
    cy.deleteNews(newsId);
    cy.deleteDorm(dormId);
  });

  it('should be on news details page', () => {
    cy.selectByTestId('NewsDetailsPage').should('exist');
  });

  it('should see comments list', () => {
    cy.intercept('GET', '**/news/*', { fixture: 'news.json' });

    cy.selectByTestId('NewsDetailsPage.NewsDetailsCommentList').should('exist');
  });

  it('should create comment', () => {
    cy.intercept('GET', '**/news/*', { fixture: 'news.json' });

    cy.selectByTestId('NewsDetailsPage.AddNewCommentFormAsync').should('exist');
    cy.selectByTestId('NewsDetailsPage.AddNewCommentFormAsync').scrollIntoView();
    cy.selectByTestId('AddNewCommentForm.commentInput').type('Comment');
    cy.selectByTestId('AddNewCommentForm.sendButton').click();
    cy.selectByTestId('CommentListContainer').should('have.length', 1);
  });
});
