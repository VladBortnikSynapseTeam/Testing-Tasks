describe('Optimo Reports Page', ()=>{
    beforeEach(()=>{
        cy.intercept("GET", 'http://145.239.206.89:8085/LatestVersion/WebAPI/OLE/api/v4.2/reports/canned-reports?page.number=1&page.size=3&sort=lastViewedTime&fields=name,description,lastviewedTime,thumbnailURL,favorite', {fixture: 'reports.json'}).as('getLastViewedReports');
        cy.intercept("GET",'http://145.239.206.89:8085/LatestVersion/WebAPI/OLE/api/v4.2/reports/categories', {fixture: 'categories.json'}).as('getCategories');
        cy.intercept("GET", 'http://145.239.206.89:8085/LatestVersion/WebAPI/OLE/api/v4.2/reports/canned-reports?page.number=1&page.size=3&sort=lastViewedTime&fields=name,description,lastviewedTime,thumbnailURL,favorite&filters.favorite=true', {fixture: 'reports.json'}).as('getFavoriteReports');
        cy.intercept("GET", 'http://145.239.206.89:8085/LatestVersion/WebAPI/OLE/api/v4.2/reports/canned-reports?filters.searchText=sa', {fixture: 'reports.json'}).as('searchCategories');
        cy.intercept("GET", 'http://145.239.206.89:8085/LatestVersion/WebAPI/OLE/api/v4.2/reports/canned-reports', {fixture: 'reports.json'}).as('getAllReports');
        cy.intercept("GET", 'http://145.239.206.89:8085/LatestVersion/WebAPI/OLE/api/v4.2/reports/canned-reports?filters.searchText=Sales%20by%20Business%20Area%20and%20Package', {fixture: 'reports-search.json'}).as('reportsSearchResult')
        
        cy.visit('/');
        cy.wait('@getCategories');
        cy.wait('@getLastViewedReports');
        cy.wait('@getFavoriteReports');
        cy.get(':nth-child(1) > .category-item__content').should('exist').click();
        cy.wait('@getAllReports')
    })

    it('should correctly search through reports on all name', ()=>{
        cy.get('#typeahead-template').should('exist').type('sa').should('have.value','sa');
        cy.get('#ngb-typeahead-1-0').should('exist').click().wait('@reportsSearchResult')
            .then(()=>{
                cy.get('.reports__content-items').should('have.length','1');
            });

    })
    
    it('should correctly show report tiles on not all input text', ()=>{
        cy.get('#typeahead-template').should('exist').type('sa').should('have.value','sa');
        cy.get('.filter__search > img').should('exist').click();
    })

    it('should sort report tiles depending on asc desc order', ()=>{
        cy.get('.filter__actions > img').should('exist').click();
        cy.get('.reports__content > :nth-child(2)').children().should('exist').then(($reportList)=>{
            expect($reportList,'11 items').to.have.length(11);
            expect($reportList.eq(0), 'first item').to.contain('Contact');
            expect($reportList.eq(10), 'last item').to.contain('Top Clients');
        })
        cy.get('.filter__actions > img').should('exist').click();
        cy.get('.reports__content > :nth-child(2)').children().should('exist').then(($reportList)=>{
            expect($reportList,'11 items').to.have.length(11);
            expect($reportList.eq(0), 'first item').to.contain('Top Clients');
            expect($reportList.eq(10), 'last item').to.contain('Contact');
        })
        
    })

    it('should change icon from asc to desc', ()=>{
        cy.get('.filter__actions > img')
            .should('have.attr', 'src').and('include','../../../../../../assets/imgs/sort-asc.svg')
        cy.get('.filter__actions > img')
            .dblclick()
        cy.get('.filter__actions > img')
            .should('have.attr', 'src').and('include','../../../../../../assets/imgs/sort-desc.svg')
        })
});