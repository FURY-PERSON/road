/* eslint-disable @typescript-eslint/no-namespace */

import { Dorm } from '@/entities/Dorm';

export const deleteDorm = (dormId: string) => {
  cy.request({
    method: 'DELETE',
    url: `http://localhost:3005/api/dorm/${dormId}`
  }).then(({ body }) => body);
};

export interface CreateDormProps {
  name: string;
  address: string;
  phone: string;
  email: string;
}

export const createDorm = (dorm: CreateDormProps) => {
  const formData = new FormData();

  if (dorm.name) formData.append('name', dorm.name);
  if (dorm.address) formData.append('address', dorm.address);
  if (dorm.phone) formData.append('phone', dorm.phone);
  if (dorm.email) formData.append('email', dorm.email);

  cy.request({
    method: 'POST',
    url: 'http://localhost:3005/api/dorm',
    form: false,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    body: formData
  }).then(({ body }) => {
    const dec = new TextDecoder();

    return JSON.parse(dec.decode(body));
  });
};

declare global {
  namespace Cypress {
    interface Chainable {
      createDorm(news: CreateDormProps): Chainable<Dorm>;
      deleteDorm(dormId: string): Chainable<void>;
    }
  }
}
