describe('Report Page', ()=>{
    beforeEach(()=>{
        cy.intercept("GET", 'http://145.239.206.89:8085/LatestVersion/WebAPI/OLE/api/v4.2/reports/canned-reports?page.number=1&page.size=3&sort=lastViewedTime&fields=name,description,lastviewedTime,thumbnailURL,favorite', {fixture: 'reports.json'}).as('getLastViewedReports');
        cy.intercept("GET",'http://145.239.206.89:8085/LatestVersion/WebAPI/OLE/api/v4.2/reports/categories', {fixture: 'categories.json'}).as('getCategories');
        cy.intercept("GET", 'http://145.239.206.89:8085/LatestVersion/WebAPI/OLE/api/v4.2/reports/canned-reports?page.number=1&page.size=3&sort=lastViewedTime&fields=name,description,lastviewedTime,thumbnailURL,favorite&filters.favorite=true', {fixture: 'reports.json'}).as('getFavoriteReports');
        cy.intercept("GET", 'http://145.239.206.89:8085/LatestVersion/WebAPI/OLE/api/v4.2/reports/canned-reports?filters.searchText=sa', {fixture: 'reports.json'}).as('searchCategories');
        cy.intercept("GET", 'http://145.239.206.89:8085/LatestVersion/WebAPI/OLE/api/v4.2/reports/canned-reports', {fixture: 'reports.json'}).as('getAllReports');
        cy.intercept("GET", 'http://145.239.206.89:8085/LatestVersion/WebAPI/OLE/api/v4.2/reports/canned-reports/47?include=parameterFields', {fixture: 'report-parameters.json'}).as("getParams")
        cy.intercept("POST", 'http://145.239.206.89:8085/LatestVersion/WebAPI/OLE/api/v4.2/reports/canned-reports/47/execute', {fixture: 'report-parameters.json'}).as('executeReport');
        cy.intercept("PATCH", 'http://145.239.206.89:8085/LatestVersion/WebAPI/OLE/api/v4.2/reports/canned-reports/47', {body: {sample: 1}}).as('favoriteReport')


        cy.visit('/');
        cy.wait('@getCategories');
        cy.wait('@getLastViewedReports');
        cy.wait('@getFavoriteReports');
        cy.get(':nth-child(1) > .category-item__content').should('exist').click();
        cy.wait('@getAllReports')
        cy.get(':nth-child(2) > :nth-child(1) > .report-item__container > .report-item__content > .report-item__actions > .report-item__btn')
            .should('exist')
            .click();
        cy.wait('@getParams')
        cy.wait('@executeReport')
    })

    it('should render report page', ()=>{   
        cy.get('.report-detail__filter').should('exist');
        cy.get('.report-detail__filter-advanced').should('exist')
        cy.get('.report-detail__header-actions > .reset').should('exist')
        cy.get('.switch > span').should('exist')
        cy.get('.switch-content').should('exist').and('contain','Use Last Filters');
        cy.get('.report-detail__header-actions > :nth-child(3)').should('exist');
        cy.get('.report-detail__header-actions > :nth-child(4)').should('exist');
    })

    it('checkboxes should work correctly', ()=>{
        cy.get(':nth-child(1) > .input-checkbox').should('exist')
            .and('be.checked')
            .click()
            .and('not.be.checked')
    })

    it('inputs should work correctly', ()=>{
        cy.get('.form-control').should('exist')
            .type('123')
            .and('have.value','57123')
    })

    it('datepicker should work correctly', ()=>{
        cy.get('.report-detail__filter > .report-detail__content > :nth-child(2) > input')
            .should('exist')
            .click(175,10)
            .wait(1000)
    })

    it('timepicker should work correctly', ()=>{
        cy.get(':nth-child(6) > input')
            .should('exist')
            .click()
            .then(()=>{
                cy.get('.timepicker__header').should('exist');
                cy.get('[ng-reflect-time="10"] > .timepicker-dial__control')
                    .should('have.value','10')
                    cy.get('[ng-reflect-time="35"] > .timepicker-dial__control')
                    .should('have.value','35')
                cy.get('[style="transform: rotateZ(30deg) translateX(-50%);"] > span')
                    .should('exist')
                    .click()
                    .then(()=>{
                        cy.get('[style="transform: rotateZ(354deg) translateX(-50%);"] > span')
                            .should('exist')
                            .click();
                        cy.get(':nth-child(2) > .ng-tns-c113-0 > .timepicker-button')
                            .click();    
                        cy.get(':nth-child(6) > input')
                            .should('have.value', '1:59 AM')
                    })
            })
        cy.get(':nth-child(6) > input')
            .should('exist')
            .click()
            .then(()=>{
                cy.get(':nth-child(1) > .ng-tns-c113-2 > .timepicker-button')
                    .should('exist')
                    .click()
                    .then(()=>{
                        cy.get(':nth-child(6) > input')
                            .should('have.value', '1:59 AM')
                    })
            })
    })

    it('should mark as favourite from report detail page', ()=>{
        cy.get(':nth-child(4) > img')
        .should('have.attr','src').and('include','../../../../../../assets/imgs//heart.svg')
        cy.get('.btn-close')
            .click()
        cy.get(':nth-child(4) > img')
        .click({force: true})
        .wait('@favoriteReport')
    })

    it('should open settings popup and correctly work', ()=>{
        cy.get('.btn-close')
            .click()
            .then(()=>{
                cy.get('.report-detail__header-actions > :nth-child(3)')
                .should('exist')
                .click({force:true})

                cy.get('.modal-header').should('exist').and('contain',' Sales by Business Area and Package ')
                cy.get('.modal-body').should('exist')
                cy.get('.settings__desc').should('exist').and('contain' , " Categorize filters on this report as 'Basic' or 'Advanced': ");
                cy.get('.settings__table').should('exist');
                cy.get('.settings__table-header').children().should('have.length','4')
                cy.get('.settings__table-header > :nth-child(1)').should('contain','Main Filter')
                cy.get('.settings__table-header > :nth-child(2)').should('contain','Related Filter')
                cy.get('.settings__table-header > :nth-child(3)').should('contain','Basic')
                cy.get('.settings__table-header > :nth-child(4)').should('contain','Advanced')
                
                cy.get('#businessArea1').should('exist')
                    .and('be.checked')
                cy.get('#businessArea2').should('exist')
                    .and('not.be.checked')
                    .click()
                    .and('be.checked')
                cy.get('.save')
                    .should('exist')
                    .click()
                    .then(()=>{
                        cy.get('.modal-body').should('be.hidden')
                    })
            })
        
    })

    it('should switch settings', ()=>{
        cy.get('.btn-close')
            .click()
        cy.get('.switch > span')
            .should('exist')
            .click()
    })
})