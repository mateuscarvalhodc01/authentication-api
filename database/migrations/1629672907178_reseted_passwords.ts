import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ResetedPasswords extends BaseSchema {
  protected tableName = 'reseted_passwords'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
			table.string('email', 254).notNullable();
			table.string('code', 254).nullable();
			table.boolean('available').defaultTo(true);
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
