describe('report-page', ()=>{
    beforeEach(()=>{
        cy.intercept("GET", 'http://145.239.206.89:8085/LatestVersion/WebAPI/OLE/api/v4.2/reports/canned-reports?page.number=1&page.size=3&sort=lastViewedTime&fields=name,description,lastviewedTime,thumbnailURL,favorite', {fixture: 'reports.json'}).as('getLastViewedReports');
        cy.intercept("GET",'http://145.239.206.89:8085/LatestVersion/WebAPI/OLE/api/v4.2/reports/categories', {fixture: 'categories.json'}).as('getCategories');
        cy.intercept("GET", 'http://145.239.206.89:8085/LatestVersion/WebAPI/OLE/api/v4.2/reports/canned-reports?page.number=1&page.size=3&sort=lastViewedTime&fields=name,description,lastviewedTime,thumbnailURL,favorite&filters.favorite=true', {fixture: 'reports.json'}).as('getFavoriteReports');
        cy.intercept("GET", 'http://145.239.206.89:8085/LatestVersion/WebAPI/OLE/api/v4.2/reports/canned-reports?filters.searchText=sa', {fixture: 'reports.json'}).as('searchCategories');
        cy.intercept("GET", 'http://145.239.206.89:8085/LatestVersion/WebAPI/OLE/api/v4.2/reports/canned-reports', {fixture: 'reports.json'}).as('getAllReports');
        cy.intercept("POST", 'http://145.239.206.89:8085/LatestVersion/WebAPI/OLE/api/v4.1/users/override', {body: {code: '123'}}).as('getOverride')
        cy.intercept("POST", 'http://145.239.206.89:8085/LatestVersion/WebAPI/OLE/api/v4.2/users/Request2FACode', {body: {code: '123'}}).as('get2FA')
        cy.intercept("POST", 'http://145.239.206.89:8085/LatestVersion/WebAPI/OLE/api/v4.2/users/2FAuthentication', {body: {code: '123'}}).as('send2FA')
        
        
        cy.visit('/');
        cy.wait('@getCategories');
        cy.wait('@getLastViewedReports');
        cy.wait('@getFavoriteReports');
        cy.get(':nth-child(1) > .category-item__content').should('exist').click();
        cy.wait('@getAllReports')
    })

    // it('should get to report page by view button on report tile', ()=>{
    //     cy.get(':nth-child(2) > :nth-child(1) > .report-item__container > .report-item__content > .report-item__actions > .report-item__btn')
    //         .should('exist')
    //         .click()
    // })

    // it('should get ot report page by view button in modal preview', ()=>{
    //     cy.get(':nth-child(2) > :nth-child(1) > .report-item__container > .report-item__image').trigger('mouseover').invoke('show');
    //     cy.contains('Preview').click({force: true}).then(()=>{
    //         cy.get('.preview__btn').should('exist').click();
    //     });
    // })

    it('should render 2FA modal on certain reports and process code', ()=>{
        cy.get(':nth-child(2) > :nth-child(3) > .report-item__container > .report-item__content > .report-item__actions > .report-item__btn')
            .should('exist')
            .click()
            .then(()=>{
                cy.get('.modal-content').should('exist');
                cy.get('.locked__content > :nth-child(1)').should('contain.text','This report contains sensitive data and you will need special access rights to view this report.');
                cy.get('.locked__content > :nth-child(2)').should('contain.text','A verification code will be sent to the email associated with this account.');
                cy.get('.locked__actions').should('exist');
                cy.get('.locked__actions > :nth-child(1)').should('exist').click();
            });
        cy.get(':nth-child(2) > :nth-child(3) > .report-item__container > .report-item__content > .report-item__actions > .report-item__btn')
            .should('exist')
            .click()
            .then(()=>{
                cy.get('.modal-content').should('exist');
                cy.get('.locked__content > :nth-child(1)').should('contain.text','This report contains sensitive data and you will need special access rights to view this report.');
                cy.get('.locked__content > :nth-child(2)').should('contain.text','A verification code will be sent to the email associated with this account.');
                cy.get('.locked__actions').should('exist');
                cy.get('.locked__actions > :nth-child(2)').should('exist')
                    .click()
                    .wait('@getOverride')
                    .wait('@get2FA')
                    cy.get('.locked__code-content > .ng-pristine').should('exist')
                        .type('123');
                    cy.get('.locked__actions > :nth-child(2)').click();
                    cy.get('.locked__error').should('exist').and('contain','Error: Invalid Verification Code. Please try again ');
                    cy.get('.locked__error > a').should('exist').click();
            });
        
    })
})