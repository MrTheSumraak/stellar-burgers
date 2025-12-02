/// <reference types="cypress" />

describe('Конструктор бургеров', () => {
  beforeEach(() => {
    // Мокаем ингредиенты
    cy.fixture('ingredients.json').then((ingredients) => {
      cy.intercept('GET', 'api/ingredients', {
        statusCode: 200,
        body: ingredients
      }).as('getIngredients');
    });

    // Мокаем авторизацию (логин)
    cy.fixture('login.json').then((login) => {
      cy.intercept('POST', 'api/login', {
        statusCode: 200,
        body: login
      }).as('loginUser');
    });

    // Мокаем получение пользователя
    cy.fixture('user.json').then((user) => {
      cy.intercept('GET', 'api/auth/user', {
        statusCode: 200,
        body: user
      }).as('getUser');
    });

    // Мокаем создание заказа
    cy.fixture('order.json').then((order) => {
      cy.intercept('POST', 'api/orders', {
        statusCode: 200,
        body: order
      }).as('createOrder');
    });

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    // очищаем localStorage и куки
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('добавление булки в конструктор', () => {
    cy.get("[data-type='bun']")
      .first()
      .within(() => {
        cy.contains('Добавить').click();
      });
    cy.contains('Выберите булку').should('not.exist');
  });

  it('добавление ингридиента в конструктор', () => {
    cy.get("[data-type='main']")
      .first()
      .within(() => {
        cy.contains('Добавить').click();
      });
    cy.contains('Выберите начинку').should('not.exist');
  });

  it('открытие и закрытие модального окна булки', () => {
    // сохраняем название первой булки
    cy.get("[data-type='bun']")
      .first()
      .find('[data-class=bunName')
      .invoke('text')
      .then((bunName) => {
        // кликаем по булке
        cy.get("[data-type='bun']").first().click();

        // проверяем, что модалка открылась
        cy.get('#modals').should('exist');

        // проверяем, что в модалке отображается именно эта булка
        cy.get('#modals').contains(bunName).should('exist');

        // закрытие по крестику
        cy.get('#modals').find('button').click();
      });
  });

  it('открытие и закрытие модального окна ингридиента', () => {
    cy.get("[data-type='main']")
      .first()
      .find('[data-class=mainName')
      .invoke('text')
      .then((mainName) => {
        cy.get("[data-type='main']").first().click();

        cy.get('#modals').should('exist');

        cy.get('#modals').contains(mainName).should('exist');

        cy.get('#modals').find('button').click();
      });
  });

  it('создание заказа', () => {
    // Добавляем булку и начинку
    cy.contains('Булка').parent().find('button').click();
    cy.contains('Котлета').parent().find('button').click();

    // Кликаем "Оформить заказ"
    cy.contains('Оформить заказ').click();

    // Проверяем, что модалка открылась и номер заказа верный
    cy.wait('@createOrder');
    cy.get('#modals').should('exist');
    cy.contains('12345').should('exist');

    // Закрываем модалку
    cy.get('#modals').find('button').click();

    // Проверяем, что конструктор пуст
    cy.contains('Выберите булки').should('exist');
    cy.contains('Выберите начинку').should('exist');
  });
});
