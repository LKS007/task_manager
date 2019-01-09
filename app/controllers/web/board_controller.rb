class Web::BoardController < Web::ApplicationController
  include Concerns::AuthHelper
  before_action :authenticate_user!
  def show
  end
end
