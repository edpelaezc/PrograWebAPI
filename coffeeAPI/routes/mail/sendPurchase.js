const nodemailer = require('nodemailer');


module.exports = (correo,metodo,tamaño,total) =>{

    var transporter = nodemailer.createTransport({

        service : 'gmail',
        auth :{
            user:'lacaturrita.gt@gmail.com',
            pass: process.env.passwordGmail
        }


    });



const mailOptions = {
    from: 'La Caturrita GT',
    to: correo, //formulario.email, // Cambia esta parte por el destinatario
    subject: 'Confirmación de compra',
    html:
    "<!DOCTYPE html><html>	<head>		<meta charset=\"utf-8\" />		<title>A simple, clean, and responsive HTML invoice template</title>		<style>			.invoice-box {				max-width: 800px;				margin: auto;				padding: 30px;				border: 1px solid #eee;				box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);				font-size: 16px;				line-height: 24px;				font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;				color: #555;			}			.invoice-box table {				width: 100%;				line-height: inherit;				text-align: left;			}			.invoice-box table td {				padding: 5px;				vertical-align: top;			}			.invoice-box table tr td:nth-child(2) {				text-align: right;			}			.invoice-box table tr.top table td {				padding-bottom: 20px;			}			.invoice-box table tr.top table td.title {				font-size: 45px;				line-height: 45px;				color: #333;			}			.invoice-box table tr.information table td {				padding-bottom: 40px;			}			.invoice-box table tr.heading td {				background: #eee;				border-bottom: 1px solid #ddd;				font-weight: bold;			}			.invoice-box table tr.details td {				padding-bottom: 20px;			}			.invoice-box table tr.item td {				border-bottom: 1px solid #eee;			}			.invoice-box table tr.item.last td {				border-bottom: none;			}			.invoice-box table tr.total td:nth-child(2) {				border-top: 2px solid #eee;				font-weight: bold;			}			@media only screen and (max-width: 600px) {				.invoice-box table tr.top table td {					width: 100%;					display: block;					text-align: center;				}				.invoice-box table tr.information table td {					width: 100%;					display: block;					text-align: center;				}			}			/** RTL **/			.rtl {				direction: rtl;				font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;			}			.rtl table {				text-align: right;			}			.rtl table tr td:nth-child(2) {				text-align: left;			}		</style>	</head>	<body>		<div class=\"invoice-box\">			<table cellpadding=\"0\" cellspacing=\"0\">				<tr class=\"top\">					<td colspan=\"2\">						<table>							<tr>								<td class=\"title\">									<img src=\"https://www.elcarioca.com.uy/assets/images/blog-post-1.jpg\" style=\"width: 100%; max-width: 300px\" />								</td>								<td>									Número de factura:" + new Date().getTime() + "<br />									Fecha:" + new Date().toISOString() + "<br />								</td>							</tr>						</table>					</td>				</tr>				<tr class=\"information\">					<td colspan=\"2\">						<table>							<tr>								<td>									La Caturrita, S. A.<br />									Baja Verapaz, Guatemala<br />												lacaturrita.gt@gmail.com								</td>							</tr>						</table>					</td>				</tr>				<tr class=\"heading\">					<td>Item</td>					<td>Precio</td>				</tr>				<tr class=\"item\">					<td>Método de preparación" + tamaño + " : " + metodo+ "</td>					<td>" + total + "</td>				</tr>				<tr class=\"total\">					<td></td>					<td>" + total+ "</td>				</tr>			</table>		</div>	</body></html>"
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
        console.log(err)
        else
        console.log(info);
        });
}