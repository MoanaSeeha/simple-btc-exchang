# frozen_string_literal: true

# Nodoc
class AddEmail < ActiveRecord::Migration[6.1]
  def change
    add_column :transactions, :email, :string
  end
end
