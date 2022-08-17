# frozen_string_literal: true

require 'bitcoin'

# Wallet class
class Wallet
  include Bitcoin::Builder

  def initialize(api, key)
    @api = api
    @key = key
  end

  def balance
    utxo = @api.get_utxo_by_address(@key.addr)
    utxo.map { |t| t['value'] }.reduce(0, :+).to_f
  end

  # Send money from key wallet to some address
  def send_money(receiver_addr, amount, network_fee)
    utxo = @api.get_utxo_by_address(@key.addr)
    cashback = balance - amount - network_fee
    raise StandardError, 'Insufficient funds' if cashback <= 0

    utxo.each do |u|
      u['raw'] = @api.get_binary_transaction(u['txid'])
    end
    tx = build_transaction(utxo, Receiver.new(receiver_addr, amount), Receiver.new(@key.addr, cashback))
    @api.post_transaction(tx.to_payload.unpack1('H*'))
  end

  private

  def build_transaction(utxo, *receivers)
    build_tx do |t|
      utxo.each do |u|
        t.input do |i|
          i.prev_out Bitcoin::Protocol::Tx.new(u['raw'])
          i.prev_out_index u['vout']
          i.signature_key @key
        end
      end
      receivers.each do |receiver|
        t.output do |o|
          o.value receiver.amount
          o.script { |s| s.recipient receiver.addr }
        end
      end
    end
  end
end
