/// <reference types="cypress" />

let Chance = require('chance');
let chance = new Chance();


context('Cadastro', () => {
    it('Cadastro de usuário no site', () => {
        //rotas
        //POST 200 /api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
        //POST 200 /api/1/databases/userdetails/collections/usertable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
        //GET 200 /api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
        cy.server()
        cy.route('POST','**/api/1/databases/userdetails/collections/newtable?**' ).as('postNewTable')
        cy.route('POST','**/api/1/databases/userdetails/collections/usertable?**' ).as('postUserTable')
        cy.route('GET','**/api/1/databases/userdetails/collections/newtable?**' ).as('getNewTable');
        cy.visit('Register.html');

        cy.get('input[placeholder="First Name"]').type(chance.first())
        //outro exemplo seria chance.name().split("")[1] -> "João Maria"
        cy.get('input[ng-model="LastName"]').type(chance.last())
        cy.get('input[ng-model="EmailAdress"]').type(chance.email())
        cy.get('input[ng-model="Phone"]').type(chance.phone({formatted: false}))
        //radio e checkbox
        cy.get('input[value=FeMale]').check()
        cy.get('input[type="checkbox"]').check('Cricket')
        cy.get('input[type="checkbox"]').check('Hockey')
        //select simpels e multiplo select
        cy.get('select[id="Skills"]').select('Javascript')
        cy.get('select#countries').select('Portugal', {force: true})
        cy.get('select#country').select('Japan', {force: true})
        cy.get('select[id="yearbox"]').select('2015')
        cy.get('select[ng-model="monthbox"]').select('January')
        cy.get('select[id="daybox"]').select('16')
        cy.get('input[id="firstpassword"]').type('Agilizei.123')
        cy.get('input[id="secondpassword"]').type('Agilizei.123')
        cy.get('input#imagesrc').attachFile('primavera.png')
        //cy.pause()
        cy.get('button[id="submitbtn"]').click()

        cy.wait('@postNewTable').then((resNewTable) => {
            //console.log(resNewTable.status)
            //cy.log(resNewTable.status)
            expect(resNewTable.status).to.eq(200)
        })

        cy.wait('@postUserTable').then((resUserTable) => {
            expect(resUserTable.status).to.eq(200)
        })

        cy.wait('@getNewTable').then((resGetNewTable) => {
            expect(resGetNewTable.status).to.eq(200)
        })

        cy.url().should('contain', 'WebTable')

    });
});

