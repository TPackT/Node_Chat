/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
  await knex.schema.createTable("messages", (table) => {
    table.increments("id")
    table.string("text").notNullable()
    table.timestamp("cts").defaultTo(knex.fn.now())
    table.integer("chatroomId").unsigned().references("id").inTable("chatrooms")
    table.integer("authorId").unsigned().references("id").inTable("users")
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function (knex) {
  await knex.schema.dropTable("messages")
}
