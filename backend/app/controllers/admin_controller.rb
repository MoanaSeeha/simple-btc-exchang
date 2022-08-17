# frozen_string_literal: true

# Admin controller
class AdminController < ActionController::Base
  # http_basic_authenticate_with name: 'admin', password: 'admin', only: :index
  def index
    @transactions = Transaction.all
    sql = "select coalesce(sum(case when status = 'SUCCESS'  then exchange_fee
               else 0
          end),0)        sum,
             count(1) total,
             coalesce(sum(case when status = 'SUCCESS'
                         then 1
                     else 0  end) ,0) total_success
          from transactions;"
    @total = ActiveRecord::Base.connection.execute(sql)
  end
end
