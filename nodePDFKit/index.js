const express = require('express')
const app = express()
const https = require('https');
const request = require('request');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const port = 3002
app.use(express.json())


app.post('/pdfGenerator', async (req, res) => {
	if(req.body && req.body.imageUrl){
		try{
			const surl = req.body.imageUrl.split('=')[1]
			await createDirectory(surl)
			await downloadAssets(req.body,surl)
			await createPDF(req.body,surl)
			const assetId = await uploadPDF(req.body,surl)
			res.send({
				success :true,
				result : assetId
			})
		}
		catch(err){
			console.error("Error generating pdf",req.body,err)
			res.send({success : false})
		}
	}
	else{
		console.error("imageUrl not found in request",req.body)
		res.send({success : false})
	}
})



const createDirectory = (surl)=>{
	return new Promise((resolve,reject)=>{
		fs.mkdir(surl, { recursive: true }, (err) => {
		    if (err) 
		    	reject(err)
		    else
		    	resolve()
		});
	})
}

const downloadAssets = (params,surl)=>{
	return new Promise((resolve,reject)=>{
		const file = fs.createWriteStream(`${surl}/image`);
		const request = https.get(params.imageUrl, function(response) {
		  response.pipe(file);
		  file.on('finish', () => {
		    console.log('All writes are now complete.');
		    resolve()
		  });
		});
	})
}


const createPDF = (params,surl)=>{
	return new Promise((resolve,reject)=>{

		let pdfDoc = new PDFDocument;
		let file = fs.createWriteStream(`${surl}/form.pdf`)
		pdfDoc.pipe(file);

		pdfDoc.image(`/ushurapp/current/www/assets/ushur/U-Logo-Latest.png`,{width: 50, height: 50})

		pdfDoc.moveDown(1);

		pdfDoc.font('Courier-Bold').fontSize(30).fillColor('blue').text('FNOL Submission Confirmation', { align: 'center'});

		pdfDoc.moveDown(1);

		pdfDoc.font('Courier-Bold').fontSize(20).fillColor('black').text('Please Find below details of your claim');

		pdfDoc.moveDown(1);

		pdfDoc.font('Courier').fontSize(15).fillColor('black').text(`Name : ${params.name}`);

		pdfDoc.font('Courier').fontSize(15).fillColor('black').text(`Age : ${params.age}`);

		pdfDoc.font('Courier').fontSize(15).fillColor('black').text(`Policy Number : ${params.policyNumber}`);

		pdfDoc.font('Courier').fontSize(15).fillColor('black').text(`Address of accident : ${params.address}`);

		pdfDoc.moveDown(1);

		pdfDoc.font('Courier-Bold').fontSize(20).fillColor('black').text('Please find Image you have attached');

		pdfDoc.moveDown(1);

		pdfDoc.image(`${surl}/image`, {width: 250, height: 250});

		pdfDoc.end();

		file.on('finish', () => {
		  console.log('All writes are now complete. PDF');
		  resolve()
		});
	})
}

const uploadPDF = (params,surl)=>{
	return new Promise((resolve,reject)=>{
		var options = {
		  'method': 'POST',
		  'url': `https://${params.hostname}/rest/asset/upload?fileName=form.pdf`,
		  'headers': {
		    'Content-Type': 'multipart/form-data'
		  },
		  formData: {
		    'file': {
		      'value': fs.createReadStream(`${surl}/form.pdf`),
		      'options': {
		        'filename': 'form.pdf',
		        'contentType': null
		      }
		    }
		  }
		};
		
		request(options, function (error, response) {
			console.log(response.body);
			if (error) 
				reject(error)
			else
				resolve(response.body)
		});
	})
}



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
