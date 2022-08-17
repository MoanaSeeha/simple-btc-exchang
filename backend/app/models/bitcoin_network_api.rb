# frozen_string_literal: true

require 'net/http'
require 'open-uri'

# External API
class BitcoinNetworkApi
  def initialize
    @base_url = 'https://blockstream.info/testnet/api'
  end

  def get_utxo_by_address(address)
    url = URI.parse("#{@base_url}/address/#{address}/utxo")
    res = Net::HTTP.get URI(url)
    JSON.parse(res)
  end

  def get_binary_transaction(tx_hash)
    uri = URI.parse("#{@base_url}/tx/#{tx_hash}/raw")
    res = Net::HTTP.get URI(uri)
    if res == 'Transaction not found'
      raise Errors::AppError,
            "Transaction not found in #{@base_url}. Perhaps the requests are being made too
       quickly and the data has not yet reached the API server. URI=#{uri}"
    end

    res
  end

  def post_transaction(raw)
    url = URI.parse("#{@base_url}/tx")
    res = Net::HTTP.post(URI(url), raw, { 'Content-type': 'text/plain' })
    raise StandardError, res.body if res.code != '200'

    res.body
  end
end
