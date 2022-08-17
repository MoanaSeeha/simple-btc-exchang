# frozen_string_literal: true

# Add col
class AddCol < ActiveRecord::Migration[6.1]
  def change
    add_column :transactions, :txid, :string
  end
end
