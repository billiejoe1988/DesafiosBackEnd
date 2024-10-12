import config from "../../config.js";
export const infoSwagger = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "LiquidStore API documentation",
      version: "1.0.0",
      description: `LiquidStore es un trabajo practico de Ejemplo del curso de FullStack de coderhouse. El mismo se fue construyendo de forma integral desde el curso de react, react native y backend.
Esta documentación corresponde a los diferentes endpoints del servidor backend construido en Node y express.

Links de utilidad:
  - [React FrontEnd Repository](https://github.com/juanPabloSarobe/react-47225)
  - [React Native APP Repository](https://github.com/juanPabloSarobe/LiquidStoreApp)
  - [BackEnd Repository](https://github.com/juanPabloSarobe/sarobe_Backend_61035)`,
    },
    servers: [
      {
        description: "Render API deploy",
        url: `https://liquidstore-backend.onrender.com/api`,
      },
      {
        description: "localHost server for development",
        url: `http://localhost:${config.PORT}/api`,
      },
    ],
  },
  apis: ["./src/docs/*.yml"],
};
