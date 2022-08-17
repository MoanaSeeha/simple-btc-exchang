# frozen_string_literal: true

# Root controller
class ApplicationController < ActionController::API
  def btc_to_satoshi(val)
    val * 100_000_000
  end

  def satoshi_to_btc(val)
    val / 100_000_000
  end
end
