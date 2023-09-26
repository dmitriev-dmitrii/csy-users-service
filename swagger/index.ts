import swaggerAutogen from "swagger-autogen";

const outputFile = './swagger.json';
const endpointsFiles = ['../index.ts'];

const doc = {
  info: {
    title: 'csy-users api',
    description: '',
    version: "1"
  },
  host: "hui",
  schemes: ['http'],
};
swaggerAutogen(/*options*/)(outputFile, endpointsFiles, doc).then((res) => {
  }
)