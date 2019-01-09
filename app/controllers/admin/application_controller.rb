class Admin::ApplicationController < ApplicationController
  include Concerns::AuthHelper
  before_action :authenticate_user!, :authorize
   def authorize
    if (forbidden?)
      render(:file => File.join(Rails.root, 'public/403.html'), :status => 403, :layout => false)
    end
  end
   def forbidden?
    !current_user.is_a? Admin
  end
end