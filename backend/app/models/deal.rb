# frozen_string_literal: true

# Deal class
class Deal
  include ActiveModel::Validations

  attr_accessor :send_amount, :send_fund, :receive_fund, :current_network_fee, :wallet_address,
                :email, :course

  def initialize(attributes = {})
    attributes.each do |name, value|
      send("#{name}=", value)
    end
  end

  validates :send_amount, presence: true, numericality: { greater_than: 0 }
  validates :send_fund, presence: true, inclusion: { in: %w[USD] }
  validates :receive_amount, presence: true, numericality: { greater_than: 0 }
  validates :receive_fund, presence: true, inclusion: { in: %w[BTC] }
  validates :current_network_fee, presence: true
  validates :wallet_address, presence: true
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :course, presence: true

  validate :sum_validate
  validate :wallet_address_validate

  def receive_amount_without_fees
    receive_amount - exchange_fee - current_network_fee
  end

  def exchange_fee
    0.03 * receive_amount
  end

  private

  def receive_amount
    send_amount * course
  end

  def receive_amount_in_usd
    receive_amount_without_fees / course
  end

  def max_received_amount_in_usd
    course * 30
  end

  def wallet_p2pkn?
    wallet_address.start_with?('1')
  end

  def wallet_p2sh?
    wallet_address.start_with?('3')
  end

  def wallet_p2wphk?
    wallet_address.start_with?('bc1')
  end

  def test_btc_wallet?
    wallet_address.start_with?('tb1')
  end

  def valid_wallet?
    wallet_p2pkn? or wallet_p2sh? or wallet_p2wphk? or test_btc_wallet?
  end

  def wallet_address_validate
    errors.add(:wallet_address, 'Invalid wallet address') unless valid_wallet?
  end

  def sum_validate
    if receive_amount_in_usd > 30
      errors.add(:receive_amount,
                 format("Can't be greater than %.8f BTC", max_received_amount_in_usd))
    end
    errors.add(:send_amount, "Can't be greater than 30 USD") if send_amount > 30
  end
end
