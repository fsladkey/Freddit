Rails.application.routes.draw do
  root "static_pages#root"

  namespace :api, constraints: { format: 'json' } do
    resources :posts, only: [:index, :show]
    resources :subs, only: [:index] do
      resources :posts, only: [:index]
    end
  end

end
