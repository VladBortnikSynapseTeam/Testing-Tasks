describe('Optimo Category Page', ()=>{

    beforeEach(()=>{
        cy.visit('/')
    })

    it('should have main container',()=>{
        cy.get('.categories__container');
    })
})