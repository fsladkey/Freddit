Rails.application.routes.draw do

  root "static_pages#root"

  # devise_for :users
  devise_for :users, controllers: {
    sessions: 'sessions',
    registrations: 'registrations'
  }

  namespace :api, constraints: { format: 'json' } do
    resources :users, only: [:index] do
      get 'currentuser', on: :collection
    end
    resources :posts, only: [:index, :show]
    resources :subs, only: [:index] do
      resources :posts, only: [:index]
    end
  end

end
