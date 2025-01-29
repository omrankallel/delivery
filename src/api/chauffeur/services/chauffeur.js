'use strict';

/**
 * chauffeur service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::chauffeur.chauffeur');
