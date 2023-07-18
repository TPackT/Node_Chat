import knex from "knex"
import knexfile from "../knexfile.js"

//test env 
export const db = knex(knexfile[process.env.NODE_env || "development"])


//export const db = knex(knexfile)