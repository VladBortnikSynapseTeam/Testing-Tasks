describe('Optimo Reports Page', ()=>{
    beforeEach(()=>{
        cy.intercept("GET", 'http://145.239.206.89:8085/LatestVersion/WebAPI/OLE/api/v4.2/reports/canned-reports?page.number=1&page.size=3&sort=lastViewedTime&fields=name,description,lastviewedTime,thumbnailURL,favorite', {fixture: 'reports.json'}).as('getLastViewedReports');
        cy.intercept("GET",'http://145.239.206.89:8085/LatestVersion/WebAPI/OLE/api/v4.2/reports/categories', {fixture: 'categories.json'}).as('getCategories');
        cy.intercept("GET", 'http://145.239.206.89:8085/LatestVersion/WebAPI/OLE/api/v4.2/reports/canned-reports?page.number=1&page.size=3&sort=lastViewedTime&fields=name,description,lastviewedTime,thumbnailURL,favorite&filters.favorite=true', {fixture: 'reports.json'}).as('getFavoriteReports');
        cy.intercept("GET", 'http://145.239.206.89:8085/LatestVersion/WebAPI/OLE/api/v4.2/reports/canned-reports?filters.searchText=sa', {fixture: 'reports.json'}).as('searchCategories');
        cy.intercept("GET", 'http://145.239.206.89:8085/LatestVersion/WebAPI/OLE/api/v4.2/reports/canned-reports', {fixture: 'reports.json'}).as('getAllReports');

        
        cy.visit('/');
        cy.wait('@getCategories');
        cy.wait('@getLastViewedReports');
        cy.wait('@getFavoriteReports');
    })

    it('should enter reoprt page on clicking to the category', ()=>{
        cy.get(':nth-child(1) > .category-item__content').should('exist').click();
        cy.wait('@getAllReports')
    })
});