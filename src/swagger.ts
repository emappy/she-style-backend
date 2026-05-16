import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "She Style API",
      version: "1.0.0",
      description: "API documentation for She Style Fashion Store",
    },

    // servers: [
    //   {
    //     url: "http://localhost:5000/api",
    //   },
    // ],

    servers: [
  {
    url:
      process.env.NODE_ENV === "production"
        ? "https://she-style-api.onrender.com/api"
        : "http://localhost:5000/api",
  },
],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
