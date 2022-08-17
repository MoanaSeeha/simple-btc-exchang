# frozen_string_literal: true

# Deal controller
class DealController < ApplicationController
  def create
    deal = Deal.new(create_params)
    render json: { errors: deal.errors }, status: :bad_request and return unless deal.validate

    transaction_log = _make_transaction_log(deal)

    begin
      api = BitcoinNetworkApi.new
      key = Bitcoin::Key.from_base58('cMwF29DZLyMvhZnB5Xxhx2wPzcVzWBgLHeHziRgqpUJ5bwb7kbeU')
      wallet = Wallet.new(api, key)
      receive_amount = btc_to_satoshi(deal.receive_amount_without_fees)
      res = wallet.send_money(deal.wallet_address, receive_amount, btc_to_satoshi(deal.current_network_fee))
      transaction_log.status = 'SUCCESS'
      transaction_log.txid = res

      response = {}
      response[:send_amount] = deal.send_amount
      response[:receive_amount] = satoshi_to_btc(receive_amount)
      response[:exchange_fee] = deal.exchange_fee
      response[:network_fee] = deal.current_network_fee
      response[:recipient_address] = deal.wallet_address
      response[:exchange_rate] = deal.course
      response[:send_fund] = deal.send_fund
      response[:receive_fund] = deal.receive_fund

      render json: response
    rescue StandardError => e
      transaction_log.status = 'FAIL'
      render json: { message: e.message }, status: :internal_server_error
    ensure
      transaction_log.save
    end
  end

  private

  def _make_transaction_log(deal)
    transaction = Transaction.new
    transaction.dt = Time.now.strftime('%d/%m/%Y %H:%M')
    transaction.fund_from = deal.send_fund
    transaction.fund_to = deal.receive_fund
    transaction.exchange_fee = deal.exchange_fee
    transaction.exchange_rate = deal.course
    transaction.email = deal.email
    transaction
  end

  def create_params
    params.require(:deal).permit(:send_amount,
                                 :send_fund,
                                 :receive_amount,
                                 :receive_fund,
                                 :current_network_fee,
                                 :wallet_address,
                                 :email,
                                 :course)
  end
end
