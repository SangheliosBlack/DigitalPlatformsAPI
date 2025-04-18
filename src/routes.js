const buildPath = (apiVersion, routePath) => `${apiVersion}${routePath}`;

const apiVersion = `/api/${process.env.API_VERSION || 'v1'}/${process.env.NODE_ENV}`;

export default {
  auth:   buildPath(apiVersion,'/auth'),
  users:  buildPath(apiVersion,'/users'),
  sms:    buildPath(apiVersion,'/sms'),
  upload: buildPath(apiVersion,'/upload'),
  releases: buildPath(apiVersion,'/releases'),
  features:  buildPath(apiVersion,'/features'),
  featuresSurvey:  buildPath(apiVersion,'/featureSurvey'),
  commercialFigures: buildPath(apiVersion,'/commercialFigures')
};