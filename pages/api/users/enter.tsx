import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";
import withHandler from "@libs/server/withHandler";
import twilio from "twilio";


const twilioClient = twilio(process.env.TWILID_SID,process.env.TWILIO_TOKEN)

interface ResponseType{
  ok:boolean
  [key:string]:any;
}


async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email } = req.body;
  const user = phone ? { phone: +phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false });
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });
  if (phone) {
    const message = await twilioClient.messages.create({
      messagingServiceSid:process.env.TWILIO_MSID,
      to:process.env.MY_PHONE!,
      body:`your login token is ${payload}`
    })
    console.log(message)
  }

  return res.json({
    ok: true,
  });
}

export default withHandler("POST" , handler)