# frozen_string_literal: true

Rails.application.routes.draw do
  scope '/api/v1', defaults: { format: :json } do
    post '/deal', to: 'deal#create'
  end
  get '/admin' => 'admin#index', as: :admin
end
