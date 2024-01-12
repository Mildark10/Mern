import nodemailer from 'nodemailer';

const emailOlvidePassword = async(datos)=>{
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
    subject: 'Restablesca su password',
    text: 'Restablesca su password',
    html: `<p>Hola : ${nombre} , has solicitado restablecer tu password</p>
        <p>Sigue el siguiente enlace para generar un nuevo Password : </p>
        <a href="${process.env.SERVER_FRONTEND}/olvide-password/${token}">Restablesca un Password</a>
        <p>Si tu no creaste en esta cuesta , puedes ignorar este mensaje</p>
    
    
    `
});

console.log('mensaje', info.messageId);
}




export default emailOlvidePassword;