# frozen_string_literal: true

# Transaction table
class CreateTransactions < ActiveRecord::Migration[6.1]
  def change
    create_table :transactions do |t|
      t.timestamp :dt
      t.string :fund_from
      t.float :fund_to
      t.float :exchange_rate
      t.float :exchange_fee
      t.string :status
      t.timestamps
    end
  end
end
