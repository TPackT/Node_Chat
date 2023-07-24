/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export const up = async function(knex) {
    await knex.schema.alterTable("messages", (table) => {
        table.jsonb("likeList").defaultTo("[]")
        table.integer("likeCount").defaultTo(0)
    })
  }
  
  /**
   * @param {import("knex").Knex} knex
   * @returns {Promise<void>}
   */
  export const down = async function(knex) {
    await knex.schema.alterTable("messages", (table) => {
      table.dropColumn("likeList")
      table.dropColumn("likeCount")
    })
  }