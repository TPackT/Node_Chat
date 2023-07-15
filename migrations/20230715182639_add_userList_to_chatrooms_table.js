/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export const up = async function(knex) {
    await knex.schema.alterTable("chatrooms", (table) => {
        table.jsonb("userList").defaultTo("[]")
    })
  }
  
  /**
   * @param {import("knex").Knex} knex
   * @returns {Promise<void>}
   */
  export const down = async function(knex) {
    await knex.schema.alterTable("chatrooms", (table) => {
      table.dropColumn("userList")
    })
  }