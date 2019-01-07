Rails.application.routes.draw do
  scope module: :web do
    resource :board, only: :show
    resource :session, only: [:new, :create, :destroy]
    resources :developers, only: [:new, :create]
  end
end