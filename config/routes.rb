Rails.application.routes.draw do
  scope module: :web do
    resource :board, only: :show
    resource :session, only: :new
  end
end