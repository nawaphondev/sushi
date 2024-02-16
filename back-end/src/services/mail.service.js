const Resend = require("resend");

const resend = new Resend.Resend('re_96nwy7Pg_2iyVV6LFaWRMEQs7QhLaFjrY');

const sendEmail = async (data) => {
  
  const { data: result, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: ['nawaphonphophom55@gmail.com'],
    subject: `คุณได้รับข้อความใหม่จาก ${data.name}`,
    html: `
      <p>${data.message}</p>
      <i>${data.phoneNumber}</i>
    `,
  });

  if (error) {
    return console.error({ error });
  }


  console.log({ result });
  return result

}

module.exports = sendEmail;
