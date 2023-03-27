describe('Optimo Category Page', ()=>{

    beforeEach(()=>{
        cy.intercept("GET", 'http://145.239.206.89:8085/LatestVersion/WebAPI/OLE/api/v4.2/reports/canned-reports?page.number=1&page.size=3&sort=lastViewedTime&fields=name,description,lastviewedTime,thumbnailURL,favorite', {fixture: 'reports.json'}).as('getLastViewedReports');
        cy.intercept("GET",'http://145.239.206.89:8085/LatestVersion/WebAPI/OLE/api/v4.2/reports/categories', {fixture: 'categories.json'}).as('getCategories');
        cy.intercept("GET", 'http://145.239.206.89:8085/LatestVersion/WebAPI/OLE/api/v4.2/reports/canned-reports?page.number=1&page.size=3&sort=lastViewedTime&fields=name,description,lastviewedTime,thumbnailURL,favorite&filters.favorite=true', {fixture: 'favorite-reports.json'}).as('getFavoriteReports');
        cy.intercept("GET", 'http://145.239.206.89:8085/LatestVersion/WebAPI/OLE/api/v4.2/reports/canned-reports?filters.searchText=sa', {fixture: 'reports.json'}).as('searchCategories');

        
        cy.visit('/');
        cy.wait('@getCategories');
        cy.wait('@getLastViewedReports');
        cy.wait('@getFavoriteReports');
    })
    it('should have main container structure',()=>{
        cy.get('.categories__container').should('exist');
        cy.get('.categories-reports__last-viewed').should('exist');
        cy.get('.categories-reports__favorite').should('exist');
        cy.get('.filter__container').should('exist');
        cy.get('#typeahead-template').should('exist');
        cy.get('.categories__content').should('exist');
        cy.get(':nth-child(1) > .category-item__content').should('exist');
    })

    it('should have correctly working slider', () => {

        //1
        cy.get('.categories-reports__last-viewed > .mySwiper > .swiper-pagination > :nth-child(4)').click().should('have.class','swiper-pagination-bullet-active');

        //2 froward
        cy.get('.categories-reports__last-viewed > .mySwiper > .swiper-pagination > :nth-child(4)').click();
        cy.get('.categories-reports__last-viewed > .mySwiper > .swiper-button-next').click();
        cy.get('.categories-reports__last-viewed > .mySwiper > .swiper-pagination > :nth-child(5)').should('have.class','swiper-pagination-bullet-active');

        //3 backwards
        cy.get('.categories-reports__last-viewed > .mySwiper > .swiper-pagination > :nth-child(5)').click();
        cy.get('.categories-reports__last-viewed > .mySwiper > .swiper-button-prev').click();
        cy.get('.categories-reports__last-viewed > .mySwiper > .swiper-pagination > :nth-child(4)').should('have.class','swiper-pagination-bullet-active');
    })

    it('should correctly search categories', ()=>{
        cy.get('#typeahead-template')
            .type('sa').should('have.value','sa').wait('@searchCategories').then(()=>{
                cy.get('#ngb-typeahead-0').should('exist');
                cy.get('#ngb-typeahead-0-1').click();
                cy.get('#typeahead-template').should('have.value','Events');
                cy.get('.categories__content').should('have.length', '1')
            })
    })

})