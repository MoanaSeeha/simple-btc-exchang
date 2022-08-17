# frozen_string_literal: true

# Receiver model for transaction
class Receiver
  attr_accessor :addr, :amount

  def initialize(addr, amount)
    @addr = addr
    @amount = amount
  end
end
