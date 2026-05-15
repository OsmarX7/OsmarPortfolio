import { defineAction } from "astro:actions";
import { z } from "astro/zod";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const server = {
  sendCoupon: defineAction({
    input: z.object({
      name: z.string().min(2),
      email: z.email(),
      message: z.string().min(10),
      lang: z.enum(["es", "en"]),
    }),
    handler: async (input) => {
      const { name, email, message, lang } = input;

      const { data, error } = await resend.emails.send({
        from: "Portfolio <onboarding@resend.dev>",
        to: ["osmar_h_m_@hotmail.com"],
        subject:
          lang === "es" ? `🎟️ Cupón de: ${name}` : `🎟️ Coupon from: ${name}`,
        text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
      });

      if (error) throw new Error(error.message);
      return { success: true };
    },
  }),
};