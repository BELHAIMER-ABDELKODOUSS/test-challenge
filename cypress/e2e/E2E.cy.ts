import { should } from 'chai';
import 'cypress-file-upload';
const valid_data = {
  title: 'Procurement Plan',
  description:
    'A document outlining project requirements, inviting suppliers to submit a comprehensive proposal',
  documentCategory: 'sales proposal',
  file: 'sample.pdf',
};

const invalid_data = {
  title: '11111',
  description: '2222',
  documentCategory: '',
  file: 'sample.pdf',
};
const useCasesData = [
  {
    title: '',
    description:
      'A document outlining project requirements, inviting suppliers to submit a comprehensive proposal',
    documentCategory: 'sales proposal',
    file: 'sample.pdf',
  },
  {
    title: 'Procurement Plan',
    description: '',
    documentCategory: 'sales proposal',
    file: 'sample.pdf',
  },
  {
    title: 'Procurement Plan',
    description:
      'A document outlining project requirements, inviting suppliers to submit a comprehensive proposal',
    documentCategory: '',
    file: 'sample.pdf',
  },
  {
    title: 'Procurement Plan',
    description:
      'A document outlining project requirements, inviting suppliers to submit a comprehensive proposal',
    documentCategory: 'sales proposal',
    file: '',
  },
];
describe('Page Load and Component Rendering Test', () => {
  before(() => {
    cy.visit('http://localhost:8080/');
  });

  it('TC-00: Make Sure that the page load correctly', () => {
    cy.url().should('eq', 'http://localhost:8080/'); // visting the url

    cy.title().should('eq', 'Test Challenge'); // checking the page title
    cy.get('.container').should('be.visible'); // checking the main element on the DOM
    cy.get('[data-testid="title"]').should('exist'); // checking the  title
    cy.get('[data-testid="description"]').should('exist'); // checking the  title
    cy.get('[data-testid="document-category"]').should('exist'); // checking the  document category

    cy.get('[data-testid="document-category"]').select('sales proposal'); // selecting the  document category

    cy.get('[data-testid="document-type"]').should('be.visible'); // checking the  document type

    cy.get('[data-testid="document-file"]').should('exist'); // checking the  document file
    cy.get('#submit_btn').should('be.visible'); // checking the  button
  });

  it('TC-01: Upload Valid Size and Format File', () => {
    cy.visit('http://localhost:8080/');

    cy.fill_form(); // calling a command that fill the form with valid data
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
        const maxSizeInBytes = 10 * 1000000; // 10MB limit,

        // Assert the file size is within the allowed range
        expect(fileSizeInBytes).to.be.lessThan(maxSizeInBytes);
        const fileExtension = fileName.split('.').pop();
        // Check MIME type
        expect(allowedExtensions).to.include(fileExtension);
      });
    cy.get('#submit_btn').click(); // click submit
    cy.get('#dialog')
      .should('be.visible')
      .and('contain', 'Your information has been successfully submitted'); // assert that the results are as expected
  });

  it('TC-02: Upload InValid Format File and valid size', () => {
    cy.visit('http://localhost:8080/');
    cy.fill_form(); // calling a command that fill the form with valid data
    const fileName = 'sample2.jpg';
    const allowedExtensions = ['pdf', 'docx'];

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
    cy.get('#submit_btn').click();
    cy.get('#dialog')
      .should('be.visible')
      .and('contain', "Your information hasn't been successfully submitted"); // assert that the results are as expected
  });

  it('TC-03: Upload Valid Format File and Invalid size', () => {
    cy.visit('http://localhost:8080/');
    cy.fill_form(); // calling a command that fill the form with valid data
    const fileName = 'sample3.pdf';
    const allowedExtensions = ['pdf', 'docx'];

    const filePath = `../../samples/${fileName}`;

    cy.get('[data-testid="document-file"]').attachFile({ filePath });

    // Check if the uploaded file size is within the expected range
    cy.fixture(fileName, 'binary')
      .then(Cypress.Blob.binaryStringToBlob)
      .then((blob) => {
        // Validate file size
        const fileSizeInBytes = blob.size; // Get the size of the file in bytes
        const maxSizeInBytes = 10 * 1000000; // 10MB limit,

        // Assert the file size is within the allowed range
        expect(fileSizeInBytes).to.be.lessThan(maxSizeInBytes);
        const fileExtension = fileName.split('.').pop();
        // Check MIME type
        expect(allowedExtensions).to.include(fileExtension);
      });
    cy.get('#submit_btn').click();
    cy.get('#dialog')
      .should('be.visible')
      .and('contain', "Your information hasn't been successfully submitted"); // assert that the results are as expected
  });
  it.skip('TC-04: Fill and Upload Valid data and Valid Size & Format File', () => {
    cy.visit('http://localhost:8080/');
    cy.get('[data-testid="title"]') // input valid data
      .type(valid_data['file']); // input valid data
    cy.get('[data-testid="description"]') // input valid data
      .type(valid_data['description']); // input valid data
    cy.get('[data-testid="document-category"]').select(
      valid_data['documentCategory'],
    ); // input valid data
    cy.get('[data-testid="document-type"]').should('be.visible'); // input valid data
    cy.upload(); // calling a command that handle uploading the file
    cy.get('#submit_btn').click();
    cy.get('#dialog')
      .should('be.visible')
      .and('contain', 'Your information has been successfully submitted'); // assert that the results are as expected
  });

  it('TC-05: Fill with invalid data and Upload Valid Size & Format File', () => {
    cy.visit('http://localhost:8080/');
    cy.get('[data-testid="title"]') // input invalid data
      .type(invalid_data['file']); // input invalid data
    cy.get('[data-testid="description"]') // input invalid data
      .type(invalid_data['description']); // input invalid data
    cy.get('[data-testid="document-category"]').select(
      valid_data['documentCategory'],
    ); // input invalid data
    cy.get('[data-testid="document-type"]').should('be.visible');
    cy.upload(); // calling a command that handle uploading the file
    cy.get('#submit_btn').click();
    cy.get('#dialog')
      .should('be.visible')
      .and('contain', "Your information hasn't been successfully submitted"); // assert that the results are as expected
  });
  //!this is a loop test that test all the expected scenarios in case of one of the inputs is empty
  it('TC-06: Fill The Form With valid data for all the input except one', () => {
    useCasesData.forEach((object) => {
      cy.visit('http://localhost:8080/');
      console.log('helllo');
      if (object['title'] != '')
        cy.get('[data-testid="title"]').type(object['title']);

      if (object['description'] != '')
        cy.get('[data-testid="description"]').type(object['description']);

      if (object['documentCategory'] != '')
        cy.get('[data-testid="document-category"]').select(
          object['documentCategory'],
        );
      if (object['file'] != '') cy.uploadFile(object['file']);

      cy.get('#submit_btn').click();
      cy.get('#dialog')
        .should('be.visible')
        .and('contain', 'Your Information Has Been Submitted');
    });
  });
  //!this test will always failed because i didn't integrate the API functionalities but i tried to mock it
  it('TC-07: handle network failure gracefully during form submission', () => {
    // Intercept the network request and simulate a network failure
    cy.intercept('POST', '/api/submit-form', { forceNetworkError: true }).as(
      'submitForm',
    );

    cy.visit('http://localhost:8080/');
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
    cy.get('#submit_btn').click();
    cy.wait('@submitForm');
    cy.get('.error-message')
      .should('be.visible')
      .and('contain', 'Network error occurred. Please try again later.');
  });
});
