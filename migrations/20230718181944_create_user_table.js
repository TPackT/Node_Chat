/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
    await knex.schema.createTable("users", (table) => {
        table.increments("id")
        table.string("username").notNullable().unique()
        table.string("salt").notNullable()
        table.string("hash").notNullable()
        table.string("token")
        table.timestamp("created").defaultTo(knex.fn.now())
    })
  }
  
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export const down = async function (knex) {
    await knex.schema.dropTable("users")
  }
  