import { Router } from "express";

const configRouter = Router();

configRouter.get("/config", (_req, res) => {
  res.json({
    emailjsPublicKey: process.env.EMAILJS_PUBLIC_KEY ?? "",
    emailjsServiceId: "service_z4cpmem",
    emailjsTemplateId: "template_0kuoago",
  });
});

export default configRouter;
