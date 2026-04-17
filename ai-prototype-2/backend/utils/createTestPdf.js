const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const outPath = path.join(__dirname, '..', '..', 'uploads', 'test_resume.pdf');
const stream = fs.createWriteStream(outPath);
const doc = new PDFDocument();

doc.pipe(stream);

doc.fontSize(20).text('Rohit Kumar', { align: 'center' });
doc.fontSize(12).text('Software Developer', { align: 'center' });
doc.moveDown();

doc.fontSize(14).text('Skills');
doc.fontSize(11).text('JavaScript, Node.js, React, Python, Express.js, SQL, MongoDB, Git, Docker, AWS, TypeScript, REST APIs');
doc.moveDown();

doc.fontSize(14).text('Experience');
doc.fontSize(11).text('2 years building full-stack web applications. Developed REST APIs and microservices for production systems. Built real-time chat features using WebSockets.');
doc.moveDown();

doc.fontSize(14).text('Education');
doc.fontSize(11).text('B.Tech Computer Science, IIT Delhi, 2023');
doc.moveDown();

doc.fontSize(14).text('Projects');
doc.fontSize(11).text('E-commerce platform with payment integration');
doc.fontSize(11).text('AI-powered interview dashboard');
doc.fontSize(11).text('Real-time chat application using WebSockets');
doc.moveDown();

doc.fontSize(14).text('Certifications');
doc.fontSize(11).text('AWS Cloud Practitioner');
doc.fontSize(11).text('Google Cloud Associate');

doc.end();

stream.on('finish', () => {
  console.log('Test PDF created:', outPath, '(' + fs.statSync(outPath).size + ' bytes)');
});
