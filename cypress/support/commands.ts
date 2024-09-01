/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
//-- This is a parent command --
Cypress.Commands.add('upload', () => {
  const fileName = 'sample.pdf';
  const allowedExtensions = ['pdf', 'docx'];
  const fileTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];
  const filePath = `../../samples/${fileName}`;

  cy.get('[data-testid="document-file"]').attachFile({ filePath });

  // Check if the uploaded file size is within the expected range
  cy.fixture(fileName, 'binary')
    .then(Cypress.Blob.binaryStringToBlob)
    .then((blob) => {
      // Validate file size
      const fileSizeInBytes = blob.size; // Get the size of the file in bytes
      const maxSizeInBytes = 10 * 1000000; // 5MB limit, adjust as needed

      // Assert the file size is within the allowed range
      expect(fileSizeInBytes).to.be.lessThan(maxSizeInBytes);
      const fileExtension = fileName.split('.').pop();
      // Check MIME type
      expect(allowedExtensions).to.include(fileExtension);
    });
});

Cypress.Commands.add('uploadFile', (filename) => {
  const fileName = filename;
  const allowedExtensions = ['pdf', 'docx'];
  const fileTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];
  const filePath = `../../samples/${fileName}`;

  cy.get('[data-testid="document-file"]').attachFile({ filePath });

  // Check if the uploaded file size is within the expected range
  cy.fixture(fileName, 'binary')
    .then(Cypress.Blob.binaryStringToBlob)
    .then((blob) => {
      // Validate file size
      const fileSizeInBytes = blob.size; // Get the size of the file in bytes
      const maxSizeInBytes = 10 * 1000000; // 5MB limit, adjust as needed

      // Assert the file size is within the allowed range
      expect(fileSizeInBytes).to.be.lessThan(maxSizeInBytes);
      const fileExtension = fileName.split('.').pop();
      // Check MIME type
      expect(allowedExtensions).to.include(fileExtension);
    });
});

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
