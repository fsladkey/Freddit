Rails.application.routes.draw do
  root "static_pages#root"

  namespace :api do
    resources :subs, only: [:index]
  end

end
