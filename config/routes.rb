Rails.application.routes.draw do

  root "static_pages#root"

  namespace :api, constraints: { format: 'json' } do

    resources :users, only: [:index, :create, :destroy]

    resource :session, only: [:create, :show, :destroy]

    resources :posts, only: [:index, :show] do
      member do
        post "upvote"
        post "downvote"
      end
    end

    resources :subs, only: [:index, :show] do
      member do
        get "posts"
      end
    end

  end

end
