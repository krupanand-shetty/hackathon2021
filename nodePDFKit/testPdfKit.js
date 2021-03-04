const fs = require('fs');
const PDFDocument = require('pdfkit');
let pdfDoc = new PDFDocument;
let file = fs.createWriteStream(`/ushurapp/current/www/assets/ushur/form.pdf`)
pdfDoc.pipe(file);

pdfDoc.image(`/ushurapp/current/www/assets/ushur/U-Logo-Latest.png`,{width: 50, height: 50})

pdfDoc.moveDown(1);

pdfDoc.font('Courier-Bold').fontSize(30).fillColor('blue').text('FNOL Submission Confirmation', { align: 'center'});

pdfDoc.moveDown(1);

pdfDoc.font('Courier-Bold').fontSize(20).fillColor('black').text('Please Find below details of your claim');

pdfDoc.moveDown(1);

pdfDoc.font('Courier').fontSize(15).fillColor('black').text(`Name : Krupanand`);

pdfDoc.font('Courier').fontSize(15).fillColor('black').text(`Age : 31`);

pdfDoc.font('Courier').fontSize(15).fillColor('black').text(`Policy Number : 1234`);

pdfDoc.font('Courier').fontSize(15).fillColor('black').text(`Address of accident : kundapur, udupi`);

pdfDoc.moveDown(1);

pdfDoc.font('Courier-Bold').fontSize(20).fillColor('black').text('Please find Image you have attached');

pdfDoc.moveDown(1);

pdfDoc.image(`1DRSpw/image`, {width: 250, height: 250});

pdfDoc.end();