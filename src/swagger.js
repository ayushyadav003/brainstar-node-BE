import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "brainstar-node",
      description:
        "API endpoints for a brainstar services documented on swagger",
      contact: {
        name: "Desmond Obisi",
        email: "info@miniblog.com",
        url: "https://github.com/DesmondSanctity/node-js-swagger",
      },
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:/",
        description: "Local server",
      },
      {
        url: "<your live url here>",
        description: "Live server",
      },
    ],
  },
  // looks for configuration in specified directories
  apis: ["./router/*.js"],
};
const swaggerSpec = swaggerJsdoc(options);
function swaggerDocs(app, port) {
  // Swagger Page
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // Documentation in JSON format
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}
export default swaggerDocs;
