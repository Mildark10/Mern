import nodemailer from 'nodemailer';

const emailRegistro = async(datos)=>{
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      console.log(datos);

      //extraemos los datos

const { email , nombre , token} = datos;

//enviar email

const info = await transport.sendMail({
    from : "APV - ADMIN DE VETERINARIA",
    to: email,
    subject: 'Comprueba tu cuenta APV',
    text: 'Comprueba tu cuenta APV',
    html: `<p>Hola : ${nombre} , comprueba tu cuenta en APV</p>
        <p>Tu cuenta ya esta lista,solo debes comprobarla en el siguiente enlace : </p>
        <a href="${process.env.SERVER_FRONTEND}/confirmar/${token}">Comprobar cuenta</a>
        <p>Si tu no creaste en esta cuesta , puedes ignorar este mensaje</p>
    
    
    `
});

console.log('mensaje', info.messageId);
}




export default emailRegistro;