const neo4j = require('neo4j-driver').v1;
const { createEdge, deleteNode } = require('./db_queries');

const driver = neo4j.driver(process.env.GRAPHENE_BOLT_URL, neo4j.auth.basic(process.env.GRAPHENE_USERNAME, process.env.GRAPHENE_PASSWORD));

const getSession = () => driver.session();

module.exports = { getSession };
