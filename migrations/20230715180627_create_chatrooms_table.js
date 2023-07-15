/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function(knex) {
    await knex.schema.createTable("chatrooms", (table) => {
        table.increments("id")
        table.integer("authorId").unsigned().references("id").inTable("users")
        table.string("name").notNullable()
        table.string("salt").notNullable()
        table.string("hash").notNullable()
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function(knex) {
    await knex.schema.dropTable("chatrooms")
};
