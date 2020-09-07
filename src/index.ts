import express from "express";
import { AddressInfo } from "net";
import { naverRouter } from "./router/naverRouter";
import { userRouter } from "./router/userRouter";
import { projectRouter } from "./router/projectRouter";

const app = express();

app.use(express.json());

const server = app.listen(3000, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Servidor rodando em http://localhost:${address.port}`);
  } else {
    console.error(`Falha ao rodar o servidor.`);
  }
});

app.use("/user/", userRouter);

app.use("/naver/", naverRouter);

app.use("/project/", projectRouter);
