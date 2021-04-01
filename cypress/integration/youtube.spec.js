/// <reference types="cypress" />

const YOUTUBE_VIDEO_TITLE = 'The whole working-from-home thing — Apple';
const APPLE = 'Apple';
const YOUTUBE_URL = 'https://www.youtube.com';
context('QA Engineer case study', () => {

   it('Visits youtube', () => {
      cy.visit(YOUTUBE_URL);
   });

   it('Waits for page to finish loading', () => {
      cy.intercept(`${YOUTUBE_URL}/watch`).as('getYouTube');
      cy.get('#search-input > #search').type(YOUTUBE_VIDEO_TITLE);
      cy.get('#search-icon-legacy').click();
      cy.contains(YOUTUBE_VIDEO_TITLE).click();
      cy.wait('@getYouTube').then((interception) => {
         expect(interception.response.statusCode).to.equal(200);
         expect(interception.response.statusMessage).to.equal('OK');
         expect(interception.state).to.equal('Complete');
      });
   });

   it('Title of video matches previous search', () => {
      cy.get('.ytd-watch-flexy > :nth-child(1) > .title > .style-scope').invoke('text').should('eq', YOUTUBE_VIDEO_TITLE);
   });

   it('Uploader is Apple', () => {
      cy.get('#upload-info > #channel-name > #container > #text-container > #text > .yt-simple-endpoint').invoke('text').should('eq', APPLE);
   });
});