describe('Reports Tile', ()=>{
    beforeEach(()=>{
        cy.intercept("GET", 'http://145.239.206.89:8085/LatestVersion/WebAPI/OLE/api/v4.2/reports/canned-reports?page.number=1&page.size=3&sort=lastViewedTime&fields=name,description,lastviewedTime,thumbnailURL,favorite', {fixture: 'reports.json'}).as('getLastViewedReports');
        cy.intercept("GET",'http://145.239.206.89:8085/LatestVersion/WebAPI/OLE/api/v4.2/reports/categories', {fixture: 'categories.json'}).as('getCategories');
        cy.intercept("GET", 'http://145.239.206.89:8085/LatestVersion/WebAPI/OLE/api/v4.2/reports/canned-reports?page.number=1&page.size=3&sort=lastViewedTime&fields=name,description,lastviewedTime,thumbnailURL,favorite&filters.favorite=true', {fixture: 'reports.json'}).as('getFavoriteReports');
        cy.intercept("GET", 'http://145.239.206.89:8085/LatestVersion/WebAPI/OLE/api/v4.2/reports/canned-reports?filters.searchText=sa', {fixture: 'reports.json'}).as('searchCategories');
        cy.intercept("GET", 'http://145.239.206.89:8085/LatestVersion/WebAPI/OLE/api/v4.2/reports/canned-reports', {fixture: 'reports.json'}).as('getAllReports');
        cy.intercept("GET", 'http://145.239.206.89:8085/LatestVersion/WebAPI/OLE/api/v4.2/reports/canned-reports?filters.searchText=Sales%20by%20Business%20Area%20and%20Package', {fixture: 'reports-search.json'}).as('reportsSearchResult')
        cy.intercept('PATCH', 'http://145.239.206.89:8085/LatestVersion/WebAPI/OLE/api/v4.2/reports/canned-reports/47', {body: {sample: 1}}).as('setFavorite')
        cy.visit('/');
        cy.wait('@getCategories');
        cy.wait('@getLastViewedReports');
        cy.wait('@getFavoriteReports');
        cy.get(':nth-child(1) > .category-item__content').should('exist').click();
        cy.wait('@getAllReports')
    })

    it('should have report tile structure and appear hover preview and open preview modal', ()=>{
        cy.get(':nth-child(2) > :nth-child(1) > .report-item__container > .report-item__image').trigger('mouseover').invoke('show');
        cy.contains('Preview').click({force: true}).then(()=>{
            cy.get('.modal-header').should('exist')
            cy.get('#modal-basic-title').should('have.text',' Sales by Business Area and Package ')
            cy.get('.preview__desc').should('have.text', ' A detail list contains sales information per business area and package along with a sales comparison on different sales periods ')
        });
    })

    it('should change favorite icon aon click if request is successfull', ()=>{
        cy.get(':nth-child(2) > :nth-child(1) > .report-item__container > .report-item__content > .report-item__info > .report-item__titles > .report-item__favorite')
            .should('exist')
            .and('have.attr', 'src').should('include','../../../../../../assets/imgs/heart.svg')
        cy.get(':nth-child(2) > :nth-child(1) > .report-item__container > .report-item__content > .report-item__info > .report-item__titles > .report-item__favorite')
            .click().wait('@setFavorite').then(()=>{
                cy.get(':nth-child(2) > :nth-child(1) > .report-item__container > .report-item__content > .report-item__info > .report-item__titles > .report-item__favorite')
                .should('have.attr', 'src').should('include','../../../../../../assets/imgs/heart-filled.svg')
            })
               
    })
})