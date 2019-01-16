require 'coveralls'
Coveralls.wear!('rails')
ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  include FactoryBot::Syntax::Methods
  fixtures :all

  # Add more helper methods to be used by all tests here...
end

module SignInHelper
  def sign_in_as(admin)
    post session_path, params: {
      session: {
        password: admin.password,
        email: admin.email
      }
    }
  end
end

class ActionDispatch::IntegrationTest
  include SignInHelper
end
