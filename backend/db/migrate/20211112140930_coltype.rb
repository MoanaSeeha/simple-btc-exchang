# frozen_string_literal: true

# Recreate col
class Coltype < ActiveRecord::Migration[6.1]
  def change
    remove_column :transactions, :fund_to
    add_column :transactions, :fund_to, :string
  end
end
