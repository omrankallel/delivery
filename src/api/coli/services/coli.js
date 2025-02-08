'use strict';

/**
 * coli service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::coli.coli');
